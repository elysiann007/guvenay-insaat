import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from 'framer-motion'
import { Maximize2 } from 'lucide-react'
import RevealHeading from './RevealHeading'
import Lightbox from './Lightbox'
import { DURATION, EASE_OUT_EXPO, VIEWPORT_ONCE, useTapFeedback } from '../lib/motion'

type Category = 'Tümü' | 'Kablo & Kanal' | 'Trafo & Direk' | 'Boru & Altyapı'

// Saf galeri — hangi fotoğrafın hangi işe/müşteriye ait olduğunu doğrulamadan
// belirli bir iş adı, konum ya da ölçü iddia etmiyoruz (bkz. docs/EKSIK-BILGILER.md
// #7). Kartlarda yalnızca disiplin kategorisi ve fotoğrafın gerçekte ne
// gösterdiğini tarif eden `alt` metni var.
const projects = [
  {
    id: 1,
    category: 'Kablo & Kanal' as Category,
    img: '/media/project-1.webp',
    alt: 'Kablo kanalı kapatıldıktan sonra yeniden asfaltlanmış dar sokak',
  },
  {
    id: 2,
    category: 'Kablo & Kanal' as Category,
    img: '/media/project-2.webp',
    alt: 'Gece çalışması — trafiğe kapatılmış yolda bariyerler ve iş makineleri',
  },
  {
    id: 3,
    category: 'Kablo & Kanal' as Category,
    img: '/media/project-3.webp',
    alt: 'Saha ekibi kırmızı kablo makarasından kablo çekerken',
  },
  {
    id: 4,
    category: 'Trafo & Direk' as Category,
    img: '/media/project-4.webp',
    alt: 'Direk dibine kurulmuş ahşap kalıp ve dökülmüş beton temel',
  },
  {
    id: 5,
    category: 'Trafo & Direk' as Category,
    img: '/media/project-5.webp',
    alt: 'Tamamlanmış kaldırım kaplaması ve dibi betonlanmış aydınlatma direkleri',
  },
  {
    id: 6,
    category: 'Boru & Altyapı' as Category,
    img: '/media/project-6.webp',
    alt: 'Şehir içi cadde kenarında açılmış kanal, paletli ekskavatör ve reflektif yelekli saha ekibi',
  },
]

const categories: Category[] = ['Tümü', 'Kablo & Kanal', 'Trafo & Direk', 'Boru & Altyapı']

function ProjectCard({
  project,
  featured,
  index,
  onOpen,
}: {
  project: typeof projects[0]
  featured: boolean
  index: number
  onOpen: (id: number, trigger: HTMLButtonElement) => void
}) {
  const reduceMotion = useReducedMotion()
  const btnRef = useRef<HTMLButtonElement>(null)
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

        {/* Faint scrim under the top-left badge only — a gallery card has no
            caption to protect, so there is nothing to darken lower down. */}
        <div
          className="absolute inset-x-0 top-0 h-20 transition-opacity duration-500 opacity-60 group-hover:opacity-80"
          style={{
            background: 'linear-gradient(to bottom, color-mix(in srgb, var(--ink) 60%, transparent) 0%, transparent 100%)',
          }}
        />

        {/* Category badge */}
        <div
          className="absolute top-3 left-3 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em]"
          style={{ background: 'color-mix(in srgb, var(--surface) 92%, transparent)', color: 'var(--text)' }}
        >
          {project.category}
        </div>

        {/* Enlarge affordance — the card lifts and shadows on hover, so it has
            to actually say what the click does. */}
        <div
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200"
          style={{ background: 'color-mix(in srgb, var(--ink) 72%, transparent)', color: '#fff' }}
          aria-hidden="true"
        >
          <Maximize2 size={15} />
        </div>

        {/* Stretched control. Gives the card exactly one tab stop and —
            because it lives inside .group — lets `.group:focus-within`
            fire, which is what releases the .img-tone grayscale for
            keyboard users. */}
        <button
          ref={btnRef}
          type="button"
          onClick={() => btnRef.current && onOpen(project.id, btnRef.current)}
          aria-label={`${project.alt} — fotoğrafı büyüt`}
          className="absolute inset-0 z-10 w-full h-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--accent-on-dark)]"
        />
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [active, setActive] = useState<Category>('Tümü')
  const filtered = active === 'Tümü' ? projects : projects.filter((p) => p.category === active)
  const tapFeedback = useTapFeedback()
  const reduceMotion = useReducedMotion()

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const openLightbox = useCallback(
    (id: number, trigger: HTMLButtonElement) => {
      triggerRef.current = trigger
      setLightboxIndex(filtered.findIndex((p) => p.id === id))
    },
    [filtered]
  )

  // Return focus to the card that opened the dialog, not to <body> — a
  // keyboard user who closes the viewer should be exactly where they were.
  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
    triggerRef.current?.focus()
    triggerRef.current = null
  }, [])

  const selectCategory = (cat: Category) => {
    // Indices address the filtered array, so a filter change while the
    // viewer is open would point at the wrong project.
    setLightboxIndex(null)
    setActive(cat)
  }

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
            <span className="eyebrow">Sahadan</span>
            <RevealHeading
              as="h2"
              lines={['Seçilmiş İşlerimiz']}
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
                onClick={() => selectCategory(cat)}
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
                <ProjectCard
                  key={p.id}
                  project={p}
                  /* Pinned to one project, not to `i === 0`. With the old
                     index test every filter promoted whatever landed first,
                     so "Boru & Altyapı" (one match) rendered a lone
                     2x2 tile marooned in a 3-column grid. */
                  featured={p.id === projects[0].id}
                  index={i}
                  onOpen={openLightbox}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>

      <Lightbox items={filtered} index={lightboxIndex} onClose={closeLightbox} onNavigate={setLightboxIndex} />
    </section>
  )
}
