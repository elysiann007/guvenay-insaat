import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X, Phone, Sun, Moon, Monitor } from 'lucide-react'
import { useTheme, type ThemeMode } from '../hooks/useTheme'

const links = [
  { label: 'Ana Sayfa', href: '#hero' },
  { label: 'Hakkımızda', href: '#about' },
  { label: 'Hizmetler', href: '#services' },
  { label: 'Projeler', href: '#projects' },
  { label: 'İletişim', href: '#contact' },
]

const themeOrder: ThemeMode[] = ['system', 'light', 'dark']
const themeMeta: Record<ThemeMode, { label: string; Icon: typeof Sun }> = {
  system: { label: 'Sistem teması', Icon: Monitor },
  light: { label: 'Açık tema', Icon: Sun },
  dark: { label: 'Koyu tema', Icon: Moon },
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const reduceMotion = useReducedMotion()

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
        transition={{ duration: reduceMotion ? 0 : 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
        style={{
          background: onDark ? 'transparent' : 'color-mix(in srgb, var(--surface) 92%, transparent)',
          backdropFilter: onDark ? 'none' : 'blur(12px)',
          borderBottom: onDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid var(--border)',
          boxShadow: scrolled && !open ? '0 12px 28px -20px rgba(5,8,15,0.25)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <button onClick={() => handleNav('#hero')} className="flex items-center gap-3 cursor-pointer">
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
            </button>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-7">
              {links.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className={`text-[13px] font-semibold uppercase tracking-[0.12em] cursor-pointer rounded-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 ${
                    onDark
                      ? 'text-white/85 hover:text-white focus-visible:text-white focus-visible:outline-white'
                      : 'text-[var(--text-soft)] hover:text-[var(--accent-strong)] focus-visible:text-[var(--accent-strong)] focus-visible:outline-[var(--accent)]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA + theme toggle + hamburger */}
            <div className="flex items-center gap-1.5 lg:gap-2">
              <a
                href="tel:+902125550100"
                className={`hidden md:flex lg:hidden items-center gap-2 text-sm font-semibold rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${
                  onDark ? 'text-white focus-visible:outline-white' : 'text-[var(--text)] focus-visible:outline-[var(--accent)]'
                }`}
              >
                <Phone size={15} className={onDark ? 'text-white' : 'text-[var(--accent)]'} />
                (212) 555 0100
              </a>

              <ThemeToggle theme={theme} setTheme={setTheme} onDark={onDark} />

              <button
                onClick={() => handleNav('#contact')}
                className={`hidden lg:inline-flex !py-2.5 !px-6 ${onDark ? 'btn-on-dark' : 'btn-primary'}`}
              >
                Teklif Al
              </button>
              <button
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
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
            className="fixed inset-0 z-40 flex flex-col pt-24 px-6 pb-8 overflow-y-auto"
            style={{ background: 'var(--bg)' }}
          >
            <div className="flex flex-col">
              {links.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduceMotion ? 0 : i * 0.04, duration: reduceMotion ? 0 : 0.3 }}
                  onClick={() => handleNav(link.href)}
                  className="flex items-center justify-between text-left text-2xl font-bold font-display py-5 cursor-pointer hairline-bottom rounded-sm transition-colors duration-200 hover:text-[var(--accent-strong)] focus-visible:text-[var(--accent-strong)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
                  style={{ color: 'var(--text)' }}
                >
                  {link.label}
                  <span style={{ color: 'var(--accent)' }}>→</span>
                </motion.button>
              ))}
            </div>

            {/* Theme choice, spelled out for touch/keyboard users */}
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.2, duration: reduceMotion ? 0 : 0.3 }}
              className="pt-6"
            >
              <p className="eyebrow mb-3">Görünüm</p>
              <div className="flex items-center gap-2">
                {themeOrder.map((mode) => {
                  const { label, Icon } = themeMeta[mode]
                  const active = theme === mode
                  return (
                    <button
                      key={mode}
                      onClick={() => setTheme(mode)}
                      aria-pressed={active}
                      aria-label={label}
                      title={label}
                      className={`min-w-[44px] min-h-[44px] flex-1 flex items-center justify-center gap-2 border rounded-sm text-sm font-semibold transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                        active
                          ? 'border-[var(--accent)] text-[var(--accent-strong)]'
                          : 'border-[var(--border-control)] text-[var(--text-soft)] hover:text-[var(--accent-strong)] hover:border-[var(--accent)]'
                      }`}
                    >
                      <Icon size={16} />
                    </button>
                  )
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.3, duration: reduceMotion ? 0 : 0.3 }}
              className="mt-auto pt-8 flex flex-col gap-3"
            >
              <a href="tel:+902125550100" className="btn-secondary w-full">
                <Phone size={16} />
                (212) 555 0100
              </a>
              <button onClick={() => handleNav('#contact')} className="btn-primary w-full">
                Ücretsiz Teklif Al
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/** Desktop icon control: cycles system -> light -> dark -> system on click. */
function ThemeToggle({
  theme,
  setTheme,
  onDark,
}: {
  theme: ThemeMode
  setTheme: (mode: ThemeMode) => void
  onDark: boolean
}) {
  const { label, Icon } = themeMeta[theme]
  const next = themeOrder[(themeOrder.indexOf(theme) + 1) % themeOrder.length]
  const nextLabel = themeMeta[next].label

  return (
    <button
      onClick={() => setTheme(next)}
      aria-label={`${label} kullanılıyor, ${nextLabel} için değiştir`}
      title={nextLabel}
      className={`hidden md:flex w-11 h-11 items-center justify-center cursor-pointer rounded-sm border transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${
        onDark
          ? 'border-white/35 text-white hover:border-white hover:bg-white/10 focus-visible:outline-white'
          : 'border-[var(--border-strong)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent-strong)] focus-visible:outline-[var(--accent)]'
      }`}
    >
      <Icon size={18} />
    </button>
  )
}
