import { useState, useEffect, useCallback } from 'react';
import { Moon, Sun, FileText, Menu, X } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { person } from '../../data/portfolio';
import './Nav.css';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Systems', href: '#systems' },
  { label: 'Tech Stack', href: '#stack' },
  { label: 'Open Source', href: '#opensource' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const NAV_OFFSET = 72;

export function scrollToSection(href) {
  const el = document.querySelector(href);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
}

export default function Nav() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll state + active section. Scroll-based (not IntersectionObserver)
  // so it still resolves sections that mount later via code splitting.
  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      setScrolled(y > 20);

      let current = navLinks[0].href.slice(1);
      for (const link of navLinks) {
        const el = document.getElementById(link.href.slice(1));
        if (el && el.getBoundingClientRect().top <= NAV_OFFSET + 40) {
          current = link.href.slice(1);
        }
      }
      // Pin the last section once the page is scrolled to the bottom.
      if (window.innerHeight + y >= document.body.scrollHeight - 80) {
        current = navLinks[navLinks.length - 1].href.slice(1);
      }
      setActiveSection(current);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Close the mobile panel on Escape or when returning to desktop widths.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = e => { if (e.key === 'Escape') setMenuOpen(false); };
    const onResize = () => { if (window.innerWidth > 1024) setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollToSection(href);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`} role="banner">
      <div className="nav__inner container">
        <a
          href="#home"
          className="nav__brand"
          onClick={e => { e.preventDefault(); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <span className="nav__brand-name">AMAN AZAD</span>
        </a>

        <nav className="nav__links" role="navigation" aria-label="Main navigation">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`nav__link ${activeSection === link.href.slice(1) ? 'nav__link--active' : ''}`}
              aria-current={activeSection === link.href.slice(1) ? 'true' : undefined}
              onClick={e => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <button
            className="nav__theme-toggle"
            onClick={toggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a
            href={person.resumeUrl}
            className="nav__resume btn btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View resume"
          >
            <FileText size={14} />
            Resume
          </a>
        </div>

        <button
          className="nav__mobile-menu"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="nav__mobile-panel" role="navigation" aria-label="Mobile navigation">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`nav__mobile-link ${activeSection === link.href.slice(1) ? 'nav__mobile-link--active' : ''}`}
              onClick={e => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <div className="nav__mobile-actions">
            <button className="nav__theme-toggle" onClick={toggle}>
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
            </button>
            <a
              href={person.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <FileText size={14} /> View résumé
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
