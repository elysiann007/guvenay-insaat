import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, useInView } from 'framer-motion'
import { CheckCircle, Award, Users, Shield } from 'lucide-react'
import RevealHeading from './RevealHeading'
import { useFadeVariants, VIEWPORT_ONCE } from '../lib/motion'

const values = [
  { icon: Shield, label: 'Güvenilirlik', desc: 'Her enerji ve telekom projesinde verdiğimiz sözü sahada karşılıyoruz.' },
  { icon: Award, label: 'Mühendislik Kalitesi', desc: 'Enerji iletimi ve telekom altyapısında teknik standartlara uygun malzeme ve işçilik kullanıyoruz.' },
  { icon: Users, label: 'Müşteri Odaklı', desc: 'İşletmenizin ihtiyacına uygun altyapı çözümünü birlikte tasarlıyoruz.' },
  { icon: CheckCircle, label: 'Zamanında Devreye Alma', desc: 'Söz verdiğimiz sürede sahayı test edip devreye alıyoruz.' },
]

const milestones = [
  { year: '1994', title: 'Kuruluş', desc: "İstanbul'da küçük bir ekiple inşaat sektöründe temeller atıldı." },
  { year: '2002', title: 'Büyüme', desc: '50+ çalışan ve enerji altyapısı alanındaki ilk büyük proje tamamlandı.' },
  { year: '2010', title: 'Ulusal Genişleme', desc: "Türkiye'nin 10 ilinde enerji ve saha ekipleri aktif hale geldi." },
  { year: '2018', title: 'Telekom Alanına Giriş', desc: 'Fiber optik ve telekom şebeke altyapısına yönelik yeni bir iş kolu kuruldu.' },
  { year: '2024', title: 'Bugün', desc: '500+ proje ve onlarca saha ekibiyle enerji ve telekom altyapısında büyümeye devam ediyoruz.' },
]

export default function About() {
  const fade = useFadeVariants()
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  // scaleY, not height — height triggers layout, scaleY is a transform.
  const lineProgress = useTransform(scrollYProgress, [0.15, 0.75], [0, 1])

  // Subtle parallax on the decorative portrait only — never on text/controls.
  // The image is scaled up (see imgScale) to buffer the vertical drift so the
  // clipping wrapper below never reveals empty edges.
  const imgY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ['0%', '0%'] : ['-6%', '6%'])
  const imgWrapRef = useRef<HTMLDivElement>(null)
  const imgInView = useInView(imgWrapRef, { margin: '200px' })

  return (
    <section id="about" ref={sectionRef} className="relative py-20 lg:py-32" style={{ background: 'var(--bg-alt)' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Split: image + intro/values */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20 lg:mb-28">
          {/* Image with offset accent frame */}
          <motion.div
            variants={fade.media}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="img-frame relative z-0 max-w-md lg:max-w-none mx-auto w-full"
          >
            {/* Clipping wrapper — parallax transform must never escape it */}
            <div ref={imgWrapRef} className="relative overflow-hidden group">
              <motion.div style={{ y: imgY, scale: 1.16, willChange: imgInView ? 'transform' : 'auto' }}>
                <img
                  src="/media/about.webp"
                  alt="Temsili görsel — mühendislerin sahada proje çizimlerini incelemesi"
                  className="img-tone w-full object-cover"
                  style={{ aspectRatio: '3/4' }}
                  loading="lazy"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Text column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={fade.stagger}
          >
            <motion.div variants={fade.eyebrow}>
              <span className="eyebrow">Hakkımızda</span>
            </motion.div>
            <RevealHeading
              as="h2"
              lines={['Enerji ve Telekom Altyapısında Güvenilir Ortak']}
              className="font-display text-h2 font-extrabold mt-5"
              style={{ color: 'var(--text)' }}
            />
            <motion.p variants={fade.body} className="text-base lg:text-lg leading-relaxed mt-6" style={{ color: 'var(--text-soft)' }}>
              1994'ten bu yana enerji iletim hatları, trafo merkezleri ve telekom/fiber altyapısında
              yüzlerce proje tamamladık. Güven, mühendislik kalitesi ve saha disipliniyle her hattı
              ve şebekeyi güvenle devreye alıyoruz.
            </motion.p>

            {/* Values as hairline-separated rows */}
            <div className="mt-10">
              {values.map((v) => (
                <motion.div key={v.label} variants={fade.item} className="group flex items-start gap-5 py-5 hairline-top last:hairline-bottom transition-all duration-300 hover:pl-2">
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
          variants={fade.stagger}
          className="max-w-3xl"
        >
          <motion.h3 variants={fade.eyebrow} className="font-display text-3xl lg:text-4xl font-black mb-10" style={{ color: 'var(--text)' }}>
            30 Yıllık Hikayemiz
          </motion.h3>

          <div className="relative">
            <div className="absolute left-[7px] top-2 bottom-2 w-px" style={{ background: 'var(--border-strong)' }}>
              <motion.div
                className="absolute inset-0"
                style={{ scaleY: lineProgress, transformOrigin: 'top', background: 'var(--accent)' }}
              />
            </div>

            <div className="flex flex-col gap-8">
              {milestones.map((m, i) => (
                <motion.div key={m.year} variants={fade.item} className="flex gap-7">
                  <div
                    className="relative z-10 w-[15px] h-[15px] mt-1.5 shrink-0"
                    style={{
                      background: i === milestones.length - 1 ? 'var(--accent)' : 'var(--bg-alt)',
                      border: `2px solid ${i === milestones.length - 1 ? 'var(--accent)' : 'var(--border-strong)'}`,
                    }}
                  />
                  <div>
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-lg font-black" style={{ color: 'var(--accent)' }}>{m.year}</span>
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
