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

  // The site video is a 478x850 phone clip of the makine parkı — at that width it
  // only holds up inside a portrait phone frame, so it plays on mobile only. On
  // desktop we show the sharp 1920px night-works photograph instead, which is the
  // one that survives being stretched across a wide viewport.
  // Seeded synchronously from the media query, not defaulted to false: with a
  // false default the mobile branch mounts for one frame on desktop too, and
  // the browser has already begun fetching the 1.1MB video by the time the
  // effect corrects it. Measured — the request shows up in the network log.
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches
  )
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-svh flex flex-col overflow-hidden" style={{ background: 'var(--ink)' }}>
      {/* Background: parallax site photograph on desktop, portrait yard clip on
          mobile. Both are the company's own material — no stock, no stand-ins. */}
      {isDesktop ? (
        <motion.img
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ scale: videoScale }}
          src="/media/hero.webp"
          alt=""
          aria-hidden="true"
        />
      ) : (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/media/hero-mobile.mp4"
          poster="/media/hero-mobile-poster.webp"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      )}
      {/* === READABILITY SCRIM ===
          Stops are contrast-derived, not aesthetic. They were measured by
          compositing the real image pixels under the real gradient alpha and
          scanning each element's bounding box for its worst-case (brightest)
          backdrop pixel — not eyeballed, and not assumed from the photo's
          average brightness, which is misleading here.

          Two scrims, because the two breakpoints have different problems.

          MOBILE: the copy runs full width over the yard video, so the scrim
          has to be uniform and it has to be heavy. The eyebrow is
          --accent-on-dark gold sitting on blown-out daylight sky, raw
          (255,250,236); gold needs alpha 0.73 there to clear AA where white
          would need only 0.58. That is why the gradient RISES toward the top
          rather than falling. Do not lighten these to "let the sky show"
          without first moving the hero eyebrow off gold.

          DESKTOP: the copy is confined to the left grid column, so darkening
          the full frame was overkill — it was flattening the machinery and
          barriers on the right, which is the half of the photograph actually
          worth showing. A single flat 64% wash was the price of protecting a
          streetlight highlight at raw (252,255,255) sitting behind the h1 on
          the LEFT. So the desktop scrim is split: a light vertical wash over
          the whole frame, plus a horizontal one that only loads the left
          column.

          Measured after the split (worst-case pixel per element box, image
          composited under both layers at 1272x853):
            alpha behind h1 0.703 (was a flat 0.64) — right third 0.316,
            so the machinery reads at roughly twice its previous value
            h1 6.29 · eyebrow 11.16 · sub-copy 8.50 · btn-on-dark 17.16
            · glass tag 15.88 — all clear AA, h1 by 2x its 3:1 large-text bar.

          Method, if either layer changes: replicate object-cover into the hero
          box, evaluate BOTH gradients per pixel and composite them
          multiplicatively (1 - product of inverses), blend over the image, then
          scan each element's bounding box for its brightest backdrop pixel and
          measure against the element's own colour. Sampling the average
          brightness instead will pass a hero that fails on one blown highlight. */}
      <div
        className="absolute inset-0 pointer-events-none lg:hidden"
        style={{
          background:
            'linear-gradient(to top, color-mix(in srgb, var(--ink) 86%, transparent) 0%, color-mix(in srgb, var(--ink) 70%, transparent) 30%, color-mix(in srgb, var(--ink) 64%, transparent) 55%, color-mix(in srgb, var(--ink) 74%, transparent) 72%, color-mix(in srgb, var(--ink) 82%, transparent) 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none hidden lg:block"
        style={{
          background: [
            'linear-gradient(to right, color-mix(in srgb, var(--ink) 62%, transparent) 0%, color-mix(in srgb, var(--ink) 54%, transparent) 42%, transparent 74%)',
            'linear-gradient(to top, color-mix(in srgb, var(--ink) 78%, transparent) 0%, color-mix(in srgb, var(--ink) 34%, transparent) 35%, color-mix(in srgb, var(--ink) 30%, transparent) 60%, color-mix(in srgb, var(--ink) 44%, transparent) 100%)',
          ].join(', '),
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
            <span className="eyebrow eyebrow-on-dark">1994'ten beri altyapı imalatı</span>
          </motion.div>

          <RevealHeading
            as="h1"
            eager
            delay={0.24}
            // Ölçüldü (1280x800, --text-h1 = 9vw = 115px, lg grid sütunu 584px):
            // sütun bu punto için dar, her satır kendi içinde tekrar sarıyor.
            // Bu iki satır toplam 3 görsel satır (422px) tutuyor — eski
            // "Hatları ve Şebekeleri / Güvenle Kuruyoruz" 4 satır/562px idi.
            // Daha uzun bir satır eklemeden önce burada yeniden ölç.
            lines={['Altyapıyı Güvenle', 'Kuruyoruz']}
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
            32 yıldır İzmir ve Ege bölgesinde OG/AG kablo kanal kazısı, kablo
            serimi, trafo temelleri, borulama ve üst yapı restorasyonu yapıyoruz.
            Taahhüt ettiğimiz imalatı, taahhüt ettiğimiz sürede eksiksiz bitiriyoruz.
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
            Kazı. Boru. Kablo.
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
