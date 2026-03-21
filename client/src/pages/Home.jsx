import { useState } from 'react';
import {
  FiCheckCircle,
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
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { PRICING, PLAN_FEATURES, DURATIONS, getWhatsAppFreeSessionUrl } from '../utils/constants';
import { Link } from 'react-router-dom';
import LeadCaptureButton from '../components/LeadCaptureButton';

const FREE_SESSIONS = [
  { type: 'Yoga', date: 'Wellness and Flow', desc: 'Flexibility, mindfulness, and stress relief.' },
  { type: 'Fitness', date: 'Power Hour', desc: 'Muscle toning, stamina, and core work.' },
  { type: 'Zumba', date: 'Rhythm and Sweat', desc: 'High-energy cardio dance training.' },
];

const PROGRAMS = [
  { title: '1-on-1 Training', image: 'https://res.cloudinary.com/dt37ji5yp/image/upload/v1771782797/Gemini_Generated_Image_s8xw7ls8xw7ls8xw_1_z96yp5.png' },
  { title: 'Zumba', image: 'https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512247/Zomba_Training_kws7pi.png' },
  { title: 'Yoga', image: 'https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512244/yoga_part4_mnslxd.png' },
  { title: 'HIIT', image: 'https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512241/Strength_part2_tzrm1t.png' },
  { title: 'Functional Training', image: 'https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512241/ST_2_xhbjg9.png' },
];

const SUCCESS_IMAGES = [
  'https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512752/S6_qhxtvk.png',
  'https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512751/S4_lfr57x.png',
  'https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512748/S2_oxkfxm.png',
  'https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512751/S5_ejfupq.png',
];

const TEAM_PILLARS = [
  {
    icon: <FiAward size={40} style={{ color: 'var(--color-primary)' }} />,
    title: 'Global Certifications',
    desc: 'Coaches trained through respected certification pathways.',
  },
  {
    icon: <FiBriefcase size={40} style={{ color: 'var(--color-primary)' }} />,
    title: 'Coaching Experience',
    desc: 'A professional team with hands-on client transformation experience.',
  },
  {
    icon: <FiTrendingUp size={40} style={{ color: 'var(--color-primary)' }} />,
    title: 'Scientific Approach',
    desc: 'Programs designed for progression, safety, and measurable outcomes.',
  },
];

export default function Home() {
  const [activePlanTab, setActivePlanTab] = useState('PRO');

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
            <span className="hero-top-label-text">EXPERT-LED FITNESS</span>
            <span className="hero-top-label-tag"><FiPlay size={10} /> Live Sessions Daily</span>
          </div>

          <h1 className="hero-title">
            Train. Transform.
            <br />
            <span>Challenge.</span>
          </h1>
          <p className="hero-description">
            A cleaner, more disciplined online fitness experience with live coaching and direct registrations.
          </p>

          <div className="hero-pills">
            <button className="hero-pill" onClick={() => scrollToSection('programs')}>
              FITNESS <FiArrowUpRight />
            </button>
            <button className="hero-pill" onClick={() => scrollToSection('programs')}>
              ZUMBA <FiArrowUpRight />
            </button>
            <button className="hero-pill" onClick={() => scrollToSection('programs')}>
              YOGA <FiArrowUpRight />
            </button>
            <button className="hero-pill hero-pill-accent" onClick={() => scrollToSection('pricing')}>
              JOIN NOW <FiArrowUpRight />
            </button>
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
            <div className="hero-stat-divider"></div>
            <div className="hero-stat-item">
              <div className="hero-stat-number">5<span>+</span></div>
              <div className="hero-stat-label">Programs</div>
            </div>
          </div>
        </div>

        <div className="hero-scroll-indicator" onClick={() => scrollToSection('about')}>
          <span>v</span>
        </div>
      </section>

      <section className="section section-dark" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-image-container reveal">
              <img
                src="https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512247/Zomba_part3_v3i9y0.png"
                alt="About OneHour Challenge"
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
                OneHour Challenge combines coach-led live sessions, structured programming, and a more
                professional experience for members who want results without wasted time.
              </p>

              <div className="value-cards">
                <div className="value-card">
                  <div className="value-card-icon"><FiTarget /></div>
                  <div>
                    <div className="value-card-title">Structured Programming</div>
                    <div className="value-card-desc">Every class supports a clear fitness path.</div>
                  </div>
                </div>
                <div className="value-card">
                  <div className="value-card-icon"><FiUsers /></div>
                  <div>
                    <div className="value-card-title">Limited Group Feel</div>
                    <div className="value-card-desc">Personal guidance with strong community energy.</div>
                  </div>
                </div>
                <div className="value-card">
                  <div className="value-card-icon"><FiAward /></div>
                  <div>
                    <div className="value-card-title">Certified Trainers</div>
                    <div className="value-card-desc">A professional coaching team you can trust.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-darker" id="reviews">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Success Stories</div>
            <h2 className="section-title">Real people. <span>Real results.</span></h2>
          </div>

          <div className="programs-detail-grid reveal" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {SUCCESS_IMAGES.map((image, index) => (
              <div className="program-detail-card" key={image}>
                <div className="about-image-container" style={{ aspectRatio: '4/5' }}>
                  <img src={image} alt={`Member transformation ${index + 1}`} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-darker" id="programs">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">What We Offer</div>
            <h2 className="section-title">Programs with <span>purpose</span>.</h2>
          </div>

          <div className="programs-detail-grid reveal" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {PROGRAMS.map((program) => (
              <div className="program-detail-card" key={program.title} style={{ cursor: 'pointer' }}>
                <div className="about-image-container" style={{ aspectRatio: '16/11', marginBottom: '20px' }}>
                  <img src={program.image} alt={program.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
                </div>
                <h3>{program.title}</h3>
                <p>Coach-led live sessions designed to make progress feel clear, energetic, and sustainable.</p>
                <LeadCaptureButton
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: '14px' }}
                  context={{ sourcePage: 'Home', interestType: 'program', interestLabel: program.title }}
                  label="Register Now"
                />
              </div>
            ))}
          </div>

          <div className="reveal" style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link to="/programs" className="btn btn-secondary btn-lg" style={{ borderColor: 'var(--color-dark-alt)', textDecoration: 'none' }}>
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-dark" id="free-sessions">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Try Before You Commit</div>
            <h2 className="section-title">Free upcoming <span>sessions</span>.</h2>
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

      <section className="section section-dark" id="how-it-works">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">How It Works</div>
            <h2 className="section-title">Four steps to a <span>fitter you</span>.</h2>
          </div>

          <div className="steps-flow reveal">
            {[
              { num: '01', title: 'Choose a Program', desc: 'Pick the format or plan that matches your goals.', icon: <FiTarget /> },
              { num: '02', title: 'Submit Registration', desc: 'Enter your details and interest from any page.', icon: <FiUser /> },
              { num: '03', title: 'Admin Reviews Lead', desc: 'Your registration appears inside the admin portal.', icon: <FiZap /> },
              { num: '04', title: 'Get Contacted', desc: 'The team follows up with the right plan and next steps.', icon: <FiHeart /> },
            ].map((step, index) => (
              <div className="step-card" key={step.num}>
                <div className="step-icon-circle">{step.icon}</div>
                {index < 3 ? <div className="step-connector"></div> : null}
                <div className="step-label">STEP {step.num}</div>
                <h4 className="step-title">{step.title}</h4>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-darker" id="pricing">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Choose Your Style</div>
            <h2 className="section-title">Two ways to <span>train</span>.</h2>
            <p className="section-subtitle">Transparent pricing with direct registration and admin-side lead tracking.</p>
          </div>

          <div className="plan-type-grid reveal">
            <div className={`plan-type-card ${activePlanTab === 'PRO' ? 'active' : ''}`} onClick={() => setActivePlanTab('PRO')}>
              <span className="plan-type-badge">MOST POPULAR</span>
              <div className="plan-type-icon"><FiUsers /></div>
              <h3 className="plan-type-title">PRO Plan</h3>
              <p className="plan-type-desc">3 sessions per week for steady, sustainable progress.</p>
              <span className="plan-type-link">View pricing</span>
            </div>

            <div className={`plan-type-card ${activePlanTab === 'ADVANCE' ? 'active' : ''}`} onClick={() => setActivePlanTab('ADVANCE')}>
              <span className="plan-type-badge premium">PREMIUM</span>
              <div className="plan-type-icon"><FiAward /></div>
              <h3 className="plan-type-title">ADVANCE Plan</h3>
              <p className="plan-type-desc">5 sessions per week for members who want extra momentum.</p>
              <span className="plan-type-link">View pricing</span>
            </div>
          </div>

          <div className="pricing-grid reveal">
            {DURATIONS.map((duration) => {
              const price = PRICING[activePlanTab][duration];
              const isPopular = duration === '3-Month';
              const isBestValue = duration === 'Yearly';

              return (
                <div className={`pricing-card ${isPopular ? 'popular' : ''} ${isBestValue ? 'best-value' : ''}`} key={duration}>
                  {isPopular ? <div className="pricing-badge">Most Popular</div> : null}
                  {!isPopular && isBestValue ? <div className="pricing-badge">Best Value</div> : null}
                  <div className="pricing-duration">{duration}</div>
                  <div className="pricing-period">{activePlanTab} Plan</div>
                  <div className="pricing-amount">
                    <span className="currency">Rs.</span>{price.toLocaleString('en-IN')}
                  </div>
                  <div className="pricing-per">
                    {duration === '1-Month' ? '/month' : duration === 'Yearly' ? '/year' : `/${duration.replace('-Month', ' months')}`}
                  </div>

                  <div className="pricing-features">
                    {PLAN_FEATURES[activePlanTab].features.map((feature) => (
                      <div className="pricing-feature" key={feature}>
                        <span className="pricing-feature-check"><FiCheckCircle /></span>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <LeadCaptureButton
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                    context={{
                      sourcePage: 'Home',
                      interestType: 'plan',
                      interestLabel: `${activePlanTab} ${duration}`,
                      planType: activePlanTab,
                      duration,
                    }}
                    label="Register Now"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-darker" id="your-team">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Your Dedicated Team</div>
            <h2 className="section-title">
              1 Trainer. 1 Nutritionist. <span>You</span>.
            </h2>
          </div>

          <div className="team-trio reveal">
            <div className="team-trio-member">
              <img
                src="https://res.cloudinary.com/dt37ji5yp/image/upload/v1771523022/WhatsApp_Image_2026-02-19_at_11.08.12_PM_swbslb.jpg"
                alt="Trainer certification"
                className="cert-frame"
                loading="lazy"
                style={{ transform: 'rotate(-4deg)', marginRight: '20px' }}
              />
            </div>

            <div className="team-trio-member">
              <div className="team-trio-circle trainer-circle" style={{ padding: 0, overflow: 'hidden', boxShadow: '0 8px 24px rgba(229, 57, 53, 0.25)', border: '2px solid rgba(229,57,53,0.5)' }}>
                <img
                  src="https://res.cloudinary.com/dt37ji5yp/image/upload/v1771520525/Gemini_Generated_Image_jx53w4jx53w4jx53_xu2ysc.png"
                  alt="Personal trainer"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="team-trio-label">YOUR TRAINER</div>
            </div>

            <div className="team-trio-plus">+</div>

            <div className="team-trio-member">
              <div className="team-trio-circle nutritionist-circle" style={{ padding: 0, overflow: 'hidden', boxShadow: '0 8px 24px rgba(76, 175, 80, 0.25)', border: '2px solid rgba(76, 175, 80, 0.5)' }}>
                <img
                  src="https://res.cloudinary.com/dt37ji5yp/image/upload/v1771520606/Gemini_Generated_Image_dwwqw8dwwqw8dwwq_ytwuql.png"
                  alt="Nutritionist"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="team-trio-label">YOUR NUTRITIONIST</div>
            </div>

            <div className="team-trio-plus">+</div>

            <div className="team-trio-member">
              <div className="team-trio-circle you-circle">
                <FiUser size={40} />
              </div>
              <div className="team-trio-label">YOU</div>
            </div>
          </div>

          <div className="trainers-grid reveal" style={{ marginTop: '48px' }}>
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
          <div className="section-badge">Start Today</div>
          <h2 className="cta-title">
            Consistency. Structure.
            <br />
            <span style={{ color: 'var(--color-primary)' }}>Results.</span>
          </h2>
          <p className="cta-subtitle">Join a cleaner, faster, more focused fitness experience.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <LeadCaptureButton
              className="btn btn-primary btn-lg"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              context={{ sourcePage: 'Home', interestType: 'general', interestLabel: 'Start Transformation' }}
            >
              Start Your Transformation <FiArrowRight />
            </LeadCaptureButton>
            <a className="btn btn-secondary btn-lg" href={getWhatsAppFreeSessionUrl('Fitness')} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <FaWhatsapp /> Book Free Session
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
