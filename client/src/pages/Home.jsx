import { useEffect, useState } from 'react';
import {
  FiArrowRight,
  FiArrowUpRight,
  FiLayers,
  FiShield,
  FiStar,
  FiTrendingUp,
  FiUsers,
  FiZap,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LeadCaptureButton from '../components/LeadCaptureButton';
import FreeSessionShowcase from '../components/FreeSessionShowcase';
import { FREE_SESSION_OPTIONS, getWhatsAppFreeSessionUrl } from '../utils/constants';

const pageLinks = [
  {
    title: 'Programs',
    description: 'Find the right training style for fat loss, flexibility, strength, or high-energy cardio.',
    to: '/programs',
  },
  {
    title: 'How It Works',
    description: 'See the flow from discovery to coaching so new members know exactly what happens next.',
    to: '/how-it-works',
  },
  {
    title: 'Plans',
    description: 'Compare structured coaching options and choose the rhythm that suits your lifestyle.',
    to: '/plans',
  },
  {
    title: 'Transformations',
    description: 'Explore real progress stories powered by consistency, support, and smart programming.',
    to: '/transformations',
  },
  {
    title: 'Trainers',
    description: 'Meet the people behind the sessions and understand the coaching support system.',
    to: '/trainers',
  },
  {
    title: 'Contact',
    description: 'Send a direct enquiry when you want a clean, personal follow-up from the team.',
    to: '/contact',
  },
];

const quickPoints = [
  {
    icon: <FiLayers />,
    title: 'Live Guided Sessions',
    description: 'Every class is coach-led, time-focused, and built to help members train with clarity and confidence.',
  },
  {
    icon: <FiTrendingUp />,
    title: 'Free Sessions to Start',
    description: 'Try yoga, fitness, or zumba before choosing a full plan and experience the OneHour Challenge style live.',
  },
  {
    icon: <FiUsers />,
    title: 'Programs for Every Goal',
    description: 'From fat loss and stamina to mobility and strength, there is a guided path for every member.',
  },
  {
    icon: <FiShield />,
    title: 'Support That Keeps You Going',
    description: 'Plans, trainers, WhatsApp support, and easy registration help members stay consistent week after week.',
  },
];

const trustSignals = ['Yoga', 'Fitness', 'Zumba', '1-on-1 Coaching', 'Live Sessions', 'Progress Support'];

export default function Home() {
  const [activeSessionIndex, setActiveSessionIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSessionIndex((current) => (current + 1) % FREE_SESSION_OPTIONS.length);
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, []);

  const spotlightSession = FREE_SESSION_OPTIONS[activeSessionIndex];

  return (
    <>
      <section className="hero home-hero" id="hero">
        <video className="hero-video-bg" autoPlay muted loop playsInline preload="metadata">
          <source
            src="https://res.cloudinary.com/dt37ji5yp/video/upload/v1771513503/Cinematic_Fitness_Hero_Video_Generation_tfskhs.mp4"
            type="video/mp4"
          />
        </video>
        <div className="hero-overlay hero-overlay-rich"></div>

        <div className="container hero-home-shell">
          <div className="hero-copy-column">
            <div className="hero-top-label">
              <span className="hero-top-label-text">ONLINE FITNESS COACHING</span>
              <span className="hero-top-label-tag">Smooth, Structured, Premium</span>
            </div>

            <div className="hero-alert-strip">
              <span className="hero-alert-badge">
                <FiStar />
                New
              </span>
              <span>Free sessions are now featured on the home page with limited seats available this week.</span>
            </div>

            <h1 className="hero-title">
              One hour of coaching.
              <br />
              <span>Real results for real schedules.</span>
            </h1>
            <p className="hero-description">
              Join live online sessions in fitness, yoga, zumba, HIIT, and personal coaching built
              for busy people who want energy, discipline, and steady progress.
            </p>

            <div className="hero-pills">
              <Link to="/programs" className="hero-pill">
                PROGRAMS <FiArrowUpRight />
              </Link>
              <Link to="/plans" className="hero-pill">
                PLANS <FiArrowUpRight />
              </Link>
              <Link to="/contact" className="hero-pill">
                CONTACT <FiArrowUpRight />
              </Link>
              <LeadCaptureButton
                className="hero-pill hero-pill-accent"
                context={{ sourcePage: 'Home', interestType: 'general', interestLabel: 'Homepage Registration' }}
              >
                Register Now <FiArrowUpRight />
              </LeadCaptureButton>
            </div>

            <div className="hero-trust-strip">
              {trustSignals.map((signal) => (
                <span key={signal}>
                  <FiZap />
                  {signal}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-live-card reveal">
            <div className="hero-live-card-head">
              <span className="hero-live-chip">This Week&apos;s Spotlight</span>
              <span className="hero-live-chip hero-live-chip-alert">
                <FiStar />
                Blinking New
              </span>
            </div>

            <h3>{spotlightSession.type}</h3>
            <p>
              <strong>{spotlightSession.label}</strong> is a free guided class that lets you experience the
              OneHour Challenge energy before choosing your full plan.
            </p>

            <div className="hero-live-stats">
              <div>
                <span>When</span>
                <strong>{spotlightSession.day}</strong>
              </div>
              <div>
                <span>Time</span>
                <strong>{spotlightSession.time}</strong>
              </div>
              <div>
                <span>Seats Left</span>
                <strong>{spotlightSession.seats}</strong>
              </div>
            </div>

            <a
              className="hero-live-action"
              href={getWhatsAppFreeSessionUrl(spotlightSession.type)}
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <FaWhatsapp />
                Claim Free Seat
              </span>
              <FiArrowRight />
            </a>
          </div>
        </div>

        <div className="hero-stats-bar">
          <div className="hero-stats-inner">
            <div className="hero-stat-item">
              <div className="hero-stat-number">500+</div>
              <div className="hero-stat-label">Members Building Consistency</div>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat-item">
              <div className="hero-stat-number">5+</div>
              <div className="hero-stat-label">Training Formats Under One Brand</div>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat-item">
              <div className="hero-stat-number">1:1</div>
              <div className="hero-stat-label">Support When Members Need Direction</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark home-free-session-section">
        <div className="container">
          <FreeSessionShowcase
            title="Start with a"
            highlight="free session"
            subtitle="Choose a free yoga, fitness, or zumba session and experience the coaching style, energy, and pace before you join."
          />
        </div>
      </section>

      <section className="section section-darker">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Explore OneHour Challenge</div>
            <h2 className="section-title">
              Everything you need is <span>in one place</span>
            </h2>
            <p className="section-subtitle">
              Explore programs, compare plans, meet the trainers, view real transformations, and
              contact the team with confidence.
            </p>
          </div>

          <div className="home-page-links-grid reveal">
            {pageLinks.map((item) => (
              <Link key={item.title} to={item.to} className="home-page-link-card">
                <div className="home-page-link-top">
                  <h3>{item.title}</h3>
                  <FiArrowRight />
                </div>
                <p>{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Why Members Choose Us</div>
            <h2 className="section-title">
              OneHour Challenge helps you <span>stay consistent</span>
            </h2>
            <p className="section-subtitle">
              Members join for guided sessions, free trial access, expert support, and programs that
              fit real routines instead of unrealistic schedules.
            </p>
          </div>

          <div className="home-benefit-grid reveal">
            {quickPoints.map((point) => (
              <div className="home-benefit-card" key={point.title}>
                <div className="home-benefit-icon">{point.icon}</div>
                <h3>{point.title}</h3>
                <p>{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container reveal">
          <div className="section-badge">Get Started</div>
          <h2 className="cta-title">
            Ready to begin your <span style={{ color: 'var(--color-primary)' }}>OneHour Challenge</span>?
          </h2>
          <p className="cta-subtitle">
            Book a free session, choose your plan, and let the team guide you toward the right next step.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <LeadCaptureButton
              className="btn btn-primary btn-lg"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              context={{ sourcePage: 'Home', interestType: 'general', interestLabel: 'Homepage CTA Registration' }}
            >
              Register Now <FiArrowRight />
            </LeadCaptureButton>
            <Link
              to="/plans"
              className="btn btn-secondary btn-lg"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
            >
              View Plans <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
