import { Suspense, lazy } from 'react';
import './index.css';
import Nav from './components/Nav/Nav';
import Hero from './components/Hero/Hero';
import Metrics from './components/sections/Metrics';
import Timeline from './components/sections/Timeline';
import Projects from './components/sections/Projects';
import SystemsThinking from './components/sections/SystemsThinking';
import EngineeringGlance from './components/sections/EngineeringGlance';
import TechStack from './components/sections/TechStack';
import Footer from './components/sections/Footer';

// Below-the-fold sections are code-split. Each placeholder reserves
// height so deferred loading never shifts the layout.
const GitHubSection = lazy(() => import('./components/sections/GitHub'));
const About = lazy(() => import('./components/sections/About'));
const Contact = lazy(() => import('./components/sections/Contact'));

function SectionFallback({ id, minHeight = 640 }) {
  return <div id={id} style={{ minHeight }} aria-hidden="true" />;
}

export default function App() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <Metrics />
        <Timeline />
        <Projects />
        <SystemsThinking />
        <EngineeringGlance />
        <TechStack />
        <Suspense fallback={<SectionFallback id="opensource" minHeight={720} />}>
          <GitHubSection />
        </Suspense>
        <Suspense fallback={<SectionFallback id="about" minHeight={560} />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback id="contact" minHeight={640} />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
