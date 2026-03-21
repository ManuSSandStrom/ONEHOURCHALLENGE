import { useState } from 'react';
import { FiCheckCircle, FiUsers, FiAward, FiCalendar } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { PRICING, PLAN_FEATURES, DURATIONS, getWhatsAppFreeSessionUrl } from '../utils/constants';
import PageHero from '../components/PageHero';
import LeadCaptureButton from '../components/LeadCaptureButton';

const FREE_SESSIONS = [
  { type: 'Yoga', date: 'Wellness and Flow', desc: 'Flexibility, mindfulness, and stress relief.' },
  { type: 'Fitness', date: 'Power Hour', desc: 'Muscle toning, stamina, and core work.' },
  { type: 'Zumba', date: 'Rhythm and Sweat', desc: 'High-energy cardio dance training.' },
];

const durationLabelMap = {
  '1-Month': 'Monthly Plan',
  '3-Month': '3-Month Plan',
  '6-Month': '6-Month Plan',
  Yearly: 'Yearly Plan',
};

export default function Pricing() {
  const [activePlanTab, setActivePlanTab] = useState('PRO');

  return (
    <div className="page-wrapper">
      <PageHero
        badge="Pricing"
        title="Transparent plans."
        highlight="Clear choices."
        description="Start with a free session, compare plans, and send each registration directly into your admin lead pipeline."
      />

      <section className="section section-dark">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Try Before You Commit</div>
            <h2 className="section-title">Free upcoming <span>sessions</span></h2>
          </div>

          <div className="free-sessions-grid reveal">
            {FREE_SESSIONS.map((session, index) => (
              <div className={`free-session-card ${index === 1 ? 'highlighted' : ''}`} key={session.type}>
                <span className="free-session-tag">FREE</span>
                <h4 className="free-session-card-title" style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
                  {session.type}
                </h4>
                <p className="free-session-card-desc" style={{ marginBottom: '16px', color: 'var(--color-gray-500)' }}>
                  {session.desc}
                </p>
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

      <section className="section section-darker">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Choose Your Style</div>
            <h2 className="section-title">Two ways to <span>train</span>.</h2>
            <p className="section-subtitle">Every plan now creates a lead with the exact plan and duration selected.</p>
          </div>

          <div className="plan-type-grid reveal">
            <div className={`plan-type-card ${activePlanTab === 'PRO' ? 'active' : ''}`} onClick={() => setActivePlanTab('PRO')}>
              <span className="plan-type-badge">MOST POPULAR</span>
              <div className="plan-type-icon"><FiUsers /></div>
              <h3 className="plan-type-title">PRO Plan</h3>
              <p className="plan-type-desc">3 sessions each week for steady, sustainable progress.</p>
              <span className="plan-type-link">View pricing</span>
            </div>

            <div className={`plan-type-card ${activePlanTab === 'ADVANCE' ? 'active' : ''}`} onClick={() => setActivePlanTab('ADVANCE')}>
              <span className="plan-type-badge premium">PREMIUM</span>
              <div className="plan-type-icon"><FiAward /></div>
              <h3 className="plan-type-title">ADVANCE Plan</h3>
              <p className="plan-type-desc">5 sessions each week for higher accountability and faster momentum.</p>
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
                  <div className="pricing-duration">{durationLabelMap[duration]}</div>
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
                      sourcePage: 'Pricing',
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
    </div>
  );
}
