import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, useInView } from 'framer-motion'
import RevealHeading from './RevealHeading'
import { useFadeVariants, VIEWPORT_ONCE } from '../lib/motion'

const steps = [
  {
    num: '01',
    title: 'Etüt & Keşif',
    desc: 'Güzergahı ve sahayı inceler, mevcut altyapıyı değerlendirip projenize özel uygulama planını çıkarırız.',
  },
  {
    num: '02',
    title: 'Proje & Mühendislik',
    desc: 'Mühendislik ekibimiz elektriksel hesaplamaları, güzergah projelerini ve teknik çizimleri hazırlar.',
  },
  {
    num: '03',
    title: 'Saha Uygulaması',
    desc: 'Direk dikimi, kablo çekimi, trafo montajı ve fiber döşeme işlerini uzman saha ekiplerimizle yürütürüz.',
  },
  {
    num: '04',
    title: 'Test & Devreye Alma',
    desc: 'Elektriksel testleri ve ölçümleri tamamlayıp hattı ya da şebekeyi devreye alarak teslim ederiz.',
  },
]

export default function Process() {
  const fade = useFadeVariants()
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ['0%', '0%'] : ['-6%', '6%'])
  const imgWrapRef = useRef<HTMLDivElement>(null)
  const imgInView = useInView(imgWrapRef, { margin: '200px' })

  return (
    <section id="process" ref={sectionRef} className="relative py-20 lg:py-32" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left — header + image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={fade.stagger}
            className="lg:col-span-5"
          >
            <motion.div variants={fade.eyebrow}>
              <span className="eyebrow">Nasıl Çalışıyoruz?</span>
            </motion.div>
            <RevealHeading
              as="h2"
              lines={['Etütten Devreye Almaya 4 Adım']}
              className="font-display text-h2 font-extrabold mt-5"
              style={{ color: 'var(--text)' }}
            />
            <motion.p variants={fade.body} className="text-base lg:text-lg leading-relaxed mt-5" style={{ color: 'var(--text-soft)' }}>
              Şeffaf, sistematik ve saha odaklı sürecimizle her adımda yanınızdayız.
            </motion.p>
            <motion.div variants={fade.media} className="mt-10 hidden lg:block">
              {/* Clipping wrapper — parallax transform must never escape it */}
              <div ref={imgWrapRef} className="group overflow-hidden">
                <motion.div style={{ y: imgY, scale: 1.16, willChange: imgInView ? 'transform' : 'auto' }}>
                  <img
                    src="/media/process.webp"
                    alt="Temsili görsel — proje çizimleri ve saha planlaması"
                    className="img-tone w-full object-cover"
                    style={{ aspectRatio: '4/3' }}
                    loading="lazy"
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — numbered ruled steps */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={fade.stagger}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {steps.map((step) => (
              <motion.div
                key={step.num}
                variants={fade.item}
                className="group grid grid-cols-[auto_1fr] gap-6 lg:gap-10 py-7 lg:py-8 hairline-top last:hairline-bottom items-start transition-all duration-300 hover:pl-2"
              >
                <span
                  className="font-display text-4xl lg:text-5xl font-black leading-none transition-colors duration-300 group-hover:text-[var(--accent)]"
                  style={{ color: 'var(--text-dim)' }}
                >
                  {step.num}
                </span>
                <div>
                  <h3 className="font-display text-h3 font-bold transition-colors duration-300 group-hover:text-[var(--accent)]" style={{ color: 'var(--text)' }}>
                    {step.title}
                  </h3>
                  <p className="text-sm lg:text-base leading-relaxed mt-2 max-w-lg" style={{ color: 'var(--text-soft)' }}>
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
