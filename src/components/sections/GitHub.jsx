import { useEffect, useState } from 'react';
import { Star, GitFork, ExternalLink, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '../ui/BrandIcons';
import { useIntersection } from '../../hooks/useIntersection';
import { person, openSource, featuredRepos, fallbackRepos } from '../../data/portfolio';
import './GitHub.css';

const langColors = {
  JavaScript: '#F1E05A',
  Python: '#3572A5',
  TypeScript: '#2B7489',
  CSS: '#563D7C',
  HTML: '#E34C26',
  'C++': '#F34B7D',
};

const roleIcons = {
  contribution: '↗',
  admin: '◆',
  lead: '▲',
  community: '○',
};

// Featured repositories first, in the order they are listed, then the
// most recently updated remaining repos. Forks and scratch repos stay out.
function prioritise(repos) {
  // GitHub repo descriptions are sparse; fall back to the curated ones.
  const descriptions = new Map(fallbackRepos.map(r => [r.name.toLowerCase(), r.description]));
  const withDesc = repos.map(r => ({
    ...r,
    description: r.description || descriptions.get(r.name.toLowerCase()) || '',
  }));

  const byName = new Map(withDesc.map(r => [r.name.toLowerCase(), r]));
  const featured = featuredRepos
    .map(name => byName.get(name.toLowerCase()))
    .filter(Boolean)
    .map(r => ({ ...r, featured: true }));

  const featuredNames = new Set(featured.map(r => r.name.toLowerCase()));
  const rest = withDesc
    .filter(r => !featuredNames.has(r.name.toLowerCase()) && !r.fork && r.name !== 'AmanAzad')
    .slice(0, 2);

  return [...featured, ...rest];
}

export default function GitHubSection() {
  const [ref, visible] = useIntersection({ threshold: 0.05 });
  const [repos, setRepos] = useState(null);
  const [profile, setProfile] = useState(null);

  // Only hit the API once the section is close to the viewport.
  useEffect(() => {
    if (!visible || repos) return;
    const controller = new AbortController();

    Promise.all([
      fetch(`https://api.github.com/users/${person.githubUser}`, { signal: controller.signal }),
      fetch(`https://api.github.com/users/${person.githubUser}/repos?sort=updated&per_page=100`, {
        signal: controller.signal,
      }),
    ])
      .then(async ([profileRes, repoRes]) => {
        if (profileRes.ok) {
          const p = await profileRes.json();
          if (p && p.login) setProfile(p);
        }
        const r = repoRes.ok ? await repoRes.json() : null;
        setRepos(Array.isArray(r) && r.length ? prioritise(r) : fallbackRepos);
      })
      .catch(err => {
        if (err.name !== 'AbortError') setRepos(fallbackRepos);
      });

    return () => controller.abort();
  }, [visible, repos]);

  const list = repos || [];

  return (
    <section className="section github-section" id="opensource" ref={ref}>
      <div className="container">
        <div className="section-label">
          <span className="mono-label">07 — Open Source</span>
        </div>

        <div className="github-header">
          <div>
            <h2 className="section-title">Open source &amp; GitHub.</h2>
            <p className="section-subtitle">
              Mentoring, reviews, and contributions — plus the repositories where the work in the
              projects section actually lives.
            </p>
          </div>
          <a href={person.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            <GithubIcon size={15} />
            Explore all GitHub projects
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Community + mentoring */}
        <div className="os-list">
          {openSource.map((item, i) => (
            <div key={item.label} className="os-item" style={{ '--delay': `${i * 70}ms` }}>
              <div className="os-item__icon" aria-hidden="true">{roleIcons[item.type]}</div>
              <div className="os-item__content">
                <span className="mono-label os-item__label">{item.label}</span>
                <p className="os-item__role">{item.role}</p>
                <p className="os-item__desc">{item.detail}</p>
              </div>
            </div>
          ))}
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
            {profile.location && (
              <div className="github-profile__stat">
                <span className="github-profile__val">{profile.location}</span>
                <span className="github-profile__lbl">Location</span>
              </div>
            )}
          </div>
        )}

        <div className="github-repos">
          {list.length === 0
            ? Array.from({ length: 4 }).map((_, i) => <div key={i} className="repo-card repo-card--skeleton" />)
            : list.map((repo, i) => (
                <a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`repo-card ${repo.featured ? 'repo-card--featured' : ''}`}
                  style={{ '--delay': `${i * 60}ms` }}
                >
                  <div className="repo-card__header">
                    <span className="repo-card__name">{repo.name}</span>
                    {repo.featured && <span className="repo-card__badge">Featured</span>}
                    <ArrowUpRight size={13} className="repo-card__ext" />
                  </div>
                  {repo.description && <p className="repo-card__desc">{repo.description}</p>}
                  <div className="repo-card__meta">
                    {repo.language && (
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
