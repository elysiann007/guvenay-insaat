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

function ProjectCard({ project, featured, index }: { project: typeof projects[0]; featured: boolean; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: Math.min(index, 4) * 0.05 }}
      className={`group relative cursor-pointer overflow-hidden ${featured ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''}`}
    >
      {/* Image — grayscale blooms to color, gentle zoom, on hover/focus */}
      <div
        className="relative overflow-hidden w-full aspect-[4/3] lg:aspect-auto lg:h-full"
        style={{ background: 'var(--bg-alt)', minHeight: featured ? 320 : 220 }}
      >
        <img
          src={project.img}
          alt={project.alt}
          loading="lazy"
          className="img-tone absolute inset-0 w-full h-full object-cover"
        />

        {/* Scrim for legible overlay caption — token-derived from --ink so it
            tracks theme, rather than a hardcoded old-palette rgba */}
        <div
          className="absolute inset-0 transition-opacity duration-500 opacity-70 group-hover:opacity-90"
          style={{
            background:
              'linear-gradient(to top, color-mix(in srgb, var(--ink) 88%, transparent) 0%, color-mix(in srgb, var(--ink) 25%, transparent) 45%, transparent 70%)',
          }}
        />

        {/* Category badge */}
        <div
          className="absolute top-3 left-3 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em]"
          style={{ background: 'color-mix(in srgb, var(--surface) 92%, transparent)', color: 'var(--text)' }}
        >
          {project.category}
        </div>

        {/* Reveal arrow */}
        <div
          className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
          style={{ background: 'var(--accent)', color: '#fff' }}
        >
          <ArrowUpRight size={16} />
        </div>

        {/* Caption overlay — sits on the image, editorial gallery style */}
        <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6 translate-y-1.5 group-hover:translate-y-0 transition-transform duration-500">
          <h3
            className={`font-display font-bold leading-tight text-white ${featured ? 'text-2xl lg:text-3xl' : 'text-lg lg:text-xl'}`}
          >
            {project.name}
          </h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs" style={{ color: 'rgba(255,255,255,0.72)' }}>
            <span className="flex items-center gap-1"><MapPin size={11} />{project.location}</span>
            <span className="flex items-center gap-1"><Calendar size={11} />{project.year}</span>
            {/* Same fixed on-dark accent as .eyebrow-on-dark (index.css): this
                sits on a dark photo scrim in both themes, so the theme-swapping
                --accent-strong (a *darker* orange in light mode) would fail
                contrast here — see Stats.tsx for the identical reasoning. */}
            <span className="font-bold" style={{ color: '#FB923C' }}>{project.units}</span>
          </div>
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
                aria-pressed={active === cat}
                className="relative shrink-0 min-h-11 flex items-end pb-2 text-sm font-bold uppercase tracking-[0.1em] cursor-pointer transition-colors duration-300"
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

        {/* Grid — editorial, dense-packed with a large featured tile */}
        <LayoutGroup>
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[240px] lg:grid-flow-dense gap-4 lg:gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <ProjectCard key={p.id} project={p} featured={i === 0} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  )
}
