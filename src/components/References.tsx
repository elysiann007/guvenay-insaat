import { motion, useReducedMotion } from 'framer-motion'
import RevealHeading from './RevealHeading'
import { DURATION, EASE_OUT_EXPO, useFadeVariants, VIEWPORT_ONCE } from '../lib/motion'

// Firmanın kendi referans dosyasındaki (docs/) 1995–2026 iş listesinden
// çıkarılan tekil kurum adları. Uydurma müşteri yorumu yerine doğrulanabilir
// referans: her isim listede en az bir tamamlanmış işe karşılık gelir.
// `since` alanı o kurumla kayıtlı ilk işin yılıdır.
const clients = [
  { name: 'TEDAŞ', since: '1996' },
  { name: 'ESBAŞ A.Ş.', since: '2004' },
  { name: 'GÜLER MÜH.', since: '2007' },
  { name: 'MET MÜH. A.Ş.', since: '2008' },
  { name: 'PUNTAYELİ A.Ş.', since: '2015' },
  { name: 'KOZA ELK. A.Ş.', since: '2006' },
  { name: 'MAKRO ELK.', since: '2006' },
  { name: 'GÜROKUR MÜH.', since: '2021' },
  { name: 'ATİK METAL A.Ş.', since: '2022' },
  { name: 'SARKUYSAN A.Ş.', since: '2022' },
  { name: 'BASBAŞ A.Ş.', since: '2025' },
  { name: 'AKGÜN ELK.', since: '2024' },
  { name: 'HABAŞ', since: '2005' },
  { name: 'OYAK A.Ş.', since: '2008' },
  { name: 'SANEL MÜH.', since: '2009' },
  { name: 'SENKRON MÜH.', since: '2011' },
  { name: 'KANİ ÜLKER MÜH.', since: '2013' },
  { name: 'ENİSOLAR A.Ş.', since: '2023' },
  { name: 'TURAN PAZARLI ELK.', since: '2018' },
  { name: 'EGE PRESTİJ ELK.', since: '2023' },
  { name: 'MET-KA ELK.', since: '2015' },
  { name: 'TEMÜ-TAŞ A.Ş.', since: '2005' },
  { name: 'BAYINDIR A.Ş.', since: '1997' },
  { name: 'ELEKTROMAK ELK.', since: '2003' },
]

export default function References() {
  const fade = useFadeVariants()
  const reduceMotion = useReducedMotion()

  return (
    <section id="references" className="relative py-20 lg:py-32" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: reduceMotion ? 0 : DURATION.slower, ease: EASE_OUT_EXPO }}
          className="max-w-2xl mb-12 lg:mb-16"
        >
          <span className="eyebrow">Referanslarımız</span>
          <RevealHeading
            as="h2"
            lines={['Çalıştığımız Kurumlar']}
            className="font-display text-4xl lg:text-5xl font-black tracking-tight mt-5 leading-[1.05]"
            style={{ color: 'var(--text)' }}
          />
          <p className="text-base lg:text-lg mt-5" style={{ color: 'var(--text-soft)' }}>
            1995'ten bu yana kamu kurumları, organize sanayi bölgeleri ve elektrik
            müteahhitleri için imalat yapıyoruz. Çoğuyla ilk işten sonra çalışmaya
            devam ettik.
          </p>
        </motion.div>

        {/* Ruled grid — Services'teki aynı hairline hücre deseni */}
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fade.stagger}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 border-t border-l"
          style={{ borderColor: 'var(--border)' }}
        >
          {clients.map((c) => (
            <motion.li
              key={c.name}
              variants={fade.item}
              className="group relative px-5 py-6 lg:px-7 lg:py-7 border-b border-r transition-colors duration-200 hover:bg-surface"
              style={{ borderColor: 'var(--border)' }}
            >
              <span
                className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                style={{ background: 'var(--accent)' }}
              />
              <div className="font-display text-base lg:text-lg font-bold leading-tight" style={{ color: 'var(--text)' }}>
                {c.name}
              </div>
              {/* "{yıl}'ten beri" yazmıyoruz: ekin ünlü uyumu yılın okunuşuna
                  göre değişiyor (1996'dan, 2007'den, 2015'ten). Etiket biçimi
                  bu sorunu tamamen ortadan kaldırıyor. */}
              <div className="text-xs mt-1.5 tabular-nums" style={{ color: 'var(--text-dim)' }}>
                İlk iş · {c.since}
              </div>
            </motion.li>
          ))}
        </motion.ul>

        <p className="text-sm mt-8" style={{ color: 'var(--text-dim)' }}>
          Yıl yıl tam referans listemizi talep üzerine iletiyoruz.
        </p>
      </div>
    </section>
  )
}
