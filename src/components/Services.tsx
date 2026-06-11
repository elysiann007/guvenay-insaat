import { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { Building2, Store, Factory, RefreshCcw, Layers, ClipboardList } from 'lucide-react'

const services = [
  {
    icon: Building2,
    title: 'Konut Projeleri',
    desc: 'Lüks rezidanslardan uygun fiyatlı konut projelerine kadar her ölçekte yaşam alanı inşa ediyoruz.',
    color: '#4A90D9',
    gradient: 'from-[#0D1B2A] to-[#1A2F45]',
  },
  {
    icon: Store,
    title: 'Ticari Yapılar',
    desc: 'AVM\'ler, ofis binaları, otel ve ticari kompleksler için mimari mükemmellik sunuyoruz.',
    color: '#C8A96E',
    gradient: 'from-[#1A1008] to-[#2A1C0E]',
  },
  {
    icon: Factory,
    title: 'Endüstriyel Tesisler',
    desc: 'Fabrika, depo ve üretim tesisleri gibi ağır sanayi yapılarını eksiksiz teslim ediyoruz.',
    color: '#7B8CDE',
    gradient: 'from-[#0E0E1A] to-[#1A1A2E]',
  },
  {
    icon: RefreshCcw,
    title: 'Restorasyon & Yenileme',
    desc: 'Tarihi yapıların korunarak yenilenmesi ve mevcut yapıların modernize edilmesinde uzmanız.',
    color: '#6BCF8F',
    gradient: 'from-[#091A10] to-[#122A1C]',
  },
  {
    icon: Layers,
    title: 'Altyapı Çalışmaları',
    desc: 'Yol, köprü, tünel ve su yönetimi gibi kritik altyapı projelerini güvenle tamamlıyoruz.',
    color: '#E87C5A',
    gradient: 'from-[#1A0D0A] to-[#2A1610]',
  },
  {
    icon: ClipboardList,
    title: 'Proje Yönetimi',
    desc: 'Başlangıçtan teslimata kadar tüm süreçleri planlama, bütçeleme ve koordinasyonu üstleniyoruz.',
    color: '#A855F7',
    gradient: 'from-[#120A1A] to-[#1E102E]',
  },
]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const sRotX = useSpring(rotX, { damping: 20, stiffness: 200 })
  const sRotY = useSpring(rotY, { damping: 20, stiffness: 200 })
  const gX = useTransform(sRotY, [-15, 15], ['0%', '100%'])
  const gY = useTransform(sRotX, [-15, 15], ['0%', '100%'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    rotX.set(-y * 16)
    rotY.set(x * 16)
  }

  const handleMouseLeave = () => {
    setHovered(false)
    rotX.set(0)
    rotY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        rotateX: sRotX,
        rotateY: sRotY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative cursor-default overflow-hidden group"
    >
      <div
        className="relative p-7 h-full transition-shadow duration-500"
        style={{
          background: `linear-gradient(135deg, var(--dark-3) 0%, var(--dark-4) 100%)`,
          border: `1px solid ${hovered ? service.color + '40' : 'rgba(200,169,110,0.08)'}`,
          borderRadius: '4px',
          boxShadow: hovered ? `0 20px 60px ${service.color}18, 0 0 0 1px ${service.color}25` : 'none',
          transition: 'border-color 0.4s, box-shadow 0.4s',
        }}
      >
        {/* Gradient spotlight following mouse */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${gX} ${gY}, ${service.color}10 0%, transparent 60%)`,
          }}
        />

        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
          style={{ background: `linear-gradient(90deg, ${service.color}, transparent)` }}
        />

        {/* Icon */}
        <div
          className="relative w-14 h-14 rounded-sm flex items-center justify-center mb-6 transition-colors duration-300"
          style={{
            background: hovered ? `${service.color}18` : 'rgba(255,255,255,0.04)',
            border: `1px solid ${hovered ? service.color + '30' : 'rgba(255,255,255,0.06)'}`,
            transform: 'translateZ(20px)',
          }}
        >
          <service.icon size={24} style={{ color: hovered ? service.color : 'var(--light-gray)' }} />
        </div>

        {/* Content */}
        <div style={{ transform: 'translateZ(10px)' }}>
          <h3
            className="text-xl font-bold mb-3 transition-colors duration-300"
            style={{ color: hovered ? 'var(--warm-white)' : 'var(--warm-white)', fontFamily: 'Montserrat, sans-serif' }}
          >
            {service.title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.45)' }}>
            {service.desc}
          </p>
        </div>

        {/* Arrow */}
        <div
          className="absolute bottom-7 right-7 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0"
          style={{ background: service.color, color: 'var(--dark)' }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Index number */}
        <div
          className="absolute top-7 right-7 text-4xl font-black opacity-5 group-hover:opacity-10 transition-opacity duration-300"
          style={{ color: service.color, fontFamily: 'Montserrat, sans-serif' }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="services" className="relative py-24 lg:py-40 overflow-hidden" style={{ background: 'var(--dark)' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(200,169,110,0.03) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: 'var(--gold)' }} />
            <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: 'var(--gold)' }}>
              Hizmetler
            </span>
            <div className="h-px w-10" style={{ background: 'var(--gold)' }} />
          </div>
          <h2
            className="text-4xl lg:text-6xl font-black mb-6"
            style={{ color: 'var(--warm-white)', fontFamily: 'Montserrat, sans-serif' }}
          >
            Ne İnşa Ediyoruz?
          </h2>
          <p className="max-w-xl mx-auto text-base lg:text-lg" style={{ color: 'rgba(245,240,232,0.5)' }}>
            Sektörün her alanında uzmanlaşmış ekibimizle çözüm üretiyoruz.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: '1200px' }}>
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
