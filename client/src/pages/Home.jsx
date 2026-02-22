import { useState } from 'react';
import { FiCheckCircle, FiUsers, FiAward, FiTarget, FiArrowRight, FiArrowUpRight, FiPlay, FiHeart, FiClock, FiZap, FiCalendar, FiUser, FiLock, FiBriefcase, FiTrendingUp } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useUser, useClerk } from '@clerk/clerk-react';
import { PRICING, PLAN_FEATURES, DURATIONS, TRAINERS, PLACEHOLDERS, getWhatsAppPaymentUrl, getWhatsAppFreeSessionUrl } from '../utils/constants';
import toast from 'react-hot-toast';

const FREE_SESSIONS = [
  {
    type: 'Yoga',
    emoji: '🧘',
    trainer: 'with Coach Deepak',
    date: 'Wellness & Flow',
    time: '07:00 AM IST',
    spots: 10,
    desc: 'Flexibility, mindfulness & stress relief',
  },
  {
    type: 'Fitness',
    emoji: '💪',
    trainer: 'with Coach Vikram',
    date: 'Power Hour',
    time: '08:00 AM IST',
    spots: 8,
    desc: 'Muscle toning & core strengthening',
  },
  {
    type: 'Zumba',
    emoji: '💃',
    trainer: 'with Coach Ananya',
    date: 'Rhythm & Sweat',
    time: '06:00 PM IST',
    spots: 12,
    desc: 'High energy cardio dance workout',
  },
];

