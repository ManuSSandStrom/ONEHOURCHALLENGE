import { useState } from 'react';
import { FiCheckCircle, FiUsers, FiAward, FiCalendar, FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { PLAN_FEATURES, getWhatsAppFreeSessionUrl } from '../utils/constants';
import PageHero from '../components/PageHero';
import LeadCaptureButton from '../components/LeadCaptureButton';

const FREE_SESSIONS = [
  { type: 'Yoga', date: 'Wellness and Flow', desc: 'Flexibility, mindfulness, and stress relief.' },
  { type: 'Fitness', date: 'Power Hour', desc: 'Muscle toning, stamina, and core work.' },
  { type: 'Zumba', date: 'Rhythm and Sweat', desc: 'High-energy cardio dance training.' },
];

const durations = ['Starter', '3 Months', '6 Months', 'Long Term'];

export default function Pricing() {
  const [activePlanTab, setActivePlanTab] = useState('PRO');

  return (
    <div className="page-wrapper">
      <PageHero
        badge="Plans"
        title="Choose the"
        highlight="right fit"
        description="This website is now registration-first. Pick a plan style, send your lead, and the team will contact you directly."
      />

      <section className="section section-dark">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Free Trial Sessions</div>
            <h2 className="section-title">Try a <span>free session</span> first</h2>
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
            <div className="section-badge">Coaching Plans</div>
            <h2 className="section-title">Two ways to <span>train</span></h2>
            <p className="section-subtitle">No payment flow here. Register your interest and the team will contact you personally.</p>
          </div>

          <div className="plan-type-grid reveal">
            <div className={`plan-type-card ${activePlanTab === 'PRO' ? 'active' : ''}`} onClick={() => setActivePlanTab('PRO')}>
              <span className="plan-type-badge">BALANCED</span>
              <div className="plan-type-icon"><FiUsers /></div>
              <h3 className="plan-type-title">PRO Plan</h3>
              <p className="plan-type-desc">A steady weekly structure for most working professionals.</p>
              <span className="plan-type-link">3 days each week</span>
            </div>

            <div className={`plan-type-card ${activePlanTab === 'ADVANCE' ? 'active' : ''}`} onClick={() => setActivePlanTab('ADVANCE')}>
              <span className="plan-type-badge premium">INTENSIVE</span>
              <div className="plan-type-icon"><FiAward /></div>
              <h3 className="plan-type-title">ADVANCE Plan</h3>
              <p className="plan-type-desc">A higher-frequency structure for faster accountability.</p>
              <span className="plan-type-link">5 days each week</span>
            </div>
          </div>

          <div className="pricing-grid reveal">
            {durations.map((duration, index) => (
              <div className={`pricing-card ${index === 1 ? 'popular' : ''}`} key={duration}>
                {index === 1 ? <div className="pricing-badge">Recommended</div> : null}
                <div className="pricing-duration">{duration}</div>
                <div className="pricing-period">{activePlanTab} Registration</div>
                <div className="pricing-amount" style={{ fontSize: '1.45rem' }}>
                  Coach Callback
                </div>
                <div className="pricing-per">We review your lead and contact you directly</div>

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
                    sourcePage: 'Plans',
                    interestType: 'plan',
                    interestLabel: `${activePlanTab} ${duration}`,
                    planType: activePlanTab,
                    duration,
                  }}
                  label="Register Interest"
                />
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <LeadCaptureButton
              className="btn btn-secondary btn-lg"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              context={{ sourcePage: 'Plans', interestType: 'general', interestLabel: 'General Plan Enquiry' }}
            >
              Talk to the Team <FiArrowRight />
            </LeadCaptureButton>
          </div>
        </div>
      </section>
    </div>
  );
}
