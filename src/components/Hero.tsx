import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowRight, ArrowDown } from 'lucide-react'
import RevealHeading from './RevealHeading'
import { DURATION, EASE_OUT_EXPO, STAGGER, useFadeVariants, useTapFeedback } from '../lib/motion'

export default function Hero() {
  const tapFeedback = useTapFeedback()
  const fadeVariants = useFadeVariants()
  const go = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()

  // Above-the-fold — animates on mount (never on scroll). Eyebrow settles
  // first, the CTA row last, so the eye is led eyebrow -> heading -> body ->
  // CTA. The heading itself is handled separately by <RevealHeading eager />
  // so its words can cascade in the same window. Under reduced motion,
  // hidden === visible with a 0s transition so content is present in its
  // final state immediately, never mid-fade.
  const fadeUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0, transition: { duration: 0 } } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: (i: number) => ({
          opacity: 1,
          y: 0,
          transition: { delay: i, duration: DURATION.base, ease: EASE_OUT_EXPO },
        }),
      }
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const videoScale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1, 1.18])

  // The background video is only 720p — blown up to fill a tall phone screen it looks
  // soft and badly cropped. On phones/tablets we show the sharp 2048px poster image
  // instead, and only load/play the video on desktop where it fits the 16:9 frame.
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-svh flex flex-col overflow-hidden" style={{ background: 'var(--ink)' }}>
      {/* Background: sharp poster image on mobile, parallax video on desktop.
          PLACEHOLDER NOTICE: hero-altyapi-placeholder.webp is an AI-generated
          stand-in (power transmission towers at golden hour) used as both the
          mobile background and the video poster frame. It is not a photograph
          of the company's own work and must be swapped for real site
          photography before launch. */}
      {isDesktop ? (
        <motion.video
          className="absolute inset-0 w-full h-full object-cover"
          style={{ scale: videoScale }}
          src="/media/hero.mp4"
          poster="/media/hero-altyapi-placeholder.webp"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      ) : (
        <img
          className="absolute inset-0 w-full h-full object-cover object-center"
          src="/media/hero-altyapi-placeholder.webp"
          alt="Temsili görsel — enerji nakil hatları, gün batımı (yapay zekâ ile üretilmiş yer tutucu, saha fotoğrafı değildir)"
          aria-hidden="true"
        />
      )}
      {/* Readability scrim — tinted from --ink so it retones automatically per theme */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            // Scrim stops are contrast-derived, not aesthetic. Sampled against
            // the actual hero image (object-cover crop) at 390x844: with the
            // previous 88/35/15/45 the sub-copy measured 2.71 against the
            // brightest pixel behind it even at full white, and .btn-on-dark
            // sat at 4.45. These stops are the LIGHTEST set that clears AA for
            // every hero element (sub-copy 4.99, btn-on-dark 6.67, h1 5.56).
            // Re-measure before lightening — the sky in this image is bright.
            'linear-gradient(to top, color-mix(in srgb, var(--ink) 90%, transparent) 0%, color-mix(in srgb, var(--ink) 58%, transparent) 40%, color-mix(in srgb, var(--ink) 38%, transparent) 65%, color-mix(in srgb, var(--ink) 55%, transparent) 100%)',
        }}
      />

      {/* Content — bottom-left editorial block, plus a bottom-right glass tag
          card on large screens (lg:grid). On mobile the tag card stacks
          below the CTAs as a plain flex child.

          Vertical budget on mobile is tight: pt-24 (not pt-32 — the new
          floating navbar is shorter than the old full-width bar, so less
          top clearance is needed) and the CTA row's mt-7 (not mt-9) claw
          back ~40px so the tag card's own height plus the pb- reserved for
          the fixed mobile CTA bar (App.tsx, ~78.4px + safe-area) still
          fits inside min-h-svh at common 360-414px-wide/700-820px-tall
          devices without the tag card landing behind the bar at initial
          scroll position. Measured in-browser at 360x800: without this
          trim the tag card's bottom sat ~27px inside the bar; with it, it
          clears by >10px. lg: unaffected (original pt-32/mt-9/pb-14).

          On viewports <=700px tall (iPhone SE class) the top padding drops
          again to pt-14; combined with the reduced --text-h1 for the same
          media query (src/index.css), this is what keeps the tag card out
          from behind the fixed CTA bar at 375x667. */}
      <div
        className="relative flex-1 flex flex-col justify-end lg:grid lg:grid-cols-2 lg:justify-normal lg:content-end lg:items-end lg:gap-10 max-w-7xl mx-auto w-full px-5 lg:px-8 pt-24 [@media(max-height:700px)]:pt-14 lg:pt-32 pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-10 lg:pb-14"
      >
        <div>
          <motion.div custom={0.15} variants={fadeUp} initial="hidden" animate="visible">
            <span className="eyebrow eyebrow-on-dark">1994'ten beri güveninizle</span>
          </motion.div>

          <RevealHeading
            as="h1"
            eager
            delay={0.24}
            lines={['Hatları ve Şebekeleri', 'Güvenle Kuruyoruz']}
            className="font-display text-h1 font-black text-white max-w-4xl mt-5"
          />

          <motion.p
            custom={0.5}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-base lg:text-lg leading-relaxed mt-6 max-w-xl"
            // Full white, not 0.82 alpha: over this image the dimmed variant
            // measured 3.97 against the brightest backdrop pixel (needs 4.5).
            style={{ color: '#fff' }}
          >
            30 yılı aşkın deneyimle enerji iletim hatları, trafo merkezleri ve
            fiber optik/telekom şebeke altyapısını Türkiye'nin dört bir yanında
            zamanında ve eksiksiz hayata geçiriyoruz.
          </motion.p>

          <motion.div
            custom={0.62}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-3 mt-7 lg:mt-9"
          >
            <motion.button
              whileTap={tapFeedback}
              onClick={() => go('#projects')}
              className="group btn-primary w-full sm:w-auto"
              style={{ background: '#fff', color: 'var(--ink)', borderColor: '#fff' }}
            >
              Projelerimizi İnceleyin
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </motion.button>
            <motion.button whileTap={tapFeedback} onClick={() => go('#contact')} className="btn-on-dark w-full sm:w-auto">
              Ücretsiz Teklif Al
            </motion.button>
          </motion.div>
        </div>

        {/* Glass tag card — last item in the entrance ladder. Reuses the
            shared `cta` tier from useFadeVariants() (motion.ts) for its
            duration/easing/travel distance instead of inventing new
            values; only the delay is set here, as the CTA row's own
            existing 0.62s anchor plus one more STAGGER.loose step (the
            tier objects deliberately omit delay so callers can layer it
            via the transition prop, same pattern used by
            container/child stagger elsewhere on the site). */}
        <motion.div
          variants={fadeVariants.cta}
          initial="hidden"
          animate="visible"
          transition={{ delay: reduceMotion ? 0 : 0.62 + STAGGER.loose }}
          className="liquid-glass border border-white/20 px-6 py-3 rounded-xl w-fit mt-4 lg:mt-0 lg:justify-self-end"
        >
          <p className="text-lg md:text-xl lg:text-2xl font-light text-white">
            Enerji. Telekom. Şebeke.
          </p>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.button
        onClick={() => go('#process')}
        whileTap={tapFeedback}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduceMotion ? 0 : 1.4, duration: reduceMotion ? 0 : 0.8 }}
        className="absolute bottom-6 right-6 hidden lg:flex w-11 h-11 items-center justify-center cursor-pointer"
        style={{ border: '1px solid rgba(255,255,255,0.35)', color: '#fff' }}
        aria-label="Aşağı kaydır"
      >
        <motion.span
          animate={reduceMotion ? undefined : { y: [0, 4, 0] }}
          transition={reduceMotion ? undefined : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.button>
    </section>
  )
}
