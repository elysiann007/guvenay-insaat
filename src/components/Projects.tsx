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
    img: '/media/project-1.webp',
    alt: 'Güvenay Residence — modern rezidans kuleleri ve peyzajlı avlu',
  },
  {
    id: 2,
    name: 'Ankara Tower',
    location: 'Çankaya, Ankara',
    year: '2023',
    category: 'Ticari' as Category,
    units: '32 Kat Ofis',
    img: '/media/project-2.webp',
    alt: 'Ankara Tower — cam giydirme cepheli ofis kulesi',
  },
  {
    id: 3,
    name: 'İzmir AVM',
    location: 'Bornova, İzmir',
    year: '2023',
    category: 'Ticari' as Category,
    units: '180 Mağaza',
    img: '/media/project-3.webp',
    alt: 'İzmir AVM — kavisli beyaz cepheli modern alışveriş merkezi',
  },
  {
    id: 4,
    name: 'Bursa Sanayi Tesisi',
    location: 'Nilüfer, Bursa',
    year: '2022',
    category: 'Endüstriyel' as Category,
    units: '12.000 m²',
    img: '/media/project-4.webp',
    alt: 'Bursa Sanayi Tesisi — modern endüstriyel üretim tesisi',
  },
  {
    id: 5,
    name: 'Antalya Marina Otel',
    location: 'Konyaaltı, Antalya',
    year: '2022',
    category: 'Ticari' as Category,
    units: '5 Yıldızlı, 180 Oda',
    img: '/media/project-5.webp',
    alt: 'Antalya Marina Otel — deniz kenarında beş yıldızlı otel',
  },
  {
    id: 6,
    name: 'Güvenay Park Konutları',
    location: 'Başakşehir, İstanbul',
    year: '2021',
    category: 'Konut' as Category,
    units: '420 Daire',
    img: '/media/project-6.webp',
    alt: 'Güvenay Park Konutları — bahçeli modern konut siteleri',
  },
]

const categories: Category[] = ['Tümü', 'Konut', 'Ticari', 'Endüstriyel']

function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="group cursor-pointer"
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3', background: 'var(--bg-alt)' }}>
        <img
          src={project.img}
          alt={project.alt}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className="absolute top-3 left-3 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em]"
          style={{ background: 'rgba(250,250,247,0.92)', color: 'var(--text)' }}
        >
          {project.category}
        </div>
        <div
          className="absolute bottom-3 right-3 w-10 h-10 flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
          style={{ background: 'var(--accent)', color: '#fff' }}
        >
          <ArrowUpRight size={16} />
        </div>
      </div>

      {/* Ruled caption row */}
      <div className="pt-4 pb-5 hairline-bottom">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-lg lg:text-xl font-bold leading-tight transition-colors duration-300 group-hover:text-[var(--accent)]" style={{ color: 'var(--text)' }}>
            {project.name}
          </h3>
          <span className="text-sm font-semibold shrink-0" style={{ color: 'var(--accent)' }}>
            {project.units}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-xs" style={{ color: 'var(--text-dim)' }}>
          <span className="flex items-center gap-1"><MapPin size={11} />{project.location}</span>
          <span className="flex items-center gap-1"><Calendar size={11} />{project.year}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [active, setActive] = useState<Category>('Tümü')
  const filtered = active === 'Tümü' ? projects : projects.filter((p) => p.category === active)

  return (
    <section id="projects" className="relative py-20 lg:py-32" style={{ background: 'var(--bg-alt)' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header + filters in one ruled row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 lg:mb-16"
        >
          <div>
            <span className="eyebrow">Referanslarımız</span>
            <h2 className="font-display text-4xl lg:text-5xl font-black tracking-tight mt-5 leading-[1.05]" style={{ color: 'var(--text)' }}>
              Tamamlanan Projeler
            </h2>
          </div>

          {/* Minimal text filters */}
          <div className="flex gap-6 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="relative shrink-0 pb-2 text-sm font-bold uppercase tracking-[0.1em] cursor-pointer transition-colors duration-300"
                style={{ color: active === cat ? 'var(--text)' : 'var(--text-dim)' }}
              >
                {cat}
                <span
                  className="absolute bottom-0 left-0 h-[2px] transition-all duration-300"
                  style={{ background: 'var(--accent)', width: active === cat ? '100%' : 0 }}
                />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <LayoutGroup>
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14"
        >
          <button className="btn-secondary">
            Tüm Projeleri Gör
            <ArrowUpRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
