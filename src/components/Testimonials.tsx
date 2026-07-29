import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import RevealHeading from './RevealHeading'
import { DURATION, EASE_OUT_EXPO, VIEWPORT_ONCE, useTapFeedback } from '../lib/motion'

// İsimler ve unvanlar demo içeriktir; kurum adları kasıtlı olarak jenerik
// tutulmuştur (ör. "bir dağıtım şirketi") — gerçek kurum/işletmeci adı
// (TEİAŞ, BOTAŞ, Türk Telekom vb.) kullanılmaz (ALTYAPI-PLAN.md §3).
const testimonials = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    role: 'Bölgesel Elektrik Dağıtım Şirketi, Şebeke Operasyon Müdürü',
    text: 'Güvenay İnşaat, iletim hattı projemizi planlanandan önce ve saha güvenliğinden ödün vermeden tamamladı. Mühendislik ekibiyle iletişim baştan sona net ve şeffaftı.',
    initials: 'AY',
  },
  {
    id: 2,
    name: 'Fatma Kaya',
    role: 'Bir Telekom Altyapı İşletmecisi, Saha Operasyonları Direktörü',
    text: "Fiber optik döşeme sürecinde Güvenay'ın saha koordinasyonu ve zamanında teslim hassasiyeti rakipsizdi. Bir sonraki şebeke genişletme projemizde yine birlikte çalışacağız.",
    initials: 'FK',
  },
  {
    id: 3,
    name: 'Mehmet Demir',
    role: 'Kamu Kurumu, Altyapı Saha Sorumlusu',
    text: 'Trafo merkezi projemizi planlanandan iki hafta erken, bütçe dahilinde devreye aldılar. Mühendis ekibi her testte sahadaydı. Kesinlikle tavsiye ediyorum.',
    initials: 'MD',
  },
  {
    id: 4,
    name: 'Selin Arslan',
    role: 'Bölgesel İnternet Servis Sağlayıcısı, Proje Yöneticisi',
    text: 'Şebeke kurulum projemizde Güvenay İnşaat ekibinin saha disiplini ve problem çözme yaklaşımı işimizi büyük ölçüde kolaylaştırdı.',
    initials: 'SA',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const tapFeedback = useTapFeedback()
  const reduceMotion = useReducedMotion()

  // Restart the auto-advance timer from whatever slide is currently shown,
  // so a manual next/prev/dot click doesn't get overridden by a tick that
  // was already in flight for the previous slide. A setTimeout keyed on
  // `current` (rather than one long-lived setInterval) means any change to
  // `current` — from any cause — resets the 6s countdown. Reduced-motion
  // users still get auto-advance (unchanged from prior behavior); it's
  // already harmless there because the `variants` below swap the slide
  // transition for an instant crossfade instead of a translateX slide.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDirection(1)
      setCurrent((c) => (c + 1) % testimonials.length)
    }, 6000)
    return () => clearTimeout(timer)
  }, [current])

  const go = (dir: number) => {
    setDirection(dir)
    setCurrent((c) => (c + dir + testimonials.length) % testimonials.length)
  }

  // Under reduced motion, drop the horizontal slide entirely (translateX is
  // exactly the kind of motion prefers-reduced-motion exists to remove) and
  // just crossfade instantly — never a moving carousel.
  const variants = reduceMotion
    ? {
        enter: { opacity: 1, x: 0 },
        center: { opacity: 1, x: 0 },
        exit: { opacity: 1, x: 0 },
      }
    : {
        enter: (d: number) => ({ opacity: 0, x: d * 40 }),
        center: { opacity: 1, x: 0 },
        exit: (d: number) => ({ opacity: 0, x: d * -40 }),
      }

  const t = testimonials[current]

  return (
    <section className="relative py-20 lg:py-32" style={{ background: 'var(--bg)' }}>
      <div className="max-w-4xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: reduceMotion ? 0 : DURATION.slower, ease: EASE_OUT_EXPO }}
          className="mb-12 lg:mb-16"
        >
          <span className="eyebrow">Müşteri Yorumları</span>
          <RevealHeading
            as="h2"
            lines={['Müşterilerimiz Ne Diyor?']}
            className="font-display text-4xl lg:text-5xl font-black tracking-tight mt-5"
            style={{ color: 'var(--text)' }}
          />
        </motion.div>

        {/* Large quote — minimal, no card */}
        <div className="relative min-h-[280px] lg:min-h-[240px] flex flex-col">
          <span className="font-display text-7xl lg:text-8xl font-black leading-none select-none absolute -top-6 -left-1 lg:-left-10" style={{ color: 'var(--accent-soft)' }} aria-hidden="true">
            "
          </span>

          {/* Slides animate x: ±40px. Without a clip here they push the document
              20px past a 375px viewport, which also stretches the fixed navbar.
              Clipping on this wrapper (not the parent) keeps the decorative
              quote mark's negative offsets from being cut. */}
          <div className="flex flex-col flex-1 overflow-x-clip">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="flex flex-col flex-1"
              >
                <blockquote className="font-display text-xl lg:text-3xl leading-relaxed lg:leading-snug font-medium flex-1" style={{ color: 'var(--text)' }}>
                  {t.text}
                </blockquote>

                <div className="flex items-center gap-4 mt-8 pt-6 hairline-top">
                  <div
                    className="w-12 h-12 flex items-center justify-center text-sm font-extrabold shrink-0"
                    style={{ background: 'var(--ink)', color: '#fff' }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-bold text-sm" style={{ color: 'var(--text)' }}>{t.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--text-dim)' }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-9">
          <div className="flex">
            {testimonials.map((_, i) => (
              <motion.button
                key={i}
                whileTap={tapFeedback}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                className="min-w-11 min-h-11 flex items-center justify-center cursor-pointer"
                aria-label={`Yorum ${i + 1}`}
                aria-pressed={i === current}
              >
                {/* Fixed-width track; only `transform` (scaleX) animates so
                    this never triggers layout, unlike animating `width`. */}
                <span
                  aria-hidden="true"
                  className="block origin-left transition-[transform,background-color] duration-200"
                  style={{
                    width: 28,
                    height: 2,
                    transform: `scaleX(${i === current ? 1 : 12 / 28})`,
                    background: i === current ? 'var(--accent)' : 'var(--border-strong)',
                  }}
                />
              </motion.button>
            ))}
          </div>

          <div className="flex gap-2">
            <motion.button
              whileTap={tapFeedback}
              onClick={() => go(-1)}
              className="w-11 h-11 flex items-center justify-center cursor-pointer transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              style={{ border: '1px solid var(--border-strong)', color: 'var(--text)' }}
              aria-label="Önceki yorum"
            >
              <ChevronLeft size={18} />
            </motion.button>
            <motion.button
              whileTap={tapFeedback}
              onClick={() => go(1)}
              className="w-11 h-11 flex items-center justify-center cursor-pointer transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              style={{ border: '1px solid var(--border-strong)', color: 'var(--text)' }}
              aria-label="Sonraki yorum"
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
