import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    role: 'Güvenay Residence Sahibi',
    text: 'Güvenay İnşaat, hayalimizin ötesinde bir ev teslim etti. Malzeme kalitesinden işçiliğe kadar her detay kusursuzdı. 3 yıl önce taşındık, hiçbir sorunla karşılaşmadık.',
    initials: 'AY',
  },
  {
    id: 2,
    name: 'Fatma Kaya',
    role: 'Çankaya Ofis Kompleksi, Genel Müdür',
    text: "20 yıldır farklı inşaat firmalarıyla çalıştım. Güvenay'ın proje yönetimi anlayışı ve zamanında teslim hassasiyeti rakipsiz. Bir daha onlarla çalışmaktan mutluluk duyarım.",
    initials: 'FK',
  },
  {
    id: 3,
    name: 'Mehmet Demir',
    role: 'Bursa Sanayi Tesisi Sahibi',
    text: 'Endüstriyel tesisimizi planladığından 2 ay erken, bütçe dahilinde tamamladılar. Mühendis ekibi her adımda yanımızdaydı. Kesinlikle tavsiye ediyorum.',
    initials: 'MD',
  },
  {
    id: 4,
    name: 'Selin Arslan',
    role: 'İzmir AVM, Operasyon Direktörü',
    text: "Alışveriş merkezimiz, Güvenay İnşaat sayesinde İzmir'in sembol yapılarından biri oldu. Mimari detaylara gösterdikleri özen ve yaratıcı çözümleri etkileyiciydi.",
    initials: 'SA',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent((c) => (c + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const go = (dir: number) => {
    setDirection(dir)
    setCurrent((c) => (c + dir + testimonials.length) % testimonials.length)
  }

  const variants = {
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 lg:mb-16"
        >
          <span className="eyebrow">Müşteri Yorumları</span>
          <h2 className="font-display text-4xl lg:text-5xl font-black tracking-tight mt-5" style={{ color: 'var(--text)' }}>
            Müşterilerimiz Ne Diyor?
          </h2>
        </motion.div>

        {/* Large quote — minimal, no card */}
        <div className="relative min-h-[280px] lg:min-h-[240px] flex flex-col">
          <span className="font-display text-7xl lg:text-8xl font-black leading-none select-none absolute -top-6 -left-1 lg:-left-10" style={{ color: 'var(--accent-soft)' }} aria-hidden="true">
            "
          </span>

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

        {/* Controls */}
        <div className="flex items-center justify-between mt-9">
          <div className="flex gap-2.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                className="cursor-pointer transition-all duration-300"
                style={{
                  width: i === current ? 28 : 12,
                  height: 2,
                  background: i === current ? 'var(--accent)' : 'var(--border-strong)',
                }}
                aria-label={`Yorum ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => go(-1)}
              className="w-11 h-11 flex items-center justify-center cursor-pointer transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              style={{ border: '1px solid var(--border-strong)', color: 'var(--text)' }}
              aria-label="Önceki yorum"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => go(1)}
              className="w-11 h-11 flex items-center justify-center cursor-pointer transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              style={{ border: '1px solid var(--border-strong)', color: 'var(--text)' }}
              aria-label="Sonraki yorum"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
