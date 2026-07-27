import { motion } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Keşif & Planlama',
    desc: 'İhtiyaçlarınızı dinler, sahayı inceler ve projenize özel çözüm yolları belirleriz.',
  },
  {
    num: '02',
    title: 'Tasarım',
    desc: 'Mimarlarımız hayalinizdeki yapıyı detaylı çizimler ve 3D modellerle somutlaştırır.',
  },
  {
    num: '03',
    title: 'İnşaat',
    desc: 'Uzman ekiplerimiz en kaliteli malzemeyle inşaatı titizlikle hayata geçirir.',
  },
  {
    num: '04',
    title: 'Teslim',
    desc: 'Tüm denetimler tamamlandıktan sonra anahtarı zamanında ve eksiksiz teslim ederiz.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }

export default function Process() {
  return (
    <section id="process" className="relative py-20 lg:py-32" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left — header + image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="lg:col-span-5"
          >
            <motion.div variants={fadeUp}>
              <span className="eyebrow">Nasıl Çalışıyoruz?</span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-h2 font-extrabold mt-5"
              style={{ color: 'var(--text)' }}
            >
              Projeden Teslimata 4 Adım
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base lg:text-lg leading-relaxed mt-5" style={{ color: 'var(--text-soft)' }}>
              Şeffaf, sistematik ve müşteri odaklı sürecimizle her adımda yanınızdayız.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 hidden lg:block group overflow-hidden">
              <img
                src="/media/process.webp"
                alt="Mimari maket ve proje çizimleri"
                className="img-tone w-full object-cover"
                style={{ aspectRatio: '4/3' }}
                loading="lazy"
              />
            </motion.div>
          </motion.div>

          {/* Right — numbered ruled steps */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {steps.map((step) => (
              <motion.div
                key={step.num}
                variants={fadeUp}
                className="group grid grid-cols-[auto_1fr] gap-6 lg:gap-10 py-7 lg:py-8 hairline-top last:hairline-bottom items-start transition-all duration-300 hover:pl-2"
              >
                <span
                  className="font-display text-4xl lg:text-5xl font-black leading-none transition-colors duration-300 group-hover:text-[var(--accent-strong)]"
                  style={{ color: 'var(--text-dim)' }}
                >
                  {step.num}
                </span>
                <div>
                  <h3 className="font-display text-h3 font-bold transition-colors duration-300 group-hover:text-[var(--accent-strong)]" style={{ color: 'var(--text)' }}>
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
