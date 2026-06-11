import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, animate, useTransform } from 'framer-motion'

const stats = [
  { value: 30, suffix: '+', label: 'Yıl Deneyim', desc: '1994\'ten bu yana sektördeyiz' },
  { value: 500, suffix: '+', label: 'Tamamlanan Proje', desc: 'Her biri bir başarı hikayesi' },
  { value: 50, suffix: '+', label: 'Aktif Şantiye', desc: 'Türkiye\'nin dört bir yanında' },
  { value: 10000, suffix: '+', label: 'Mutlu Aile', desc: 'Hayallerini gerçeğe dönüştürdük' },
]

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) =>
    target >= 1000
      ? (Math.round(v / 100) * 100).toLocaleString('tr-TR')
      : Math.round(v).toString()
  )

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, {
        duration: 2.2,
        ease: [0, 0.5, 1, 1],
      })
      return controls.stop
    }
  }, [isInView, count, target])

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: 'var(--dark-2)' }}
    >
      {/* Gold gradient top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }}
      />

      {/* Background decoration */}
      <div className="absolute inset-0 hero-grid opacity-30" />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(200,169,110,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: 'var(--gold)' }} />
            <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: 'var(--gold)' }}>
              Rakamlarla Güvenay
            </span>
            <div className="h-px w-10" style={{ background: 'var(--gold)' }} />
          </div>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.12, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center relative group"
            >
              {/* Separator */}
              {i < stats.length - 1 && (
                <div
                  className="absolute right-0 top-1/2 -translate-y-1/2 h-16 w-px hidden lg:block"
                  style={{ background: 'rgba(200,169,110,0.1)' }}
                />
              )}

              {/* Number */}
              <div
                className="text-5xl lg:text-6xl font-black mb-2 gradient-text"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>

              {/* Label */}
              <div
                className="text-sm font-bold tracking-wider uppercase mb-1"
                style={{ color: 'var(--warm-white)' }}
              >
                {stat.label}
              </div>

              {/* Desc */}
              <div className="text-xs" style={{ color: 'rgba(245,240,232,0.4)' }}>
                {stat.desc}
              </div>

              {/* Hover bar */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-12 transition-all duration-500"
                style={{ background: 'var(--gold)' }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Gold gradient bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }}
      />
    </section>
  )
}
