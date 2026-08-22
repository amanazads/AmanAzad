import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons';
import { person } from '../../data/portfolio';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">
        <div className="footer__left">
          <span className="footer__name">AMAN AZAD</span>
          <span className="footer__desc">Software Engineer — Full-Stack &amp; AI</span>
          <span className="footer__copy">
            © {year} · Built with React · Designed and engineered by Aman Azad
          </span>
        </div>

        <div className="footer__links">
          <a href={person.github} target="_blank" rel="noopener noreferrer" className="footer__link" aria-label="GitHub">
            <GithubIcon size={16} />
            <span>GitHub</span>
          </a>
          <span className="footer__sep">·</span>
          <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="footer__link" aria-label="LinkedIn">
            <LinkedinIcon size={16} />
            <span>LinkedIn</span>
          </a>
          <span className="footer__sep">·</span>
          <a href={`mailto:${person.email}`} className="footer__link" aria-label="Email">
            <Mail size={16} />
            <span>Email</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
