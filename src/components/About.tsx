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

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const lineH = useTransform(scrollYProgress, [0.15, 0.75], ['0%', '100%'])

  return (
    <section id="about" ref={sectionRef} className="relative py-20 lg:py-32" style={{ background: 'var(--bg-alt)' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Split: image + intro/values */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20 lg:mb-28">
          {/* Image with offset accent frame */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="img-frame relative z-0 max-w-md lg:max-w-none mx-auto w-full"
          >
            <div className="relative overflow-hidden group">
              <img
                src="/media/about.webp"
                alt="Güvenay İnşaat mühendisleri şantiyede proje çizimlerini inceliyor"
                className="img-tone w-full object-cover"
                style={{ aspectRatio: '3/4' }}
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Text column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <span className="eyebrow">Hakkımızda</span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-h2 font-extrabold mt-5"
              style={{ color: 'var(--text)' }}
            >
              Türkiye'nin Güvenilir İnşaat Ortağı
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base lg:text-lg leading-relaxed mt-6" style={{ color: 'var(--text-soft)' }}>
              1994'ten bu yana konut, ticari ve endüstriyel alanlarda yüzlerce proje tamamladık.
              Güven, kalite ve yenilik üzerine kurulu değerlerimizle her projeyi bir başyapıta dönüştürüyoruz.
            </motion.p>

            {/* Values as hairline-separated rows */}
            <div className="mt-10">
              {values.map((v) => (
                <motion.div key={v.label} variants={fadeUp} className="group flex items-start gap-5 py-5 hairline-top last:hairline-bottom transition-all duration-300 hover:pl-2">
                  <v.icon size={20} className="shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" style={{ color: 'var(--accent)' }} />
                  <div>
                    <h3 className="font-display text-h3 font-bold" style={{ color: 'var(--text)' }}>{v.label}</h3>
                    <p className="text-sm leading-relaxed mt-1" style={{ color: 'var(--text-soft)' }}>{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={stagger}
          className="max-w-3xl"
        >
          <motion.h3 variants={fadeUp} className="font-display text-3xl lg:text-4xl font-black mb-10" style={{ color: 'var(--text)' }}>
            30 Yıllık Hikayemiz
          </motion.h3>

          <div className="relative">
            <div className="absolute left-[7px] top-2 bottom-2 w-px" style={{ background: 'var(--border-strong)' }}>
              <motion.div className="absolute top-0 left-0 right-0" style={{ height: lineH, background: 'var(--accent)' }} />
            </div>

            <div className="flex flex-col gap-8">
              {milestones.map((m, i) => (
                <motion.div key={m.year} variants={fadeUp} className="flex gap-7">
                  <div
                    className="relative z-10 w-[15px] h-[15px] mt-1.5 shrink-0"
                    style={{
                      background: i === milestones.length - 1 ? 'var(--accent)' : 'var(--bg-alt)',
                      border: `2px solid ${i === milestones.length - 1 ? 'var(--accent)' : 'var(--border-strong)'}`,
                    }}
                  />
                  <div>
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-lg font-black" style={{ color: 'var(--accent-strong)' }}>{m.year}</span>
                      <span className="font-display font-bold text-base lg:text-lg" style={{ color: 'var(--text)' }}>{m.title}</span>
                    </div>
                    <p className="text-sm leading-relaxed mt-1" style={{ color: 'var(--text-soft)' }}>{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
