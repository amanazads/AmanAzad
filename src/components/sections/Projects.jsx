import { useState } from 'react';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from '../ui/BrandIcons';
import { useIntersection } from '../../hooks/useIntersection';
import { projects } from '../../data/portfolio';
import ArchDiagram from './ArchDiagram';
import './Projects.css';

export default function Projects() {
  const [activeProject, setActiveProject] = useState('resolveai');
  const [ref, visible] = useIntersection();
  const project = projects.find(p => p.id === activeProject);

  return (
    <section className="section projects-section" id="projects" ref={ref}>
      <div className="container">
        <div className="section-label">
          <span className="mono-label">04 — Systems I've Built</span>
        </div>
        <h2 className="section-title">Projects.</h2>
        <p className="section-subtitle">
          Each project is a production system built with a specific architecture and engineering rationale.
        </p>

        <div className={`projects-layout ${visible ? 'projects-layout--visible' : ''}`}>
          {/* Left: Project Tabs */}
          <aside className="projects-tabs">
            {projects.map((p, i) => (
              <button
                key={p.id}
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

          {/* Right: Project Detail */}
          {project && (
            <div className="project-detail" key={project.id}>
              {/* Header */}
              <div className="project-detail__header">
                <div>
                  <span className="mono-label">{project.label}</span>
                  <h3 className="project-detail__name">{project.name}</h3>
                  <p className="project-detail__subtitle">{project.subtitle}</p>
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary project-detail__github"
                  aria-label={`View ${project.name} on GitHub`}
                >
                  <GithubIcon size={15} />
                  GitHub
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* Description */}
              <p className="project-detail__desc">{project.description}</p>

              {/* Architecture Diagram */}
              <div className="project-detail__arch">
                <div className="project-detail__arch-header">
                  <span className="mono-label">Architecture</span>
                </div>
                <ArchDiagram nodes={project.architecture} accentColor={project.accentColor} />
              </div>

              {/* Features */}
              <div className="project-detail__features">
                <span className="mono-label" style={{ marginBottom: '12px', display: 'block' }}>Key Engineering Details</span>
                <ul className="project-features-list">
                  {project.features.map(f => (
                    <li key={f}>
                      <span className="project-feature__bullet">→</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech tags */}
              <div className="project-detail__stack">
                {project.stack.map(tech => (
                  <span key={tech} className="tag">{tech}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
