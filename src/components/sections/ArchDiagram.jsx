import { useEffect, useState } from 'react';
import './ArchDiagram.css';

const typeClass = {
  input: 'arch-diagram__node--input',
  process: 'arch-diagram__node--process',
  core: 'arch-diagram__node--core',
  data: 'arch-diagram__node--data',
  output: 'arch-diagram__node--output',
  fallback: 'arch-diagram__node--fallback',
};

// Horizontal, wrapping flow. Nodes light up once in sequence when the
// diagram mounts (i.e. when a project tab is selected), then settle.
export default function ArchDiagram({ nodes, accentColor }) {
  const [activeIdx, setActiveIdx] = useState(-1);

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let i = 0;
    let settle;
    const interval = setInterval(() => {
      setActiveIdx(i);
      i += 1;
      if (i >= nodes.length) {
        clearInterval(interval);
        settle = setTimeout(() => setActiveIdx(-1), 700);
      }
    }, 220);

    return () => {
      clearInterval(interval);
      clearTimeout(settle);
    };
  }, [nodes]);

  return (
    <div className="arch-diagram" role="img" aria-label={`Architecture flow: ${nodes.map(n => n.label).join(' then ')}`}>
      <div className="arch-diagram__flow">
        {nodes.map((node, i) => (
          <div key={node.id} className="arch-diagram__step">
            <div
              className={`arch-diagram__node ${typeClass[node.type] || typeClass.process} ${
                i === activeIdx ? 'arch-diagram__node--active' : ''
              }`}
              style={i === activeIdx && accentColor ? { borderColor: accentColor, color: accentColor } : undefined}
            >
              {node.label}
            </div>
            {i < nodes.length - 1 && (
              <span className="arch-diagram__arrow" aria-hidden="true">
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path
                    d="M1 5h11M8.5 1.5L12 5l-3.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
