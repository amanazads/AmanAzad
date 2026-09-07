import { useState, useEffect, useRef } from 'react';
import { useIntersection } from '../../hooks/useIntersection';
import { metrics } from '../../data/portfolio';
import './Metrics.css';

function AnimatedCounter({ target, prefix = '', suffix, visible }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!visible || started.current) return;
    started.current = true;

    const reduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setCount(target);
      return;
    }

    const duration = 1200;
    const start = performance.now();
    const step = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, target]);

  return (
    <span className="metric__value">
      {prefix}{count}{suffix}
    </span>
  );
}

export default function Metrics() {
  const [ref, visible] = useIntersection({ threshold: 0.2 });

  return (
    <section className="section metrics-section" id="impact" ref={ref}>
      <div className="container">
        <div className="section-label">
          <span className="mono-label">01 — Verified Impact</span>
        </div>

        <div className="metrics-grid">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className={`metric-card ${visible ? 'metric-card--visible' : ''}`}
              style={{ '--delay': `${i * 90}ms` }}
            >
              <AnimatedCounter target={m.value} prefix={m.prefix} suffix={m.suffix} visible={visible} />
              <div className="metric__label">{m.label}</div>
              <div className="metric__note">{m.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
