import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { MapPin, Calendar, ArrowUpRight } from 'lucide-react'

type Category = 'Tümü' | 'Konut' | 'Ticari' | 'Endüstriyel'

const projects = [
  {
    id: 1,
    name: 'Güvenay Residence',
    location: 'Ataşehir, İstanbul',
    year: '2024',
    category: 'Konut' as Category,
    units: '248 Daire',
    bg: 'linear-gradient(135deg, #0D1B2A 0%, #1A3050 50%, #0A2040 100%)',
    accent: '#4A90D9',
    pattern: 'circles',
  },
  {
    id: 2,
    name: 'Ankara Tower',
    location: 'Çankaya, Ankara',
    year: '2023',
    category: 'Ticari' as Category,
    units: '32 Kat Ofis',
    bg: 'linear-gradient(135deg, #1A0E05 0%, #2E1C08 50%, #1A1000 100%)',
    accent: '#C8A96E',
    pattern: 'lines',
  },
  {
    id: 3,
    name: 'İzmir AVM',
    location: 'Bornova, İzmir',
    year: '2023',
    category: 'Ticari' as Category,
    units: '180 Mağaza',
    bg: 'linear-gradient(135deg, #0E0A1A 0%, #1E1228 50%, #100820 100%)',
    accent: '#A855F7',
    pattern: 'grid',
  },
  {
    id: 4,
    name: 'Bursa Sanayi Tesisi',
    location: 'Nilüfer, Bursa',
    year: '2022',
    category: 'Endüstriyel' as Category,
    units: '12.000 m²',
    bg: 'linear-gradient(135deg, #111111 0%, #1E1E1E 50%, #141414 100%)',
    accent: '#888888',
    pattern: 'triangles',
  },
  {
    id: 5,
    name: 'Antalya Marina Otel',
    location: 'Konyaaltı, Antalya',
    year: '2022',
    category: 'Ticari' as Category,
    units: '5 Yıldızlı, 180 Oda',
    bg: 'linear-gradient(135deg, #051215 0%, #0D2530 50%, #051820 100%)',
    accent: '#2DD4BF',
    pattern: 'waves',
  },
  {
    id: 6,
    name: 'Güvenay Park Konutları',
    location: 'Başakşehir, İstanbul',
    year: '2021',
    category: 'Konut' as Category,
    units: '420 Daire',
    bg: 'linear-gradient(135deg, #091507 0%, #142810 50%, #081205 100%)',
    accent: '#6BCF8F',
    pattern: 'hexagons',
  },
]

const categories: Category[] = ['Tümü', 'Konut', 'Ticari', 'Endüstriyel']

function PatternSVG({ type, color }: { type: string; color: string }) {
  const c = color + '18'
  if (type === 'circles')
    return (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 150" preserveAspectRatio="xMidYMid slice">
        {[30, 60, 90, 120, 150].map((r, i) => (
          <circle key={i} cx="100" cy="75" r={r} fill="none" stroke={c} strokeWidth="0.8" />
        ))}
      </svg>
    )
  if (type === 'lines')
    return (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 150" preserveAspectRatio="xMidYMid slice">
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1={i * 30} y1="0" x2={i * 30 + 60} y2="150" stroke={c} strokeWidth="0.6" />
        ))}
      </svg>
    )
  if (type === 'grid')
    return (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 150" preserveAspectRatio="xMidYMid slice">
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 33} y1="0" x2={i * 33} y2="150" stroke={c} strokeWidth="0.6" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 30} x2="200" y2={i * 30} stroke={c} strokeWidth="0.6" />
        ))}
      </svg>
    )
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 150" preserveAspectRatio="xMidYMid slice">
      {Array.from({ length: 12 }).map((_, i) => (
        <polygon key={i} points={`${(i % 5) * 45},${Math.floor(i / 5) * 60} ${(i % 5) * 45 + 20},${Math.floor(i / 5) * 60 + 35} ${(i % 5) * 45 - 20},${Math.floor(i / 5) * 60 + 35}`} fill="none" stroke={c} strokeWidth="0.8" />
      ))}
    </svg>
  )
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative overflow-hidden cursor-pointer group"
      style={{ borderRadius: '4px', aspectRatio: '4/3' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background */}
      <div className="absolute inset-0" style={{ background: project.bg }} />

      {/* Pattern */}
      <PatternSVG type={project.pattern} color={project.accent} />

      {/* Glow on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ background: `radial-gradient(circle at 50% 60%, ${project.accent}20 0%, transparent 70%)` }}
      />

      {/* Category chip */}
      <div
        className="absolute top-4 left-4 px-3 py-1 text-[10px] font-bold tracking-widest uppercase"
        style={{ background: `${project.accent}25`, color: project.accent, borderRadius: '2px', border: `1px solid ${project.accent}30` }}
      >
        {project.category}
      </div>

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end p-6"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)' }}
      >
        <div
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: project.accent, color: 'var(--dark)' }}
        >
          <ArrowUpRight size={16} />
        </div>
      </motion.div>

      {/* Static bottom info */}
      <div
        className="absolute bottom-0 left-0 right-0 p-5"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)' }}
      >
        <h3
          className="text-lg font-bold mb-2 leading-tight"
          style={{ color: 'var(--warm-white)', fontFamily: 'Montserrat, sans-serif' }}
        >
          {project.name}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(245,240,232,0.6)' }}>
            <MapPin size={11} />
            {project.location}
          </div>
          <div className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(245,240,232,0.6)' }}>
            <Calendar size={11} />
            {project.year}
          </div>
        </div>
        <div className="mt-2 text-xs font-semibold" style={{ color: project.accent }}>
          {project.units}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [active, setActive] = useState<Category>('Tümü')

  const filtered = active === 'Tümü' ? projects : projects.filter((p) => p.category === active)

  return (
    <section id="projects" className="relative py-24 lg:py-40 overflow-hidden" style={{ background: 'var(--dark-2)' }}>
      <div className="absolute inset-0 diagonal-bg" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: 'var(--gold)' }} />
            <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: 'var(--gold)' }}>
              Referanslar
            </span>
            <div className="h-px w-10" style={{ background: 'var(--gold)' }} />
          </div>
          <h2
            className="text-4xl lg:text-6xl font-black mb-6"
            style={{ color: 'var(--warm-white)', fontFamily: 'Montserrat, sans-serif' }}
          >
            Tamamlanan <span className="gradient-text">Projeler</span>
          </h2>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="relative px-6 py-2.5 text-xs font-bold tracking-widest uppercase transition-colors duration-300"
              style={{
                color: active === cat ? 'var(--dark)' : 'rgba(245,240,232,0.6)',
                background: active === cat ? 'var(--gold)' : 'transparent',
                border: `1px solid ${active === cat ? 'var(--gold)' : 'rgba(200,169,110,0.2)'}`,
                borderRadius: '2px',
              }}
            >
              {cat}
              {active === cat && (
                <motion.div
                  layoutId="filter-active"
                  className="absolute inset-0 -z-10"
                  style={{ background: 'var(--gold)', borderRadius: '2px' }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <LayoutGroup>
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="px-10 py-4 text-sm font-bold tracking-widest uppercase"
            style={{
              border: '1px solid rgba(200,169,110,0.3)',
              color: 'var(--gold)',
              borderRadius: '2px',
            }}
          >
            Tüm Projeleri Gör
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
