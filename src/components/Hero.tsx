import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { ArrowDown, Play } from 'lucide-react'

const TITLE_LINE1 = 'GÜVENAY'
const TITLE_LINE2 = 'İNŞAAT'

function FloatingShape({
  className,
  style,
  animClass,
}: {
  className: string
  style: React.CSSProperties
  animClass: string
}) {
  return <div className={`absolute pointer-events-none ${animClass} ${className}`} style={style} />
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const glowX = useSpring(mouseX, { damping: 40, stiffness: 150 })
  const glowY = useSpring(mouseY, { damping: 40, stiffness: 150 })

  const [ready, setReady] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 100)
    return () => clearTimeout(t)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const EASE = 'easeOut' as const
  const charVariant = {
    hidden: { opacity: 0, y: 80, rotateX: -90 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { delay: 0.4 + i * 0.055, duration: 0.8, ease: EASE },
    }),
  }

  return (
    <section
      id="hero"
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'var(--dark)' }}
    >
      {/* Grid */}
      <div className="absolute inset-0 hero-grid opacity-60" />

      {/* Mouse glow */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          left: glowX,
          top: glowY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(200,169,110,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Parallax BG elements */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        {/* Large spinning rings */}
        <div
          className="absolute spin-slow"
          style={{
            width: 700, height: 700,
            right: '-200px', top: '50%', marginTop: -350,
            borderRadius: '50%',
            border: '1px solid rgba(200,169,110,0.08)',
          }}
        />
        <div
          className="absolute spin-reverse"
          style={{
            width: 520, height: 520,
            right: '-110px', top: '50%', marginTop: -260,
            borderRadius: '50%',
            border: '1px solid rgba(200,169,110,0.05)',
          }}
        />
        <div
          className="absolute"
          style={{
            width: 320, height: 320,
            right: '0px', top: '50%', marginTop: -160,
            borderRadius: '50%',
            border: '1px solid rgba(200,169,110,0.12)',
          }}
        />

        {/* Floating shapes */}
        <FloatingShape animClass="float-a" className="w-16 h-16 border-2"
          style={{ top: '15%', left: '8%', borderColor: 'rgba(200,169,110,0.2)', borderRadius: '4px', transform: 'rotate(45deg)' }} />
        <FloatingShape animClass="float-b" className="w-10 h-10"
          style={{ top: '30%', left: '15%', background: 'rgba(200,169,110,0.08)', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
        <FloatingShape animClass="float-c" className="w-20 h-20 border"
          style={{ bottom: '20%', left: '10%', borderColor: 'rgba(200,169,110,0.12)', borderRadius: '50%' }} />
        <FloatingShape animClass="float-a" className="w-6 h-6"
          style={{ top: '60%', left: '20%', background: 'var(--gold)', opacity: 0.3, borderRadius: '2px', transform: 'rotate(30deg)' }} />
        <FloatingShape animClass="float-b" className="w-24 h-[2px]"
          style={{ top: '45%', left: '3%', background: 'linear-gradient(90deg, transparent, rgba(200,169,110,0.3), transparent)' }} />
        <FloatingShape animClass="float-c" className="w-8 h-8 border-2"
          style={{ top: '20%', right: '25%', borderColor: 'rgba(200,169,110,0.2)' }} />
        <FloatingShape animClass="float-a" className="w-4 h-4"
          style={{ bottom: '35%', right: '30%', background: 'var(--gold)', opacity: 0.25, borderRadius: '50%' }} />

        {/* Corner accent */}
        <div
          className="absolute bottom-0 left-0 w-48 h-48 opacity-30"
          style={{ background: 'radial-gradient(circle at bottom left, rgba(200,169,110,0.15) 0%, transparent 70%)' }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 text-center px-6 max-w-7xl mx-auto w-full"
      >
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="h-[1px] w-12" style={{ background: 'var(--gold)' }} />
          <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: 'var(--gold)' }}>
            İnşaat & Mimarlık
          </span>
          <div className="h-[1px] w-12" style={{ background: 'var(--gold)' }} />
        </motion.div>

        {/* Main title line 1 */}
        <div className="overflow-hidden mb-2" style={{ perspective: '600px' }}>
          <h1
            className="text-[12vw] md:text-[10vw] lg:text-[9rem] font-black tracking-tighter leading-none inline-flex flex-wrap justify-center gap-x-2"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {TITLE_LINE1.split('').map((char, i) => (
              <motion.span
                key={`l1-${i}`}
                custom={i}
                variants={charVariant}
                initial="hidden"
                animate={ready ? 'visible' : 'hidden'}
                className="inline-block"
                style={{ color: 'var(--warm-white)' }}
              >
                {char}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Main title line 2 */}
        <div className="overflow-hidden mb-10" style={{ perspective: '600px' }}>
          <h1
            className="text-[12vw] md:text-[10vw] lg:text-[9rem] font-black tracking-tighter leading-none inline-flex flex-wrap justify-center gap-x-2"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {TITLE_LINE2.split('').map((char, i) => (
              <motion.span
                key={`l2-${i}`}
                custom={TITLE_LINE1.length + i}
                variants={charVariant}
                initial="hidden"
                animate={ready ? 'visible' : 'hidden'}
                className="gradient-text inline-block"
              >
                {char}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="max-w-lg mx-auto text-base lg:text-lg leading-relaxed mb-10"
          style={{ color: 'rgba(245,240,232,0.55)' }}
        >
          30 yılı aşkın deneyimle Türkiye'nin her köşesinde
          <br className="hidden md:block" /> kalıcı yapılar inşa ediyoruz.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="relative overflow-hidden px-8 py-4 text-sm font-bold tracking-widest uppercase beam-effect"
            style={{ background: 'var(--gold)', color: 'var(--dark)', borderRadius: '2px', minWidth: 180 }}
          >
            Projelerimiz
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase"
            style={{
              border: '1px solid rgba(200,169,110,0.4)',
              color: 'var(--warm-white)',
              borderRadius: '2px',
              minWidth: 180,
            }}
          >
            <Play size={14} fill="currentColor" />
            Teklif Al
          </motion.button>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { n: '30+', label: 'Yıl Deneyim' },
            { n: '500+', label: 'Tamamlanan Proje' },
            { n: '50+', label: 'Aktif Şantiye' },
            { n: '10K+', label: 'Mutlu Aile' },
          ].map((s) => (
            <div key={s.n} className="text-center">
              <div
                className="text-3xl lg:text-4xl font-black gradient-text"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {s.n}
              </div>
              <div className="text-xs tracking-widest uppercase mt-1" style={{ color: 'var(--light-gray)' }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(200,169,110,0.5)' }}>
          Kaydır
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} style={{ color: 'var(--gold)' }} />
        </motion.div>
      </motion.div>

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--dark), transparent)' }}
      />
    </section>
  )
}
