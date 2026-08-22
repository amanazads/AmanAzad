import { useState } from 'react';
import { useIntersection } from '../../hooks/useIntersection';
import { techStack } from '../../data/portfolio';
import './TechStack.css';

const categories = Object.keys(techStack);

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [ref, visible] = useIntersection();

  const filtered = activeCategory
    ? { [activeCategory]: techStack[activeCategory] }
    : techStack;

  return (
    <section className="section stack-section" id="stack" ref={ref}>
      <div className="container">
        <div className="section-label">
          <span className="mono-label">05 — Tech Stack</span>
        </div>
        <h2 className="section-title">Tools &amp; Technologies.</h2>
        <p className="section-subtitle">
          Categorized by domain. Each technology is production-experience, not listed for the sake of it.
        </p>

        {/* Category filter */}
        <div className="stack-filters">
          <button
            className={`stack-filter ${!activeCategory ? 'stack-filter--active' : ''}`}
            onClick={() => setActiveCategory(null)}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              className={`stack-filter ${activeCategory === cat ? 'stack-filter--active' : ''}`}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={`stack-grid ${visible ? 'stack-grid--visible' : ''}`}>
          {Object.entries(filtered).map(([category, items], ci) => (
            <div key={category} className="stack-category" style={{ '--delay': `${ci * 60}ms` }}>
              <div className="stack-category__header">
                <span className="mono-label">{category}</span>
              </div>
              <div className="stack-category__items">
                {items.map(item => (
                  <span key={item} className="stack-item">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
