import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react'

const info = [
  { icon: Phone, label: 'Telefon', value: '+90 (212) 555 0100', sub: 'Hafta içi 09:00 - 18:00', href: 'tel:+902125550100' },
  { icon: Mail, label: 'E-posta', value: 'info@guvenayinsaat.com.tr', sub: '24 saat içinde yanıt', href: 'mailto:info@guvenayinsaat.com.tr' },
  { icon: MapPin, label: 'Adres', value: 'Maslak Mah. No: 42, İstanbul', sub: 'Sarıyer / İstanbul', href: undefined },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', type: 'Konut' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => { setSending(false); setSent(true) }, 1800)
  }

  const labelCls = 'block text-[11px] font-bold uppercase tracking-[0.16em] mb-1'

  return (
    <section id="contact" className="relative py-20 lg:py-32" style={{ background: 'var(--bg-alt)' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left — header + info rows */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={stagger}
            className="lg:col-span-5"
          >
            <motion.div variants={fadeUp}>
              <span className="eyebrow">İletişim</span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl lg:text-5xl font-black tracking-tight mt-5 leading-[1.05]"
              style={{ color: 'var(--text)' }}
            >
              Projenizi Konuşalım
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base lg:text-lg mt-5 mb-10" style={{ color: 'var(--text-soft)' }}>
              Ücretsiz keşif ve fiyat teklifi için bize ulaşın.
            </motion.p>

            <div>
              {info.map((item) => {
                const Wrapper = item.href ? 'a' : 'div'
                return (
                  <motion.div key={item.label} variants={fadeUp}>
                    <Wrapper
                      {...(item.href ? { href: item.href } : {})}
                      className="group flex gap-5 py-5 hairline-top last:hairline-bottom cursor-pointer"
                      style={{ display: 'flex' }}
                    >
                      <item.icon size={19} className="shrink-0 mt-1" style={{ color: 'var(--accent)' }} />
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: 'var(--text-dim)' }}>{item.label}</div>
                        <div className="text-sm lg:text-base font-bold mt-1 break-words transition-colors group-hover:text-[var(--accent)]" style={{ color: 'var(--text)' }}>{item.value}</div>
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
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7"
          >
            <div
              className="relative p-7 lg:p-12 h-full"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: '0 32px 64px -40px rgba(22,21,18,0.22)' }}
            >
              <span className="absolute top-0 left-0 w-full h-[3px]" style={{ background: 'var(--accent)' }} aria-hidden="true" />
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-4 py-16 text-center"
                >
                  <CheckCircle size={40} strokeWidth={1.5} style={{ color: 'var(--accent)' }} />
                  <h3 className="font-display text-2xl font-black" style={{ color: 'var(--text)' }}>Mesajınız Alındı!</h3>
                  <p className="text-sm" style={{ color: 'var(--text-soft)' }}>En kısa sürede sizinle iletişime geçeceğiz.</p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', message: '', type: 'Konut' }) }}
                    className="btn-secondary mt-3"
                  >
                    Yeni Mesaj Gönder
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                  <h3 className="font-display text-2xl lg:text-3xl font-black" style={{ color: 'var(--text)' }}>
                    Ücretsiz Teklif Alın
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                    <div>
                      <label className={labelCls} style={{ color: 'var(--text-dim)' }}>Ad Soyad *</label>
                      <input
                        required
                        className="input-line"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="Adınız Soyadınız"
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <label className={labelCls} style={{ color: 'var(--text-dim)' }}>Telefon</label>
                      <input
                        className="input-line"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        placeholder="+90 5__ ___ ____"
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelCls} style={{ color: 'var(--text-dim)' }}>E-posta *</label>
                    <input
                      required
                      type="email"
                      className="input-line"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="ornek@email.com"
                      autoComplete="email"
                    />
                  </div>

                  <div>
                    <label className={labelCls} style={{ color: 'var(--text-dim)' }}>Proje Türü</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {['Konut', 'Ticari', 'Endüstriyel', 'Restorasyon', 'Altyapı', 'Diğer'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, type: t }))}
                          className="px-4 py-2 text-xs font-bold cursor-pointer transition-all duration-200"
                          style={{
                            background: form.type === t ? 'var(--ink)' : 'transparent',
                            color: form.type === t ? '#fff' : 'var(--text-soft)',
                            border: `1px solid ${form.type === t ? 'var(--ink)' : 'var(--border-strong)'}`,
                          }}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={labelCls} style={{ color: 'var(--text-dim)' }}>Mesajınız *</label>
                    <textarea
                      required
                      rows={4}
                      className="input-line"
                      style={{ resize: 'vertical', minHeight: 100 }}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Projenizi kısaca anlatın..."
                    />
                  </div>

                  <button type="submit" disabled={sending} className="btn-primary w-full !py-4 disabled:opacity-60 disabled:cursor-not-allowed">
                    {sending ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 rounded-full border-2 border-current border-t-transparent"
                        />
                        Gönderiliyor...
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Teklif Talep Et
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
