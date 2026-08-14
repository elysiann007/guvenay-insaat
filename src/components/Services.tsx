import { motion } from 'framer-motion'
import { Cable, TowerControl, Lightbulb, Waves, Layers, Wrench } from 'lucide-react'
import RevealHeading from './RevealHeading'
import { useFadeVariants, VIEWPORT_ONCE } from '../lib/motion'

const services = [
  {
    icon: Cable,
    title: 'Kablo Kanal Kazısı & Kablo Serimi',
    desc: 'OG ve AG kabloları için kanal kazısı, kanalın borulanması, kabloların çekilmesi ve eklerinin yapılması. Galeri içi çekimler dahil.',
  },
  {
    icon: TowerControl,
    title: 'Trafo Temeli & Trafo Binası',
    desc: 'Dağıtım ve indirici merkezler için trafo temeli imalatı, trafo binası inşaatı ve saha çevresinin tel fensle çevrilmesi.',
  },
  {
    icon: Lightbulb,
    title: 'Aydınlatma Direkleri',
    desc: 'Yol ve refüj aydınlatmalarında direk temeli yapımı, direklerin dikimi, kabloların çekilip irtibatlandırılması.',
  },
  {
    icon: Waves,
    title: 'Boru, Drenaj & Pissu Hatları',
    desc: 'Atık su ve yağmur suyu hatlarının açılması ve deplasesi, betonarme rögar imalatı, PVC ve HDPE boruların alın kaynaklı montajı.',
  },
  {
    icon: Layers,
    title: 'Üst Yapı Restorasyonu',
    desc: 'Kanal kapatıldıktan sonra beton, asfalt ve parke kaplamanın eski haline getirilmesi; kaldırım ve bordür imalatı.',
  },
  {
    icon: Wrench,
    title: 'Arıza Müdahalesi & Bakım',
    desc: 'Arızalı kabloların tespiti, kanal kazısı ve yeni kablo serimi. TEDAŞ metropol alanında 1996’dan bu yana kesintisiz sürüyor.',
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
            lines={['Yaptığımız İmalatlar']}
            className="font-display text-4xl lg:text-5xl font-black tracking-tight mt-5 leading-[1.05]"
            style={{ color: 'var(--text)' }}
          />
          <motion.p variants={fade.body} className="text-base lg:text-lg mt-5" style={{ color: 'var(--text-soft)' }}>
            Kazıdan üst kaplamaya kadar işin tamamını kendi ekibimiz ve kendi makine parkımızla yürütüyoruz.
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
