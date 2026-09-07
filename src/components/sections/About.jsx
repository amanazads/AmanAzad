import { useIntersection } from '../../hooks/useIntersection';
import { about, education, status } from '../../data/portfolio';
import './About.css';

export default function About() {
  const [ref, visible] = useIntersection();

  return (
    <section className="section about-section" id="about" ref={ref}>
      <div className="container">
        <div className="section-label">
          <span className="mono-label">08 — About</span>
        </div>

        <div className={`about-grid ${visible ? 'about-grid--visible' : ''}`}>
          {/* Story */}
          <div className="about-block">
            <h2 className="section-title">About me.</h2>

            <div className="about-story">
              {about.paragraphs.map(p => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>

            <div className="about-interests">
              <span className="mono-label about-interests__label">Currently interested in</span>
              <div className="about-interests__items">
                {about.interests.map(i => (
                  <span key={i} className="tag">{i}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="about-block">
            <div className="about-now">
              <div className="about-now__header">
                <span className="status-dot" />
                <span className="mono-label">Currently</span>
              </div>
              <p className="about-now__role">{status.role}</p>
              <p className="about-now__where">{status.at}</p>
              <div className="about-now__divider" />
              <p className="about-now__building">
                <span className="about-now__building-label">Building</span>
                {status.building}
              </p>
            </div>

            <div className="edu-card">
              <div className="edu-card__header">
                <h3 className="edu-card__institution">{education.institution}</h3>
                <p className="edu-card__degree">{education.degree}</p>
                <span className="mono-label edu-card__period">{education.period} · {education.note}</span>
              </div>
              <div className="edu-card__divider" />
              <div className="edu-card__coursework">
                <span className="mono-label" style={{ marginBottom: '12px', display: 'block' }}>
                  Relevant coursework
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
