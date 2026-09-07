import { useIntersection } from '../../hooks/useIntersection';
import { engineeringPillars } from '../../data/portfolio';
import './EngineeringGlance.css';

export default function EngineeringGlance() {
  const [ref, visible] = useIntersection();

  return (
    <section className="section eg-section" id="approach" ref={ref}>
      <div className="container">
        <div className="section-label">
          <span className="mono-label">05 — Approach</span>
        </div>
        <div className="eg-header">
          <h2 className="section-title">How I think about engineering.</h2>
          <p className="section-subtitle">
            Five things I care about, in the order they usually matter when something has to ship and then keep working.
          </p>
        </div>

        <div className={`eg-grid ${visible ? 'eg-grid--visible' : ''}`}>
          {engineeringPillars.map((pillar, i) => (
            <article key={pillar.number} className="eg-card" style={{ '--delay': `${i * 80}ms` }}>
              <div className="eg-card__number">{pillar.number}</div>
              <h3 className="eg-card__title">{pillar.title}</h3>
              <ul className="eg-card__lines">
                {pillar.lines.map(line => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
