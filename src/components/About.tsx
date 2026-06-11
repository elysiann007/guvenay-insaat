import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CheckCircle, Award, Users, Shield } from 'lucide-react'

const values = [
  { icon: Shield, label: 'Güvenilirlik', desc: 'Her projede verilen sözü yerine getiriyoruz.' },
  { icon: Award, label: 'Kalite', desc: 'Uluslararası standartlarda yapı malzemeleri kullanıyoruz.' },
  { icon: Users, label: 'Müşteri Odaklı', desc: 'Hayalinizdeki projeyi birlikte tasarlıyoruz.' },
  { icon: CheckCircle, label: 'Zamanında Teslimat', desc: 'Söz verdiğimiz tarihte, eksiksiz teslim ediyoruz.' },
]

const milestones = [
  { year: '1994', title: 'Kuruluş', desc: "İstanbul'da küçük bir ekiple temeller atıldı." },
  { year: '2002', title: 'Büyüme', desc: '50+ çalışan ve ilk büyük konut projesi tamamlandı.' },
  { year: '2010', title: 'Ulusal Genişleme', desc: "Türkiye'nin 10 şehrinde aktif şantiye kuruldu." },
  { year: '2018', title: 'ISO Sertifikası', desc: 'ISO 9001:2015 kalite belgesi alındı.' },
  { year: '2024', title: 'Bugün', desc: '500+ proje, 10.000+ mutlu aile ve büyümeye devam.' },
]

const EASE = 'easeOut' as const
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const lineH = useTransform(scrollYProgress, [0.1, 0.8], ['0%', '100%'])

  return (
    <section id="about" ref={sectionRef} className="relative py-24 lg:py-40 overflow-hidden" style={{ background: 'var(--dark-2)' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 diagonal-bg" />
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200,169,110,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="text-center mb-20"
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: 'var(--gold)' }} />
            <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: 'var(--gold)' }}>
              Hakkımızda
            </span>
            <div className="h-px w-10" style={{ background: 'var(--gold)' }} />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-4xl lg:text-6xl font-black leading-tight mb-6"
            style={{ color: 'var(--warm-white)', fontFamily: 'Montserrat, sans-serif' }}
          >
            Türkiye'nin <span className="gradient-text">Güvenilir</span>
            <br />İnşaat Ortağı
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="max-w-2xl mx-auto text-base lg:text-lg leading-relaxed"
            style={{ color: 'rgba(245,240,232,0.55)' }}
          >
            1994'ten bu yana Güvenay İnşaat olarak konut, ticari ve endüstriyel alanlarda
            yüzlerce proje tamamladık. Güven, kalite ve yenilik üzerine kurulu değerlerimizle
            her projeyi bir başyapıta dönüştürüyoruz.
          </motion.p>
        </motion.div>

        {/* Values grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          {values.map((v) => (
            <motion.div
              key={v.label}
              variants={fadeUp}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-sm relative overflow-hidden group card-glow"
              style={{
                background: 'var(--dark-3)',
                border: '1px solid rgba(200,169,110,0.1)',
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'linear-gradient(135deg, rgba(200,169,110,0.05) 0%, transparent 60%)' }}
              />
              <div
                className="w-12 h-12 rounded-sm flex items-center justify-center mb-4"
                style={{ background: 'rgba(200,169,110,0.1)' }}
              >
                <v.icon size={22} style={{ color: 'var(--gold)' }} />
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--warm-white)' }}>{v.label}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.5)' }}>{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline + visual */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            <motion.h3
              variants={fadeUp}
              className="text-3xl font-black mb-10"
              style={{ color: 'var(--warm-white)' }}
            >
              30 Yıllık <span className="gradient-text">Hikayemiz</span>
            </motion.h3>

            <div className="relative">
              {/* Animated vertical line */}
              <div
                className="absolute left-[19px] top-0 bottom-0 w-px overflow-hidden"
                style={{ background: 'rgba(200,169,110,0.1)' }}
              >
                <motion.div
                  className="absolute top-0 left-0 right-0"
                  style={{ height: lineH, background: 'linear-gradient(to bottom, var(--gold), transparent)' }}
                />
              </div>

              <div className="flex flex-col gap-8">
                {milestones.map((m, i) => (
                  <motion.div key={m.year} variants={fadeUp} className="flex gap-6 group">
                    <div className="relative flex-shrink-0 mt-1">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: i === milestones.length - 1 ? 'var(--gold)' : 'var(--dark-3)',
                          border: `1px solid ${i === milestones.length - 1 ? 'var(--gold)' : 'rgba(200,169,110,0.3)'}`,
                          color: i === milestones.length - 1 ? 'var(--dark)' : 'var(--gold)',
                          zIndex: 1,
                        }}
                      >
                        {m.year.slice(2)}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm font-semibold" style={{ color: 'var(--gold)' }}>{m.year}</span>
                        <span className="text-sm font-bold" style={{ color: 'var(--warm-white)' }}>{m.title}</span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.5)' }}>{m.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Visual panel */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, ease: EASE }}
            className="relative"
          >
            <div
              className="relative overflow-hidden"
              style={{
                background: 'var(--dark-3)',
                border: '1px solid rgba(200,169,110,0.1)',
                borderRadius: '4px',
                aspectRatio: '4/3',
              }}
            >
              {/* Blueprint SVG art */}
              <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 300" style={{ color: 'var(--gold)' }}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 30 + 15} x2="400" y2={i * 30 + 15} stroke="currentColor" strokeWidth="0.5" />
                ))}
                {Array.from({ length: 14 }).map((_, i) => (
                  <line key={`v${i}`} x1={i * 30 + 5} y1="0" x2={i * 30 + 5} y2="300" stroke="currentColor" strokeWidth="0.5" />
                ))}
                <rect x="80" y="80" width="240" height="160" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <rect x="100" y="40" width="200" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" />
                {[110, 155, 200, 245, 290].map((x) => [130, 170, 210].map((y) => (
                  <rect key={`w${x}${y}`} x={x} y={y} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1" />
                )))}
                <line x1="70" y1="80" x2="70" y2="240" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4,3" />
                <line x1="80" y1="260" x2="320" y2="260" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4,3" />
                <rect x="185" y="210" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.2" />
              </svg>

              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold tracking-widest uppercase mb-4"
                  style={{ background: 'rgba(200,169,110,0.15)', color: 'var(--gold)', borderRadius: '2px', width: 'fit-content' }}
                >
                  Türkiye Geneli
                </div>
                <h3 className="text-2xl font-black mb-2" style={{ color: 'var(--warm-white)' }}>
                  Her Şehirde<br />Güvenay Kalitesi
                </h3>
                <p className="text-sm" style={{ color: 'rgba(245,240,232,0.5)' }}>
                  İstanbul'dan Antalya'ya, Ankara'dan İzmir'e...
                </p>
                <div className="flex gap-4 mt-6">
                  {['İstanbul', 'Ankara', 'İzmir', '+7 Şehir'].map((city) => (
                    <div key={city} className="text-xs tracking-wider" style={{ color: 'var(--gold)' }}>
                      {city}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-5 -right-5 w-24 h-24 rounded-full flex flex-col items-center justify-center text-center"
              style={{ background: 'var(--gold)', color: 'var(--dark)' }}
            >
              <div className="text-2xl font-black leading-none">30+</div>
              <div className="text-[9px] font-bold tracking-wider uppercase leading-tight mt-0.5">Yıl<br />Tecrübe</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
