import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const links = [
  { label: 'Ana Sayfa', href: '#hero' },
  { label: 'Hakkımızda', href: '#about' },
  { label: 'Hizmetler', href: '#services' },
  { label: 'Projeler', href: '#projects' },
  { label: 'İletişim', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleNav = (href: string) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  // Over the hero video the bar is transparent with white text; once scrolled it goes light
  const onDark = !scrolled && !open

  return (
    <>
      <motion.nav
        initial={{ y: -72 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
        style={{
          background: onDark ? 'transparent' : 'rgba(250,250,247,0.92)',
          backdropFilter: onDark ? 'none' : 'blur(12px)',
          borderBottom: onDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid var(--border)',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <button onClick={() => handleNav('#hero')} className="flex items-center gap-3 cursor-pointer">
              <div
                className="w-9 h-9 flex items-center justify-center text-sm font-black shrink-0 font-display transition-colors duration-300"
                style={{
                  background: onDark ? '#fff' : 'var(--ink)',
                  color: onDark ? 'var(--ink)' : '#fff',
                }}
              >
                Gİ
              </div>
              <span
                className="text-base lg:text-lg font-extrabold tracking-tight font-display transition-colors duration-300"
                style={{ color: onDark ? '#fff' : 'var(--text)' }}
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
                  className="text-[13px] font-semibold uppercase tracking-[0.12em] cursor-pointer transition-colors duration-200"
                  style={{ color: onDark ? 'rgba(255,255,255,0.85)' : 'var(--text-soft)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = onDark ? '#fff' : 'var(--accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = onDark ? 'rgba(255,255,255,0.85)' : 'var(--text-soft)')}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-2">
              <a
                href="tel:+902125550100"
                className="hidden md:flex lg:hidden items-center gap-2 text-sm font-semibold transition-colors"
                style={{ color: onDark ? '#fff' : 'var(--text)' }}
              >
                <Phone size={15} style={{ color: onDark ? '#fff' : 'var(--accent)' }} />
                (212) 555 0100
              </a>
              <button
                onClick={() => handleNav('#contact')}
                className={`hidden lg:inline-flex !py-2.5 !px-6 ${onDark ? 'btn-on-dark' : 'btn-primary'}`}
              >
                Teklif Al
              </button>
              <button
                className="lg:hidden w-11 h-11 flex items-center justify-center cursor-pointer transition-colors"
                style={{
                  background: open ? 'var(--ink)' : 'transparent',
                  color: open ? '#fff' : onDark ? '#fff' : 'var(--text)',
                  border: onDark && !open ? '1px solid rgba(255,255,255,0.35)' : '1px solid var(--border-strong)',
                }}
                onClick={() => setOpen(!open)}
                aria-label="Menü"
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
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col pt-24 px-6 pb-8 overflow-y-auto"
            style={{ background: 'var(--bg)' }}
          >
            <div className="flex flex-col">
              {links.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNav(link.href)}
                  className="flex items-center justify-between text-left text-2xl font-bold font-display py-5 cursor-pointer hairline-bottom"
                  style={{ color: 'var(--text)' }}
                >
                  {link.label}
                  <span style={{ color: 'var(--accent)' }}>→</span>
                </motion.button>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
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
