import { useState } from 'react';
import { useIntersection } from '../../hooks/useIntersection';
import { systemsCaseStudies } from '../../data/portfolio';
import './SystemsThinking.css';

export default function SystemsThinking() {
  const [activeId, setActiveId] = useState('perf');
  const [ref, visible] = useIntersection();
  const active = systemsCaseStudies.find(s => s.id === activeId);

  return (
    <section className="section systems-section" id="systems" ref={ref}>
      <div className="container">
        <div className="section-label">
          <span className="mono-label">06 — Engineering Deep-Dive</span>
        </div>
        <h2 className="section-title">How I think about systems.</h2>
        <p className="section-subtitle">
          Three production problems. Three engineering approaches. Real architectures.
        </p>

        <div className={`systems-layout ${visible ? 'systems-layout--visible' : ''}`}>
          {/* Tabs */}
          <div className="systems-tabs">
            {systemsCaseStudies.map(s => (
              <button
                key={s.id}
                className={`systems-tab ${activeId === s.id ? 'systems-tab--active' : ''}`}
                onClick={() => setActiveId(s.id)}
              >
                <span className="mono-label systems-tab__label">{s.label}</span>
                <span className="systems-tab__title">{s.title}</span>
              </button>
            ))}
          </div>

          {/* Diagram panel */}
          {active && (
            <div className="systems-panel" key={active.id}>
              <div className="systems-panel__header">
                <div>
                  <span className="mono-label">{active.label}</span>
                  <h3 className="systems-panel__title">{active.title}</h3>
                </div>
              </div>
              <p className="systems-panel__desc">{active.description}</p>

              <div className="systems-diagram">
                {active.steps.map((step, i) => (
                  <div key={step.label} className="systems-diagram__step" style={{ '--i': i }}>
                    <div className={`systems-diagram__node systems-diagram__node--${step.type}`}>
                      <span className="systems-diagram__node-idx">{String(i + 1).padStart(2, '0')}</span>
                      <span className="systems-diagram__node-label">{step.label}</span>
                    </div>
                    {i < active.steps.length - 1 && (
                      <div className="systems-diagram__connector">
                        <svg width="1" height="24" viewBox="0 0 1 24" fill="none">
                          <line x1="0.5" y1="0" x2="0.5" y2="24" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 2"/>
                        </svg>
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                          <path d="M1 1l4 4 4-4" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
