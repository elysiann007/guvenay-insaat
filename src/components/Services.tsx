import { motion } from 'framer-motion'
import { Building2, Store, Factory, RefreshCcw, Layers, ClipboardList, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Building2,
    title: 'Konut Projeleri',
    desc: 'Lüks rezidanslardan uygun fiyatlı konut projelerine kadar her ölçekte yaşam alanı inşa ediyoruz.',
  },
  {
    icon: Store,
    title: 'Ticari Yapılar',
    desc: "AVM'ler, ofis binaları, otel ve ticari kompleksler için mimari mükemmellik sunuyoruz.",
  },
  {
    icon: Factory,
    title: 'Endüstriyel Tesisler',
    desc: 'Fabrika, depo ve üretim tesisleri gibi ağır sanayi yapılarını eksiksiz teslim ediyoruz.',
  },
  {
    icon: RefreshCcw,
    title: 'Restorasyon & Yenileme',
    desc: 'Tarihi yapıların korunarak yenilenmesi ve mevcut yapıların modernize edilmesinde uzmanız.',
  },
  {
    icon: Layers,
    title: 'Altyapı Çalışmaları',
    desc: 'Yol, köprü, tünel ve su yönetimi gibi kritik altyapı projelerini güvenle tamamlıyoruz.',
  },
  {
    icon: ClipboardList,
    title: 'Proje Yönetimi',
    desc: 'Başlangıçtan teslimata kadar tüm süreçleri planlama, bütçeleme ve koordinasyonu üstleniyoruz.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }

export default function Services() {
  return (
    <section id="services" className="relative py-20 lg:py-32" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="max-w-2xl mb-14 lg:mb-20"
        >
          <motion.div variants={fadeUp}>
            <span className="eyebrow">Hizmetlerimiz</span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl lg:text-5xl font-black tracking-tight mt-5 leading-[1.05]"
            style={{ color: 'var(--text)' }}
          >
            Ne İnşa Ediyoruz?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-base lg:text-lg mt-5" style={{ color: 'var(--text-soft)' }}>
            Sektörün her alanında uzmanlaşmış ekibimizle çözüm üretiyoruz.
          </motion.p>
        </motion.div>

        {/* Ruled grid — hairline-divided cells */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l"
          style={{ borderColor: 'var(--border)' }}
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={fadeUp}
              className="group relative z-0 p-7 lg:p-9 border-b border-r flex flex-col transition-all duration-300 hover:z-10 hover:bg-surface hover:-translate-y-0.5 hover:shadow-[0_28px_56px_-32px_color-mix(in_srgb,var(--ink)_28%,transparent)] focus-within:shadow-[0_28px_56px_-32px_color-mix(in_srgb,var(--ink)_28%,transparent)]"
              style={{ borderColor: 'var(--border)' }}
            >
              {/* Accent line grows on hover */}
              <span
                className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                style={{ background: 'var(--accent)' }}
              />
              <div
                className="w-12 h-12 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
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
              {/* Small text in accent must use --accent-strong, not --accent
                  (§0) — same trap flagged for Process.tsx in the redesign plan. */}
              <div className="flex items-center gap-1.5 text-sm font-semibold mt-6 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" style={{ color: 'var(--accent-strong)' }}>
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
