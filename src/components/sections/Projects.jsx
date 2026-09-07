import { useState } from 'react';
import { ChevronRight, ExternalLink, Info } from 'lucide-react';
import { GithubIcon } from '../ui/BrandIcons';
import { useIntersection } from '../../hooks/useIntersection';
import { projects } from '../../data/portfolio';
import ArchDiagram from './ArchDiagram';
import './Projects.css';

export default function Projects() {
  const [activeProject, setActiveProject] = useState(projects[0].id);
  const [ref, visible] = useIntersection();
  const project = projects.find(p => p.id === activeProject) || projects[0];

  return (
    <section className="section projects-section" id="projects" ref={ref}>
      <div className="container">
        <div className="section-label">
          <span className="mono-label">03 — Featured Work</span>
        </div>
        <h2 className="section-title">Projects.</h2>
        <p className="section-subtitle">
          Four systems, each picked for the engineering behind it rather than the screenshot.
          Two agentic AI systems, one safety benchmark, one real-time full-stack platform.
        </p>

        <div className={`projects-layout ${visible ? 'projects-layout--visible' : ''}`}>
          {/* Left: project rail */}
          <aside className="projects-tabs" role="tablist" aria-label="Featured projects">
            {projects.map((p, i) => (
              <button
                key={p.id}
                role="tab"
                aria-selected={activeProject === p.id}
                className={`projects-tab ${activeProject === p.id ? 'projects-tab--active' : ''}`}
                onClick={() => setActiveProject(p.id)}
                style={{ '--delay': `${i * 80}ms` }}
              >
                <div className="projects-tab__inner">
                  <span className="mono-label projects-tab__label">{p.label}</span>
                  <span className="projects-tab__name">{p.name}</span>
                  <span className="projects-tab__sub">{p.subtitle}</span>
                </div>
                <ChevronRight size={14} className="projects-tab__arrow" />
              </button>
            ))}
          </aside>

          {/* Right: case study */}
          <article className="project-detail" key={project.id}>
            <header className="project-detail__header">
              <div className="project-detail__identity">
                <span className="mono-label">{project.label}</span>
                <h3 className="project-detail__name">{project.name}</h3>
                <p className="project-detail__subtitle">{project.subtitle}</p>
              </div>
              <div className="project-detail__links">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary project-detail__link"
                  aria-label={`View ${project.name} source on GitHub`}
                >
                  <GithubIcon size={15} />
                  Code
                  <ExternalLink size={12} />
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary project-detail__link"
                    aria-label={`Open the ${project.name} live demo`}
                  >
                    Live Demo
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </header>

            <p className="project-detail__value">{project.valueProp}</p>

            {project.statusNote && (
              <div className="project-note">
                <Info size={14} className="project-note__icon" />
                <p className="project-note__text">
                  <span className="project-note__label">{project.statusNote.label}:</span>{' '}
                  {project.statusNote.text}
                </p>
              </div>
            )}

            <div className="project-detail__arch">
              <div className="project-detail__arch-header">
                <span className="mono-label">Architecture</span>
              </div>
              <ArchDiagram nodes={project.architecture} accentColor={project.accentColor} />
            </div>

            <p className="project-detail__desc">{project.description}</p>

            <div className="project-detail__block">
              <span className="mono-label project-detail__block-label">Engineering</span>
              <ul className="project-features-list">
                {project.capabilities.map(f => (
                  <li key={f}>
                    <span className="project-feature__bullet">→</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {project.taxonomy && (
              <div className="project-detail__block">
                <span className="mono-label project-detail__block-label">Violation taxonomy</span>
                <div className="project-taxonomy">
                  {project.taxonomy.map(t => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            )}

            {project.benchmarks && (
              <div className="project-detail__block">
                <span className="mono-label project-detail__block-label">Benchmark results</span>
                <div className="project-benchmarks">
                  {project.benchmarks.items.map(b => (
                    <div key={b.label} className="benchmark">
                      <span className="benchmark__value">{b.value}</span>
                      <span className="benchmark__label">{b.label}</span>
                      <span className="benchmark__detail">{b.detail}</span>
                    </div>
                  ))}
                </div>
                <p className="project-benchmarks__note">{project.benchmarks.note}</p>
              </div>
            )}

            <div className="project-detail__stack">
              {project.stack.map(tech => (
                <span key={tech} className="tag">{tech}</span>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
