import { useState } from 'react';
import { FiArrowRight, FiAward, FiBriefcase, FiLock, FiShield, FiTrendingUp, FiUsers, FiX } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import PageHero from '../components/PageHero';
import LeadCaptureButton from '../components/LeadCaptureButton';
import API, { adminSession } from '../utils/api';
import { TRAINERS } from '../utils/constants';

const pillars = [
  {
    icon: <FiAward />,
    title: 'Certified guidance',
    desc: 'Coaches lead sessions with form, safety, and progression in focus.',
  },
  {
    icon: <FiTrendingUp />,
    title: 'Structured programming',
    desc: 'Every session has a clear purpose, from warm-up to recovery.',
  },
  {
    icon: <FiUsers />,
    title: 'Supportive accountability',
    desc: 'Members get a consistent weekly rhythm and practical follow-up.',
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
        eyebrow="Professional support"
        title="Train with coaches who keep"
        highlight="progress simple"
        description="OneHour Challenge combines certified fitness, yoga, zumba, and conditioning support into a clear online coaching experience."
        metrics={[
          { value: '15+', label: 'Coach network' },
          { value: '5+', label: 'Specializations' },
          { value: '1 hour', label: 'Session structure' },
        ]}
      />

      <section className="section section-darker">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Team Model</div>
            <h2 className="section-title">Clear coaching, focused sessions, better consistency.</h2>
            <p className="section-subtitle">
              Meet the coaching layer behind every session: certified guidance, practical pacing,
              and a support system designed for long-term consistency.
            </p>
          </div>

          <div className="trainers-grid reveal">
            {TRAINERS.map((trainer) => (
              <article className="trainer-card" key={trainer.name}>
                <div className="card-icon">
                  <FiShield />
                </div>
                <span className="plan-type-badge">{trainer.experience}</span>
                <h4 className="trainer-name">{trainer.name}</h4>
                <p className="trainer-cert">{trainer.specialization}</p>
                <strong>{trainer.certification}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="trainers-grid reveal">
            {pillars.map((item) => (
              <article className="trainer-card" key={item.title}>
                <div className="card-icon">{item.icon}</div>
                <h4 className="trainer-name">{item.title}</h4>
                <p className="trainer-cert">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container reveal">
          <h2 className="cta-title">
            Train with the <span>right support</span>
          </h2>
          <p className="cta-subtitle">
            Register your interest and let the team guide you toward the right program, plan, and batch timing.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/plans" className="btn btn-primary btn-lg">
              View Plans <FiArrowRight />
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
            <p className="trainers-lock-text">Authorized team members can continue through secure sign-in.</p>

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
