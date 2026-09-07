import { useState } from 'react';
import { useIntersection } from '../../hooks/useIntersection';
import { techStack } from '../../data/portfolio';
import './TechStack.css';

const categories = Object.keys(techStack);

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [ref, visible] = useIntersection();

  const filtered = activeCategory ? { [activeCategory]: techStack[activeCategory] } : techStack;

  return (
    <section className="section stack-section" id="stack" ref={ref}>
      <div className="container">
        <div className="section-label">
          <span className="mono-label">06 — Tech Stack</span>
        </div>
        <h2 className="section-title">Tools &amp; technologies.</h2>
        <p className="section-subtitle">
          Grouped by where they sit in a system. Everything here is something I have built with, not
          something I have read about.
        </p>

        <div className="stack-filters" role="group" aria-label="Filter technologies by category">
          <button
            className={`stack-filter ${!activeCategory ? 'stack-filter--active' : ''}`}
            onClick={() => setActiveCategory(null)}
            aria-pressed={!activeCategory}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              className={`stack-filter ${activeCategory === cat ? 'stack-filter--active' : ''}`}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={`stack-grid ${visible ? 'stack-grid--visible' : ''}`}>
          {Object.entries(filtered).map(([category, items], ci) => (
            <div
              key={category}
              className={`stack-category ${items.length >= 7 ? 'stack-category--wide' : ''}`}
              style={{ '--delay': `${ci * 60}ms` }}
            >
              <div className="stack-category__header">
                <span className="mono-label">{category}</span>
                <span className="stack-category__count">{items.length}</span>
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
