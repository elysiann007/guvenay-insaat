import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Menu, X } from 'lucide-react'

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
  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    setOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] z-[60]"
        style={{ width: progressWidth, background: 'linear-gradient(90deg, var(--gold-dark), var(--gold-light))' }}
      />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(8,8,8,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(200,169,110,0.1)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <button
              onClick={() => handleNav('#hero')}
              className="flex items-center gap-3 group"
            >
              <div className="relative w-9 h-9">
                <div
                  className="absolute inset-0 rounded rotate-45"
                  style={{ background: 'var(--gold)', opacity: 0.9 }}
                />
                <span
                  className="absolute inset-0 flex items-center justify-center text-sm font-black"
                  style={{ color: 'var(--dark)' }}
                >
                  Gİ
                </span>
              </div>
              <span
                className="text-lg font-bold tracking-wider hidden sm:block"
                style={{ color: 'var(--warm-white)', fontFamily: 'Montserrat, sans-serif' }}
              >
                GÜVENAY <span style={{ color: 'var(--gold)' }}>İNŞAAT</span>
              </span>
            </button>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-8">
              {links.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="relative text-sm font-medium tracking-widest uppercase group"
                  style={{ color: 'rgba(245,240,232,0.7)' }}
                >
                  <span className="transition-colors duration-300 group-hover:text-[var(--gold-light)]">
                    {link.label}
                  </span>
                  <span
                    className="absolute -bottom-1 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-300"
                    style={{ background: 'var(--gold)' }}
                  />
                </button>
              ))}
            </div>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNav('#contact')}
                className="hidden lg:flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-widest uppercase"
                style={{
                  background: 'var(--gold)',
                  color: 'var(--dark)',
                  borderRadius: '2px',
                }}
              >
                Teklif Al
              </motion.button>

              <button
                className="lg:hidden p-2"
                style={{ color: 'var(--gold)' }}
                onClick={() => setOpen(!open)}
                aria-label="Menu"
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
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 flex flex-col pt-20 px-8"
            style={{ background: 'rgba(8,8,8,0.98)', backdropFilter: 'blur(30px)' }}
          >
            <div className="flex flex-col gap-6 mt-8">
              {links.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => handleNav(link.href)}
                  className="text-left text-2xl font-bold tracking-wider uppercase"
                  style={{ color: 'var(--warm-white)' }}
                >
                  <span
                    className="block border-b pb-4"
                    style={{ borderColor: 'rgba(200,169,110,0.15)' }}
                  >
                    {link.label}
                  </span>
                </motion.button>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={() => handleNav('#contact')}
              className="mt-10 py-4 text-sm font-semibold tracking-widest uppercase"
              style={{ background: 'var(--gold)', color: 'var(--dark)', borderRadius: '2px' }}
            >
              Teklif Al
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
