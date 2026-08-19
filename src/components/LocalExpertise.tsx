import { motion } from 'framer-motion'
import { ArrowRight, Check, MapPinned } from 'lucide-react'
import RevealHeading from './RevealHeading'
import { useFadeVariants, useTapFeedback, VIEWPORT_ONCE } from '../lib/motion'

const serviceAreas = [
  'İzmir', 'Gaziemir', 'Bornova', 'Buca', 'Aliağa',
  'Bergama', 'Çeşme', 'Manisa', 'Söke', 'Bandırma',
]

const questions = [
  {
    question: 'İzmir’de hangi altyapı işlerini yapıyorsunuz?',
    answer: 'OG ve AG kablo kanal kazısı, kanal borulaması, kablo serimi, trafo temeli ve trafo binası, aydınlatma direği, drenaj ve atık su (pissu) hattı ile kazı sonrası beton, asfalt ve parke restorasyonu yapıyoruz.',
  },
  {
    question: 'Sanayi bölgesi ve fabrika sahalarında çalışıyor musunuz?',
    answer: 'Evet. Referans geçmişimizde ESBAŞ Gaziemir, Aliağa Organize Sanayi Bölgesi ve BASBAŞ Bergama gibi kontrollü sanayi sahalarında yürütülen altyapı imalatları bulunuyor.',
  },
  {
    question: 'Kablo kanalı açıldıktan sonra üst kaplamayı da tamamlıyor musunuz?',
    answer: 'Evet. Kanalın kapatılmasının ardından beton, asfalt, parke, kaldırım ve bordür uygulamalarını tamamlayarak sahayı temiz şekilde teslim ediyoruz.',
  },
  {
    question: 'Altyapı projesi hangi adımlarla ilerliyor?',
    answer: 'Önce keşif ve güzergâh etüdü yapıyor; ardından güvenli kazı, borulama ve kablo serimi aşamalarına geçiyoruz. Son adımda üst kaplamayı yenileyip sahayı teslim ediyoruz.',
  },
  {
    question: 'İzmir dışında hizmet veriyor musunuz?',
    answer: 'Ana çalışma alanımız İzmir ve Ege Bölgesi. Referans geçmişimiz İzmir’in ilçelerinin yanında Manisa, Söke ve Bandırma’daki saha işlerini de kapsıyor. Proje yeri ve kapsamı teklif aşamasında değerlendirilir.',
  },
]

export default function LocalExpertise() {
  const fade = useFadeVariants()
  const tapFeedback = useTapFeedback()
  const goToContact = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="izmir-altyapi" className="relative py-20 lg:py-32" style={{ background: 'var(--bg-alt)' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} variants={fade.stagger} className="lg:col-span-5 lg:sticky lg:top-32">
            <motion.div variants={fade.eyebrow}>
              <span className="eyebrow">İzmir Altyapı Uygulamaları</span>
            </motion.div>
            <RevealHeading
              as="h2"
              lines={['İzmir’de Altyapı İşi İçin', '32 Yıllık Saha Deneyimi']}
              className="font-display text-h2 font-extrabold mt-5"
              style={{ color: 'var(--text)' }}
            />
            <motion.p variants={fade.body} className="text-base lg:text-lg leading-relaxed mt-6" style={{ color: 'var(--text-soft)' }}>
              Güvenay İnşaat, 1994’ten bu yana İzmir merkezli enerji ve şebeke altyapısı
              imalatları yürütür. Kazıdan kablo serimine, trafo temelinden üst kaplamaya kadar
              saha işinin birbirine bağlı aşamalarını tek akışta tamamlarız.
            </motion.p>

            <motion.div variants={fade.item} className="mt-8 p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="flex items-center gap-3 mb-4">
                <MapPinned size={20} aria-hidden="true" style={{ color: 'var(--accent)' }} />
                <h3 className="font-display text-lg font-bold" style={{ color: 'var(--text)' }}>Hizmet bölgelerimiz</h3>
              </div>
              <ul className="flex flex-wrap gap-2" aria-label="Hizmet verilen bölgeler">
                {serviceAreas.map((area) => (
                  <li key={area} className="px-3 py-2 text-sm font-semibold" style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-soft)' }}>
                    {area}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.button variants={fade.cta} whileTap={tapFeedback} onClick={goToContact} className="group btn-primary mt-8 w-full sm:w-auto">
              Projenizi Anlatın
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </motion.button>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fade.stagger} className="lg:col-span-7">
            <motion.div variants={fade.eyebrow} className="mb-5">
              <span className="eyebrow">Sık Sorulan Sorular</span>
            </motion.div>
            <div className="border-t" style={{ borderColor: 'var(--border)' }}>
              {questions.map((item) => (
                <motion.div key={item.question} variants={fade.item} className="border-b" style={{ borderColor: 'var(--border)' }}>
                  <details className="group">
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-5 font-display text-base lg:text-lg font-bold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]">
                    <span style={{ color: 'var(--text)' }}>{item.question}</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center transition-transform duration-200 group-open:rotate-45" aria-hidden="true" style={{ color: 'var(--accent)', border: '1px solid var(--border-control)' }}>+</span>
                  </summary>
                  <div className="flex gap-3 pb-6 pr-0 sm:pr-12">
                    <Check size={17} className="mt-1 shrink-0" aria-hidden="true" style={{ color: 'var(--accent)' }} />
                    <p className="text-base leading-relaxed" style={{ color: 'var(--text-soft)' }}>{item.answer}</p>
                  </div>
                  </details>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
