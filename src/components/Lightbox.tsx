import { useEffect, useRef, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react'
import { DURATION, EASE_OUT_EXPO, useTapFeedback } from '../lib/motion'

export interface LightboxItem {
  id: number
  name: string
  location: string
  year: string
  category: string
  units: string
  img: string
  alt: string
}

interface Props {
  items: LightboxItem[]
  index: number | null
  onClose: () => void
  onNavigate: (nextIndex: number) => void
}

/**
 * Full-bleed viewer for the project gallery.
 *
 * This exists because the grid used to promise a click it never delivered:
 * cards lifted and cast a shadow on hover, then did nothing. It also carried
 * no focusable child, which meant `.group:focus-within` could never fire, so
 * the `.img-tone` grayscale never released for keyboard or touch users.
 * Making each card a real control fixes the affordance and that CSS dead end
 * at the same time.
 *
 * Keyboard contract: Escape closes, Left/Right move through the CURRENT
 * filtered set, Tab is trapped inside the dialog, and focus returns to the
 * card that opened it (Projects.tsx owns the restore).
 */
export default function Lightbox({ items, index, onClose, onNavigate }: Props) {
  const reduceMotion = useReducedMotion()
  const tapFeedback = useTapFeedback()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const open = index !== null
  const item = open ? items[index] : null

  const go = useCallback(
    (dir: number) => {
      if (index === null || items.length < 2) return
      onNavigate((index + dir + items.length) % items.length)
    },
    [index, items.length, onNavigate]
  )

  // Key handling + focus trap live on one listener so Tab, Escape and the
  // arrows can't disagree about what "current" means.
  useEffect(() => {
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        go(-1)
        return
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        go(1)
        return
      }
      if (e.key !== 'Tab') return

      // Trap: query on every Tab rather than caching, because the control
      // set changes when a filtered view leaves only one project.
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
      )
      if (!focusables || focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement

      if (e.shiftKey && (active === first || !panelRef.current?.contains(active))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose, go])

  // Lock the page behind the dialog. Padding compensation stops the fixed
  // navbar and the layout from jumping sideways as the scrollbar is removed.
  useEffect(() => {
    if (!open) return
    const { body, documentElement } = document
    const prevOverflow = body.style.overflow
    const prevPadding = body.style.paddingRight
    const gap = window.innerWidth - documentElement.clientWidth
    body.style.overflow = 'hidden'
    if (gap > 0) body.style.paddingRight = `${gap}px`
    return () => {
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPadding
    }
  }, [open])

  // Move focus in once the panel is mounted.
  useEffect(() => {
    if (open) closeRef.current?.focus()
  }, [open])

  const duration = reduceMotion ? 0 : DURATION.base

  if (!open || !item) return null

  return (
    <motion.div
      /* Deliberately NOT wrapped in AnimatePresence.
         An exit animation would gate unmount on that animation reporting
         completion, and framer-motion drives it with requestAnimationFrame.
         rAF is suspended whenever the document is hidden — background the tab
         mid-close and the exit never finishes, so this node stays mounted: a
         fixed, full-viewport, z-50 element at opacity 0 with pointer-events
         auto, swallowing every click on the page with nothing visible to
         explain why.
         Closing is therefore an immediate unmount. The entrance still
         animates, which is the half that carries the polish; a modal
         dismissing instantly reads as responsive, not abrupt. */
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.25 }}
      onClick={onClose}
    >
      {/* Backdrop — heavier than a card scrim because the photograph
          behind it must stop competing entirely. */}
      <div
        className="absolute inset-0"
        style={{ background: 'color-mix(in srgb, var(--ink) 92%, transparent)', backdropFilter: 'blur(4px)' }}
        aria-hidden="true"
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lightbox-title"
        className="relative w-full max-w-5xl max-h-full flex flex-col"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.97, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration, ease: EASE_OUT_EXPO }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Controls row — above the image so the close target is always
            in the same place regardless of the photo's aspect ratio. */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <span
            className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em]"
            style={{ background: 'var(--accent-on-dark)', color: 'var(--ink)' }}
          >
            {item.category}
          </span>

          <div className="flex items-center gap-2">
            {items.length > 1 ? (
              <>
                <motion.button
                  type="button"
                  whileTap={tapFeedback}
                  onClick={() => go(-1)}
                  aria-label="Önceki proje"
                  className="w-11 h-11 flex items-center justify-center cursor-pointer rounded-sm transition-colors duration-200 text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  style={{ border: '1px solid var(--border-on-dark)' }}
                >
                  <ChevronLeft size={18} />
                </motion.button>
                <motion.button
                  type="button"
                  whileTap={tapFeedback}
                  onClick={() => go(1)}
                  aria-label="Sonraki proje"
                  className="w-11 h-11 flex items-center justify-center cursor-pointer rounded-sm transition-colors duration-200 text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  style={{ border: '1px solid var(--border-on-dark)' }}
                >
                  <ChevronRight size={18} />
                </motion.button>
              </>
            ) : null}
            <motion.button
              ref={closeRef}
              type="button"
              whileTap={tapFeedback}
              onClick={onClose}
              aria-label="Kapat"
              className="w-11 h-11 flex items-center justify-center cursor-pointer rounded-sm transition-colors duration-200 text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              style={{ border: '1px solid var(--border-on-dark)' }}
            >
              <X size={18} />
            </motion.button>
          </div>
        </div>

        {/* The photograph, ungraded. This is the one place on the site
            where a site photo is shown at full colour and full size. */}
        <img
          key={item.img}
          src={item.img}
          alt={item.alt}
          className="w-full min-h-0 flex-1 object-contain"
          style={{ maxHeight: '68vh', background: 'var(--ink-soft)' }}
        />

        <div className="mt-4 shrink-0">
          <h3 id="lightbox-title" className="font-display text-xl lg:text-2xl font-bold leading-tight text-white">
            {item.name}
          </h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs" style={{ color: 'rgba(255,255,255,0.72)' }}>
            <span className="flex items-center gap-1"><MapPin size={11} aria-hidden="true" />{item.location}</span>
            <span className="flex items-center gap-1"><Calendar size={11} aria-hidden="true" />{item.year}</span>
            {/* On this always-dark panel plain --accent measures 2.06 —
                --accent-on-dark is the verified gold for exactly this. */}
            <span className="font-bold" style={{ color: 'var(--accent-on-dark)' }}>{item.units}</span>
          </div>
          {/* The photo is from the company's own archive but is not
              necessarily a photo OF this job — say so rather than let the
              pairing imply it. */}
          <p className="text-xs mt-3 max-w-2xl" style={{ color: 'rgba(255,255,255,0.55)' }}>
            {item.alt}
          </p>
        </div>
      </motion.div>
</motion.div>
  )
}
