import { useEffect, useState } from 'react';
import './ArchDiagram.css';

const typeColors = {
  input:    { bg: 'var(--surface-hover)', border: 'var(--border)', text: 'var(--text-secondary)' },
  process:  { bg: 'var(--surface)',       border: 'var(--border)', text: 'var(--text-secondary)' },
  core:     { bg: 'var(--accent-dim)',    border: 'var(--accent)',  text: 'var(--accent)' },
  data:     { bg: 'var(--surface-hover)', border: 'var(--border)', text: 'var(--text-secondary)' },
  output:   { bg: 'var(--accent-dim)',    border: 'var(--accent)',  text: 'var(--accent)' },
  fallback: { bg: 'var(--surface-hover)', border: 'var(--border)', text: 'var(--text-tertiary)' },
};

export default function ArchDiagram({ nodes, accentColor }) {
  const [activeIdx, setActiveIdx] = useState(-1);

  useEffect(() => {
    let i = 0;
    // Animate through nodes sequentially on mount
    const interval = setInterval(() => {
      setActiveIdx(i);
      i++;
      if (i >= nodes.length) {
        clearInterval(interval);
        // Reset after short pause
        setTimeout(() => setActiveIdx(-1), 600);
      }
    }, 250);
    return () => clearInterval(interval);
  }, [nodes]);

  return (
    <div className="arch-diagram">
      <div className="arch-diagram__flow">
        {nodes.map((node, i) => {
          const colors = typeColors[node.type] || typeColors.process;
          const isActive = i === activeIdx;
          return (
            <div key={node.id} className="arch-diagram__step">
              <div
                className={`arch-diagram__node ${isActive ? 'arch-diagram__node--active' : ''}`}
                style={{
                  '--node-bg': colors.bg,
                  '--node-border': isActive ? (accentColor || 'var(--accent)') : colors.border,
                  '--node-text': isActive ? (accentColor || 'var(--accent)') : colors.text,
                }}
              >
                {node.label}
              </div>
              {i < nodes.length - 1 && (
                <div className={`arch-diagram__arrow ${isActive ? 'arch-diagram__arrow--active' : ''}`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2v10M4 8l4 5 4-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
