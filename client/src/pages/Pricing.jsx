import { useState } from 'react';
import { FiCheckCircle, FiUsers, FiAward, FiLock, FiArrowRight, FiCalendar } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useUser, useClerk } from '@clerk/clerk-react';
import { PRICING, PLAN_FEATURES, DURATIONS, getWhatsAppPaymentUrl, getWhatsAppFreeSessionUrl } from '../utils/constants';
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

export default function Pricing() {
  const [activePlanTab, setActivePlanTab] = useState('PRO');

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

  const handleChoosePlan = (planType, duration) => {
    requireLogin(() => {
      const price = PRICING[planType][duration];
      const url = getWhatsAppPaymentUrl(planType, duration, price, userName, userEmail);
      window.open(url, '_blank');
      toast.success('Redirecting to WhatsApp...');
    });
  };

  const handleFreeSession = (sessionType) => {
    requireLogin(() => {
      const url = getWhatsAppFreeSessionUrl(sessionType, userName, userEmail);
      window.open(url, '_blank');
      toast.success('Redirecting to WhatsApp...');
    });
  };

  return (
    <div className="page-wrapper">
      {/* ============ FREE SESSIONS ============ */}
      <section className="section section-dark" style={{ flex: 0 }}>
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Try Before You Commit</div>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              Free upcoming <span style={{ fontStyle: 'italic' }}>sessions</span>.
            </h1>
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

      {/* ============ PRICING ============ */}
      <section className="section section-darker">
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

      {/* CTA */}
      <section className="cta-section">
        <div className="container reveal">
          <h2 className="cta-title">
            Ready to <span style={{ color: 'var(--color-primary)' }}>Commit</span>?
          </h2>
          <p className="cta-subtitle">Join hundreds of professionals who've transformed their health.</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => handleFreeSession('Fitness')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <FaWhatsapp /> Book a Free Session First
          </button>
        </div>
      </section>
    </div>
  );
}
