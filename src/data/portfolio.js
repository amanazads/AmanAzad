// ============================================================
// AMAN AZAD PORTFOLIO — Content Data
// All content is sourced from real information only.
// No fabricated data.
// ============================================================

export const person = {
  name: 'Aman Azad',
  title: 'Software Engineer',
  subtitle: 'Full-Stack & AI',
  tagline: 'I build production systems at the intersection of full-stack engineering and AI.',
  email: 'azadaman1apl@gmail.com',
  github: 'https://github.com/amanazads',
  linkedin: 'https://linkedin.com/in/amanazads',
  resumeUrl: 'https://drive.google.com/file/d/1x1absDenFokqHMi5QoQDpO0PK4te7wqM/view?usp=share_link',
  location: 'India',
};

export const status = {
  current: 'Building CKRIPT',
  focus: 'Full-Stack + AI',
  stack: 'React / Node / Python',
  infra: 'AWS / Redis',
  dsa: '150+ problems',
  available: true,
};

export const experience = [
  {
    id: 'ckript',
    company: 'CKRIPT',
    role: 'Founding Engineer & Technical Lead',
    period: 'Feb 2026 — Present',
    location: 'New Delhi, India',
    type: 'Full-Time',
    description: 'Media-tech platform. Architected and shipped the full production system from scratch.',
    highlights: [
      'Reduced average page response time by ~60% through Redis caching and MongoDB query optimization',
      'Shipped a production platform serving 100+ active users in its first quarter',
      'Architected and shipped the full-stack system using React.js, Node.js, Express.js, and MongoDB',
      'Built and code-reviewed a reusable library of 15+ React components with hooks, lazy loading, and shared state-management patterns',
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Redis'],
    impact: [
      { value: '~60%', label: 'Response Time Reduction' },
      { value: '100+', label: 'Active Users' },
      { value: '15+', label: 'Reusable Components' },
    ],
  },
  {
    id: 'yatumart',
    company: 'YATU MART',
    role: 'Software Engineer Intern',
    period: 'Oct 2023 — Dec 2024',
    location: 'India',
    type: 'Internship',
    description: 'E-commerce platform serving 3 university campuses. Production backend and real-time systems.',
    highlights: [
      'Reduced order-processing time by ~50% using real-time order tracking with Socket.io',
      'Platform served 3 university campuses with 500+ monthly production orders',
      'Shortened release cycles by ~40% through REST API contracts, CI/CD, and code reviews',
      'Built backend validation, error handling, JWT authentication, and AWS deployment in a 2-person engineering team',
    ],
    stack: ['Node.js', 'Express.js', 'Socket.io', 'AWS', 'JWT', 'REST APIs', 'CI/CD'],
    impact: [
      { value: '~50%', label: 'Order Processing Improvement' },
      { value: '500+', label: 'Monthly Production Orders' },
      { value: '~40%', label: 'Faster Release Cycles' },
    ],
  },
];

export const projects = [
  {
    id: 'resolveai',
    name: 'ResolveAI',
    subtitle: 'AI Customer Support Agent',
    label: 'AI / AGENTIC SYSTEM',
    description: 'An agentic customer support system built on LangGraph with intent-based routing, RAG retrieval, and human escalation fallback. Designed for production deployment with FastAPI as the API layer.',
    stack: ['Python', 'FastAPI', 'LangGraph', 'LangChain', 'Gemini', 'RAG', 'FAISS', 'MongoDB'],
    features: [
      'Intent-based query routing across 5 categories',
      'Agentic workflow orchestration via LangGraph',
      'Vector search with FAISS for semantic retrieval',
      'MongoDB-backed knowledge retrieval',
      'Human escalation fallback for edge cases',
      'FastAPI async API layer',
    ],
    architecture: [
      { id: 'query', label: 'User Query', type: 'input' },
      { id: 'intent', label: 'Intent Detection', type: 'process' },
      { id: 'agent', label: 'LangGraph Agent', type: 'core' },
      { id: 'router', label: 'Query Router', type: 'process' },
      { id: 'retrieval', label: 'Knowledge Retrieval', type: 'process' },
      { id: 'faiss', label: 'FAISS Vector Store', type: 'data' },
      { id: 'mongo', label: 'MongoDB', type: 'data' },
      { id: 'llm', label: 'Gemini LLM', type: 'core' },
      { id: 'response', label: 'Response', type: 'output' },
      { id: 'escalate', label: 'Human Escalation', type: 'fallback' },
    ],
    github: 'https://github.com/amanazads',
    accentColor: '#8B5CF6',
  },
  {
    id: 'flashbites',
    name: 'FlashBites',
    subtitle: 'Cross-Platform Food Ordering Platform',
    label: 'FULL-STACK / MOBILE',
    description: 'A cross-platform food ordering and delivery platform. Web application and Android app built with Capacitor. Real-time order tracking via Socket.io. Android app published on Google Play Store.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'Capacitor'],
    features: [
      'Real-time order receiving and delivery tracking',
      'Android application published on Google Play Store',
      'Cross-platform via Capacitor (web + Android)',
      'Full-stack architecture with REST APIs',
      'Production deployment',
      'Live order state updates via Socket.io',
    ],
    architecture: [
      { id: 'web', label: 'React Web App', type: 'input' },
      { id: 'android', label: 'Android (Capacitor)', type: 'input' },
      { id: 'api', label: 'Express.js API', type: 'process' },
      { id: 'socket', label: 'Socket.io Server', type: 'core' },
      { id: 'mongo', label: 'MongoDB', type: 'data' },
      { id: 'realtime', label: 'Real-Time Updates', type: 'output' },
    ],
    github: 'https://github.com/amanazads',
    accentColor: '#16A34A',
  },
  {
    id: 'cognisphere',
    name: 'CogniSphere AI',
    subtitle: 'Enterprise Data Analytics & Intelligence Platform',
    label: 'AI / DATA PLATFORM',
    description: 'An enterprise-grade data analytics and intelligence platform with AI-assisted workflows. Handles dataset management, schema mapping, analytics pipelines, patent intelligence, and grounded Q&A on proprietary data.',
    stack: ['React.js', 'Node.js', 'MongoDB', 'Python', 'Power BI', 'NLP'],
    features: [
      'Dataset management and data ingestion pipelines',
      'Schema mapping and analytics pipelines',
      'Data visualization with Power BI integration',
      'Patent intelligence and claim mapping',
      'FTO (Freedom to Operate) prioritization',
      'AI-assisted workflows with grounded Q&A',
    ],
    architecture: [
      { id: 'ingest', label: 'Data Ingestion', type: 'input' },
      { id: 'schema', label: 'Schema Mapping', type: 'process' },
      { id: 'pipeline', label: 'Analytics Pipeline', type: 'core' },
      { id: 'nlp', label: 'NLP Engine', type: 'process' },
      { id: 'mongo', label: 'MongoDB', type: 'data' },
      { id: 'viz', label: 'Power BI / Viz', type: 'output' },
      { id: 'qa', label: 'Grounded Q&A', type: 'output' },
    ],
    github: 'https://github.com/amanazads',
    accentColor: '#D97706',
  },
];

export const techStack = {
  Languages: ['C++', 'JavaScript', 'Python', 'TypeScript'],
  Frontend: ['React.js', 'Redux', 'HTML', 'CSS'],
  Backend: ['Node.js', 'Express.js', 'REST APIs', 'Socket.io', 'Redis'],
  Data: ['MongoDB', 'SQL'],
  AI: ['LangGraph', 'LangChain', 'RAG', 'FAISS', 'Gemini', 'LLM Applications'],
  Infrastructure: ['AWS', 'Docker', 'CI/CD', 'Linux', 'Git', 'GitHub'],
  'CS Fundamentals': ['DSA', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks'],
};

export const metrics = [
  { value: 60, suffix: '%', label: 'Backend Response Improvement', note: 'Redis caching + query optimization' },
  { value: 100, suffix: '+', label: 'Active Users', note: 'CKRIPT — first quarter launch' },
  { value: 500, suffix: '+', label: 'Monthly Production Orders', note: 'YATU MART platform' },
  { value: 15, suffix: '+', label: 'Reusable React Components', note: 'Built and code-reviewed' },
  { value: 150, suffix: '+', label: 'DSA Problems Solved', note: 'Competitive programming' },
  { value: 10, suffix: '+', label: 'Open-Source PRs Merged', note: 'Hacktoberfest 2024 & GSSoC' },
];

export const openSource = [
  {
    label: 'HACKTOBERFEST 2024',
    description: '10+ merged pull requests across open-source repositories',
    detail: 'Contributed to multiple repositories during Hacktoberfest 2024',
    type: 'contribution',
  },
  {
    label: 'GSSoC\'24',
    description: 'Project Administrator — GirlScript Summer of Code 2024',
    detail: 'Managed and mentored contributors on open-source projects',
    type: 'admin',
  },
  {
    label: 'GDG — I/O Extended',
    description: 'I/O Extended Member — Google Developer Groups',
    detail: 'Active member of GDG community events',
    type: 'community',
  },
  {
    label: 'GDG Android Lead',
    description: 'Android Lead — Google Developer Groups',
    detail: 'Technical lead for Android development track',
    type: 'lead',
  },
];

export const education = {
  degree: 'Bachelor of Engineering in Computer Science',
  institution: 'UIET, Panjab University',
  period: '2023 — 2027',
  coursework: ['Data Structures & Algorithms', 'DBMS', 'Operating Systems', 'Computer Networks', 'Object-Oriented Programming'],
};

export const engineeringPillars = [
  {
    number: '01',
    title: 'Product Engineering',
    lines: ['Production applications', 'Architecture → deployment', 'Startup ownership'],
  },
  {
    number: '02',
    title: 'Backend Systems',
    lines: ['Node.js / Express', 'Redis / MongoDB', 'REST / Socket.io'],
  },
  {
    number: '03',
    title: 'AI Systems',
    lines: ['Python / FastAPI', 'RAG / LangGraph', 'LLM applications'],
  },
  {
    number: '04',
    title: 'Performance',
    lines: ['Query optimization', 'Caching strategies', 'API performance'],
  },
  {
    number: '05',
    title: 'Delivery',
    lines: ['AWS / Docker', 'CI/CD pipelines', 'Git / GitHub'],
  },
];

export const systemsCaseStudies = [
  {
    id: 'perf',
    title: 'Performance Optimization',
    label: 'BACKEND / CACHING',
    description: 'How I diagnosed and resolved API latency at CKRIPT.',
    steps: [
      { label: 'MongoDB Queries', type: 'input' },
      { label: 'Query Profiling', type: 'process' },
      { label: 'Index Optimization', type: 'process' },
      { label: 'Redis Caching Layer', type: 'core' },
      { label: '~60% Response Reduction', type: 'output' },
    ],
  },
  {
    id: 'realtime',
    title: 'Real-Time Systems',
    label: 'WEBSOCKET / EVENTS',
    description: 'Order state propagation from backend to delivery interface in real time.',
    steps: [
      { label: 'Client Request', type: 'input' },
      { label: 'Socket.io Layer', type: 'core' },
      { label: 'Node.js Server', type: 'process' },
      { label: 'Order State Engine', type: 'process' },
      { label: 'Live Updates', type: 'output' },
    ],
  },
  {
    id: 'rag',
    title: 'AI Retrieval Pipeline',
    label: 'RAG / VECTOR SEARCH',
    description: 'Document retrieval architecture powering ResolveAI\'s knowledge base.',
    steps: [
      { label: 'Documents', type: 'input' },
      { label: 'Chunking', type: 'process' },
      { label: 'Embeddings', type: 'process' },
      { label: 'FAISS Index', type: 'data' },
      { label: 'Semantic Retrieval', type: 'core' },
      { label: 'Gemini LLM', type: 'core' },
      { label: 'Grounded Response', type: 'output' },
    ],
  },
];
