import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react'

const footerLinks = {
  'Hizmetler': ['Konut Projeleri', 'Ticari Yapılar', 'Endüstriyel Tesisler', 'Restorasyon', 'Altyapı'],
  'Kurumsal': ['Hakkımızda', 'Kariyer', 'Basın', 'Sertifikalar', 'Sürdürülebilirlik'],
  'Projeler': ['Tamamlanan', 'Devam Eden', 'Referanslar', 'Ödüller'],
}

const socials = [
  { label: 'Instagram', path: 'M12 2.2c3.2 0 3.6 0 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.22-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.93 3.9 2.38 7.15 2.23 8.42 2.18 8.8 2.16 12 2.16zM12 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.4-11.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z' },
  { label: 'LinkedIn', path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
  { label: 'Facebook', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
  { label: 'YouTube', path: 'M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12z' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ink)' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Main */}
        <div className="py-14 lg:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 flex items-center justify-center text-sm font-black font-display" style={{ background: '#fff', color: 'var(--ink)' }}>
                Gİ
              </div>
              <span className="text-lg font-extrabold text-white font-display tracking-tight">
                Güvenay İnşaat
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-7 max-w-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
              1994'ten bu yana Türkiye'nin dört bir yanında kalıcı yapılar inşa ediyoruz.
            </p>
            <div className="flex flex-col gap-3">
              {[
                { icon: Phone, text: '+90 (212) 555 0100', href: 'tel:+902125550100' },
                { icon: Mail, text: 'info@guvenayinsaat.com.tr', href: 'mailto:info@guvenayinsaat.com.tr' },
                { icon: MapPin, text: 'Maslak, İstanbul', href: undefined },
              ].map((c) => (
                <a
                  key={c.text}
                  href={c.href}
                  className="flex items-center gap-2.5 text-sm transition-colors hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  <c.icon size={14} style={{ color: '#E8B08A', flexShrink: 0 }} />
                  {c.text}
                </a>
              ))}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2.5 mt-8">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-10 h-10 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                  style={{ border: '1px solid var(--border-on-dark)', color: 'rgba(255,255,255,0.7)' }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.22em] mb-6" style={{ color: '#E8B08A' }}>
                {title}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm transition-colors duration-200 hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.55)' }}
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
          className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left"
          style={{ borderTop: '1px solid var(--border-on-dark)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            © 2024 Güvenay İnşaat. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-5 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <a href="#" className="transition-colors hover:text-white" style={{ color: 'inherit' }}>Gizlilik</a>
            <a href="#" className="transition-colors hover:text-white" style={{ color: 'inherit' }}>Kullanım Koşulları</a>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={() => document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' })}
        className="fixed bottom-5 right-5 w-12 h-12 flex items-center justify-center z-40 cursor-pointer transition-transform duration-300 hover:-translate-y-1"
        style={{ background: 'var(--accent)', color: '#fff' }}
        aria-label="Yukarı çık"
      >
        <ArrowUp size={18} />
      </button>
    </footer>
  )
}
