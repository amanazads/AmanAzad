import { useIntersection } from '../../hooks/useIntersection';
import { openSource, education } from '../../data/portfolio';
import './About.css';

const roleIcons = {
  contribution: '↗',
  admin: '◆',
  lead: '▲',
  community: '○',
};

export default function About() {
  const [ref, visible] = useIntersection();

  return (
    <section className="section about-section" id="about-detail" ref={ref}>
      <div className="container">
        <div className={`about-grid ${visible ? 'about-grid--visible' : ''}`}>
          {/* Open Source */}
          <div className="about-block">
            <div className="section-label" style={{ marginBottom: 'var(--space-6)' }}>
              <span className="mono-label">08 — Community</span>
            </div>
            <h2 className="section-title">Open Source.</h2>
            <p className="section-subtitle" style={{ marginBottom: 'var(--space-8)' }}>
              Engineering contributions. Not just attendance.
            </p>

            <div className="os-list">
              {openSource.map((item, i) => (
                <div key={item.label} className="os-item" style={{ '--delay': `${i * 80}ms` }}>
                  <div className="os-item__icon">{roleIcons[item.type]}</div>
                  <div className="os-item__content">
                    <span className="mono-label os-item__label">{item.label}</span>
                    <p className="os-item__desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="about-block">
            <div className="section-label" style={{ marginBottom: 'var(--space-6)' }}>
              <span className="mono-label">09 — Education</span>
            </div>
            <h2 className="section-title">Background.</h2>
            <p className="section-subtitle" style={{ marginBottom: 'var(--space-8)' }}>
              Computer Science foundations driving engineering decisions.
            </p>

            <div className="edu-card">
              <div className="edu-card__header">
                <div>
                  <h3 className="edu-card__institution">{education.institution}</h3>
                  <p className="edu-card__degree">{education.degree}</p>
                  <span className="mono-label edu-card__period">{education.period}</span>
                </div>
              </div>
              <div className="edu-card__divider" />
              <div className="edu-card__coursework">
                <span className="mono-label" style={{ marginBottom: '12px', display: 'block' }}>
                  Relevant Coursework
                </span>
                <div className="edu-card__courses">
                  {education.coursework.map(c => (
                    <span key={c} className="tag">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
