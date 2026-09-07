// ============================================================
// AMAN AZAD PORTFOLIO — Content Data
// Single source of truth for all site content.
//
// Rule: every claim here is backed by the resume, the CKRIPT /
// YATU MART work, or a public repository under github.com/amanazads.
// Experimental, benchmark-only or test-environment work is
// labelled as such. No invented metrics, users, or deployments.
// ============================================================

export const person = {
  name: 'Aman Azad',
  title: 'Software Engineer',
  subtitle: 'Full-Stack & AI',
  tagline: 'Full-stack engineer building reliable products, backend systems, and agentic AI applications.',
  positioning: 'I build production systems at the intersection of full-stack engineering and AI.',
  email: 'azadaman1apl@gmail.com',
  github: 'https://github.com/amanazads',
  githubUser: 'amanazads',
  linkedin: 'https://linkedin.com/in/amanazads',
  resumeUrl: 'https://drive.google.com/file/d/107XZmVflZUlMi64cLpTP1k_qz3Ou0Ulk/view?usp=sharing',
  location: 'India',
};

// ── Live engineering status (Hero panel) ─────────────────────
export const status = {
  building: 'Autonomous AI trailer generation agent',
  at: 'CKRIPT',
  role: 'Founding Engineer & Technical Lead',
  focus: 'Full-Stack + AI',
  stack: 'React / Node.js / Python / FastAPI',
  data: 'MongoDB / Redis',
  interest: 'Agent evaluation & reliability',
};

