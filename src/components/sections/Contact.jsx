import { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons';
import { useIntersection } from '../../hooks/useIntersection';
import { person } from '../../data/portfolio';
import './Contact.css';

const opportunities = [
  'Software Engineer roles',
  'Full-stack and backend engineering',
  'AI / AI application engineering',
  'Founding engineer roles',
  'Forward deployed engineering',
];

const STATUS = {
  IDLE:    'idle',
  SENDING: 'sending',
  SUCCESS: 'success',
  ERROR:   'error',
};

export default function Contact() {
  const [ref, visible] = useIntersection();
  const [form, setForm]     = useState({ from_name: '', from_email: '', message: '' });
  const [status, setStatus] = useState(STATUS.IDLE);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus(STATUS.SENDING);
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name:    form.from_name,
          email:   form.from_email,
          message: form.message,
        }),
      });

      let data = null;
      try {
        const text = await res.text();
        data = text ? JSON.parse(text) : {};
      } catch {
        data = null;
      }

      if (res.ok && data?.success) {
        setStatus(STATUS.SUCCESS);
        setForm({ from_name: '', from_email: '', message: '' });
        setTimeout(() => setStatus(STATUS.IDLE), 6000);
      } else {
        const errorDetail = 
          (typeof data?.error === 'string' ? data.error : '') ||
          (typeof data?.message === 'string' ? data.message : '') ||
          (res.status === 404 ? 'Contact API endpoint not found (404). Ensure the backend or dev server is running.' : `Submission failed (HTTP ${res.status})`);
        throw new Error(errorDetail);
      }
    } catch (err) {
      console.error('[Contact Form Error]:', err);
      const displayError = typeof err?.message === 'string' && err.message !== '[object Object]'
        ? err.message
        : 'Could not send message. Please try again or email directly.';
      setErrorMsg(displayError);
      setStatus(STATUS.ERROR);
      setTimeout(() => setStatus(STATUS.IDLE), 6000);
    }
  };

  const isSending = status === STATUS.SENDING;

  return (
    <section className="section contact-section" id="contact" ref={ref}>
      <div className="container">
        <div className="section-label">
          <span className="mono-label">09 — Contact</span>
        </div>

        <div className={`contact-layout ${visible ? 'contact-layout--visible' : ''}`}>

          {/* ── Left: Info ─────────────────────────────────────────────── */}
          <div className="contact-left">
            <h2 className="contact-heading">
              Let's build<br />something useful.
            </h2>
            <p className="contact-desc">
              I am open to software engineering roles where the work is building and owning real systems.
              The fastest way to reach me is the form or a direct email — I read everything.
            </p>

            <div className="contact-available">
              <span className="mono-label contact-available__label">Available for</span>
              <ul className="contact-opportunities">
                {opportunities.map(o => (
                  <li key={o}>
                    <span className="contact-opp-bullet">→</span>
                    {o}
                  </li>
                ))}
              </ul>
            </div>

            <div className="contact-links">
              <a href={`mailto:${person.email}`} className="contact-link">
                <Mail size={15} />
                <span>{person.email}</span>
              </a>
              <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link">
                <LinkedinIcon size={15} />
                <span>linkedin.com/in/amanazads</span>
              </a>
              <a href={person.github} target="_blank" rel="noopener noreferrer" className="contact-link">
                <GithubIcon size={15} />
                <span>github.com/amanazads</span>
              </a>
            </div>
          </div>

          {/* ── Right: Form ────────────────────────────────────────────── */}
          <div className="contact-right">
            <form className="contact-form" onSubmit={handleSubmit} noValidate>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="from_name"
                  className="form-input"
                  placeholder="Your name"
                  value={form.from_name}
                  onChange={handleChange}
                  required
                  disabled={isSending}
                  autoComplete="name"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  name="from_email"
                  className="form-input"
                  placeholder="your@email.com"
                  value={form.from_email}
                  onChange={handleChange}
                  required
                  disabled={isSending}
                  autoComplete="email"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="form-input form-textarea"
                  placeholder="What are you working on? What are you looking for?"
                  value={form.message}
                  onChange={handleChange}
                  rows="5"
                  required
                  disabled={isSending}
                />
              </div>

              {/* Status messages */}
              {status === STATUS.SUCCESS && (
                <div className="form-status form-status--success" role="alert" aria-live="polite">
                  <CheckCircle size={15} />
                  <span>Message sent directly to Aman's inbox.</span>
                </div>
              )}
              {status === STATUS.ERROR && (
                <div className="form-status form-status--error" role="alert" aria-live="polite">
                  <AlertCircle size={15} />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary contact-submit"
                disabled={isSending || status === STATUS.SUCCESS}
                aria-label="Send message"
              >
                {isSending ? (
                  <>
                    <Loader size={15} className="spin" />
                    Sending...
                  </>
                ) : status === STATUS.SUCCESS ? (
                  <>
                    <CheckCircle size={15} />
                    Sent
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </button>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
