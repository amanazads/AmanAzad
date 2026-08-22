import { ArrowRight, Download } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons';
import SystemGraph from './SystemGraph';
import { person, status } from '../../data/portfolio';
import './Hero.css';

const statusRows = [
  { label: 'STATUS', value: status.current, active: true },
  { label: 'FOCUS', value: status.focus },
  { label: 'STACK', value: status.stack },
  { label: 'INFRA', value: status.infra },
  { label: 'DSA', value: status.dsa },
];

export default function Hero() {
  return (
    <section className="hero" aria-label="Introduction">
      <div className="container hero__inner">
        {/* Left — Content */}
        <div className="hero__content">
          {/* System label */}
          <div className="hero__system-label">
            <span className="hero__system-id">SYSTEM / AMAN.AZAD</span>
            <span className="hero__system-sep">——</span>
            <span className="hero__system-ver">v2026</span>
          </div>

          {/* Name */}
          <h1 className="hero__name">
            Aman<br />Azad
          </h1>

          {/* Role */}
          <p className="hero__role">
            Software Engineer
            <span className="hero__role-sep"> — </span>
            Full-Stack &amp; AI
          </p>

          {/* Tagline */}
          <p className="hero__tagline">
            {person.tagline}
          </p>

          {/* CTAs */}
          <div className="hero__cta">
            <a href="#projects" className="btn btn-primary hero__cta-primary" onClick={e => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              View Work
              <ArrowRight size={16} />
            </a>
            <a href="#contact" className="btn btn-secondary" onClick={e => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Let's Connect
            </a>
          </div>

          {/* Social links */}
          <div className="hero__links">
            <a href={person.github} className="hero__social-link" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <GithubIcon size={16} />
              <span>amanazads</span>
            </a>
            <span className="hero__link-sep">·</span>
            <a href={person.linkedin} className="hero__social-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedinIcon size={16} />
              <span>amanazads</span>
            </a>
            <span className="hero__link-sep">·</span>
            <a href={person.resumeUrl} target="_blank" rel="noopener noreferrer" className="hero__social-link" aria-label="View Resume">
              <Download size={16} />
              <span>Resume</span>
            </a>
          </div>
        </div>

        {/* Right — Status Panel + Graph */}
        <div className="hero__right">
          {/* Status Panel */}
          <div className="hero__status-panel">
            <div className="hero__status-header">
              <span className="hero__status-dot"></span>
              <span className="hero__status-title">ENGINEER_STATUS</span>
            </div>
            <div className="hero__status-divider" />
            {statusRows.map(row => (
              <div key={row.label} className="hero__status-row">
                <span className="hero__status-key">{row.label}</span>
                <span className="hero__status-sep">──</span>
                <span className={`hero__status-value ${row.active ? 'hero__status-value--active' : ''}`}>
                  {row.value}
                </span>
              </div>
            ))}
            <div className="hero__status-divider" />
            <div className="hero__status-avail">
              <span className="status-dot" />
              <span className="hero__status-avail-text">Open to opportunities</span>
            </div>
          </div>

          {/* Graph */}
          <SystemGraph />
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero__scroll-hint" aria-hidden="true">
        <div className="hero__scroll-line" />
        <span className="hero__scroll-label">scroll</span>
      </div>
    </section>
  );
}
