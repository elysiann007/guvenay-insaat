import { motion } from 'framer-motion'
import { useTapFeedback } from './lib/motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Process from './components/Process'
import About from './components/About'
import Services from './components/Services'
import Projects from './components/Projects'
import Stats from './components/Stats'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)' }} className="min-h-dvh">
      <Navbar />
      <main>
        <Hero />
        <Process />
        <About />
        <Services />
        <Projects />
        <Stats />
        <Testimonials />
        <Contact />
      </main>
      <Footer />

      {/* Spacer so the fixed mobile CTA bar below never covers the last
          bit of footer content. 5rem (80px) comfortably covers the bar's
          measured ~78.4px content height; safe-area is added on top. */}
      <div aria-hidden="true" className="h-[calc(5rem+env(safe-area-inset-bottom))] md:hidden" />

      <MobileCtaBar />
    </div>
  )
}

/**
 * Thumb-reach sticky "Teklif Al" bar for mobile (ALTYAPI-PLAN §4). Hidden
 * from md: up, where the navbar's own CTA button is already reachable.
 * env(safe-area-inset-bottom) keeps it clear of the iPhone home-indicator
 * gesture bar; App() adds a matching spacer so no page content hides
 * behind it.
 */
function MobileCtaBar() {
  const go = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  const tapFeedback = useTapFeedback()

  return (
    <div
      id="mobile-cta-bar"
      className="fixed inset-x-0 bottom-0 z-30 md:hidden"
      style={{
        background: 'color-mix(in srgb, var(--surface) 97%, transparent)',
        backdropFilter: 'blur(8px)',
        borderTop: '1px solid var(--border)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div className="px-4 py-3">
        <motion.button whileTap={tapFeedback} onClick={go} className="btn-primary w-full">
          Teklif Al
        </motion.button>
      </div>
    </div>
  )
}
