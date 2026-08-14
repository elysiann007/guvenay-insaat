import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, animate, useTransform, useReducedMotion } from 'framer-motion'
import { Award, ClipboardList, Building2, Truck } from 'lucide-react'
import RevealHeading from './RevealHeading'
import { DURATION, EASE_OUT_EXPO, useFadeVariants, VIEWPORT_ONCE } from '../lib/motion'

// Dördü de firmanın kendi referans dosyasından sayılabilir rakamlar —
// tahmin ya da yuvarlama değil.
const stats = [
  { value: 32, suffix: '+', label: 'Yıl Deneyim', desc: "1994'ten bu yana altyapı imalatı", icon: Award },
  { value: 200, suffix: '+', label: 'Tamamlanan İş', desc: '1995–2026 referans listemizden', icon: ClipboardList },
  { value: 30, suffix: '+', label: 'Kurumsal Müşteri', desc: 'TEDAŞ, ESBAŞ ve sanayi kuruluşları', icon: Building2 },
  { value: 15, suffix: '+', label: 'İş Makinesi', desc: 'Ekskavatör, kamyon ve nakliye parkı', icon: Truck },
]

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const prefersReduced = useReducedMotion()
  const count = useMotionValue(0)
  // Coarse rounding (nearest 100) only smooths digits *during* the
  // animation so they don't jitter every frame. Once the value has
  // actually reached the target, render the exact target — otherwise
  // e.g. target 1250 would land on Math.round(1250/100)*100 = 1300.
  const rounded = useTransform(count, (v) =>
    v >= target
      ? target.toLocaleString('tr-TR')
      : target >= 1000
        ? (Math.round(v / 100) * 100).toLocaleString('tr-TR')
        : Math.round(v).toLocaleString('tr-TR')
  )

  useEffect(() => {
    if (isInView) {
      if (prefersReduced) {
        count.set(target)
        return
      }
      const controls = animate(count, target, { duration: 2.2, ease: EASE_OUT_EXPO })
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
  const fade = useFadeVariants()
  const reduceMotion = useReducedMotion()
  return (
    <section className="relative py-24 lg:py-32" style={{ background: 'var(--ink)' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: reduceMotion ? 0 : DURATION.base, ease: EASE_OUT_EXPO }}
          className="mb-14 lg:mb-20 max-w-2xl"
        >
          <span className="eyebrow eyebrow-on-dark">Rakamlarla Güvenay</span>
          <RevealHeading
            as="h2"
            lines={['32 Yıldır Sahada Altyapı Kuruyoruz']}
            className="font-display text-3xl lg:text-4xl font-black tracking-tight mt-5 leading-[1.05] text-white"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
          variants={fade.stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fade.item}
              className="py-8 lg:py-2 lg:px-8 first:pl-0 border-t lg:border-t-0 lg:border-l first:border-0"
              style={{ borderColor: 'var(--border-on-dark)' }}
            >
              {/* This band is always --ink — plain --accent measures 2.06 here
                  (index.css §ACCENT), so the icon uses the verified on-dark gold. */}
              <stat.icon size={22} strokeWidth={1.5} className="mb-4" style={{ color: 'var(--accent-on-dark)' }} aria-hidden="true" />
              <div className="font-display text-6xl lg:text-7xl font-black mb-3 text-white">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              {/* Label sits on the always-dark --ink band, so it uses
                  --accent-on-dark (navy 6.20 / ink 10.69) rather than
                  --accent, which is forbidden on this band. */}
              <div className="font-display text-sm lg:text-base font-bold uppercase tracking-[0.14em]" style={{ color: 'var(--accent-on-dark)' }}>
                {stat.label}
              </div>
              <div className="text-sm mt-1.5" style={{ color: 'rgba(255,255,255,0.55)' }}>{stat.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
