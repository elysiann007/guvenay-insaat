import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react'

const info = [
  { icon: Phone, label: 'Telefon', value: '+90 (212) 555 0100', sub: 'Hafta içi 09:00 - 18:00' },
  { icon: Mail, label: 'E-posta', value: 'info@guvenayinsaat.com.tr', sub: '24 saat içinde yanıt' },
  { icon: MapPin, label: 'Adres', value: 'Maslak Mah. No: 42, İstanbul', sub: 'Sarıyer / İstanbul' },
]

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const EASE = 'easeOut' as const
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', type: 'Konut' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => { setSending(false); setSent(true) }, 1800)
  }

  const inputStyle: React.CSSProperties = {
    background: 'var(--dark-3)',
    border: '1px solid rgba(200,169,110,0.12)',
    color: 'var(--warm-white)',
    borderRadius: '2px',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'border-color 0.3s',
    width: '100%',
    padding: '12px 16px',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'rgba(200,169,110,0.7)',
    marginBottom: '8px',
  }

  return (
    <section id="contact" className="relative py-24 lg:py-40 overflow-hidden" style={{ background: 'var(--dark-2)' }}>
      <div className="absolute inset-0 diagonal-bg" />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(200,169,110,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: 'var(--gold)' }} />
            <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: 'var(--gold)' }}>
              İletişim
            </span>
            <div className="h-px w-10" style={{ background: 'var(--gold)' }} />
          </div>
          <h2
            className="text-4xl lg:text-6xl font-black mb-4"
            style={{ color: 'var(--warm-white)', fontFamily: 'Montserrat, sans-serif' }}
          >
            Projenizi <span className="gradient-text">Konuşalım</span>
          </h2>
          <p className="text-base" style={{ color: 'rgba(245,240,232,0.5)' }}>
            Ücretsiz keşif ve fiyat teklifi için bize ulaşın.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {info.map((item) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                className="flex gap-5 p-5 group transition-all duration-300"
                style={{
                  background: 'var(--dark-3)',
                  border: '1px solid rgba(200,169,110,0.08)',
                  borderRadius: '4px',
                }}
              >
                <div
                  className="w-11 h-11 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-300 group-hover:bg-[rgba(200,169,110,0.15)]"
                  style={{ background: 'rgba(200,169,110,0.08)' }}
                >
                  <item.icon size={18} style={{ color: 'var(--gold)' }} />
                </div>
                <div>
                  <div className="text-[10px] font-semibold tracking-widest uppercase mb-0.5" style={{ color: 'var(--gold)' }}>
                    {item.label}
                  </div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--warm-white)' }}>
                    {item.value}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: 'rgba(245,240,232,0.4)' }}>
                    {item.sub}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Map placeholder */}
            <motion.div
              variants={fadeUp}
              className="relative overflow-hidden flex-1 min-h-[140px]"
              style={{
                background: 'var(--dark-3)',
                border: '1px solid rgba(200,169,110,0.08)',
                borderRadius: '4px',
              }}
            >
              <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 300 160">
                {Array.from({ length: 8 }).map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 22} x2="300" y2={i * 22} stroke="var(--gold)" strokeWidth="0.5" />
                ))}
                {Array.from({ length: 12 }).map((_, i) => (
                  <line key={`v${i}`} x1={i * 28} y1="0" x2={i * 28} y2="160" stroke="var(--gold)" strokeWidth="0.5" />
                ))}
                <circle cx="150" cy="80" r="8" fill="var(--gold)" opacity="0.5" />
                <circle cx="150" cy="80" r="16" fill="none" stroke="var(--gold)" strokeWidth="1" opacity="0.3" />
                <circle cx="150" cy="80" r="26" fill="none" stroke="var(--gold)" strokeWidth="0.5" opacity="0.15" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={20} style={{ color: 'var(--gold)', margin: '0 auto 8px' }} />
                  <p className="text-xs" style={{ color: 'rgba(245,240,232,0.4)' }}>İstanbul Merkez Ofis</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-3"
          >
            <div
              className="p-8 lg:p-10"
              style={{
                background: 'var(--dark-3)',
                border: '1px solid rgba(200,169,110,0.1)',
                borderRadius: '4px',
              }}
            >
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-4 py-16 text-center"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(107,207,143,0.15)' }}
                  >
                    <CheckCircle size={32} style={{ color: '#6BCF8F' }} />
                  </div>
                  <h3 className="text-2xl font-black" style={{ color: 'var(--warm-white)' }}>
                    Mesajınız Alındı!
                  </h3>
                  <p className="text-sm" style={{ color: 'rgba(245,240,232,0.5)' }}>
                    En kısa sürede sizinle iletişime geçeceğiz.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', message: '', type: 'Konut' }) }}
                    className="mt-4 text-xs font-semibold tracking-widest uppercase"
                    style={{ color: 'var(--gold)' }}
                  >
                    Yeni Mesaj
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--warm-white)' }}>
                    Ücretsiz Teklif Alın
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label style={labelStyle}>Ad Soyad</label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="Adınız Soyadınız"
                        style={{ ...inputStyle }}
                        onFocus={(e) => (e.target.style.borderColor = 'rgba(200,169,110,0.5)')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(200,169,110,0.12)')}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Telefon</label>
                      <input
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        placeholder="+90 5__ ___ ____"
                        style={{ ...inputStyle }}
                        onFocus={(e) => (e.target.style.borderColor = 'rgba(200,169,110,0.5)')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(200,169,110,0.12)')}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>E-posta</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="ornek@email.com"
                      style={{ ...inputStyle }}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(200,169,110,0.5)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(200,169,110,0.12)')}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Proje Türü</label>
                    <select
                      value={form.type}
                      onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(200,169,110,0.5)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(200,169,110,0.12)')}
                    >
                      {['Konut', 'Ticari', 'Endüstriyel', 'Restorasyon', 'Altyapı', 'Diğer'].map((t) => (
                        <option key={t} value={t} style={{ background: 'var(--dark-3)', color: 'var(--warm-white)' }}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle}>Mesajınız</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Projenizi kısaca anlatın..."
                      style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(200,169,110,0.5)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(200,169,110,0.12)')}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative overflow-hidden flex items-center justify-center gap-2 py-4 text-sm font-bold tracking-widest uppercase beam-effect"
                    style={{
                      background: sending ? 'rgba(200,169,110,0.7)' : 'var(--gold)',
                      color: 'var(--dark)',
                      borderRadius: '2px',
                      cursor: sending ? 'not-allowed' : 'pointer',
                    }}
                  >
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
