import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    role: 'Güvenay Residence Sahibi',
    text: 'Güvenay İnşaat, hayalimizin ötesinde bir ev teslim etti. Malzeme kalitesinden işçiliğe kadar her detay kusursuzdı. 3 yıl önce taşındık, hiçbir sorunla karşılaşmadık.',
    rating: 5,
    initials: 'AY',
    color: '#4A90D9',
  },
  {
    id: 2,
    name: 'Fatma Kaya',
    role: 'Çankaya Ofis Kompleksi, Genel Müdür',
    text: '20 yıldır farklı inşaat firmalarıyla çalıştım. Güvenay\'ın proje yönetimi anlayışı ve zamanında teslim hassasiyeti rakipsiz. Bir daha onlarla çalışmaktan mutluluk duyarım.',
    rating: 5,
    initials: 'FK',
    color: '#C8A96E',
  },
  {
    id: 3,
    name: 'Mehmet Demir',
    role: 'Bursa Sanayi Tesisi Sahibi',
    text: 'Endüstriyel tesisimizi planladığından 2 ay erken, bütçe dahilinde tamamladılar. Mühendis ekibi her adımda yanımızdaydı. Kesinlikle tavsiye ediyorum.',
    rating: 5,
    initials: 'MD',
    color: '#6BCF8F',
  },
  {
    id: 4,
    name: 'Selin Arslan',
    role: 'İzmir AVM, Operasyon Direktörü',
    text: 'Alışveriş merkezimiz, Güvenay İnşaat sayesinde İzmir\'in sembol yapılarından biri oldu. Mimari detaylara gösterdikleri özen ve yaratıcı çözümleri etkileyiciydi.',
    rating: 5,
    initials: 'SA',
    color: '#A855F7',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent((c) => (c + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const go = (dir: number) => {
    setDirection(dir)
    setCurrent((c) => (c + dir + testimonials.length) % testimonials.length)
  }

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 60, scale: 0.96 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (d: number) => ({ opacity: 0, x: d * -60, scale: 0.96 }),
  }

  return (
    <section
      className="relative py-24 lg:py-40 overflow-hidden"
      style={{ background: 'var(--dark)' }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(200,169,110,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: 'var(--gold)' }} />
            <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: 'var(--gold)' }}>
              Müşteri Yorumları
            </span>
            <div className="h-px w-10" style={{ background: 'var(--gold)' }} />
          </div>
          <h2
            className="text-4xl lg:text-5xl font-black"
            style={{ color: 'var(--warm-white)', fontFamily: 'Montserrat, sans-serif' }}
          >
            Müşterilerimiz <span className="gradient-text">Ne Diyor?</span>
          </h2>
        </motion.div>

        {/* Testimonial card */}
        <div className="relative min-h-[300px] flex items-center justify-center">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute w-full"
            >
              <div
                className="relative p-8 lg:p-12"
                style={{
                  background: 'var(--dark-3)',
                  border: '1px solid rgba(200,169,110,0.1)',
                  borderRadius: '4px',
                }}
              >
                {/* Quote icon */}
                <div
                  className="absolute top-8 right-8 opacity-10"
                  style={{ color: testimonials[current].color }}
                >
                  <Quote size={60} />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} size={16} fill={testimonials[current].color} style={{ color: testimonials[current].color }} />
                  ))}
                </div>

                {/* Text */}
                <blockquote
                  className="text-lg lg:text-xl leading-relaxed mb-8 relative z-10"
                  style={{ color: 'var(--warm-white)' }}
                >
                  "{testimonials[current].text}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0"
                    style={{
                      background: `${testimonials[current].color}20`,
                      color: testimonials[current].color,
                      border: `1px solid ${testimonials[current].color}30`,
                    }}
                  >
                    {testimonials[current].initials}
                  </div>
                  <div>
                    <div className="font-bold text-sm" style={{ color: 'var(--warm-white)' }}>
                      {testimonials[current].name}
                    </div>
                    <div className="text-xs" style={{ color: 'rgba(245,240,232,0.5)' }}>
                      {testimonials[current].role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={() => go(-1)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{
              border: '1px solid rgba(200,169,110,0.3)',
              color: 'var(--gold)',
            }}
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? 24 : 8,
                  height: 8,
                  background: i === current ? 'var(--gold)' : 'rgba(200,169,110,0.2)',
                }}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{
              border: '1px solid rgba(200,169,110,0.3)',
              color: 'var(--gold)',
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
