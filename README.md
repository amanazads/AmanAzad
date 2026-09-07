# Aman Azad — Software Engineer Portfolio

> Production-grade personal portfolio engineered as an interactive system at the intersection of full-stack engineering and AI.

[![GitHub](https://img.shields.io/badge/GitHub-amanazads-181717?style=flat-square&logo=github)](https://github.com/amanazads)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-amanazads-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/amanazads)
[![Stack](https://img.shields.io/badge/Stack-React%20%7C%20Node.js%20%7C%20Python%20%7C%20FastAPI-1A6EFF?style=flat-square)](#tech-stack)

---

## ⚡ Overview

This portfolio is built to reflect real-world engineering rigor rather than generic landing page templates. It covers production deployments, agentic AI architectures, real-time WebSocket systems, backend services, and AI evaluation work — with experimental and test-environment projects labelled as such.

### Key Highlights
- **Design System:** Custom tokens for Light (warm off-white) & Dark (near-black) modes with zero flash-of-unstyled-content (anti-FOUC).
- **Interactive Architecture Visualizations:** Animated dataflow diagrams for AI agents (LangGraph + RAG), real-time order state engines (Socket.io), and caching layers (Redis + MongoDB).
- **First-Party Contact Engine:** Native Node.js & Nodemailer `/api/contact` endpoint for zero-third-party, direct-to-inbox message delivery without client redirects.
- **Dynamic GitHub Feed:** Live fetching of repositories and stats directly from the GitHub API with graceful static fallback.
- **Performance & SEO:** Pre-rendered structured data (`schema.org` Person), OpenGraph, Twitter cards, semantic HTML, and zero bloated runtime UI frameworks.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, Modern CSS & CSS Custom Properties, Lucide Icons, route-level code splitting for below-the-fold sections
- **Backend & APIs:** Node.js, Express.js, Nodemailer, REST APIs
- **Core Engineering Domains:**
  - **AI / LLM:** Python, FastAPI, LangGraph, LangChain, RAG, ChromaDB / FAISS, Gemini, AI evaluation
  - **Full-Stack & Backend:** React.js, Node.js, Express.js, MongoDB, Redis, Socket.io, JWT
  - **Infrastructure & Cloud:** AWS, Docker, CI/CD, Linux, Git, GitHub
  - **Computer Science:** Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks

---

## 📂 Project Structure

```
├── public/
│   ├── favicon.svg          # Minimal geometric brand icon
│   ├── og-image.png         # 1200x630 OpenGraph / Twitter card image
│   ├── robots.txt           # SEO crawler rules
│   └── sitemap.xml          # XML sitemap
├── src/
│   ├── components/
│   │   ├── Hero/            # Hero section with animated system graph & status panel
│   │   ├── Nav/             # Sticky header with active section spy & theme toggle
│   │   ├── sections/        # Section modules (Metrics, Timeline, Projects, SystemsThinking,
│   │   │                    #  EngineeringGlance, TechStack, GitHub, About, Contact, Footer)
│   │   └── ui/              # Brand SVG icons and shared UI elements
│   ├── data/
│   │   └── portfolio.js     # Single source of truth for portfolio content
│   ├── hooks/
│   │   ├── useTheme.js      # Theme state management with persistence
│   │   └── useIntersection.js # Viewport visibility hook for reveals
│   ├── App.jsx              # Root component
│   ├── index.css            # Global design tokens and animations
│   └── main.jsx             # React entry point
├── server.js                # Production Express backend & contact API server
├── vite.config.js           # Vite configuration with local dev API middleware
└── package.json
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/amanazads/AmanAzad.git
cd AmanAzad
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables (Optional)
Copy the example configuration file:
```bash
cp .env.example .env
```

To enable live email dispatch from the contact form, generate a Google App Password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) and add it to `.env`:
```env
EMAIL_USER=azadaman1apl@gmail.com
RECEIVER_EMAIL=azadaman1apl@gmail.com
EMAIL_PASS=your-16-character-app-password
```

### 4. Run development server
```bash
npm run dev
```
Open [http://localhost:3001](http://localhost:3001) in your browser.

---

## 📦 Production Build & Deployment

### Build the frontend bundle
```bash
npm run build
```

### Run with the production Node.js server
```bash
node server.js
```

---

## 📬 Contact & Connect

- **Email:** [azadaman1apl@gmail.com](mailto:azadaman1apl@gmail.com)
- **LinkedIn:** [linkedin.com/in/amanazads](https://linkedin.com/in/amanazads)
- **GitHub:** [github.com/amanazads](https://github.com/amanazads)

---

Designed and engineered by **Aman Azad**.
