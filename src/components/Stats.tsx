import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, animate, useTransform, useReducedMotion } from 'framer-motion'
import { Award, Building2, MapPin, Users } from 'lucide-react'

const stats = [
  { value: 30, suffix: '+', label: 'Yıl Deneyim', desc: "1994'ten bu yana sektördeyiz", icon: Award },
  { value: 500, suffix: '+', label: 'Tamamlanan Proje', desc: 'Her biri bir başarı hikayesi', icon: Building2 },
  { value: 50, suffix: '+', label: 'Aktif Şantiye', desc: "Türkiye'nin dört bir yanında", icon: MapPin },
  { value: 10000, suffix: '+', label: 'Mutlu Aile', desc: 'Hayallerini gerçeğe dönüştürdük', icon: Users },
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
    <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="relative py-24 lg:py-32" style={{ background: 'var(--ink)' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 lg:mb-20 max-w-2xl"
        >
          <span className="eyebrow eyebrow-on-dark">Rakamlarla Güvenay</span>
          <h2 className="font-display text-3xl lg:text-4xl font-black tracking-tight mt-5 leading-[1.05] text-white">
            30 Yıldır Güvenle İnşa Ediyoruz
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.04, duration: 0.4, ease: 'easeOut' }}
              className="py-8 lg:py-2 lg:px-8 first:pl-0 border-t lg:border-t-0 lg:border-l first:border-0"
              style={{ borderColor: 'var(--border-on-dark)' }}
            >
              <stat.icon size={22} strokeWidth={1.5} className="mb-4" style={{ color: 'var(--accent)' }} aria-hidden="true" />
              <div className="font-display text-6xl lg:text-7xl font-black mb-3 text-white">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              {/* Label sits on the always-dark --ink band (both themes render it
                  dark), so it uses the same fixed light-orange the design system
                  already reserves for that context — see .eyebrow-on-dark in
                  index.css. --accent-strong would swap to a *darker* orange in
                  light mode and fail contrast here, since --ink stays dark
                  regardless of the active theme. */}
              <div className="font-display text-sm lg:text-base font-bold uppercase tracking-[0.14em]" style={{ color: '#FB923C' }}>
                {stat.label}
              </div>
              <div className="text-sm mt-1.5" style={{ color: 'rgba(255,255,255,0.55)' }}>{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
