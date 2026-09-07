import { useEffect, useRef, useState } from 'react';
import './SystemGraph.css';

const nodes = [
  // Full-stack branch
  { id: 'react',    label: 'React',    x: 60,  y: 30,  branch: 'stack' },
  { id: 'api',      label: 'REST API', x: 60,  y: 90,  branch: 'stack' },
  { id: 'node',     label: 'Node.js',  x: 60,  y: 150, branch: 'stack' },
  { id: 'redis',    label: 'Redis',    x: 60,  y: 210, branch: 'stack' },
  { id: 'mongo',    label: 'MongoDB',  x: 60,  y: 270, branch: 'stack' },
  // AI branch
  { id: 'python',   label: 'Python',   x: 200, y: 30,  branch: 'ai' },
  { id: 'fastapi',  label: 'FastAPI',  x: 200, y: 90,  branch: 'ai' },
  { id: 'langgraph',label: 'LangGraph',x: 200, y: 150, branch: 'ai' },
  { id: 'rag',      label: 'RAG',      x: 200, y: 210, branch: 'ai' },
  { id: 'llm',      label: 'LLM',      x: 200, y: 270, branch: 'ai' },
];

const edges = [
  ['react',     'api'],
  ['api',       'node'],
  ['node',      'redis'],
  ['redis',     'mongo'],
  ['python',    'fastapi'],
  ['fastapi',   'langgraph'],
  ['langgraph', 'rag'],
  ['rag',       'llm'],
  // cross-links
  ['node',      'langgraph'],
  ['mongo',     'rag'],
];

export default function SystemGraph() {
  const [activeNodes, setActiveNodes] = useState(new Set());
  const animRef = useRef(null);

  useEffect(() => {
    let i = 0;
    const ids = nodes.map(n => n.id);
    const interval = setInterval(() => {
      const next = ids[i % ids.length];
      setActiveNodes(prev => {
        const s = new Set(prev);
        if (s.size > 4) s.clear();
        s.add(next);
        return s;
      });
      i++;
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const getNode = id => nodes.find(n => n.id === id);

  return (
    <div className="system-graph" aria-hidden="true">
      <svg
        viewBox="0 -10 300 320"
        width="300"
        height="310"
        className="system-graph__svg"
        ref={animRef}
      >
        {/* Edges */}
        {edges.map(([a, b]) => {
          const na = getNode(a);
          const nb = getNode(b);
          if (!na || !nb) return null;
          const isActive = activeNodes.has(a) || activeNodes.has(b);
          return (
            <line
              key={`${a}-${b}`}
              x1={na.branch === nb.branch ? na.x + 44 : na.x + 88}
              y1={na.y + (na.branch === nb.branch ? 26 : 13)}
              x2={nb.branch === na.branch ? nb.x + 44 : nb.x}
              y2={nb.y + (na.branch === nb.branch ? 0 : 13)}
              className={`system-graph__edge ${isActive ? 'system-graph__edge--active' : ''}`}
              strokeDasharray={na.branch !== nb.branch ? '4 3' : 'none'}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map(node => {
          const isActive = activeNodes.has(node.id);
          return (
            <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
              <rect
                x="2" y="2" width="84" height="22" rx="3"
                className={`system-graph__node ${isActive ? 'system-graph__node--active' : ''} system-graph__node--${node.branch}`}
              />
              <text
                x="44" y="16"
                textAnchor="middle"
                dominantBaseline="middle"
                className={`system-graph__label ${isActive ? 'system-graph__label--active' : ''}`}
              >
                {node.label}
              </text>
            </g>
          );
        })}

        {/* Branch Labels */}
        <text x="46" y="-2" className="system-graph__branch-label" textAnchor="middle">FULL-STACK</text>
        <text x="200" y="-2" className="system-graph__branch-label" textAnchor="start">AI / LLM</text>
      </svg>
    </div>
  );
}