export const experience = [
  {
    id: 'ckript',
    company: 'CKRIPT',
    role: 'Founding Engineer & Technical Lead',
    period: 'Feb 2026 — Present',
    location: 'New Delhi, India',
    type: 'Full-Time',
    current: true,
    description:
      'Media-tech platform. I own the product end-to-end — architecture, backend, frontend, and the AI systems now being built on top of it.',
    highlights: [
      'Built and shipped the platform end-to-end with React.js, Node.js, Express.js, and MongoDB',
      'Reduced average response time by nearly 60% through Redis caching and MongoDB query optimization',
      'Helped scale the platform to 100+ active users',
      'Built and code-reviewed 15+ reusable React components using hooks, lazy loading, and shared state patterns',
      'Currently building AI-powered autonomous systems, including an autonomous AI trailer generation agent',
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Redis', 'Python', 'FastAPI'],
    impact: [
      { value: '~60%', label: 'Response Time Reduction' },
      { value: '100+', label: 'Active Users' },
      { value: '15+', label: 'Reusable Components' },
    ],
  },
  {
    id: 'yatumart',
    company: 'YATU MART',
    role: 'Software Engineer',
    period: 'Oct 2023 — Dec 2024',
    location: 'India',
    type: 'Internship',
    description:
      'MERN food delivery platform serving 3 university campuses. I worked across the backend and real-time systems in a small engineering team.',
    highlights: [
      'Built REST APIs and backend systems for a platform serving 3 university campuses and 500+ monthly production orders',
      'Implemented real-time order tracking with Socket.io to keep order state live across customer and operations views',
      'Shipped JWT authentication, backend validation, and error handling across the API surface',
      'Deployed on AWS and improved release cycles by roughly 40% through CI/CD and code review',
    ],
    stack: ['Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'JWT', 'REST APIs', 'AWS', 'CI/CD'],
    impact: [
      { value: '500+', label: 'Monthly Production Orders' },
      { value: '3', label: 'University Campuses' },
      { value: '~40%', label: 'Faster Release Cycles' },
    ],
  },
];

// ── Featured projects — ordered by technical depth ───────────
export const projects = [
  {
    id: 'resolveai',
    name: 'ResolveAI',
    subtitle: 'Autonomous AI Customer Support System',
    label: 'AI / AGENTIC SYSTEM',
    valueProp:
      'An autonomous support agent that routes by intent, answers from a grounded knowledge base, calls business tools, and escalates to a human when it should not answer.',
    description:
      'Built with FastAPI and LangGraph. A StateGraph workflow detects intent, then routes each query to RAG retrieval over a ChromaDB vector store, to business tool calls, to human escalation, or to a general response node. Conversation memory and escalation tickets are persisted in MongoDB, and a React frontend surfaces sources and tool-call traces.',
    stack: ['Python', 'FastAPI', 'LangGraph', 'LangChain', 'Gemini', 'RAG', 'ChromaDB', 'MongoDB', 'React'],
    capabilities: [
      'LangGraph StateGraph with conditional routing on detected intent and confidence',
      'RAG over ChromaDB with strict grounding — answers cite sources or state that information is unavailable',
      'Tool calling against order and customer APIs: status, details, cancellation',
      'Human escalation path that flags the conversation and writes a ticket to MongoDB',
      'Multi-turn conversational memory with an in-memory fallback for local development',
      'Automated evaluation script scoring intent, tool selection, RAG citations, and escalation safety',
    ],
    architecture: [
      { id: 'query', label: 'User Query', type: 'input' },
      { id: 'intent', label: 'Intent Detection', type: 'process' },
      { id: 'router', label: 'Agent Router', type: 'core' },
      { id: 'branch', label: 'RAG / Tool / Escalation', type: 'process' },
      { id: 'store', label: 'ChromaDB + MongoDB', type: 'data' },
      { id: 'llm', label: 'Gemini', type: 'core' },
      { id: 'response', label: 'Grounded Response', type: 'output' },
    ],
    benchmarks: {
      note: 'Internal evaluation script over a 20-case benchmark set — not a public leaderboard.',
      items: [
        { value: '95%', label: 'Intent accuracy', detail: '19/20' },
        { value: '100%', label: 'Escalation decisions', detail: '20/20' },
        { value: '100%', label: 'Tool selection', detail: '4/4' },
        { value: '91.7%', label: 'RAG citation coverage', detail: '11/12' },
      ],
    },
    github: 'https://github.com/amanazads/Resolve-AI',
    demo: 'https://resolve-ai-eosin.vercel.app',
    accentColor: '#8B5CF6',
  },
  {
    id: 'agentpay',
    name: 'AgentPay',
    featured: true,
    subtitle: 'Autonomous AI Commerce Control Plane',
    label: 'AI / BACKEND / PAYMENTS',
    valueProp:
      'A control plane that keeps LLMs out of financial execution: the model discovers and proposes, deterministic server-side policy decides whether anything may be spent.',
    description:
      'AI reasoning produces a structured purchase intent with zero financial authority. Every intent then passes through a deterministic 13-rule policy engine, an explainable 0–100 risk score, and a human approval gate before any payment call is made. Idempotency and budget locks run on Redis, and every decision lands in an append-only PostgreSQL audit trail protected by a database trigger.',
    stack: ['React', 'Node.js', 'Express', 'Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Socket.IO', 'Gemini', 'Razorpay (test)'],
    capabilities: [
      'Deterministic policy engine — 13 server-side rules resolving to exactly one of ALLOW / APPROVAL_REQUIRED / BLOCK',
      'Explainable 0–100 risk engine over merchant credibility, injection signals, price anomaly, velocity, and behavioural deviation',
      'Human-in-the-loop approval centre for high-value or high-risk intents',
      'Redis distributed locks for idempotency and atomic budget reservation against double-spend',
      'Prompt-injection scanning on user input and merchant catalog content, with server-side enforcement that ignores a compromised model verdict',
      'HMAC-SHA256 payment and webhook signature verification, plus an immutable append-only audit trail',
    ],
    architecture: [
      { id: 'ai', label: 'AI Reasoning / Discovery', type: 'input' },
      { id: 'policy', label: 'Policy Engine · 13 rules', type: 'core' },
      { id: 'risk', label: 'Risk Scoring 0–100', type: 'process' },
      { id: 'approval', label: 'Human Approval', type: 'process' },
      { id: 'lock', label: 'Idempotency + Budget Lock', type: 'data' },
      { id: 'pay', label: 'Payment Execution', type: 'core' },
      { id: 'audit', label: 'Append-Only Audit Trail', type: 'output' },
    ],
    statusNote: {
      label: 'Scope',
      text:
        'Production-oriented architecture, evaluation implementation. Payments run against Razorpay test rails with real server-side signature verification — not live financial settlement — and fulfilment is a simulated state machine. Covered by 189 backend Jest tests and 21 AI-service pytest tests.',
    },
    github: 'https://github.com/amanazads/AgentPay',
    accentColor: '#0EA5E9',
  },
  {
    id: 'indicguard',
    name: 'IndicGuard',
    featured: true,
    subtitle: 'Multilingual Adversarial Safety Benchmark',
    label: 'AI SAFETY / EVALUATION',
    valueProp:
      'A reproducible benchmark measuring whether collections-agent LLMs stay inside regulatory guardrails in English, Hindi, Hinglish, and Marathi under adversarial pressure.',
    description:
      'A fixed set of 160 adversarial scenarios — 40 per language, 20 per violation category — is run against each model under one frozen system prompt, scored by an automated safety judge, then aggregated by language, category, model, and conversation depth. A held-out 32-case split is reserved for blind human validation, and a dashboard exposes the failing exchanges rather than only the rates.',
    stack: ['Python', 'Ollama', 'Qwen', 'Gemini', 'LLM-as-a-Judge', 'Streamlit', 'pytest'],
    capabilities: [
      'V1–V8 violation taxonomy grounded in RBI Fair Practices Code, consumer-protection, and DPDP/IT Act requirements',
      '160 adversarial cases across English, Hindi, Hinglish, and Marathi, mixing single-turn and 2–5 turn escalation',
      'Automated LLM-as-a-judge pipeline with structured verdicts, evidence quotes, and judge-vs-target category tracking',
      'Local open-weight inference via Ollama alongside a declared hosted Gemini baseline',
      'Held-out 32-case split for blind human rating, scored with Cohen’s kappa and precision/recall',
      'Error and timeout responses are excluded from rates instead of being silently scored as compliant',
    ],
    architecture: [
      { id: 'cases', label: 'Adversarial Dataset · 160', type: 'input' },
      { id: 'prompt', label: 'Frozen System Prompt', type: 'process' },
      { id: 'models', label: 'Qwen (local) / Gemini (hosted)', type: 'core' },
      { id: 'judge', label: 'Safety Judge', type: 'core' },
      { id: 'metrics', label: 'Metrics Engine', type: 'process' },
      { id: 'dash', label: 'Dashboard + Failure Analysis', type: 'output' },
    ],
    taxonomy: [
      'V1 · Coercion or threat',
      'V2 · Third-party disclosure',
      'V3 · Unauthorised settlement',
      'V4 · False legal threat',
      'V5 · Dispute-halt failure',
      'V6 · PII leakage',
      'V7 · Contact-hours breach',
      'V8 · Identity misrepresentation',
    ],
    statusNote: {
      label: 'Status',
      text:
        'In progress. Current numbers cover a full 160-case hosted-baseline run plus a 40-case partial open-weight sweep; per-category samples are small, so the results are directional signals for further investigation, not settled conclusions.',
    },
    github: 'https://github.com/amanazads/IndicGuard',
    accentColor: '#D97706',
  },
  {
    id: 'flashbites',
    name: 'FlashBites',
    subtitle: 'Real-Time Food Delivery Platform',
    label: 'FULL-STACK / REAL-TIME',
    valueProp:
      'A full food-delivery platform covering four separate workflows — customer, restaurant, delivery partner, and admin — with live order and courier tracking.',
    description:
      'React and Redux Toolkit on the front end, Node.js/Express and MongoDB behind it. Socket.io carries order-state and delivery-partner location updates to a Leaflet map backed by MongoDB GeoJSON, while authentication, payments, and media handling run through JWT/Google OAuth, Razorpay, and Cloudinary.',
    stack: ['React', 'Redux Toolkit', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'JWT', 'Razorpay', 'Cloudinary'],
    capabilities: [
      'Real-time order tracking and courier location streaming over Socket.io with MongoDB GeoJSON and Leaflet maps',
      'Four role-based workflows — customer, restaurant owner, delivery partner, admin — behind role-based access control',
      'JWT authentication with Google OAuth via Passport, plus rate limiting, input sanitisation, and request validation',
      'Razorpay payment integration and Cloudinary media handling for restaurant and menu imagery',
      'Restaurant dashboard for menu management, order processing, and revenue tracking',
      'REST API backend with deployment configuration for Railway and Render',
    ],
    architecture: [
      { id: 'client', label: 'React + Redux Client', type: 'input' },
      { id: 'api', label: 'Express REST API', type: 'process' },
      { id: 'socket', label: 'Socket.io Layer', type: 'core' },
      { id: 'state', label: 'Order State Machine', type: 'process' },
      { id: 'mongo', label: 'MongoDB + GeoJSON', type: 'data' },
      { id: 'live', label: 'Live Tracking UI', type: 'output' },
    ],
    github: 'https://github.com/amanazads/flashbites.shop',
    accentColor: '#16A34A',
  },
];

// ── Tech stack ───────────────────────────────────────────────
export const techStack = {
  Languages: ['C++', 'Python', 'JavaScript', 'TypeScript', 'SQL'],
  Frontend: ['React.js', 'Redux', 'Tailwind CSS', 'HTML', 'CSS'],
  Backend: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'Socket.io'],
  Data: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'FAISS', 'ChromaDB'],
  'AI / LLM': [
    'LangGraph',
    'LangChain',
    'RAG',
    'Agentic AI',
    'Gemini',
    'LLM Applications',
    'AI Evaluation',
    'Prompt Engineering',
    'Tool Calling',
  ],
  Infrastructure: ['AWS', 'GCP', 'Docker', 'CI/CD', 'Linux', 'Git', 'GitHub'],
  Engineering: [
    'Data Structures & Algorithms',
    'OOP',
    'DBMS',
    'Operating Systems',
    'Computer Networks',
    'API Design',
    'Performance Optimization',
    'Authentication / Authorization',
    'System Design Fundamentals',
  ],
};

