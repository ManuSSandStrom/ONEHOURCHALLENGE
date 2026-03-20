import { FiArrowRight, FiArrowUpRight, FiCalendar, FiCheckCircle, FiLayers, FiShield, FiUsers } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LeadCaptureButton from '../components/LeadCaptureButton';
import { getWhatsAppFreeSessionUrl } from '../utils/constants';

const pageLinks = [
  {
    title: 'Programs',
    description: 'Browse structured coaching tracks for yoga, strength, cardio, and lifestyle fitness.',
    to: '/programs',
  },
  {
    title: 'How It Works',
    description: 'See how onboarding, scheduling, coaching support, and follow-up are handled.',
    to: '/how-it-works',
  },
  {
    title: 'Plans',
    description: 'Compare plans clearly and choose the right level before you register.',
    to: '/plans',
  },
  {
    title: 'Transformations',
    description: 'Explore progress-focused stories and the kind of outcomes members work toward.',
    to: '/transformations',
  },
  {
    title: 'Trainers',
    description: 'Meet the coaching team and understand the support system behind your program.',
    to: '/trainers',
  },
  {
    title: 'Contact',
    description: 'Send a direct message and get a follow-up from the team without any confusion.',
    to: '/contact',
  },
];

const quickPoints = [
  {
    icon: <FiLayers />,
    title: 'Sharper Navigation',
    description: 'A focused top-level experience that directs visitors to the right page quickly.',
  },
  {
    icon: <FiUsers />,
    title: 'Dedicated Pages',
    description: 'Programs, plans, trainers, and contact now each have their own clear space.',
  },
  {
    icon: <FiShield />,
    title: 'Professional Follow-Up',
    description: 'Registrations and enquiries flow into an organized admin workspace for follow-up.',
  },
];

const freeSessions = [
  { type: 'Yoga', label: 'Wellness and Flow' },
  { type: 'Fitness', label: 'Power Hour' },
  { type: 'Zumba', label: 'Rhythm and Sweat' },
];

export default function Home() {
  return (
    <>
      <section className="hero" id="hero">
        <video className="hero-video-bg" autoPlay muted loop playsInline preload="metadata">
          <source src="https://res.cloudinary.com/dt37ji5yp/video/upload/v1771513503/Cinematic_Fitness_Hero_Video_Generation_tfskhs.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>

        <div className="hero-center-wrap">
          <div className="hero-top-label">
            <span className="hero-top-label-text">ONLINE FITNESS COACHING</span>
            <span className="hero-top-label-tag">Professional Experience</span>
          </div>

          <h1 className="hero-title">
            Stronger coaching.
            <br />
            <span>Clearer journey.</span>
          </h1>
          <p className="hero-description">
            A cleaner OneHour Challenge experience with a bright premium interface, clearer page structure, and faster access to the sections that matter.
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
        </div>

        <div className="hero-stats-bar">
          <div className="hero-stats-inner">
            <div className="hero-stat-item">
              <div className="hero-stat-number">01</div>
              <div className="hero-stat-label">Clear Navigation Flow</div>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat-item">
              <div className="hero-stat-number">02</div>
              <div className="hero-stat-label">Professional Page Structure</div>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat-item">
              <div className="hero-stat-number">03</div>
              <div className="hero-stat-label">Direct Registration Journey</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Quick Overview</div>
            <h2 className="section-title">A refined website with <span>better structure</span></h2>
            <p className="section-subtitle">The homepage now introduces the brand cleanly while the inner pages carry the full experience in a more professional way.</p>
          </div>

          <div className="programs-detail-grid reveal" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {quickPoints.map((point) => (
              <div className="program-detail-card" key={point.title}>
                <div className="expertise-icon-wrapper" style={{ width: '60px', height: '60px', display: 'grid', placeItems: 'center', borderRadius: '18px', background: 'rgba(0, 109, 60, 0.08)', color: 'var(--color-primary)', fontSize: '1.5rem', marginBottom: '18px' }}>
                  {point.icon}
                </div>
                <h3>{point.title}</h3>
                <p>{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-darker">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Explore Pages</div>
            <h2 className="section-title">Find the right <span>section fast</span></h2>
          </div>

          <div className="programs-detail-grid reveal" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {pageLinks.map((item) => (
              <Link key={item.title} to={item.to} className="program-detail-card" style={{ textDecoration: 'none' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                  {item.title}
                  <FiArrowRight style={{ color: 'var(--color-primary)' }} />
                </h3>
                <p>{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Free Trial Sessions</div>
            <h2 className="section-title">Start with a <span>trial session</span></h2>
          </div>

          <div className="free-sessions-grid reveal">
            {freeSessions.map((session) => (
              <div className="free-session-card" key={session.type}>
                <span className="free-session-tag">FREE</span>
                <h4 className="free-session-card-title" style={{ fontSize: '1.18rem', marginBottom: '8px' }}>{session.type}</h4>
                <p className="free-session-card-desc" style={{ marginBottom: '16px', color: 'var(--color-gray-500)' }}>{session.label}</p>
                <div className="free-session-meta" style={{ marginBottom: '18px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gray-600)' }}>
                    <FiCalendar size={14} style={{ color: 'var(--color-primary)' }} /> WhatsApp booking supported
                  </span>
                </div>
                <a
                  className="free-session-register"
                  href={getWhatsAppFreeSessionUrl(session.type)}
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <FaWhatsapp /> Register via WhatsApp
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container reveal">
          <div className="section-badge">Get Started</div>
          <h2 className="cta-title">
            Ready to begin?
            <br />
            <span style={{ color: 'var(--color-primary)' }}>We take it forward.</span>
          </h2>
          <p className="cta-subtitle">Explore the full site, choose the program or plan that fits you, and send your registration when you are ready.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <LeadCaptureButton
              className="btn btn-primary btn-lg"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              context={{ sourcePage: 'Home', interestType: 'general', interestLabel: 'Homepage CTA Registration' }}
            >
              Register Now <FiArrowRight />
            </LeadCaptureButton>
            <Link to="/plans" className="btn btn-secondary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              View Plans <FiCheckCircle />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
