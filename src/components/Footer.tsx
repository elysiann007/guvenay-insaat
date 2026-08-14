import { motion } from 'framer-motion'
import { MapPin, ArrowUp } from 'lucide-react'
import { useTapFeedback } from '../lib/motion'

// Her bağlantı sayfada gerçekten var olan bir bölüme gider. Var olmayan
// sayfalara (Kariyer, Basın, Sertifikalar…) çıkan ölü linkler kaldırıldı.
const footerLinks = {
  'İmalatlarımız': [
    { label: 'Kablo Kanal Kazısı & Kablo Serimi', href: '#services' },
    { label: 'Trafo Temeli & Trafo Binası', href: '#services' },
    { label: 'Aydınlatma Direkleri', href: '#services' },
    { label: 'Boru, Drenaj & Pissu Hatları', href: '#services' },
    { label: 'Üst Yapı Restorasyonu', href: '#services' },
  ],
  'Kurumsal': [
    { label: 'Hakkımızda', href: '#about' },
    { label: 'Nasıl Çalışıyoruz', href: '#process' },
    { label: 'Seçilmiş İşlerimiz', href: '#projects' },
    { label: 'Çalıştığımız Kurumlar', href: '#references' },
    { label: 'Teklif Al', href: '#contact' },
  ],
}

// Footer sits on --ink, an always-dark surface in both themes, so on-dark
// content conventions apply (see .eyebrow-on-dark / --border-on-dark in
// src/index.css) rather than the light/dark --text tokens.
export default function Footer() {
  const tapFeedback = useTapFeedback()
  return (
    <footer className="bg-[var(--ink)]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Main */}
        <div className="py-14 lg:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
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
              1994'ten bu yana İzmir ve Ege bölgesinde kablo kanal kazısı,
              kablo serimi, trafo temeli ve boru altyapısı imalatı yapıyoruz.
            </p>

            {/* Telefon/e-posta satırları firmadan doğrulanmış bilgi gelene
                kadar yok — bkz. docs/EKSIK-BILGILER.md. */}
            <address className="flex flex-col not-italic">
              <span className="flex items-center gap-2.5 min-h-11 py-2 text-sm text-white/65">
                <MapPin size={14} className="shrink-0 text-[var(--accent)]" />
                İzmir / Ege Bölgesi
              </span>
            </address>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="eyebrow eyebrow-on-dark mb-6">{title}</h4>
              <ul className="flex flex-col">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="flex items-center min-h-11 py-2 text-sm text-white/55 rounded-sm transition-colors duration-200 hover:text-white focus-visible:text-white"
                    >
                      {link.label}
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
            © {new Date().getFullYear()} Güvenay İnşaat. Tüm hakları saklıdır.
          </p>
          {/* Gizlilik / KVKK metinleri hazırlanınca buraya bağlanacak —
              bkz. docs/EKSIK-BILGILER.md. Boş "#" linkleri kaldırıldı. */}
        </div>
      </div>

      {/* Back to top — --accent is a single role now (ALTYAPI-PLAN §1): it
          works unmodified as a filled control carrying a white icon. Lifted
          clear of the mobile sticky CTA bar (App.tsx, ~78.4px tall) with a
          16px+ gap on small screens; the bar is hidden from md: up so
          bottom-5 is safe there. */}
      <motion.button
        whileTap={tapFeedback}
        onClick={() => document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' })}
        className="fixed right-5 bottom-[calc(6rem+env(safe-area-inset-bottom))] md:bottom-5 w-12 h-12 flex items-center justify-center z-40 cursor-pointer bg-[var(--accent)] text-white rounded-sm transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        aria-label="Yukarı çık"
      >
        <ArrowUp size={18} />
      </motion.button>
    </footer>
  )
}