// ── Verified metrics only ────────────────────────────────────
export const metrics = [
  { value: 60, prefix: '~', suffix: '%', label: 'Response Time Reduction', note: 'CKRIPT — Redis caching + query optimization' },
  { value: 100, suffix: '+', label: 'Active Users', note: 'CKRIPT platform' },
  { value: 500, suffix: '+', label: 'Monthly Production Orders', note: 'YATU MART — 3 university campuses' },
  { value: 15, suffix: '+', label: 'Reusable React Components', note: 'Built and code-reviewed at CKRIPT' },
  { value: 150, suffix: '+', label: 'DSA Problems Solved', note: 'Data structures & algorithms practice' },
  { value: 10, suffix: '+', label: 'Open-Source PRs Merged', note: 'Hacktoberfest 2024' },
];

export const openSource = [
  {
    label: "GSSoC'24",
    role: 'Project Administrator & Mentor',
    description: 'GirlScript Summer of Code 2024',
    detail:
      'Onboarded contributors to Git and GitHub workflows, reviewed pull requests, and mentored first-time open-source contributors through the program.',
    type: 'admin',
  },
  {
    label: 'HACKTOBERFEST 2024',
    role: 'Contributor',
    description: '10+ merged pull requests',
    detail: 'Fixes and improvements merged across open-source repositories during Hacktoberfest 2024.',
    type: 'contribution',
  },
  {
    label: 'GDG',
    role: 'Android Lead',
    description: 'Google Developer Groups',
    detail: 'Led the Android track for the community chapter.',
    type: 'lead',
  },
  {
    label: 'GDG — I/O EXTENDED',
    role: 'Member',
    description: 'I/O Extended community events',
    detail: 'Took part in and helped run Google I/O Extended community sessions.',
    type: 'community',
  },
];

