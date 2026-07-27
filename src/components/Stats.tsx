import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, animate, useTransform, useReducedMotion } from 'framer-motion'

const stats = [
  { value: 30, suffix: '+', label: 'Yıl Deneyim', desc: "1994'ten bu yana sektördeyiz" },
  { value: 500, suffix: '+', label: 'Tamamlanan Proje', desc: 'Her biri bir başarı hikayesi' },
  { value: 50, suffix: '+', label: 'Aktif Şantiye', desc: "Türkiye'nin dört bir yanında" },
  { value: 10000, suffix: '+', label: 'Mutlu Aile', desc: 'Hayallerini gerçeğe dönüştürdük' },
]

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const prefersReduced = useReducedMotion()
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) =>
    target >= 1000
      ? (Math.round(v / 100) * 100).toLocaleString('tr-TR')
      : Math.round(v).toString()
  )

  useEffect(() => {
    if (isInView) {
      if (prefersReduced) {
        count.set(target)
        return
      }
      const controls = animate(count, target, { duration: 2.2, ease: [0, 0.5, 1, 1] })
      return controls.stop
    }
  }, [isInView, count, target, prefersReduced])

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="relative py-20 lg:py-28" style={{ background: 'var(--ink)' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 lg:mb-16"
        >
          <span className="eyebrow eyebrow-on-dark">Rakamlarla Güvenay</span>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: 'easeOut' }}
              className="py-6 lg:py-2 lg:px-8 first:pl-0 border-t lg:border-t-0 lg:border-l first:border-0"
              style={{ borderColor: 'var(--border-on-dark)' }}
            >
              <div className="font-display text-5xl lg:text-6xl font-black mb-3 text-white">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-display text-sm lg:text-base font-bold uppercase tracking-[0.14em]" style={{ color: '#E8B08A' }}>
                {stat.label}
              </div>
              <div className="text-sm mt-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
