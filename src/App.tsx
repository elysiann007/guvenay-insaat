import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Projects from './components/Projects'
import Stats from './components/Stats'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

function CustomCursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { damping: 30, stiffness: 500 })
  const sy = useSpring(y, { damping: 30, stiffness: 500 })
  const sx2 = useSpring(x, { damping: 50, stiffness: 200 })
  const sy2 = useSpring(y, { damping: 50, stiffness: 200 })

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  return (
    <>
      <motion.div
        className="fixed w-2.5 h-2.5 rounded-full pointer-events-none z-[9999]"
        style={{ left: sx, top: sy, translateX: '-50%', translateY: '-50%', backgroundColor: 'var(--gold)' }}
      />
      <motion.div
        className="fixed w-8 h-8 rounded-full pointer-events-none z-[9998]"
        style={{ left: sx2, top: sy2, translateX: '-50%', translateY: '-50%', border: '1px solid rgba(200,169,110,0.4)' }}
      />
    </>
  )
}

export default function App() {
  return (
    <div style={{ background: 'var(--dark)', color: 'var(--warm-white)', minHeight: '100vh' }}>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Stats />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
