import { useId, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { MapPin, Clock, Phone, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react'
import RevealHeading from './RevealHeading'
import { useFadeVariants, VIEWPORT_ONCE, useTapFeedback } from '../lib/motion'

const info = [
  { icon: Phone, label: 'Telefon', value: '0541 311 45 35', sub: 'Hafta içi 08:00 – 18:00 arasında ulaşabilirsiniz', href: 'tel:+905413114535' },
  { icon: Mail, label: 'E-posta', value: 'guvenayinsaat58@gmail.com', sub: 'Teklif ve proje talepleri için', href: 'mailto:guvenayinsaat58@gmail.com' },
  { icon: MapPin, label: 'Çalışma Bölgesi', value: 'İzmir ve Ege Bölgesi', sub: 'Metropol, OSB ve serbest bölge sahaları', href: 'https://maps.app.goo.gl/bqBpUvX4tE9EG2BL6' },
  { icon: Clock, label: 'Saha Saatleri', value: 'Hafta içi 08:00 – 18:00', sub: 'Arıza müdahalelerinde gece çalışması dahil', href: undefined },
]

const projectTypes = [
  'Kablo Kanal Kazısı & Kablo Serimi',
  'Trafo Temeli / Trafo Binası',
  'Aydınlatma Direği',
  'Boru, Drenaj & Pissu Hattı',
  'Üst Yapı Restorasyonu',
  'Arıza Müdahalesi & Bakım',
  'Diğer',
]

type FieldName = 'name' | 'email' | 'phone' | 'message'

function validateField(name: FieldName, value: string): string {
  const trimmed = value.trim()
  switch (name) {
    case 'name':
      return trimmed.length < 2 ? 'Lütfen adınızı ve soyadınızı giriniz.' : ''
    case 'email': {
      if (!trimmed) return 'E-posta adresi gereklidir.'
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return re.test(trimmed) ? '' : 'Lütfen geçerli bir e-posta adresi giriniz.'
    }
    case 'phone': {
      if (!trimmed) return ''
      const re = /^[0-9+()\s-]{7,}$/
      const digitCount = (trimmed.match(/[0-9]/g) || []).length
      return re.test(trimmed) && digitCount >= 7 ? '' : 'Lütfen geçerli bir telefon numarası giriniz.'
    }
    case 'message':
      return trimmed.length < 10 ? 'Lütfen projenizi birkaç cümleyle anlatınız.' : ''
    default:
      return ''
  }
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', type: projectTypes[0] })
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({})
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({})
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const tapFeedback = useTapFeedback()
  const fade = useFadeVariants()
  const reduceMotion = useReducedMotion()

  const ids = {
    name: useId(),
    email: useId(),
    phone: useId(),
    message: useId(),
  }

  const handleBlur = (field: FieldName) => {
    setTouched((t) => ({ ...t, [field]: true }))
    setErrors((errs) => ({ ...errs, [field]: validateField(field, form[field]) }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const fields: FieldName[] = ['name', 'email', 'phone', 'message']
    const nextErrors: Partial<Record<FieldName, string>> = {}
    fields.forEach((f) => { nextErrors[f] = validateField(f, form[f]) })
    setErrors(nextErrors)
    setTouched({ name: true, email: true, phone: true, message: true })

    const hasError = Object.values(nextErrors).some(Boolean)
    if (hasError) {
      setSubmitError('Lütfen işaretli alanları düzeltip tekrar deneyin.')
      return
    }

    setSubmitError('')
    setSending(true)
    try {
      window.setTimeout(() => {
        setSending(false)
        setSent(true)
      }, 1800)
    } catch {
      setSending(false)
      setSubmitError('Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyin.')
    }
  }

  const labelCls = 'block text-[11px] font-bold uppercase tracking-[0.16em] mb-1'
  const errorCls = 'text-xs mt-1.5 font-semibold'
  // --accent is the single verified role for body-scale text on
  // --surface/--bg-alt (index.css §ACCENT) — errors sit on exactly that band.
  const errorColor = 'var(--accent)'

  const fieldProps = (field: FieldName) => ({
    id: ids[field],
    onBlur: () => handleBlur(field),
    'aria-invalid': Boolean(touched[field] && errors[field]) || undefined,
    'aria-describedby': touched[field] && errors[field] ? `${ids[field]}-error` : undefined,
  })

  const renderError = (field: FieldName) =>
    touched[field] && errors[field] ? (
      <p id={`${ids[field]}-error`} role="alert" className={errorCls} style={{ color: errorColor }}>
        {errors[field]}
      </p>
    ) : null

  return (
    <section id="contact" className="relative py-20 lg:py-32" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left — header + info rows */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={fade.stagger}
            className="lg:col-span-5"
          >
            <motion.div variants={fade.eyebrow}>
              <span className="eyebrow">İletişim</span>
            </motion.div>
            <RevealHeading
              as="h2"
              lines={['Projenizi Konuşalım']}
              className="font-display text-4xl lg:text-5xl font-black tracking-tight mt-5 leading-[1.05]"
              style={{ color: 'var(--text)' }}
            />
            <motion.p variants={fade.body} className="text-base lg:text-lg mt-5 mb-10" style={{ color: 'var(--text-soft)' }}>
              Ücretsiz keşif ve fiyat teklifi için bize ulaşın.
            </motion.p>

            <div>
              {info.map((item) => {
                const Wrapper = item.href ? 'a' : 'div'
                return (
                  <motion.div key={item.label} variants={fade.item}>
                    <Wrapper
                      {...(item.href ? { href: item.href } : {})}
                      {...(item.href?.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className={`group flex gap-5 py-5 hairline-top last:hairline-bottom${item.href ? ' cursor-pointer' : ''}`}
                      style={{ display: 'flex' }}
                    >
                      <item.icon size={19} className="shrink-0 mt-1" style={{ color: 'var(--accent)' }} aria-hidden="true" />
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: 'var(--text-dim)' }}>{item.label}</div>
                        <div className={`text-sm lg:text-base font-bold mt-1 break-words${item.href ? ' transition-colors group-hover:text-[var(--accent)]' : ''}`} style={{ color: 'var(--text)' }}>{item.value}</div>
                        <div className="text-xs mt-0.5" style={{ color: 'var(--text-soft)' }}>{item.sub}</div>
                      </div>
                    </Wrapper>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            variants={fade.media}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="lg:col-span-7"
          >
            <div
              className="relative p-7 lg:p-12 h-full"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                boxShadow: '0 32px 64px -40px color-mix(in srgb, var(--ink) 22%, transparent)',
              }}
            >
              <span className="absolute top-0 left-0 w-full h-[3px]" style={{ background: 'var(--accent)' }} aria-hidden="true" />
              {sent ? (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: reduceMotion ? 0 : 0.3, ease: 'easeOut' }}
                  role="status"
                  aria-live="polite"
                  className="flex flex-col items-center justify-center gap-4 py-16 text-center"
                >
                  <CheckCircle size={40} strokeWidth={1.5} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                  <h3 className="font-display text-2xl font-black" style={{ color: 'var(--text)' }}>Mesajınız Alındı!</h3>
                  <p className="text-sm" style={{ color: 'var(--text-soft)' }}>En kısa sürede sizinle iletişime geçeceğiz.</p>
                  <motion.button
                    whileTap={tapFeedback}
                    onClick={() => {
                      setSent(false)
                      setForm({ name: '', email: '', phone: '', message: '', type: projectTypes[0] })
                      setTouched({})
                      setErrors({})
                    }}
                    className="btn-secondary mt-3"
                  >
                    Yeni Mesaj Gönder
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-7">
                  <h3 className="font-display text-2xl lg:text-3xl font-black" style={{ color: 'var(--text)' }}>
                    Ücretsiz Teklif Alın
                  </h3>

                  {submitError ? (
                    <div
                      role="alert"
                      aria-live="assertive"
                      className="flex items-center gap-2 px-4 py-3 text-sm font-semibold"
                      style={{ background: 'var(--accent-soft)', color: errorColor, border: '1px solid var(--border-control)' }}
                    >
                      <AlertCircle size={16} className="shrink-0" aria-hidden="true" />
                      {submitError}
                    </div>
                  ) : null}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                    <div>
                      <label htmlFor={ids.name} className={labelCls} style={{ color: 'var(--text-dim)' }}>
                        Ad Soyad <span aria-hidden="true">*</span>
                        <span className="sr-only"> (zorunlu)</span>
                      </label>
                      <input
                        {...fieldProps('name')}
                        required
                        className="input-line min-h-11"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="Adınız Soyadınız"
                        autoComplete="name"
                      />
                      {renderError('name')}
                    </div>
                    <div>
                      <label htmlFor={ids.phone} className={labelCls} style={{ color: 'var(--text-dim)' }}>
                        Telefon
                      </label>
                      <input
                        {...fieldProps('phone')}
                        className="input-line min-h-11"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        placeholder="+90 5__ ___ ____"
                        autoComplete="tel"
                      />
                      {renderError('phone')}
                    </div>
                  </div>

                  <div>
                    <label htmlFor={ids.email} className={labelCls} style={{ color: 'var(--text-dim)' }}>
                      E-posta <span aria-hidden="true">*</span>
                      <span className="sr-only"> (zorunlu)</span>
                    </label>
                    <input
                      {...fieldProps('email')}
                      required
                      type="email"
                      className="input-line min-h-11"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="ornek@email.com"
                      autoComplete="email"
                    />
                    {renderError('email')}
                  </div>

                  <fieldset className="border-0 p-0 m-0">
                    <legend className={labelCls} style={{ color: 'var(--text-dim)' }}>Proje Türü</legend>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {projectTypes.map((t) => (
                        <motion.button
                          key={t}
                          whileTap={tapFeedback}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, type: t }))}
                          aria-pressed={form.type === t}
                          className="min-h-11 px-4 py-2 text-xs font-bold cursor-pointer transition-all duration-200"
                          style={{
                            background: form.type === t ? 'var(--ink)' : 'transparent',
                            color: form.type === t ? '#fff' : 'var(--text-soft)',
                            border: `1px solid ${form.type === t ? 'var(--ink)' : 'var(--border-control)'}`,
                          }}
                        >
                          {t}
                        </motion.button>
                      ))}
                    </div>
                  </fieldset>

                  <div>
                    <label htmlFor={ids.message} className={labelCls} style={{ color: 'var(--text-dim)' }}>
                      Mesajınız <span aria-hidden="true">*</span>
                      <span className="sr-only"> (zorunlu)</span>
                    </label>
                    <textarea
                      {...fieldProps('message')}
                      required
                      rows={4}
                      className="input-line"
                      style={{ resize: 'vertical', minHeight: 100 }}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Projenizi kısaca anlatın..."
                    />
                    {renderError('message')}
                  </div>

                  <motion.button
                    whileTap={tapFeedback}
                    type="submit"
                    disabled={sending}
                    className="btn-primary w-full !py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sending ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 rounded-full border-2 border-current border-t-transparent"
                          aria-hidden="true"
                        />
                        <span aria-live="polite">Gönderiliyor...</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} aria-hidden="true" />
                        Teklif Talep Et
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
