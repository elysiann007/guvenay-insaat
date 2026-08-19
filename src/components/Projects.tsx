import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from 'framer-motion'
import { Maximize2 } from 'lucide-react'
import RevealHeading from './RevealHeading'
import Lightbox from './Lightbox'
import { DURATION, EASE_OUT_EXPO, VIEWPORT_ONCE, useTapFeedback } from '../lib/motion'

type Category = 'Tümü' | 'Kablo & Kanal' | 'Trafo & Direk' | 'Boru & Altyapı' | 'Üst Kaplama' | 'Helikopter Beton'

// Saf galeri — hangi fotoğrafın hangi işe/müşteriye ait olduğunu doğrulamadan
// belirli bir iş adı, konum ya da ölçü iddia etmiyoruz (bkz. docs/EKSIK-BILGILER.md
// #7). Kartlarda yalnızca disiplin kategorisi ve fotoğrafın gerçekte ne
// gösterdiğini tarif eden `alt` metni var.
//
// Sıralama kasıtlı: ilk altı kart farklı disiplinlerden geldiği için "Tümü"
// görünümü çeşitli açılıyor; kablo kanalı arşivinin tamamı (7–22) bunların
// ardına ekleniyor.
const projects = [
  {
    id: 1,
    category: 'Helikopter Beton' as Category,
    img: '/media/project-1.webp',
    alt: 'Bina yanı geçişe dökülüp helikopterle perdahlanmış taze beton zemin',
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
    category: 'Üst Kaplama' as Category,
    img: '/media/project-5.webp',
    alt: 'Tamamlanmış kaldırım kaplaması ve dibi betonlanmış aydınlatma direği',
  },
  {
    id: 6,
    category: 'Boru & Altyapı' as Category,
    img: '/media/project-6.webp',
    alt: 'Şehir içi cadde kenarında açılmış kanal, paletli ekskavatör ve reflektif yelekli saha ekibi',
  },
  {
    id: 7,
    category: 'Kablo & Kanal' as Category,
    img: '/media/project-7.webp',
    alt: 'Yol kenarında açılmış kanala yan yana serilmiş mavi koruge borular, arkada enerji nakil direkleri',
  },
  {
    id: 8,
    category: 'Kablo & Kanal' as Category,
    img: '/media/project-8.webp',
    alt: 'Dar sokakta açılmış kablo kanalı ve kanal boyunca serilen kırmızı enerji kablosu ikaz bandı',
  },
  {
    id: 9,
    category: 'Kablo & Kanal' as Category,
    img: '/media/project-9.webp',
    alt: 'Sokak boyunca uzanan kanalda ikaz bandı, arkada mini ekskavatör ve saha çalışanı',
  },
  {
    id: 10,
    category: 'Kablo & Kanal' as Category,
    img: '/media/project-10.webp',
    alt: 'Şantiye yolunda kanal boyunca pembe TEDAŞ ikaz bandı seren saha çalışanı',
  },
  {
    id: 11,
    category: 'Kablo & Kanal' as Category,
    img: '/media/project-11.webp',
    alt: 'Kumlanmış kanal tabanına döşenmiş iki sıra mavi koruge boru',
  },
  {
    id: 12,
    category: 'Kablo & Kanal' as Category,
    img: '/media/project-12.webp',
    alt: 'Kanal içinde beton takozlar üzerine dizilmiş altı sıra koruge boru ve çalışan işçi',
  },
  {
    id: 13,
    category: 'Kablo & Kanal' as Category,
    img: '/media/project-13.webp',
    alt: 'Kanal tabanına serilmiş kum yatağı, dizilmiş koruge borular ve kürekle çalışan işçi',
  },
  {
    id: 14,
    category: 'Kablo & Kanal' as Category,
    img: '/media/project-14.webp',
    alt: 'Kanalda kum serimi yapan iki işçi ve takozlara oturtulmuş koruge boru demeti',
  },
  {
    id: 15,
    category: 'Kablo & Kanal' as Category,
    img: '/media/project-15.webp',
    alt: 'Kapatılmaya hazır kanalda paralel serilmiş kırmızı ikaz bantları, arkada ekskavatör',
  },
  {
    id: 16,
    category: 'Kablo & Kanal' as Category,
    img: '/media/project-16.webp',
    alt: 'Ekskavatör kepçesiyle kanal dolgusu yapılırken serilmiş pembe ikaz bantları',
  },
  {
    id: 17,
    category: 'Kablo & Kanal' as Category,
    img: '/media/project-17.webp',
    alt: 'Sanayi bölgesinde açılmış derin kanal, içinde mavi koruge boru ve ikaz bandı',
  },
  {
    id: 18,
    category: 'Kablo & Kanal' as Category,
    img: '/media/project-18.webp',
    alt: 'Cadde kenarında açılmış kanal, boyunca serilmiş pembe ikaz bandı ve arkada trafo panosu',
  },
  {
    id: 19,
    category: 'Kablo & Kanal' as Category,
    img: '/media/project-19.webp',
    alt: 'Kanal dolgusu üzerine paralel serilmiş kırmızı ikaz bantlarını düzelten işçi',
  },
  {
    id: 20,
    category: 'Kablo & Kanal' as Category,
    img: '/media/project-20.webp',
    alt: 'Kanal dolgusu üzerine serilmiş kırmızı ikaz bantları ve kürekle çalışan saha işçisi',
  },
  {
    id: 21,
    category: 'Kablo & Kanal' as Category,
    img: '/media/project-21.webp',
    alt: 'Dar kanal boyunca dizilmiş beton kablo koruma plakaları, sağda paletli ekskavatör',
  },
  {
    id: 22,
    category: 'Kablo & Kanal' as Category,
    img: '/media/project-22.webp',
    alt: 'Geniş kanalda kum yatağı üzerine yan yana dizilmiş on iki sıra koruge boru',
  },
]

