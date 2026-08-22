import { useEffect, useState } from 'react';
import { Star, GitFork, ExternalLink } from 'lucide-react';
import { GithubIcon } from '../ui/BrandIcons';
import { useIntersection } from '../../hooks/useIntersection';
import { person } from '../../data/portfolio';
import './GitHub.css';

// Static fallback repos — real repos from amanazads
const fallbackRepos = [
  {
    name: 'ResolveAI',
    description: 'AI customer support agent with LangGraph, RAG, and FAISS vector search.',
    language: 'Python',
    stars: 0,
    forks: 0,
    url: 'https://github.com/amanazads',
  },
  {
    name: 'FlashBites',
    description: 'Cross-platform food ordering platform with real-time Socket.io tracking.',
    language: 'JavaScript',
    stars: 0,
    forks: 0,
    url: 'https://github.com/amanazads',
  },
  {
    name: 'CogniSphere-AI',
    description: 'Enterprise data analytics & intelligence platform with NLP and Power BI.',
    language: 'JavaScript',
    stars: 0,
    forks: 0,
    url: 'https://github.com/amanazads',
  },
];

const langColors = {
  JavaScript: '#F1E05A',
  Python: '#3572A5',
  TypeScript: '#2B7489',
  CSS: '#563D7C',
  HTML: '#E34C26',
};

export default function GitHubSection() {
  const [repos, setRepos] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ref, visible] = useIntersection();

  useEffect(() => {
    const controller = new AbortController();

    Promise.all([
      fetch('https://api.github.com/users/amanazads', { signal: controller.signal }),
      fetch('https://api.github.com/users/amanazads/repos?sort=updated&per_page=6', { signal: controller.signal }),
    ])
      .then(async ([pRes, rRes]) => {
        const p = await pRes.json();
        const r = await rRes.json();
        if (p.login) setProfile(p);
        if (Array.isArray(r) && r.length > 0) {
          setRepos(r.slice(0, 6));
        } else {
          setRepos(fallbackRepos);
        }
      })
      .catch(() => {
        setRepos(fallbackRepos);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return (
    <section className="section github-section" id="github" ref={ref}>
      <div className="container">
        <div className="section-label">
          <span className="mono-label">07 — Contributions</span>
        </div>
        <div className="github-header">
          <div>
            <h2 className="section-title">Open Source &amp; GitHub.</h2>
            <p className="section-subtitle">
              10+ merged PRs via Hacktoberfest 2024. GSSoC'24 Project Administrator.
            </p>
          </div>
          <a
            href={person.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            <GithubIcon size={15} />
            View Profile
            <ExternalLink size={12} />
          </a>
        </div>

        {profile && (
          <div className="github-profile">
            <div className="github-profile__stat">
              <span className="github-profile__val">{profile.public_repos ?? '—'}</span>
              <span className="github-profile__lbl">Public Repos</span>
            </div>
            <div className="github-profile__stat">
              <span className="github-profile__val">{profile.followers ?? '—'}</span>
              <span className="github-profile__lbl">Followers</span>
            </div>
            {profile.company && (
              <div className="github-profile__stat">
                <span className="github-profile__val">{profile.company}</span>
                <span className="github-profile__lbl">Company</span>
              </div>
            )}
            {profile.location && (
              <div className="github-profile__stat">
                <span className="github-profile__val">{profile.location}</span>
                <span className="github-profile__lbl">Location</span>
              </div>
            )}
          </div>
        )}

        <div className={`github-repos ${visible ? 'github-repos--visible' : ''}`}>
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="repo-card repo-card--skeleton" />
              ))
            : repos.map((repo, i) => (
                <a
                  key={repo.name || repo.id}
                  href={repo.html_url || repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="repo-card"
                  style={{ '--delay': `${i * 80}ms` }}
                >
                  <div className="repo-card__header">
                    <span className="repo-card__name">{repo.name}</span>
                    <ExternalLink size={12} className="repo-card__ext" />
                  </div>
                  {(repo.description) && (
                    <p className="repo-card__desc">{repo.description}</p>
                  )}
                  <div className="repo-card__meta">
                    {(repo.language) && (
                      <span className="repo-card__lang">
                        <span
                          className="repo-card__lang-dot"
                          style={{ background: langColors[repo.language] || '#8A8A87' }}
                        />
                        {repo.language}
                      </span>
                    )}
                    {repo.stargazers_count > 0 && (
                      <span className="repo-card__stat">
                        <Star size={11} />
                        {repo.stargazers_count}
                      </span>
                    )}
                    {repo.forks_count > 0 && (
                      <span className="repo-card__stat">
                        <GitFork size={11} />
                        {repo.forks_count}
                      </span>
                    )}
                  </div>
                </a>
              ))}
        </div>
      </div>
    </section>
  );
}
