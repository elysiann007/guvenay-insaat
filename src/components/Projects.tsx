import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from 'framer-motion'
import { MapPin, Calendar } from 'lucide-react'
import RevealHeading from './RevealHeading'
import { DURATION, EASE_OUT_EXPO, VIEWPORT_ONCE, useTapFeedback } from '../lib/motion'

type Category = 'Tümü' | 'Enerji' | 'Telekom' | 'Şebeke'

// Görseller mevcut placeholder fotoğraflardır (ALTYAPI-PLAN.md — "Görseller"
// kararı); proje adları demo enerji/telekom içerikleridir ama alt metinleri
// fotoğrafın gerçekte ne gösterdiğini dürüstçe tarif eder, projenin iddia
// ettiği şeyi değil.
const projects = [
  {
    id: 1,
    name: 'Ataşehir Enerji Nakil Hattı',
    location: 'Ataşehir, İstanbul',
    year: '2024',
    category: 'Enerji' as Category,
    units: '48 km Hat',
    img: '/media/project-1.webp',
    alt: 'Temsili görsel — modern bina cephesi ve peyzajlı avlu',
  },
  {
    id: 2,
    name: 'Çankaya Trafo Merkezi',
    location: 'Çankaya, Ankara',
    year: '2023',
    category: 'Enerji' as Category,
    units: '2×40 MVA',
    img: '/media/project-2.webp',
    alt: 'Temsili görsel — cam giydirme cepheli bina',
  },
  {
    id: 3,
    name: 'Bornova Fiber Şebeke Genişletmesi',
    location: 'Bornova, İzmir',
    year: '2023',
    category: 'Şebeke' as Category,
    units: '120 km Fiber',
    img: '/media/project-3.webp',
    alt: 'Temsili görsel — kavisli beyaz cepheli modern yapı',
  },
  {
    id: 4,
    name: 'Nilüfer Telekom Saha İstasyonu',
    location: 'Nilüfer, Bursa',
    year: '2022',
    category: 'Telekom' as Category,
    units: '18 Saha',
    img: '/media/project-4.webp',
    alt: 'Temsili görsel — endüstriyel tesis binası',
  },
  {
    id: 5,
    name: 'Konyaaltı Enerji İletim Bağlantısı',
    location: 'Konyaaltı, Antalya',
    year: '2022',
    category: 'Enerji' as Category,
    units: '32 km Hat',
    img: '/media/project-5.webp',
    alt: 'Temsili görsel — deniz kenarında bina',
  },
  {
    id: 6,
    name: 'Başakşehir Şebeke Altyapı Projesi',
    location: 'Başakşehir, İstanbul',
    year: '2021',
    category: 'Şebeke' as Category,
    units: '65 km Kablo',
    img: '/media/project-6.webp',
    alt: 'Temsili görsel — bahçeli modern yapı kompleksi',
  },
]

const categories: Category[] = ['Tümü', 'Enerji', 'Telekom', 'Şebeke']

function ProjectCard({ project, featured, index }: { project: typeof projects[0]; featured: boolean; index: number }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      layout={!reduceMotion}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.97 }}
      transition={{ duration: reduceMotion ? 0 : 0.5, ease: 'easeOut', delay: reduceMotion ? 0 : Math.min(index, 4) * 0.05 }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      className={`group relative overflow-hidden transition-shadow duration-200 hover:shadow-[0_28px_56px_-32px_color-mix(in_srgb,var(--ink)_35%,transparent)] ${featured ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''}`}
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
            {/* This caption sits on a dark photo scrim (an --ink-derived
                gradient), so plain --accent (2.06 there) is forbidden —
                --accent-on-dark is the verified gold for exactly this band. */}
            <span className="font-bold" style={{ color: 'var(--accent-on-dark)' }}>{project.units}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [active, setActive] = useState<Category>('Tümü')
  const filtered = active === 'Tümü' ? projects : projects.filter((p) => p.category === active)
  const tapFeedback = useTapFeedback()
  const reduceMotion = useReducedMotion()

  return (
    <section id="projects" className="relative py-20 lg:py-32" style={{ background: 'var(--bg-alt)' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header + filters in one ruled row */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: reduceMotion ? 0 : DURATION.slower, ease: EASE_OUT_EXPO }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 lg:mb-16"
        >
          <div>
            <span className="eyebrow">Referanslarımız</span>
            <RevealHeading
              as="h2"
              lines={['Tamamlanan Projeler']}
              className="font-display text-4xl lg:text-5xl font-black tracking-tight mt-5 leading-[1.05]"
              style={{ color: 'var(--text)' }}
            />
          </div>

          {/* Minimal text filters */}
          <div className="flex gap-6 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileTap={tapFeedback}
                onClick={() => setActive(cat)}
                aria-pressed={active === cat}
                className="relative shrink-0 min-h-11 min-w-11 flex items-end justify-center pb-2 text-sm font-bold uppercase tracking-[0.1em] cursor-pointer transition-colors duration-200"
                style={{ color: active === cat ? 'var(--text)' : 'var(--text-dim)' }}
              >
                {cat}
                <span
                  className="absolute bottom-0 left-0 h-[2px] transition-all duration-200"
                  style={{ background: 'var(--accent)', width: active === cat ? '100%' : 0 }}
                />
              </motion.button>
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
