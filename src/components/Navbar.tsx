import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { DURATION, EASE_OUT_EXPO, useTapFeedback } from '../lib/motion'

const links = [
  { label: 'Ana Sayfa', href: '#hero' },
  { label: 'Hakkımızda', href: '#about' },
  { label: 'Hizmetler', href: '#services' },
  { label: 'Projeler', href: '#projects' },
  { label: 'Belgelerimiz', href: '#certificates' },
  { label: 'İletişim', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduceMotion = useReducedMotion()
  const tapFeedback = useTapFeedback()
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const wasOpenRef = useRef(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close mobile menu on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Focus containment for the mobile menu overlay: everything behind it
  // (main content + footer + the fixed mobile CTA bar, which sits at a
  // lower z-index under the same fixed inset-0 overlay) is made inert so
  // Tab can't reach the 59 elements hidden behind the opaque menu. Focus
  // moves into the menu on open and returns to the hamburger button on
  // close; the cleanup runs on every dependency change AND on unmount, so
  // inert never lingers if the component unmounts while the menu is open.
  useEffect(() => {
    const main = document.querySelector('main')
    const footer = document.querySelector('footer')
    const ctaBar = document.getElementById('mobile-cta-bar')

    if (open) {
      main?.setAttribute('inert', '')
      footer?.setAttribute('inert', '')
      ctaBar?.setAttribute('inert', '')
      menuRef.current?.focus()
    } else if (wasOpenRef.current) {
      hamburgerRef.current?.focus()
    }
    wasOpenRef.current = open

    return () => {
      main?.removeAttribute('inert')
      footer?.removeAttribute('inert')
      ctaBar?.removeAttribute('inert')
    }
  }, [open])

  const handleNav = (href: string) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  // Over the hero video the bar is transparent with white text (fixed —
  // the video scrim is always dark regardless of site theme, same
  // rationale as the .btn-on-dark treatment in index.css); once scrolled
  // it becomes a solid, theme-aware bar.
  const onDark = !scrolled && !open

  return (
    <>
      <motion.nav
        initial={{ y: reduceMotion ? 0 : -72 }}
        animate={{ y: 0 }}
        transition={{ duration: reduceMotion ? 0 : DURATION.slower, ease: EASE_OUT_EXPO }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Padding wrapper — keeps the floating bar clear of the viewport
            edge at every breakpoint. The bar itself (not this wrapper)
            carries the glass/solid background so the rounded corners are
            never clipped. */}
        <div className="px-5 md:px-8 lg:px-12 pt-4 lg:pt-6">
          <div
            className={`max-w-7xl mx-auto rounded-xl px-4 py-2 flex items-center justify-between transition-colors duration-300 ${onDark ? 'liquid-glass' : ''}`}
            style={{
              background: onDark ? undefined : 'color-mix(in srgb, var(--surface) 92%, transparent)',
              backdropFilter: onDark ? undefined : 'blur(12px)',
              WebkitBackdropFilter: onDark ? undefined : 'blur(12px)',
              border: onDark ? undefined : '1px solid var(--border)',
              boxShadow: scrolled && !open ? '0 12px 28px -20px rgba(5,8,15,0.25)' : 'none',
            }}
          >
            {/* Logo — min-h-11 gives the button a full 44px tap target even
                though the visible mark is only 36px tall */}
            <motion.button whileTap={tapFeedback} onClick={() => handleNav('#hero')} className="flex items-center gap-3 cursor-pointer min-h-11">
              <div
                className={`w-9 h-9 flex items-center justify-center text-sm font-black shrink-0 font-display transition-colors duration-300 ${
                  onDark ? 'bg-white text-[var(--ink)]' : 'bg-[var(--ink)] text-white'
                }`}
              >
                Gİ
              </div>
              <span
                className={`text-base lg:text-lg font-extrabold tracking-tight font-display transition-colors duration-300 ${
                  onDark ? 'text-white' : 'text-[var(--text)]'
                }`}
              >
                Güvenay İnşaat
              </span>
            </motion.button>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-7">
              {links.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className={`inline-flex items-center min-h-11 text-[13px] font-semibold uppercase tracking-[0.12em] cursor-pointer rounded-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 ${
                    onDark
                      ? 'text-white/85 hover:text-white focus-visible:text-white focus-visible:outline-white'
                      : 'text-[var(--text-soft)] hover:text-[var(--accent)] focus-visible:text-[var(--accent)] focus-visible:outline-[var(--accent)]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA + hamburger — gap-2 (8px) keeps adjacent tap targets spaced */}
            <div className="flex items-center gap-2">
              <a
                href="tel:+902125550100"
                className={`hidden md:flex lg:hidden items-center gap-2 text-sm font-semibold rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${
                  onDark ? 'text-white focus-visible:outline-white' : 'text-[var(--text)] focus-visible:outline-[var(--accent)]'
                }`}
              >
                <Phone size={15} className={onDark ? 'text-white' : 'text-[var(--accent)]'} />
                (212) 555 0100
              </a>

              <motion.button
                whileTap={tapFeedback}
                onClick={() => handleNav('#contact')}
                className={`hidden lg:inline-flex min-h-11 !py-2.5 !px-6 ${onDark ? 'btn-on-dark' : 'btn-primary'}`}
              >
                Teklif Al
              </motion.button>
              <motion.button
                ref={hamburgerRef}
                whileTap={tapFeedback}
                className={`lg:hidden w-11 h-11 flex items-center justify-center cursor-pointer rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  open
                    ? 'bg-[var(--ink)] text-white border border-[var(--ink)] focus-visible:outline-[var(--accent)]'
                    : onDark
                      ? 'bg-transparent text-white border border-white/35 focus-visible:outline-white'
                      : 'bg-transparent text-[var(--text)] border border-[var(--border-strong)] focus-visible:outline-[var(--accent)]'
                }`}
                onClick={() => setOpen(!open)}
                aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
                aria-expanded={open}
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
            className="fixed inset-0 z-40 flex flex-col pt-24 px-6 pb-8 overflow-y-auto outline-none"
            style={{ background: 'var(--bg)' }}
          >
            <div className="flex flex-col">
              {links.map((link, i) => (
                <motion.button
                  key={link.href}
                  whileTap={tapFeedback}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduceMotion ? 0 : i * 0.04, duration: reduceMotion ? 0 : 0.3 }}
                  onClick={() => handleNav(link.href)}
                  className="flex items-center justify-between text-left text-2xl font-bold font-display py-5 cursor-pointer hairline-bottom rounded-sm transition-colors duration-200 hover:text-[var(--accent)] focus-visible:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
                  style={{ color: 'var(--text)' }}
                >
                  {link.label}
                  <span style={{ color: 'var(--accent)' }}>→</span>
                </motion.button>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.2, duration: reduceMotion ? 0 : 0.3 }}
              className="mt-auto pt-8 flex flex-col gap-3"
            >
              <motion.a whileTap={tapFeedback} href="tel:+902125550100" className="btn-secondary w-full">
                <Phone size={16} />
                (212) 555 0100
              </motion.a>
              <motion.button whileTap={tapFeedback} onClick={() => handleNav('#contact')} className="btn-primary w-full">
                Ücretsiz Teklif Al
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
