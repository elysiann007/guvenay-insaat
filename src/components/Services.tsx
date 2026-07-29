import { motion } from 'framer-motion'
import { Zap, TowerControl, Cable, Network, RadioTower, ClipboardList, ArrowRight } from 'lucide-react'
import RevealHeading from './RevealHeading'
import { useFadeVariants, VIEWPORT_ONCE } from '../lib/motion'

const services = [
  {
    icon: Zap,
    title: 'Enerji İletim Hatları',
    desc: 'Yüksek gerilim direği ve iletim hattı projelerini etütten devreye almaya kadar uçtan uca yürütüyoruz.',
  },
  {
    icon: TowerControl,
    title: 'Trafo Merkezleri',
    desc: 'Dağıtım ve indirici trafo merkezlerinin inşasını, elektromekanik montajını ve devreye alma testlerini üstleniyoruz.',
  },
  {
    icon: Cable,
    title: 'Fiber Optik Altyapı',
    desc: 'Yeraltı ve hava hattı fiber optik kablo döşeme, ek yapımı ve saha ölçümlerinde uzman ekiplerle hizmet veriyoruz.',
  },
  {
    icon: Network,
    title: 'Telekom Şebeke Kurulumu',
    desc: 'Baz istasyonu bağlantıları ve şebeke düğüm noktalarının kurulumunu planlıyor, sahada uyguluyoruz.',
  },
  {
    icon: RadioTower,
    title: 'Saha Bakımı & Arıza Müdahalesi',
    desc: 'Mevcut enerji ve telekom hatlarında periyodik bakım, arıza tespiti ve onarım hizmeti sağlıyoruz.',
  },
  {
    icon: ClipboardList,
    title: 'Proje Yönetimi',
    desc: 'Etütten devreye almaya kadar tüm süreçleri planlama, saha koordinasyonu ve raporlama ile yönetiyoruz.',
  },
]

export default function Services() {
  const fade = useFadeVariants()
  return (
    <section id="services" className="relative py-20 lg:py-32" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={fade.stagger}
          className="max-w-2xl mb-14 lg:mb-20"
        >
          <motion.div variants={fade.eyebrow}>
            <span className="eyebrow">Hizmetlerimiz</span>
          </motion.div>
          <RevealHeading
            as="h2"
            lines={['Altyapıda Uzmanlık Alanlarımız']}
            className="font-display text-4xl lg:text-5xl font-black tracking-tight mt-5 leading-[1.05]"
            style={{ color: 'var(--text)' }}
          />
          <motion.p variants={fade.body} className="text-base lg:text-lg mt-5" style={{ color: 'var(--text-soft)' }}>
            Enerji iletimi ve telekom şebekesinde uzmanlaşmış ekibimizle sahada çözüm üretiyoruz.
          </motion.p>
        </motion.div>

        {/* Ruled grid — hairline-divided cells */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fade.stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l"
          style={{ borderColor: 'var(--border)' }}
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={fade.item}
              className="group relative z-0 p-7 lg:p-9 border-b border-r flex flex-col transition-all duration-200 hover:z-10 hover:bg-surface hover:-translate-y-0.5 hover:shadow-[0_28px_56px_-32px_color-mix(in_srgb,var(--ink)_28%,transparent)] focus-within:shadow-[0_28px_56px_-32px_color-mix(in_srgb,var(--ink)_28%,transparent)]"
              style={{ borderColor: 'var(--border)' }}
            >
              {/* Accent line grows on hover */}
              <span
                className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                style={{ background: 'var(--accent)' }}
              />
              <div
                className="w-12 h-12 flex items-center justify-center mb-6 transition-transform duration-200 group-hover:scale-110"
                style={{ background: 'var(--accent-soft)' }}
              >
                <s.icon size={22} strokeWidth={1.5} style={{ color: 'var(--accent)' }} />
              </div>
              <h3 className="font-display text-lg lg:text-xl font-bold mb-2.5" style={{ color: 'var(--text)' }}>
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-soft)' }}>
                {s.desc}
              </p>
              {/* --accent is now the single verified role for small text on
                  --bg/--surface (index.css §ACCENT) — no separate "strong"
                  variant needed here. */}
              <div className="flex items-center gap-1.5 text-sm font-semibold mt-6 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" style={{ color: 'var(--accent)' }}>
                Detaylı Bilgi
                <ArrowRight size={14} aria-hidden="true" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
