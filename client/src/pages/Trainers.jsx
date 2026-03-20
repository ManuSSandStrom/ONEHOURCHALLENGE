import { useState } from 'react';
import { FiAward, FiBriefcase, FiTrendingUp, FiUser, FiArrowRight, FiLock, FiX } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import PageHero from '../components/PageHero';
import LeadCaptureButton from '../components/LeadCaptureButton';
import API, { adminSession } from '../utils/api';
import toast from 'react-hot-toast';

const pillars = [
  {
    icon: <FiAward size={40} style={{ color: 'var(--color-primary)' }} />,
    title: 'Global Certifications',
    desc: 'Coaches trained through respected certification pathways and practical client work.',
  },
  {
    icon: <FiBriefcase size={40} style={{ color: 'var(--color-primary)' }} />,
    title: 'Real Coaching Experience',
    desc: 'A team built around consistency, safety, and sustainable transformation.',
  },
  {
    icon: <FiTrendingUp size={40} style={{ color: 'var(--color-primary)' }} />,
    title: 'Evidence-Led Planning',
    desc: 'Programs are shaped around progression, accountability, and measurable progress.',
  },
];

export default function Trainers() {
  const navigate = useNavigate();
  const [showLockAccess, setShowLockAccess] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loginLoading, setLoginLoading] = useState(false);

  const handleSecureLogin = async (e) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
      toast.error('Please enter username and password');
      return;
    }

    try {
      setLoginLoading(true);
      const res = await API.post('/admin/login', credentials);
      adminSession.setToken(res.data.token);
      setShowLockAccess(false);
      setCredentials({ username: '', password: '' });
      toast.success('Access granted');
      navigate('/admin');
    } catch (error) {
      console.error('Secure login failed:', error);
      toast.error(error.response?.data?.error || 'Login failed');
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <PageHero
        badge="Coaching Team"
        title="Professional coaching for"
        highlight="real progress"
        description="Train with a coordinated support system that blends fitness coaching, nutrition guidance, and practical accountability."
      />

      <section className="section section-darker">
        <div className="container">
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
                  alt="Nutrition coach"
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

            <div className="team-trio-member">
              <img
                src="https://res.cloudinary.com/dt37ji5yp/image/upload/v1771523022/WhatsApp_Image_2026-02-19_at_11.08.13_PM_i4c9ap.jpg"
                alt="Nutrition certification"
                className="cert-frame"
                loading="lazy"
                style={{ transform: 'rotate(4deg)', marginLeft: '20px' }}
              />
            </div>
          </div>

          <p className="reveal" style={{ textAlign: 'center', color: 'var(--color-gray-500)', fontSize: '1rem', marginTop: '40px', maxWidth: '620px', marginLeft: 'auto', marginRight: 'auto', lineHeight: '1.7' }}>
            Your support system is built around coaching clarity, professional guidance, and plans that fit your real routine.
          </p>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Why Our Team Works</div>
            <h2 className="section-title">Meet Your <span>Coaches</span></h2>
            <p className="section-subtitle">A polished coaching setup designed to keep your training consistent and easy to follow.</p>
          </div>

          <div className="trainers-grid reveal">
            {pillars.map((item) => (
              <div className="trainer-card" key={item.title} style={{ textAlign: 'center', padding: '50px 30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                <div className="expertise-icon-wrapper" style={{ padding: '20px', background: 'rgba(0, 109, 60, 0.05)', borderRadius: '20px', marginBottom: '10px' }}>
                  {item.icon}
                </div>
                <h4 className="trainer-name" style={{ margin: 0 }}>{item.title}</h4>
                <p className="trainer-cert" style={{ margin: 0, opacity: 0.8 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container reveal">
          <h2 className="cta-title">
            Train with the <span style={{ color: 'var(--color-primary)' }}>right team</span>
          </h2>
          <p className="cta-subtitle">Register your interest and let the team guide you toward the right coaching path.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/plans" className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              Find Your Team <FiArrowRight />
            </Link>
            <LeadCaptureButton
              className="btn btn-secondary btn-lg"
              context={{ sourcePage: 'Trainers', interestType: 'team', interestLabel: 'Trainer Team Registration' }}
              label="Register Now"
            />
          </div>
          <div className="trainers-cta-utility">
            <button
              type="button"
              className="trainers-lock-button"
              aria-label="Open secure access"
              onClick={() => setShowLockAccess(true)}
            >
              <FiLock />
            </button>
          </div>
        </div>
      </section>

      {showLockAccess ? (
        <div className="trainers-lock-overlay" onClick={() => setShowLockAccess(false)}>
          <div className="trainers-lock-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="trainers-lock-close"
              aria-label="Close secure access"
              onClick={() => setShowLockAccess(false)}
            >
              <FiX />
            </button>

            <div className="admin-login-brand" style={{ marginBottom: '18px' }}>
              <div className="admin-login-icon">
                <FiLock />
              </div>
              <span className="admin-login-kicker">Secure Access</span>
            </div>

            <h3 className="trainers-lock-title">Restricted Sign In</h3>
            <p className="trainers-lock-text">Authorized team members can continue into the secure workspace from here.</p>

            <form onSubmit={handleSecureLogin} className="admin-auth-form">
              <label className="admin-auth-field">
                <span>Username</span>
                <input
                  className="form-input"
                  placeholder="Enter username"
                  value={credentials.username}
                  onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))}
                />
              </label>

              <label className="admin-auth-field">
                <span>Password</span>
                <input
                  className="form-input"
                  type="password"
                  placeholder="Enter password"
                  value={credentials.password}
                  onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                />
              </label>

              <button type="submit" className="btn btn-primary btn-lg admin-auth-submit" disabled={loginLoading}>
                {loginLoading ? 'Signing In...' : 'Continue'}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