export default function Home() {
  const [activePlanTab, setActivePlanTab] = useState('PRO');

  const { user, isSignedIn } = useUser();
  const clerk = useClerk();

  const userName = user?.fullName || user?.firstName || '';
  const userEmail = user?.primaryEmailAddress?.emailAddress || '';

  // Gate: require login before any action
  const requireLogin = (callback) => {
    if (isSignedIn) {
      callback();
    } else {
      if (clerk?.openSignIn) {
        toast('Please login first to continue', { icon: '🔒' });
        clerk.openSignIn({ forceRedirectUrl: window.location.pathname });
      } else {
        toast.error('Please login first to continue');
      }
    }
  };

  // Open WhatsApp with plan payment message
  const handleChoosePlan = (planType, duration) => {
    requireLogin(() => {
      const price = PRICING[planType][duration];
      const url = getWhatsAppPaymentUrl(planType, duration, price, userName, userEmail);
      window.open(url, '_blank');
      toast.success('Redirecting to WhatsApp...');
    });
  };

  // Open WhatsApp for free session
  const handleFreeSession = (sessionType) => {
    requireLogin(() => {
      const url = getWhatsAppFreeSessionUrl(sessionType, userName, userEmail);
      window.open(url, '_blank');
      toast.success('Redirecting to WhatsApp...');
    });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ============ HERO SECTION — Full-screen, centered ============ */}
      <section className="hero" id="hero">
        <video 
          className="hero-video-bg"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="https://res.cloudinary.com/dt37ji5yp/video/upload/v1771513503/Cinematic_Fitness_Hero_Video_Generation_tfskhs.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>

        <div className="hero-center-wrap">
          <div className="hero-top-label">
            <span className="hero-top-label-text">EXPERT-LED FITNESS</span>
            <span className="hero-top-label-tag"><FiPlay size={10} /> Live Sessions Daily</span>
          </div>

          <h1 className="hero-title">
            Train. Transform.<br /><span>Challenge.</span>
          </h1>
          <p className="hero-description">
            Your Trainer. Your Discipline. India's #1 online platform for real fitness results.
          </p>

          <div className="hero-pills">
            <button className="hero-pill" onClick={() => scrollToSection('programs')}>
              STRENGTH TRAINING <FiArrowUpRight />
            </button>
            <button className="hero-pill" onClick={() => scrollToSection('programs')}>
              ZUMBA <FiArrowUpRight />
            </button>
            <button className="hero-pill" onClick={() => scrollToSection('programs')}>
              YOGA <FiArrowUpRight />
            </button>
            <button className="hero-pill hero-pill-accent" onClick={() => {
              requireLogin(() => scrollToSection('pricing'));
            }}>
              JOIN NOW <FiArrowUpRight />
            </button>
          </div>
        </div>

        {/* Stats bar at bottom of hero */}
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
              <div className="hero-stat-number">4.8<span>★</span></div>
              <div className="hero-stat-label">Google Rating</div>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat-item">
              <div className="hero-stat-number">5<span>+</span></div>
              <div className="hero-stat-label">Programs</div>
            </div>
          </div>
        </div>

        <div className="hero-scroll-indicator" onClick={() => scrollToSection('about')}>
          <span>▾</span>
        </div>
      </section>

      {/* ============ ABOUT SECTION ============ */}
      <section className="section section-dark" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-image-container reveal">
              <img 
                src="https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512247/Zomba_part3_v3i9y0.png" 
                alt="About OneHour Challenge" 
                className="about-image-content"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }}
              />
            </div>

            <div className="about-content reveal">
              <div className="section-badge">About Us</div>
              <h2 className="section-title">
                Built for <span>Discipline</span>.<br />Designed for <span>Results</span>.
              </h2>
              <p className="about-text">
                OneHour Challenge is a structured online fitness platform offering 1-hour live group 
                sessions designed for real, sustainable results. We believe in consistency over intensity 
                and structured programming over random workouts.
              </p>

              <div className="value-cards">
                <div className="value-card">
                  <div className="value-card-icon"><FiTarget /></div>
                  <div>
                    <div className="value-card-title">Structured Programming</div>
                    <div className="value-card-desc">Progressive plans tailored for real results</div>
                  </div>
                </div>
                <div className="value-card">
                  <div className="value-card-icon"><FiUsers /></div>
                  <div>
                    <div className="value-card-title">Limited Group Size</div>
                    <div className="value-card-desc">Personalized attention in every session</div>
                  </div>
                </div>
                <div className="value-card">
                  <div className="value-card-icon"><FiAward /></div>
                  <div>
                    <div className="value-card-title">Certified Trainers</div>
                    <div className="value-card-desc">Experienced & internationally certified</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SUCCESS STORIES — Large Scrollable Cards ============ */}
      <section className="section section-darker" id="reviews">
        <div className="container">
          <div className="section-header reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div className="section-badge">Success Stories</div>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', textAlign: 'left' }}>
                Real people. <span style={{ fontStyle: 'italic' }}>Real results</span>.
              </h2>
            </div>
          </div>

          <div className="stories-marquee-wrapper reveal">
            <div className="stories-marquee-track">
              {[...Array(3)].map((_, setIndex) => (
                [
                  "https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512752/S6_qhxtvk.png",
                  "https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512751/S4_lfr57x.png",
                  "https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512748/S2_oxkfxm.png",
                  "https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512751/S5_ejfupq.png",
                  "https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512240/About_image_qg6xve.png",
                  "https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512750/S3_ptp86q.png"
                ].map((img, i) => (
                  <img 
                    src={img} 
                    alt={`Success Story ${i + 1}`} 
                    className="story-marquee-img" 
                    key={`${setIndex}-${i}`}
                  />
                ))
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROGRAMS — Bento Grid ============ */}
      <section className="section section-darker" id="programs">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">What We Offer</div>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
              What We <span style={{ fontStyle: 'italic' }}>Offer</span>.
            </h2>
          </div>

          <div className="bento-grid reveal">
            <div className="bento-card bento-large" onClick={() => requireLogin(() => scrollToSection('pricing'))}>
              <div className="bento-card-bg">
                <img src="https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512242/ST_3_or_main_ipyg24.png" alt="Fitness" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="bento-card-overlay"></div>
              <div className="bento-card-content">
                <h3 className="bento-card-title">Fitness</h3>
                <span className="bento-card-arrow"><FiArrowRight /></span>
              </div>
            </div>

            <div className="bento-card bento-small" onClick={() => requireLogin(() => scrollToSection('pricing'))}>
              <div className="bento-card-bg">
                <img src="https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512247/Zomba_Training_kws7pi.png" alt="Zumba" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="bento-card-overlay"></div>
              <div className="bento-card-content">
                <h3 className="bento-card-title">Zumba</h3>
                <span className="bento-card-arrow"><FiArrowRight /></span>
              </div>
            </div>

            <div className="bento-card bento-small" onClick={() => requireLogin(() => scrollToSection('pricing'))}>
              <div className="bento-card-bg">
                <img src="https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512244/yoga_part4_mnslxd.png" alt="Yoga" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="bento-card-overlay"></div>
              <div className="bento-card-content">
                <h3 className="bento-card-title">Yoga</h3>
                <span className="bento-card-arrow"><FiArrowRight /></span>
              </div>
            </div>
          </div>

          <div className="bento-row-2 reveal">
            <div className="bento-card bento-half" onClick={() => requireLogin(() => scrollToSection('pricing'))}>
              <div className="bento-card-bg">
                <img src="https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512241/Strength_part2_tzrm1t.png" alt="HIIT" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="bento-card-overlay"></div>
              <div className="bento-card-content">
                <h3 className="bento-card-title">HIIT</h3>
                <span className="bento-card-arrow"><FiArrowRight /></span>
              </div>
            </div>

            <div className="bento-card bento-half" onClick={() => requireLogin(() => scrollToSection('pricing'))}>
              <div className="bento-card-bg">
                <img src="https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512241/ST_2_xhbjg9.png" alt="Functional Training" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="bento-card-overlay"></div>
              <div className="bento-card-content">
                <h3 className="bento-card-title">Functional Training</h3>
                <span className="bento-card-arrow"><FiArrowRight /></span>
              </div>
            </div>
          </div>

          <div className="reveal" style={{ textAlign: 'center', marginTop: '32px' }}>
            <button className="btn btn-secondary btn-lg" onClick={() => scrollToSection('pricing')} style={{ borderColor: 'var(--color-dark-alt)' }}>
              View All Programs ▾
            </button>
          </div>
        </div>
      </section>

      {/* ============ ZUMBA SHOWCASE ============ */}
      <section className="section section-darker">
        <div className="container">
          <div className="section-header reveal">
            <h2 className="section-title">Rhythm & Energy: <span style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>Zumba</span></h2>
          </div>
          <div className="marquee-wrapper reveal">
            <div className="marquee-track">
              {[...Array(3)].map((_, setIndex) => (
                [
                  "https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512246/Zomba_part4_a0ompc.png",
                  "https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512247/Zomba_Training_kws7pi.png",
                  "https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512245/Zomba_part1_rsiqd7.png",
                  "https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512246/zomba_part2_qunqm2.png"
                ].map((img, i) => (
                  <img src={img} alt={`Zumba ${i + 1}`} className="marquee-img" key={`zumba-${setIndex}-${i}`} />
                ))
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ YOGA SHOWCASE ============ */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-header reveal">
            <h2 className="section-title">Balance & Mindfulness: <span style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>Yoga</span></h2>
          </div>
          <div className="marquee-wrapper reveal">
            <div className="marquee-track">
              {[...Array(3)].map((_, setIndex) => (
                [
                  "https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512245/Yoga_part3_b8rhhu.png",
                  "https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512244/yoga_part2_yjfmly.png",
                  "https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512245/yoga_part5_ilnuip.png",
                  "https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512244/yoga_part1_gogtxx.png"
                ].map((img, i) => (
                  <img src={img} alt={`Yoga ${i + 1}`} className="marquee-img" key={`yoga-${setIndex}-${i}`} />
                ))
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ STRENGTH SHOWCASE ============ */}
      <section className="section section-darker">
        <div className="container">
          <div className="section-header reveal">
            <h2 className="section-title">Power & Resilience: <span style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>Strength</span></h2>
          </div>
          <div className="marquee-wrapper reveal">
            <div className="marquee-track">
              {[...Array(3)].map((_, setIndex) => (
                [
                  "https://res.cloudinary.com/dt37ji5yp/image/upload/v1771518559/Gemini_Generated_Image_fr6lltfr6lltfr6l_ttscww.png",
                  "https://res.cloudinary.com/dt37ji5yp/image/upload/v1771518467/Gemini_Generated_Image_z1aftjz1aftjz1af_bp6slu.png",
                  "https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512244/ST_4_xhlxzv.png",
                  "https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512241/Strength_part2_tzrm1t.png",
                  "https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512241/Strength_Training_image_ab7ro0.png"
                ].map((img, i) => (
                  <img src={img} alt={`Strength ${i + 1}`} className="marquee-img" key={`strength-${setIndex}-${i}`} />
                ))
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FREE SESSIONS — "Try Before You Commit" ============ */}
      <section className="section section-dark" id="free-sessions">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Try Before You Commit</div>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
              Free upcoming <span style={{ fontStyle: 'italic' }}>sessions</span>.
            </h2>
          </div>

          <div className="free-sessions-grid reveal">
            {FREE_SESSIONS.map((session, i) => (
              <div className={`free-session-card ${i === 1 ? 'highlighted' : ''}`} key={i}>
                <span className="free-session-tag">FREE</span>
                <h4 className="free-session-card-title" style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
                  {session.type}
                </h4>
                <p className="free-session-card-desc" style={{ marginBottom: '16px', color: 'var(--color-gray-400)' }}>{session.desc}</p>
                
                <div className="free-session-meta" style={{ marginBottom: '20px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gray-300)' }}>
                    <FiCalendar size={14} style={{ color: 'var(--color-primary)' }} /> {session.date}
                  </span>
                </div>

                <div className="free-session-footer" style={{ marginTop: 'auto', borderTop: 'none', paddingTop: 0 }}>
                  <button 
                    className="free-session-register" 
                    onClick={() => handleFreeSession(session.type)}
                    style={{ 
                      width: '100%', 
                      justifyContent: 'center', 
                      background: 'rgba(255,255,255,0.05)', 
                      padding: '12px', 
                      borderRadius: 'var(--radius-md)', 
                      color: 'var(--color-white)',
                      border: '1px solid var(--color-dark-alt)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                    }}
                  >
                    {isSignedIn ? (
                      <><FaWhatsapp /> Register via WhatsApp</>
                    ) : (
                      <><FiLock size={14} /> Login to Register</>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS — Horizontal Steps ============ */}
      <section className="section section-dark" id="how-it-works">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">How It Works</div>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
              Four steps to a <span style={{ fontStyle: 'italic' }}>fitter you</span>.
            </h2>
          </div>

          <div className="steps-flow reveal">
            {[
              { num: '01', title: 'Login & Choose Plan', desc: 'Sign up with Google, then select PRO (3 days/week) or ADVANCE (5 days/week).', icon: <FiTarget /> },
              { num: '02', title: 'Connect on WhatsApp', desc: 'Send your plan details directly via WhatsApp. We\'ll confirm and share payment info.', icon: <FaWhatsapp /> },
              { num: '03', title: 'Pay & Get Started', desc: 'Complete payment and receive confirmation. Your membership activates instantly.', icon: <FiZap /> },
              { num: '04', title: 'See Results', desc: 'Track your progress and see real transformation with consistent training.', icon: <FiHeart /> },
            ].map((step, i) => (
              <div className="step-card" key={i}>
                <div className="step-icon-circle">
                  {step.icon}
                </div>
                {i < 3 && <div className="step-connector"></div>}
                <div className="step-label">STEP {step.num}</div>
                <h4 className="step-title">{step.title}</h4>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRICING — Clean Cards with WhatsApp ============ */}
      <section className="section section-darker" id="pricing">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Choose Your Style</div>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
              Two ways to <span style={{ fontStyle: 'italic' }}>train</span>.
            </h2>
            <p className="section-subtitle">
              Transparent pricing. No hidden fees. All sessions are 1 hour live group sessions.
            </p>
          </div>

          {/* Plan Type Cards */}
          <div className="plan-type-grid reveal">
            <div className={`plan-type-card ${activePlanTab === 'PRO' ? 'active' : ''}`} onClick={() => setActivePlanTab('PRO')}>
              <span className="plan-type-badge">MOST POPULAR</span>
              <div className="plan-type-icon"><FiUsers /></div>
              <h3 className="plan-type-title">PRO Plan</h3>
              <p className="plan-type-desc">3 sessions/week with certified trainers. Perfect for beginners and working professionals.</p>
              <span className="plan-type-link">View Pricing →</span>
            </div>

            <div className={`plan-type-card ${activePlanTab === 'ADVANCE' ? 'active' : ''}`} onClick={() => setActivePlanTab('ADVANCE')}>
              <span className="plan-type-badge premium">PREMIUM</span>
              <div className="plan-type-icon"><FiAward /></div>
              <h3 className="plan-type-title">ADVANCE Plan</h3>
              <p className="plan-type-desc">5 sessions/week for maximum results. Ideal for serious fitness enthusiasts.</p>
              <span className="plan-type-link">View Pricing →</span>
            </div>
          </div>

          <div className="pricing-grid reveal">
            {DURATIONS.map((duration) => {
              const price = PRICING[activePlanTab][duration];
              const isPopular = duration === '3-Month';
              const isBestValue = duration === 'Yearly';

              let badge = null;
              if (isPopular) badge = 'Most Popular';
              if (isBestValue) badge = 'Best Value';

              const durationLabel = 
                duration === '1-Month' ? '🥉 Monthly Plan' :
                duration === '3-Month' ? '🥈 3-Month Plan' :
                duration === '6-Month' ? '🥇 6-Month Plan' :
                '👑 Yearly Plan';

              const billingText = 
                duration === '1-Month' ? '/month' :
                duration === 'Yearly' ? '/year' :
                `/${duration.replace('-Month', ' Months')}`;

              return (
                <div className={`pricing-card ${isPopular ? 'popular' : ''} ${isBestValue ? 'best-value' : ''}`} key={duration}>
                  {badge && <div className="pricing-badge">{badge}</div>}
                  <div className="pricing-duration">{durationLabel}</div>
                  <div className="pricing-period">{activePlanTab} Plan</div>
                  <div className="pricing-amount">
                    <span className="currency">₹</span>{price.toLocaleString()}
                  </div>
                  <div className="pricing-per">
                    {billingText}
                  </div>

                  <div className="pricing-features">
                    {PLAN_FEATURES[activePlanTab].features.map((f, j) => (
                      <div className="pricing-feature" key={j}>
                        <span className="pricing-feature-check"><FiCheckCircle /></span>
                        {f}
                      </div>
                    ))}
                  </div>

                  <button
                    className="btn btn-primary"
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                    onClick={() => handleChoosePlan(activePlanTab, duration)}
                  >
                    {isSignedIn ? (
                      <><FaWhatsapp size={18} /> Choose Plan via WhatsApp</>
                    ) : (
                      <><FiLock size={16} /> Login to Choose Plan</>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          <p className="reveal" style={{ textAlign: 'center', marginTop: '32px', color: 'var(--color-gray-500)', fontSize: '0.85rem' }}>
            🔒 Login required • Pay securely via WhatsApp coordination
          </p>
        </div>
      </section>



      {/* ============ YOUR DEDICATED TEAM ============ */}
      <section className="section section-darker" id="your-team">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Your Dedicated Team</div>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
              1 Trainer. 1 Nutritionist. <span style={{ fontStyle: 'italic' }}>You</span>.
            </h2>
          </div>

          <div className="team-trio reveal">
            <div className="team-trio-member">
               <img 
                 src="https://res.cloudinary.com/dt37ji5yp/image/upload/v1771523022/WhatsApp_Image_2026-02-19_at_11.08.12_PM_swbslb.jpg" 
                 alt="ISSA Specialist in Strength" 
                 className="cert-frame" 
                 style={{ transform: 'rotate(-4deg)', marginRight: '20px' }} 
               />
            </div>

            <div className="team-trio-member">
              <div className="team-trio-circle trainer-circle" style={{ padding: 0, overflow: 'hidden', boxShadow: '0 8px 24px rgba(229, 57, 53, 0.25)', border: '2px solid rgba(229,57,53,0.5)' }}>
                <img 
                  src="https://res.cloudinary.com/dt37ji5yp/image/upload/v1771520525/Gemini_Generated_Image_jx53w4jx53w4jx53_xu2ysc.png" 
                  alt="Personal Trainer" 
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
                  alt="Personal Nutritionist" 
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

            <div className="team-trio-member">
               <img 
                 src="https://res.cloudinary.com/dt37ji5yp/image/upload/v1771523022/WhatsApp_Image_2026-02-19_at_11.08.13_PM_i4c9ap.jpg" 
                 alt="Gold's Gym Calorie Counting" 
                 className="cert-frame" 
                 style={{ transform: 'rotate(4deg)', marginLeft: '20px' }} 
               />
            </div>
          </div>

          <p className="reveal" style={{ textAlign: 'center', color: 'var(--color-gray-400)', fontSize: '1rem', marginTop: '40px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', lineHeight: '1.6' }}>
            Matched from our team of <span style={{ color: 'var(--color-red)', fontWeight: 700 }}>15+ trainers</span> and <span style={{ color: 'var(--color-red)', fontWeight: 700 }}>certified nutritionists</span> to fit your goals.
          </p>

          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <button className="btn btn-primary btn-lg" onClick={() => requireLogin(() => scrollToSection('pricing'))} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Find Your Team <FiArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* ============ TRAINERS SECTION ============ */}
      <section className="section section-dark" id="trainers">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Our Team</div>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
              Meet Your <span>Coaches</span>.
            </h2>
            <p className="section-subtitle">Certified professionals dedicated to your transformation</p>
          </div>

          <div className="trainers-grid reveal">
            {[
              {
                icon: <FiAward size={40} style={{ color: 'var(--color-red)' }} />,
                title: 'Global Certifications',
                desc: 'Our elite coaching team is certified by world-recognized bodies including ACE (USA), ISSA, and Yoga Alliance (500hr RYT).'
              },
              {
                icon: <FiBriefcase size={40} style={{ color: 'var(--color-red)' }} />,
                title: 'Veteran Expertise',
                desc: 'With over 25 years of collective experience, we’ve successfully guided 1000+ professionals through body transformations.'
              },
              {
                icon: <FiTrendingUp size={40} style={{ color: 'var(--color-red)' }} />,
                title: 'Scientific Approach',
                desc: 'We use evidence-based programming and metabolic tracking to ensure your progress is efficient, safe, and sustainable.'
              }
            ].map((expertise, i) => (
              <div className="trainer-card" key={i} style={{ textAlign: 'center', padding: '50px 30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                <div className="expertise-icon-wrapper" style={{ padding: '20px', background: 'rgba(229, 57, 53, 0.05)', borderRadius: '20px', marginBottom: '10px' }}>
                  {expertise.icon}
                </div>
                <h4 className="trainer-name" style={{ margin: 0 }}>{expertise.title}</h4>
                <p className="trainer-cert" style={{ margin: 0, opacity: 0.8 }}>{expertise.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ============ FINAL CTA ============ */}
      <section className="cta-section" id="cta">
        <div className="container reveal">
          <div className="section-badge">Start Today</div>
          <h2 className="cta-title">
            Consistency. Structure.<br /><span style={{ color: 'var(--color-red)' }}>Results.</span>
          </h2>
          <p className="cta-subtitle">
            Join hundreds of professionals who've transformed their health with OneHour Challenge.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={() => requireLogin(() => scrollToSection('pricing'))} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Start Your Transformation <FiArrowRight />
            </button>
            <button 
              className="btn btn-secondary btn-lg" 
              onClick={() => handleFreeSession('Fitness')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <FaWhatsapp /> Book Free Session
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
