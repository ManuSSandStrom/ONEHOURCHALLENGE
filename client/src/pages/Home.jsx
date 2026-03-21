import {
  FiUsers,
  FiAward,
  FiTarget,
  FiArrowRight,
  FiArrowUpRight,
  FiPlay,
  FiHeart,
  FiZap,
  FiCalendar,
  FiUser,
  FiBriefcase,
  FiTrendingUp,
  FiCheckCircle,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { getWhatsAppFreeSessionUrl } from '../utils/constants';
import { Link } from 'react-router-dom';
import LeadCaptureButton from '../components/LeadCaptureButton';

const FREE_SESSIONS = [
  { type: 'Yoga', date: 'Wellness and Flow', desc: 'Flexibility, mindfulness, and stress relief.' },
  { type: 'Fitness', date: 'Power Hour', desc: 'Muscle toning, stamina, and core work.' },
  { type: 'Zumba', date: 'Rhythm and Sweat', desc: 'High-energy cardio dance training.' },
];

const PROGRAMS = [
  {
    title: 'Yoga',
    image: 'https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512244/yoga_part4_mnslxd.png',
    desc: 'Mobility, flexibility, breath, and calm structure.',
  },
  {
    title: 'Zumba',
    image: 'https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512247/Zomba_Training_kws7pi.png',
    desc: 'High-energy guided cardio for consistency and fun.',
  },
  {
    title: 'Functional Training',
    image: 'https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512241/ST_2_xhbjg9.png',
    desc: 'Strength and conditioning that supports daily life.',
  },
];

const SUCCESS_IMAGES = [
  'https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512752/S6_qhxtvk.png',
  'https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512751/S4_lfr57x.png',
  'https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512748/S2_oxkfxm.png',
];

const TEAM_PILLARS = [
  {
    icon: <FiAward size={40} style={{ color: 'var(--color-primary)' }} />,
    title: 'Certified Coaches',
    desc: 'Programs guided by experienced trainers with structured delivery.',
  },
  {
    icon: <FiBriefcase size={40} style={{ color: 'var(--color-primary)' }} />,
    title: 'Busy-Life Friendly',
    desc: 'Built for working professionals who need clarity and consistency.',
  },
  {
    icon: <FiTrendingUp size={40} style={{ color: 'var(--color-primary)' }} />,
    title: 'Measured Progress',
    desc: 'Registration-led onboarding helps the team guide each lead properly.',
  },
];

export default function Home() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section className="hero" id="hero">
        <video className="hero-video-bg" autoPlay muted loop playsInline preload="metadata">
          <source src="https://res.cloudinary.com/dt37ji5yp/video/upload/v1771513503/Cinematic_Fitness_Hero_Video_Generation_tfskhs.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>

        <div className="hero-center-wrap">
          <div className="hero-top-label">
            <span className="hero-top-label-text">ONLINE FITNESS PLATFORM</span>
            <span className="hero-top-label-tag"><FiPlay size={10} /> Live Sessions</span>
          </div>

          <h1 className="hero-title">
            Train with
            <br />
            <span>clarity.</span>
          </h1>
          <p className="hero-description">
            Structured online coaching for people who want a clean routine, clear support, and sustainable progress.
          </p>

          <div className="hero-pills">
            <button className="hero-pill" onClick={() => scrollToSection('programs')}>
              PROGRAMS <FiArrowUpRight />
            </button>
            <button className="hero-pill" onClick={() => scrollToSection('plans')}>
              PLANS <FiArrowUpRight />
            </button>
            <button className="hero-pill" onClick={() => scrollToSection('free-sessions')}>
              FREE TRIALS <FiArrowUpRight />
            </button>
            <LeadCaptureButton
              className="hero-pill hero-pill-accent"
              context={{ sourcePage: 'Home', interestType: 'general', interestLabel: 'Hero Registration' }}
            >
              REGISTER NOW <FiArrowUpRight />
            </LeadCaptureButton>
          </div>
        </div>

        <div className="hero-stats-bar">
          <div className="hero-stats-inner">
            <div className="hero-stat-item">
              <div className="hero-stat-number">500<span>+</span></div>
              <div className="hero-stat-label">Active Members</div>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat-item">
              <div className="hero-stat-number">15<span>+</span></div>
              <div className="hero-stat-label">Certified Trainers</div>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat-item">
              <div className="hero-stat-number">4.8<span>+</span></div>
              <div className="hero-stat-label">Member Rating</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-image-container reveal">
              <img
                src="https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512247/Zomba_part3_v3i9y0.png"
                alt="OneHour Challenge training session"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }}
              />
            </div>

            <div className="about-content reveal">
              <div className="section-badge">About Us</div>
              <h2 className="section-title">
                Built for <span>discipline</span>.
                <br />
                Designed for <span>results</span>.
              </h2>
              <p className="about-text">
                OneHour Challenge is now focused on clean registrations and direct human follow-up. No payment clutter,
                no confusing flow, just clear interest capture and coach-led onboarding.
              </p>

              <div className="value-cards">
                <div className="value-card">
                  <div className="value-card-icon"><FiTarget /></div>
                  <div>
                    <div className="value-card-title">Structured Programs</div>
                    <div className="value-card-desc">Clear formats for yoga, cardio, strength, and mobility.</div>
                  </div>
                </div>
                <div className="value-card">
                  <div className="value-card-icon"><FiUsers /></div>
                  <div>
                    <div className="value-card-title">Personal Follow-Up</div>
                    <div className="value-card-desc">Leads go to the admin portal so your team can respond properly.</div>
                  </div>
                </div>
                <div className="value-card">
                  <div className="value-card-icon"><FiAward /></div>
                  <div>
                    <div className="value-card-title">Professional Coaching</div>
                    <div className="value-card-desc">Certified guidance with a cleaner and more modern experience.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-darker" id="programs">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Programs</div>
            <h2 className="section-title">Training that fits <span>real life</span></h2>
          </div>

          <div className="programs-detail-grid reveal" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {PROGRAMS.map((program) => (
              <div className="program-detail-card" key={program.title}>
                <div className="about-image-container" style={{ aspectRatio: '16/11', marginBottom: '20px' }}>
                  <img src={program.image} alt={program.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
                </div>
                <h3>{program.title}</h3>
                <p>{program.desc}</p>
                <LeadCaptureButton
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: '14px' }}
                  context={{ sourcePage: 'Home', interestType: 'program', interestLabel: program.title }}
                  label="Register Interest"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark" id="free-sessions">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Free Trial Sessions</div>
            <h2 className="section-title">Try a session before you <span>commit</span></h2>
          </div>

          <div className="free-sessions-grid reveal">
            {FREE_SESSIONS.map((session, index) => (
              <div className={`free-session-card ${index === 1 ? 'highlighted' : ''}`} key={session.type}>
                <span className="free-session-tag">FREE</span>
                <h4 className="free-session-card-title" style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
                  {session.type}
                </h4>
                <p className="free-session-card-desc" style={{ marginBottom: '16px', color: 'var(--color-gray-500)' }}>{session.desc}</p>
                <div className="free-session-meta" style={{ marginBottom: '20px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gray-600)' }}>
                    <FiCalendar size={14} style={{ color: 'var(--color-primary)' }} /> {session.date}
                  </span>
                </div>
                <a
                  className="free-session-register"
                  href={getWhatsAppFreeSessionUrl(session.type)}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    background: 'rgba(0, 109, 60, 0.08)',
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--color-gray-800)',
                    border: '1px solid rgba(0, 109, 60, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                  }}
                >
                  <FaWhatsapp /> Register via WhatsApp
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-darker" id="plans">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Plans</div>
            <h2 className="section-title">Choose your <span>training style</span></h2>
            <p className="section-subtitle">Register your interest and the team will contact you. No payment flow is used on the website.</p>
          </div>

          <div className="programs-secondary-grid reveal">
            <div className="program-detail-card horizontal">
              <div>
                <h3>PRO Plan</h3>
                <p>Steady weekly structure with a balanced rhythm for professionals and beginners.</p>
                <div className="program-tags">
                  <span className="program-tag">3 days / week</span>
                  <span className="program-tag">Structured support</span>
                  <span className="program-tag">Coach callback</span>
                </div>
              </div>
              <LeadCaptureButton
                className="btn btn-primary"
                context={{ sourcePage: 'Home', interestType: 'plan', interestLabel: 'PRO Plan', planType: 'PRO' }}
                label="Register for PRO"
              />
            </div>

            <div className="program-detail-card horizontal">
              <div>
                <h3>ADVANCE Plan</h3>
                <p>More frequent weekly sessions for members who want extra accountability and momentum.</p>
                <div className="program-tags">
                  <span className="program-tag">5 days / week</span>
                  <span className="program-tag">Higher touch support</span>
                  <span className="program-tag">Coach callback</span>
                </div>
              </div>
              <LeadCaptureButton
                className="btn btn-primary"
                context={{ sourcePage: 'Home', interestType: 'plan', interestLabel: 'ADVANCE Plan', planType: 'ADVANCE' }}
                label="Register for ADVANCE"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark" id="results">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Results</div>
            <h2 className="section-title">Progress that feels <span>real</span></h2>
          </div>

          <div className="programs-detail-grid reveal" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {SUCCESS_IMAGES.map((image, index) => (
              <div className="program-detail-card" key={image}>
                <div className="about-image-container" style={{ aspectRatio: '4/5' }}>
                  <img src={image} alt={`Member result ${index + 1}`} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-darker" id="team">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Coaching Team</div>
            <h2 className="section-title">Support that stays <span>professional</span></h2>
          </div>

          <div className="trainers-grid reveal">
            {TEAM_PILLARS.map((item) => (
              <div className="trainer-card" key={item.title} style={{ textAlign: 'center', padding: '40px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                <div className="expertise-icon-wrapper" style={{ padding: '20px', background: 'rgba(0, 109, 60, 0.05)', borderRadius: '20px', marginBottom: '10px' }}>
                  {item.icon}
                </div>
                <h4 className="trainer-name" style={{ margin: 0 }}>{item.title}</h4>
                <p className="trainer-cert" style={{ margin: 0, opacity: 0.8 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '28px' }}>
            <LeadCaptureButton
              className="btn btn-primary btn-lg"
              context={{ sourcePage: 'Home', interestType: 'team', interestLabel: 'Dedicated Team Registration' }}
              label="Register for Coaching"
            />
          </div>
        </div>
      </section>

      <section className="cta-section" id="cta">
        <div className="container reveal">
          <div className="section-badge">Get Started</div>
          <h2 className="cta-title">
            Register once.
            <br />
            <span style={{ color: 'var(--color-primary)' }}>We contact you.</span>
          </h2>
          <p className="cta-subtitle">A simpler and more professional way to turn interest into qualified leads.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <LeadCaptureButton
              className="btn btn-primary btn-lg"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              context={{ sourcePage: 'Home', interestType: 'general', interestLabel: 'Start Registration' }}
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