const categories: Category[] = ['Tümü', 'Kablo & Kanal', 'Trafo & Direk', 'Boru & Altyapı', 'Üst Kaplama', 'Helikopter Beton']

// Galeri 22 fotoğrafa çıktı. Hepsini birden basmak, özellikle tek sütuna düşen
// mobilde bölümü sayfanın geri kalanını gömecek kadar uzatıyor — ilk ekranda
// 9 kart gösterip gerisini isteğe bağlı açıyoruz.
const INITIAL_COUNT = 9

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
  const [showAll, setShowAll] = useState(false)
  const filtered = active === 'Tümü' ? projects : projects.filter((p) => p.category === active)
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_COUNT)
  const hiddenCount = filtered.length - visible.length
  const tapFeedback = useTapFeedback()
  const reduceMotion = useReducedMotion()

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  // Indices address `visible`, not `filtered`, so the viewer's arrows walk
  // exactly the set the grid is showing — a collapsed gallery never pages
  // into photos the user can't see behind it.
  const openLightbox = useCallback(
    (id: number, trigger: HTMLButtonElement) => {
      triggerRef.current = trigger
      setLightboxIndex(visible.findIndex((p) => p.id === id))
    },
    [visible]
  )

  // Return focus to the card that opened the dialog, not to <body> — a
  // keyboard user who closes the viewer should be exactly where they were.
  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
    triggerRef.current?.focus()
    triggerRef.current = null
  }, [])

  const selectCategory = (cat: Category) => {
    // Indices address the visible array, so a filter change while the
    // viewer is open would point at the wrong project.
    setLightboxIndex(null)
    setShowAll(false)
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
              {visible.map((p, i) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  /* Pinned to one project, not to `i === 0`. With the old
                     index test every filter promoted whatever landed first,
                     so "Boru & Altyapı" (one match) rendered a lone
                     2x2 tile marooned in a 3-column grid.
                     The length guard covers the same hazard from the other
                     side: project 1 is now the only "Helikopter Beton"
                     photo, so without it that filter would render the
                     featured tile alone — the exact case above. */
                  featured={p.id === projects[0].id && visible.length > 1}
                  index={i}
                  onOpen={openLightbox}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {hiddenCount > 0 ? (
          <div className="flex justify-center mt-10 lg:mt-12">
            <motion.button
              whileTap={tapFeedback}
              onClick={() => setShowAll(true)}
              className="btn-secondary"
            >
              {hiddenCount} Fotoğraf Daha Göster
            </motion.button>
          </div>
        ) : null}
      </div>

      <Lightbox items={visible} index={lightboxIndex} onClose={closeLightbox} onNavigate={setLightboxIndex} />
    </section>
  )
}
