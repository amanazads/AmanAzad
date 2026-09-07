import { useState } from 'react';
import { ChevronDown, MapPin, Calendar } from 'lucide-react';
import { useIntersection } from '../../hooks/useIntersection';
import { experience } from '../../data/portfolio';
import './Timeline.css';

export default function Timeline() {
  const [openId, setOpenId] = useState(experience[0].id);
  const [ref, visible] = useIntersection();

  return (
    <section className="section timeline-section" id="experience" ref={ref}>
      <div className="container">
        <div className="section-label">
          <span className="mono-label">02 — Experience</span>
        </div>
        <h2 className="section-title">Where I have shipped.</h2>
        <p className="section-subtitle">
          Startup engineering: real users, real deployments, and the constraints that come with both.
        </p>

        <div className={`timeline ${visible ? 'timeline--visible' : ''}`}>
          {experience.map((exp, i) => (
            <article key={exp.id} className="timeline-item" style={{ '--delay': `${i * 120}ms` }}>
              <div className="timeline-item__rail">
                <div className="timeline-item__dot" />
                <div className="timeline-item__line" />
              </div>

              <div className="timeline-item__content">
                <button
                  className={`timeline-item__header ${openId === exp.id ? 'timeline-item__header--open' : ''}`}
                  onClick={() => setOpenId(openId === exp.id ? null : exp.id)}
                  aria-expanded={openId === exp.id}
                  aria-controls={`exp-${exp.id}`}
                >
                  <div className="timeline-item__meta">
                    <span className="mono-label timeline-item__type">{exp.type}</span>
                    {exp.current && <span className="timeline-item__current">Current</span>}
                    <span className="timeline-item__period">
                      <Calendar size={12} />
                      {exp.period}
                    </span>
                    <span className="timeline-item__location">
                      <MapPin size={12} />
                      {exp.location}
                    </span>
                  </div>
                  <div className="timeline-item__title-row">
                    <div>
                      <h3 className="timeline-item__company">{exp.company}</h3>
                      <p className="timeline-item__role">{exp.role}</p>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`timeline-item__chevron ${openId === exp.id ? 'timeline-item__chevron--open' : ''}`}
                    />
                  </div>
                </button>

                {openId === exp.id && (
                  <div id={`exp-${exp.id}`} className="timeline-item__body">
                    <p className="timeline-item__desc">{exp.description}</p>

                    <div className="timeline-item__impact">
                      {exp.impact.map(item => (
                        <div key={item.label} className="impact-badge">
                          <span className="impact-badge__value">{item.value}</span>
                          <span className="impact-badge__label">{item.label}</span>
                        </div>
                      ))}
                    </div>

                    <ul className="timeline-item__highlights">
                      {exp.highlights.map(h => (
                        <li key={h}>
                          <span className="timeline-item__bullet">→</span>
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="timeline-item__stack">
                      {exp.stack.map(tech => (
                        <span key={tech} className="tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
