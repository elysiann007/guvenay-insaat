import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, useInView } from 'framer-motion'
import { CheckCircle, Award, Users, Shield } from 'lucide-react'
import RevealHeading from './RevealHeading'
import { useFadeVariants, VIEWPORT_ONCE } from '../lib/motion'

const values = [
  { icon: Shield, label: 'Sözümüzde Dururuz', desc: 'Firmayı kurarken destur edindiğimiz doğru buydu ve ilk günden bu yana değişmedi.' },
  { icon: CheckCircle, label: 'Eksiksiz ve Zamanında', desc: 'Taahhüt ettiğimiz imalatı, taahhüt ettiğimiz sürede, kaliteden ödün vermeden bitiririz.' },
  { icon: Award, label: 'Kendi Makine Parkımız', desc: 'Mini ekskavatörlerden hafriyat kamyonlarına kadar iş makineleri ve nakliye bizim; işi bekletmeyiz.' },
  { icon: Users, label: 'Paydaşlarımızla', desc: 'Otuz yılı aşkın süredir bize omuz veren iş birliklerimizi yeni işlerin ufku olarak görüyoruz.' },
]

const milestones = [
  { year: '1994', title: 'Kuruluş', desc: 'Altyapı imalatlarında büyüme hedefiyle yola çıktık. Elimizde traktörden bozma tek bir kazıcı-yükleyici vardı; çok ekmeğini yedik.' },
  { year: '1996', title: 'TEDAŞ ile İlk İş', desc: 'İzmir metropol alanında kablo kanal kazıları başladı. Otuz yıl sonra bugün hâlâ aynı iş sürüyor.' },
  { year: '2001', title: 'Trafo Binası İnşaatı', desc: 'Bandırma şehir şebekesi için 23 adet DAPT-2 ve bir adet DAPT-24 trafo binasının inşaatını üstlendik.' },
  { year: '2011', title: 'ESBAŞ Gaziemir', desc: 'Serbest bölge içinde kesintisiz altyapı imalatı dönemi başladı; bölgedeki onlarca fabrikanın enerji ve altyapı hattını biz çektik.' },
  { year: '2020', title: 'Aliağa OSB', desc: 'ADM 1 ile ADM 2 trafo binaları arasında galeriler içinden 32 km OG kablo ve aynı güzergahta fiber kablo çekimi.' },
  { year: '2026', title: 'Bugün', desc: 'Genişleyen makine parkımız ve saha ekiplerimizle 32. yılımızda aynı işi yapıyoruz.' },
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
                  alt="Açılmış kanalın içine beton takozlar üzerine yan yana dizilmiş çok sayıda koruge boru"
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
              lines={['Bir Kazıcıyla Başladık,', '32 Yıldır Sapmadık']}
              className="font-display text-h2 font-extrabold mt-5"
              style={{ color: 'var(--text)' }}
            />
            <motion.p variants={fade.body} className="text-base lg:text-lg leading-relaxed mt-6" style={{ color: 'var(--text-soft)' }}>
              1994'te firmamızı kurduğumuzda kendimize altyapı imalatları doğrultusunda büyümeyi
              hedef koyduk; bugüne kadar da bu doğrultuda sapma yapmadık. O zamanlar traktörden
              bozma bir kazıcı-yükleyiciye sahip olabilmek rüya gibi bir şeydi. Şimdi makine
              parkımıza bakınca o tek makineyle ne kadar işin üstesinden gelmişiz, şaşıyoruz.
            </motion.p>
            <motion.p variants={fade.body} className="text-base lg:text-lg leading-relaxed mt-4" style={{ color: 'var(--text-soft)' }}>
              İlk günden bu güne ekipler değişti, ekipmanlara ilaveler oldu. Değişmeyen tek şey,
              firmayı kurarken destur edindiğimiz doğrular oldu: sözümüzde durmak ve taahhüt
              ettiğimiz imalatları eksiksiz, zamanında, kaliteden ödün vermeden bitirmek.
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
            32 Yıllık Hikayemiz
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
