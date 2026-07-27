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

// Footer sits on --ink, an always-dark surface in both themes, so on-dark
// content conventions apply (see .eyebrow-on-dark / --border-on-dark in
// src/index.css) rather than the light/dark --text tokens.
export default function Footer() {
  return (
    <footer className="bg-[var(--ink)]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Main */}
        <div className="py-14 lg:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 flex items-center justify-center text-sm font-black font-display bg-white text-[var(--ink)]">
                Gİ
              </div>
              <span className="text-lg font-extrabold text-white font-display tracking-tight">
                Güvenay İnşaat
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-7 max-w-xs text-white/55">
              1994'ten bu yana Türkiye'nin dört bir yanında kalıcı yapılar inşa ediyoruz.
            </p>

            <address className="flex flex-col gap-3 not-italic">
              <a
                href="tel:+902125550100"
                className="flex items-center gap-2.5 text-sm text-white/65 rounded-sm transition-colors duration-200 hover:text-white focus-visible:text-white"
              >
                <Phone size={14} className="shrink-0 text-[var(--accent)]" />
                +90 (212) 555 0100
              </a>
              <a
                href="mailto:info@guvenayinsaat.com.tr"
                className="flex items-center gap-2.5 text-sm text-white/65 rounded-sm transition-colors duration-200 hover:text-white focus-visible:text-white"
              >
                <Mail size={14} className="shrink-0 text-[var(--accent)]" />
                info@guvenayinsaat.com.tr
              </a>
              <span className="flex items-center gap-2.5 text-sm text-white/65">
                <MapPin size={14} className="shrink-0 text-[var(--accent)]" />
                Maslak, İstanbul
              </span>
            </address>

            {/* Socials */}
            <div className="flex items-center gap-2.5 mt-8">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-11 h-11 flex items-center justify-center border border-[var(--border-on-dark)] text-white/70 rounded-sm transition-all duration-300 hover:-translate-y-0.5 hover:text-white hover:border-white/40 focus-visible:-translate-y-0.5 focus-visible:text-white"
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
              <h4 className="eyebrow eyebrow-on-dark mb-6">{title}</h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/55 rounded-sm transition-colors duration-200 hover:text-white focus-visible:text-white"
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
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left border-t border-[var(--border-on-dark)]">
          <p className="text-xs text-white/55">
            © 2024 Güvenay İnşaat. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-5 text-xs text-white/55">
            <a href="#" className="rounded-sm transition-colors hover:text-white focus-visible:text-white">Gizlilik</a>
            <a href="#" className="rounded-sm transition-colors hover:text-white focus-visible:text-white">Kullanım Koşulları</a>
          </div>
        </div>
      </div>

      {/* Back to top — accent-strong fill, not accent: a filled control
          carrying a white icon, same rule as any filled control with
          white content (see REDESIGN-PLAN.md §0). */}
      <button
        onClick={() => document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' })}
        className="fixed bottom-5 right-5 w-12 h-12 flex items-center justify-center z-40 cursor-pointer bg-[var(--accent-strong)] text-white rounded-sm transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        aria-label="Yukarı çık"
      >
        <ArrowUp size={18} />
      </button>
    </footer>
  )
}
