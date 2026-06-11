import { motion } from 'framer-motion'
import { Phone, Mail, MapPin } from 'lucide-react'

const footerLinks = {
  'Hizmetler': ['Konut Projeleri', 'Ticari Yapılar', 'Endüstriyel Tesisler', 'Restorasyon', 'Altyapı'],
  'Kurumsal': ['Hakkımızda', 'Kariyer', 'Basın', 'Sertifikalar', 'Sürdürülebilirlik'],
  'Projeler': ['Tamamlanan', 'Devam Eden', 'Referanslar', 'Ödüller'],
}

function SocialIcon({ label, path }: { label: string; path: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.15, y: -2 }}
      whileTap={{ scale: 0.9 }}
      aria-label={label}
      className="w-8 h-8 rounded-sm flex items-center justify-center transition-colors duration-300"
      style={{
        background: 'rgba(200,169,110,0.06)',
        border: '1px solid rgba(200,169,110,0.12)',
        color: 'rgba(245,240,232,0.5)',
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d={path} />
      </svg>
    </motion.button>
  )
}

const socials = [
  { label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
  { label: 'LinkedIn', path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
  { label: 'Facebook', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
  { label: 'YouTube', path: 'M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z M9.75 15.02l5.75-3.02-5.75-3.02v6.04z' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--dark)', borderTop: '1px solid rgba(200,169,110,0.08)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-9 h-9 flex-shrink-0">
                <div className="absolute inset-0 rounded rotate-45" style={{ background: 'var(--gold)', opacity: 0.9 }} />
                <span className="absolute inset-0 flex items-center justify-center text-sm font-black" style={{ color: 'var(--dark)' }}>Gİ</span>
              </div>
              <div>
                <div className="text-sm font-black tracking-wider" style={{ color: 'var(--warm-white)' }}>GÜVENAY</div>
                <div className="text-xs font-semibold tracking-widest" style={{ color: 'var(--gold)' }}>İNŞAAT</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(245,240,232,0.4)' }}>
              1994'ten bu yana Türkiye'nin dört bir yanında kalıcı yapılar inşa ediyoruz.
            </p>
            <div className="flex flex-col gap-3">
              {[
                { icon: Phone, text: '+90 (212) 555 0100' },
                { icon: Mail, text: 'info@guvenayinsaat.com.tr' },
                { icon: MapPin, text: 'Maslak, İstanbul' },
              ].map((c) => (
                <div key={c.text} className="flex items-center gap-2.5 text-xs" style={{ color: 'rgba(245,240,232,0.5)' }}>
                  <c.icon size={13} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                  {c.text}
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--gold)' }}>
                {title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs transition-colors duration-300"
                      style={{ color: 'rgba(245,240,232,0.4)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-light)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,240,232,0.4)')}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(200,169,110,0.08)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(245,240,232,0.3)' }}>
            © 2024 Güvenay İnşaat. Tüm hakları saklıdır.
          </p>

          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <SocialIcon key={s.label} label={s.label} path={s.path} />
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs" style={{ color: 'rgba(245,240,232,0.3)' }}>
            <a href="#" style={{ color: 'inherit' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,240,232,0.3)')}
            >Gizlilik</a>
            <span>·</span>
            <a href="#" style={{ color: 'inherit' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,240,232,0.3)')}
            >Kullanım Koşulları</a>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <motion.button
        onClick={() => document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' })}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-sm flex items-center justify-center z-40"
        style={{ background: 'var(--gold)', color: 'var(--dark)', boxShadow: '0 4px 20px rgba(200,169,110,0.4)' }}
        aria-label="Yukarı çık"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 12V4M4 8l4-4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.button>
    </footer>
  )
}