export const education = {
  degree: 'Bachelor of Engineering in Computer Science',
  institution: 'UIET, Panjab University',
  period: '2023 — 2027',
  note: 'Final-year Computer Science Engineering student',
  coursework: [
    'Data Structures & Algorithms',
    'DBMS',
    'Operating Systems',
    'Computer Networks',
    'Object-Oriented Programming',
  ],
};

// ── About narrative ──────────────────────────────────────────
export const about = {
  paragraphs: [
    'I am a final-year Computer Science Engineering student at UIET, Panjab University. My background is primarily in full-stack and backend engineering, and over time I have moved deeper into AI engineering and agentic systems.',
    'I like building products end-to-end — understanding the architecture underneath, solving the backend and performance problems that show up once real users arrive, and applying AI where it creates actual product value rather than where it demos well.',
    'Right now I am Founding Engineer at CKRIPT, where I own the platform end-to-end and am building autonomous AI systems on top of it.',
  ],
  interests: [
    'Full-stack systems',
    'Backend engineering',
    'AI agents',
    'RAG',
    'Evaluation',
    'Reliable AI systems',
    'Production engineering',
  ],
};

// ── How I think about engineering ────────────────────────────
export const engineeringPillars = [
  {
    number: '01',
    title: 'Product Engineering',
    lines: ['Build end-to-end', 'Ship real products', 'Understand user workflows'],
  },
  {
    number: '02',
    title: 'Backend Systems',
    lines: ['APIs and data models', 'Databases and caching', 'Real-time systems'],
  },
  {
    number: '03',
    title: 'AI Systems',
    lines: ['Agents and tool calling', 'RAG and retrieval', 'Evaluation and reliability'],
  },
  {
    number: '04',
    title: 'Performance',
    lines: ['Profiling first', 'Query optimization', 'Caching and latency'],
  },
  {
    number: '05',
    title: 'Delivery',
    lines: ['Git and code review', 'CI/CD and Docker', 'Cloud deployment'],
  },
];

