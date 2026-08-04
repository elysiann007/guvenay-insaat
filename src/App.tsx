import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Process from './components/Process'
import About from './components/About'
import Services from './components/Services'
import Projects from './components/Projects'
import Stats from './components/Stats'
import Certificates from './components/Certificates'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>
      <Navbar />
      <main>
        <Hero />
        <Process />
        <About />
        <Services />
        <Projects />
        <Stats />
        <Certificates />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
