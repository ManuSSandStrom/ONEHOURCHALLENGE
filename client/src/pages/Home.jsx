import { FiArrowUpRight, FiPlay, FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useUser, useClerk } from '@clerk/clerk-react';
import { getWhatsAppFreeSessionUrl } from '../utils/constants';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Home() {
  const { user, isSignedIn } = useUser();
  const clerk = useClerk();

  const userName = user?.fullName || user?.firstName || '';
  const userEmail = user?.primaryEmailAddress?.emailAddress || '';

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

  const handleFreeSession = (sessionType) => {
    requireLogin(() => {
      const url = getWhatsAppFreeSessionUrl(sessionType, userName, userEmail);
      window.open(url, '_blank');
      toast.success('Redirecting to WhatsApp...');
    });
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
            <Link to="/programs" className="hero-pill" style={{ textDecoration: 'none' }}>
              FITNESS <FiArrowUpRight />
            </Link>
            <Link to="/programs" className="hero-pill" style={{ textDecoration: 'none' }}>
              ZUMBA <FiArrowUpRight />
            </Link>
            <Link to="/programs" className="hero-pill" style={{ textDecoration: 'none' }}>
              YOGA <FiArrowUpRight />
            </Link>
            <Link to="/pricing" className="hero-pill hero-pill-accent" style={{ textDecoration: 'none' }}>
              JOIN NOW <FiArrowUpRight />
            </Link>
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

      {/* ============ FINAL CTA ============ */}
      <section className="cta-section" id="cta">
        <div className="container reveal">
          <div className="section-badge">Start Today</div>
          <h2 className="cta-title">
            Consistency. Structure.<br /><span style={{ color: 'var(--color-primary)' }}>Results.</span>
          </h2>
          <p className="cta-subtitle">
            Join hundreds of professionals who've transformed their health with OneHour Challenge.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/pricing" className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              Start Your Transformation <FiArrowRight />
            </Link>
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