// ── Engineering case studies ─────────────────────────────────
export const systemsCaseStudies = [
  {
    id: 'perf',
    title: 'Performance Optimization',
    label: 'CKRIPT — BACKEND',
    description:
      'API responses were bounded by MongoDB query cost. I profiled the slow paths, fixed the queries and indexes, then put Redis in front of the read-heavy ones.',
    steps: [
      { label: 'MongoDB Query Bottleneck', type: 'input' },
      { label: 'Profiling', type: 'process' },
      { label: 'Query + Index Optimization', type: 'process' },
      { label: 'Redis Caching Layer', type: 'core' },
      { label: '~60% Response-Time Reduction', type: 'output' },
    ],
  },
  {
    id: 'realtime',
    title: 'Real-Time Systems',
    label: 'YATU MART / FLASHBITES',
    description:
      'Order state has to be the same everywhere at once — customer, restaurant, and courier. Socket.io pushes state transitions instead of clients polling for them.',
    steps: [
      { label: 'Client', type: 'input' },
      { label: 'Socket.io', type: 'core' },
      { label: 'Node.js Server', type: 'process' },
      { label: 'Order State', type: 'process' },
      { label: 'Live Updates', type: 'output' },
    ],
  },
  {
    id: 'agentic',
    title: 'Agentic AI',
    label: 'RESOLVEAI — LANGGRAPH',
    description:
      'Not every query should reach the model the same way. Intent decides the path: retrieve, call a tool, or hand off to a human.',
    steps: [
      { label: 'User Query', type: 'input' },
      { label: 'Intent Detection', type: 'process' },
      { label: 'LangGraph Router', type: 'core' },
      { label: 'RAG / Tool / Escalation', type: 'process' },
      { label: 'LLM', type: 'core' },
      { label: 'Grounded Answer', type: 'output' },
    ],
  },
  {
    id: 'secure-agent',
    title: 'Secure Agentic Transactions',
    label: 'AGENTPAY — POLICY & RISK',
    description:
      'An LLM cannot guarantee a budget ceiling, so it never holds the authority. Reasoning proposes; deterministic server-side code decides, executes, and records.',
    steps: [
      { label: 'AI Reasoning', type: 'input' },
      { label: 'Policy Engine', type: 'core' },
      { label: 'Risk Engine', type: 'process' },
      { label: 'Human Approval', type: 'process' },
      { label: 'Payment', type: 'core' },
      { label: 'Audit Trail', type: 'output' },
    ],
  },
];

// ── GitHub feed prioritisation ───────────────────────────────
export const featuredRepos = ['AgentPay', 'Resolve-AI', 'IndicGuard', 'flashbites.shop'];

export const fallbackRepos = [
  {
    name: 'AgentPay',
    description:
      'Autonomous AI commerce control plane — deterministic policy, risk scoring, and human approval between an LLM and any payment.',
    language: 'JavaScript',
    html_url: 'https://github.com/amanazads/AgentPay',
  },
  {
    name: 'Resolve-AI',
    featured: true,
    description: 'Autonomous AI customer support system built with FastAPI, LangGraph, RAG, and tool calling.',
    language: 'Python',
    html_url: 'https://github.com/amanazads/Resolve-AI',
  },
  {
    name: 'IndicGuard',
    description:
      'Multilingual adversarial safety benchmark for collections-agent LLMs across English, Hindi, Hinglish, and Marathi.',
    language: 'Python',
    html_url: 'https://github.com/amanazads/IndicGuard',
  },
  {
    name: 'flashbites.shop',
    featured: true,
    description: 'Real-time food delivery platform with Socket.io tracking, role-based workflows, and payment integration.',
    language: 'JavaScript',
    html_url: 'https://github.com/amanazads/flashbites.shop',
  },
  {
    name: 'CogniSphere-AI',
    description: 'Data analytics and intelligence platform with dataset management and AI-assisted workflows.',
    language: 'JavaScript',
    html_url: 'https://github.com/amanazads/CogniSphere-AI',
  },
  {
    name: 'react-vaani',
    description: 'React application front end.',
    language: 'JavaScript',
    html_url: 'https://github.com/amanazads/react-vaani',
  },
];
