import { FiAward, FiBriefcase, FiTrendingUp, FiUser, FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useUser, useClerk } from '@clerk/clerk-react';
import { getWhatsAppUrl } from '../utils/constants';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Trainers() {
  const { isSignedIn } = useUser();
  const clerk = useClerk();

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

  return (
    <div className="page-wrapper">
      {/* ============ YOUR DEDICATED TEAM ============ */}
      <section className="section section-darker" style={{ flex: 0 }}>
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Your Dedicated Team</div>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              1 Trainer. 1 Nutritionist. <span style={{ fontStyle: 'italic' }}>You</span>.
            </h1>
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
            Matched from our team of <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>15+ trainers</span> and <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>certified nutritionists</span> to fit your goals.
          </p>
        </div>
      </section>

      {/* ============ EXPERTISE SECTION ============ */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Our Team</div>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
              Meet Your <span style={{ color: 'var(--color-primary)' }}>Coaches</span>.
            </h2>
            <p className="section-subtitle">Certified professionals dedicated to your transformation</p>
          </div>

          <div className="trainers-grid reveal">
            {[
              {
                icon: <FiAward size={40} style={{ color: 'var(--color-primary)' }} />,
                title: 'Global Certifications',
                desc: 'Our elite coaching team is certified by world-recognized bodies including ACE (USA), ISSA, and Yoga Alliance (500hr RYT).'
              },
              {
                icon: <FiBriefcase size={40} style={{ color: 'var(--color-primary)' }} />,
                title: 'Veteran Expertise',
                desc: 'With over 25 years of collective experience, we have successfully guided 1000+ professionals through body transformations.'
              },
              {
                icon: <FiTrendingUp size={40} style={{ color: 'var(--color-primary)' }} />,
                title: 'Scientific Approach',
                desc: 'We use evidence-based programming and metabolic tracking to ensure your progress is efficient, safe, and sustainable.'
              }
            ].map((expertise, i) => (
              <div className="trainer-card" key={i} style={{ textAlign: 'center', padding: '50px 30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                <div className="expertise-icon-wrapper" style={{ padding: '20px', background: 'rgba(0, 109, 60, 0.05)', borderRadius: '20px', marginBottom: '10px' }}>
                  {expertise.icon}
                </div>
                <h4 className="trainer-name" style={{ margin: 0 }}>{expertise.title}</h4>
                <p className="trainer-cert" style={{ margin: 0, opacity: 0.8 }}>{expertise.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container reveal">
          <h2 className="cta-title">
            Train with the <span style={{ color: 'var(--color-primary)' }}>Best</span>
          </h2>
          <p className="cta-subtitle">Get paired with a trainer and nutritionist who understand your goals.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/pricing" className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              Find Your Team <FiArrowRight />
            </Link>
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => window.open(getWhatsAppUrl('I want to know about the trainers at OneHour Challenge!'), '_blank')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <FaWhatsapp /> Ask on WhatsApp
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
