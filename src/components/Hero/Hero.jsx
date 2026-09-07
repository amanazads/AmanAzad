import { ArrowRight, FileText, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons';
import SystemGraph from './SystemGraph';
import { scrollToSection } from '../Nav/Nav';
import { person, status } from '../../data/portfolio';
import './Hero.css';

const statusRows = [
  { label: 'ROLE', value: status.role },
  { label: 'FOCUS', value: status.focus },
  { label: 'STACK', value: status.stack },
  { label: 'DATA', value: status.data },
  { label: 'INTEREST', value: status.interest },
];

export default function Hero() {
  return (
    <section className="hero" id="home" aria-label="Introduction">
      <div className="container hero__inner">
        {/* Left — Content */}
        <div className="hero__content">
          <div className="hero__system-label">
            <span className="hero__system-id">SOFTWARE ENGINEER</span>
            <span className="hero__system-sep">——</span>
            <span className="hero__system-ver">FULL-STACK &amp; AI</span>
          </div>

          <h1 className="hero__name">
            Aman<br />Azad
          </h1>

          <p className="hero__role">
            Full-stack &amp; backend engineering
            <span className="hero__role-sep"> · </span>
            AI &amp; agentic systems
          </p>

          <p className="hero__tagline">{person.tagline}</p>

          <p className="hero__positioning">{person.positioning}</p>

          {/* Primary CTAs */}
          <div className="hero__cta">
            <a
              href="#projects"
              className="btn btn-primary hero__cta-primary"
              onClick={e => { e.preventDefault(); scrollToSection('#projects'); }}
            >
              View Projects
              <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="btn btn-secondary"
              onClick={e => { e.preventDefault(); scrollToSection('#contact'); }}
            >
              <Mail size={15} />
              Contact Me
            </a>
          </div>

          {/* Secondary CTAs */}
          <div className="hero__cta hero__cta--secondary">
            <a href={person.github} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
              <GithubIcon size={15} />
              GitHub
            </a>
            <a href={person.linkedin} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
              <LinkedinIcon size={15} />
              LinkedIn
            </a>
            <a href={person.resumeUrl} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
              <FileText size={15} />
              Résumé
            </a>
          </div>
        </div>

        {/* Right — Live status + system graph */}
        <div className="hero__right">
          <div className="hero__status-panel">
            <div className="hero__status-header">
              <span className="status-dot" />
              <span className="hero__status-title">CURRENTLY BUILDING</span>
            </div>
            <div className="hero__status-divider" />

            <div className="hero__building">
              <span className="hero__building-what">{status.building}</span>
              <span className="hero__building-where">at {status.at}</span>
            </div>

            <div className="hero__status-divider" />

            {statusRows.map(row => (
              <div key={row.label} className="hero__status-row">
                <span className="hero__status-key">{row.label}</span>
                <span className="hero__status-sep">──</span>
                <span className="hero__status-value">{row.value}</span>
              </div>
            ))}
          </div>

          <SystemGraph />
        </div>
      </div>

      <div className="hero__scroll-hint" aria-hidden="true">
        <div className="hero__scroll-line" />
        <span className="hero__scroll-label">scroll</span>
      </div>
    </section>
  );
}
