import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'

const certificates = [
  {
    id: 1,
    title: 'Onur Belgesi',
    desc: 'Firmanın kuruluşunun 15. yılı',
    year: '2009',
    img: '/media/certificates/onur-belgesi-2009.jpeg',
    alt: "İzmir Ticaret Odası Onur Belgesi — Güvenay İnşaat'ın kuruluşunun 15. yılı, Ağustos 2009",
  },
  {
    id: 2,
    title: 'Onur Belgesi',
    desc: 'Oda üyeliğinin 20. yılı',
    year: '2014',
    img: '/media/certificates/onur-belgesi-2014.jpeg',
    alt: 'İzmir Ticaret Odası Onur Belgesi — oda üyeliğinin 20. yılı, Ağustos 2014',
  },
  {
    id: 3,
    title: 'Onur Belgesi',
    desc: 'Oda üyeliğinin 25. yılı',
    year: '2019',
    img: '/media/certificates/onur-belgesi-2019.jpeg',
    alt: 'İzmir Ticaret Odası Onur Belgesi — oda üyeliğinin 25. yılı, Ağustos 2019',
  },
  {
    id: 4,
    title: 'Teşekkür Belgesi',
    desc: 'Yüksek ticari kazanç beyanı',
    year: '2023',
    img: '/media/certificates/tesekkur-belgesi-2023.jpeg',
    alt: "İzmir Ticaret Odası Teşekkür Belgesi — 2023 yılında yüksek ticari kazanç beyan ederek ülke ekonomisine katkı",
  },
  {
    id: 5,
    title: 'Takdirname',
    desc: 'Yüksek ticari kazanç beyanı',
    year: '2024',
    img: '/media/certificates/takdirname-2024.jpeg',
    alt: 'İzmir Ticaret Odası Takdirname — 2024 yılında yüksek ticari kazanç beyan ederek ülke ekonomisine katkı',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }

export default function Certificates() {
  const [active, setActive] = useState<(typeof certificates)[0] | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const reduceMotion = useReducedMotion()

  const openCertificate = (certificate: (typeof certificates)[0], trigger: HTMLButtonElement) => {
    triggerRef.current = trigger
    setActive(certificate)
  }

  const closeCertificate = () => setActive(null)

  useEffect(() => {
    if (!active) return

    const { body } = document
    const root = document.getElementById('root')
    const previousOverflow = body.style.overflow
    const rootWasInert = root?.hasAttribute('inert') ?? false
    body.style.overflow = 'hidden'
    root?.setAttribute('inert', '')

    const focusFrame = window.requestAnimationFrame(() => closeRef.current?.focus())
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setActive(null)
        return
      }
      if (event.key !== 'Tab') return

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
      )
      if (!focusables || focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const current = document.activeElement

      if (event.shiftKey && (current === first || !panelRef.current?.contains(current))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && current === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.removeEventListener('keydown', onKey)
      body.style.overflow = previousOverflow
      if (!rootWasInert) root?.removeAttribute('inert')
    }
  }, [active])

  return (
    <section id="certificates" className="relative py-20 lg:py-32" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-12 lg:mb-16 max-w-2xl"
        >
          <span className="eyebrow">Belgelerimiz</span>
          <h2 className="font-display text-4xl lg:text-5xl font-black tracking-tight mt-5 leading-[1.05]" style={{ color: 'var(--text)' }}>
            İzmir Ticaret Odası'ndan Aldığımız Belgeler
          </h2>
          <p className="text-base lg:text-lg leading-relaxed mt-6" style={{ color: 'var(--text-soft)' }}>
            Yıllar içinde İzmir Ticaret Odası tarafından kuruluş ve üyelik yıl dönümlerimiz ile
            ticari başarılarımız için tarafımıza verilen onur ve takdir belgeleri.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10"
        >
          {certificates.map((c) => (
            <motion.button
              key={c.id}
              variants={fadeUp}
              onClick={(event) => openCertificate(c, event.currentTarget)}
              className="group cursor-pointer text-left"
              aria-label={`${c.title} — ${c.year} yılını büyük boyutta görüntüle`}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/3', background: 'var(--bg-alt)', border: '1px solid var(--border)' }}>
                <img
                  src={c.img}
                  alt={c.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'rgba(22,21,18,0.35)' }}
                >
                  <div className="w-11 h-11 flex items-center justify-center" style={{ background: 'var(--accent)', color: '#fff' }}>
                    <ZoomIn size={18} />
                  </div>
                </div>
              </div>

              <div className="pt-4 pb-5 hairline-bottom">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-lg font-bold leading-tight transition-colors duration-300 group-hover:text-[var(--accent)]" style={{ color: 'var(--text)' }}>
                    {c.title}
                  </h3>
                  <span className="text-sm font-semibold shrink-0" style={{ color: 'var(--accent)' }}>
                    {c.year}
                  </span>
                </div>
                <p className="text-xs mt-1.5" style={{ color: 'var(--text-dim)' }}>{c.desc}</p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {createPortal(
        <AnimatePresence onExitComplete={() => triggerRef.current?.focus()}>
          {active && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.25 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-5 lg:p-10"
              style={{ background: 'rgba(22,21,18,0.9)' }}
              onClick={closeCertificate}
            >
              <motion.div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="certificate-dialog-title"
                aria-describedby="certificate-dialog-description"
                initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: reduceMotion ? 0 : 0.25, ease: 'easeOut' }}
                className="relative max-w-3xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={active.img}
                  alt={active.alt}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
                <div className="flex items-baseline justify-between gap-4 mt-4">
                  <div>
                    <h3 id="certificate-dialog-title" className="font-display text-lg font-bold text-white">{active.title}</h3>
                    <p id="certificate-dialog-description" className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.72)' }}>{active.desc}</p>
                  </div>
                  <span className="text-sm font-semibold shrink-0" style={{ color: '#E8B08A' }}>{active.year}</span>
                </div>
                <button
                  ref={closeRef}
                  onClick={closeCertificate}
                  className="absolute -top-14 right-0 lg:-right-14 w-11 h-11 flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  style={{ border: '1px solid rgba(255,255,255,0.4)', color: '#fff' }}
                  aria-label="Kapat"
                >
                  <X size={18} />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  )
}
