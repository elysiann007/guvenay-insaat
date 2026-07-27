import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowDown } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.12, duration: 0.8, ease: 'easeOut' as const },
  }),
}

const stats = [
  { n: '30+', label: 'Yıl Deneyim' },
  { n: '500+', label: 'Tamamlanan Proje' },
  { n: '50+', label: 'Aktif Şantiye' },
  { n: '10K+', label: 'Mutlu Aile' },
]

export default function Hero() {
  const go = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
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
      {/* Background: sharp poster image on mobile, parallax video on desktop */}
      {isDesktop ? (
        <motion.video
          className="absolute inset-0 w-full h-full object-cover"
          style={{ scale: videoScale }}
          src="/media/hero.mp4"
          poster="/media/hero-poster.webp"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      ) : (
        <img
          className="absolute inset-0 w-full h-full object-cover object-center"
          src="/media/hero-poster.webp"
          alt=""
          aria-hidden="true"
        />
      )}
      {/* Readability scrim */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(22,21,18,0.88) 0%, rgba(22,21,18,0.35) 40%, rgba(22,21,18,0.15) 65%, rgba(22,21,18,0.45) 100%)',
        }}
      />

      {/* Content — bottom-left editorial block */}
      <div className="relative flex-1 flex flex-col justify-end max-w-7xl mx-auto w-full px-5 lg:px-8 pt-32 pb-10 lg:pb-14">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <span className="eyebrow eyebrow-on-dark">1994'ten beri güveninizle</span>
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-display text-5xl sm:text-7xl lg:text-[6.5rem] font-black leading-[0.98] tracking-tight mt-5 text-white max-w-4xl"
        >
          Geleceği
          <br />
          İnşa Ediyoruz
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-base lg:text-lg leading-relaxed mt-6 max-w-xl"
          style={{ color: 'rgba(255,255,255,0.82)' }}
        >
          30 yılı aşkın deneyimle Türkiye'nin her köşesinde konut, ticari ve
          endüstriyel projeleri zamanında ve eksiksiz teslim ediyoruz.
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-3 mt-9"
        >
          <button
            onClick={() => go('#projects')}
            className="btn-primary w-full sm:w-auto"
            style={{ background: '#fff', color: 'var(--ink)', borderColor: '#fff' }}
          >
            Projelerimizi İnceleyin
            <ArrowRight size={16} />
          </button>
          <button onClick={() => go('#contact')} className="btn-on-dark w-full sm:w-auto">
            Ücretsiz Teklif Al
          </button>
        </motion.div>

        {/* Stats strip along the bottom edge */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 mt-14 pt-7"
          style={{ borderTop: '1px solid rgba(255,255,255,0.22)' }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="py-2 lg:py-0 lg:px-6 first:pl-0"
              style={{ borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.14)' : 'none' }}
            >
              <div className="font-display text-3xl lg:text-4xl font-extrabold text-white">{s.n}</div>
              <div className="text-[11px] uppercase tracking-[0.18em] font-semibold mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.button
        onClick={() => go('#process')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
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
