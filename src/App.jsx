import './index.css';
import Nav from './components/Nav/Nav';
import Hero from './components/Hero/Hero';
import EngineeringGlance from './components/sections/EngineeringGlance';
import Metrics from './components/sections/Metrics';
import Timeline from './components/sections/Timeline';
import Projects from './components/sections/Projects';
import TechStack from './components/sections/TechStack';
import SystemsThinking from './components/sections/SystemsThinking';
import GitHubSection from './components/sections/GitHub';
import About from './components/sections/About';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';

export default function App() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <EngineeringGlance />
        <Metrics />
        <Timeline />
        <Projects />
        <TechStack />
        <SystemsThinking />
        <GitHubSection />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
