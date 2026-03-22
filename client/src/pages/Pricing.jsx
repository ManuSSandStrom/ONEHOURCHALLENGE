import { useState } from 'react';
import { FiCheckCircle, FiUsers, FiAward, FiArrowRight } from 'react-icons/fi';
import { PLAN_FEATURES } from '../utils/constants';
import PageHero from '../components/PageHero';
import LeadCaptureButton from '../components/LeadCaptureButton';
import FreeSessionShowcase from '../components/FreeSessionShowcase';

const durations = ['Starter', '3 Months', '6 Months', 'Long Term'];

export default function Pricing() {
  const [activePlanTab, setActivePlanTab] = useState('PRO');

  return (
    <div className="page-wrapper">
      <PageHero
        badge="Plans"
        title="Choose the"
        highlight="right fit"
        description="Compare coaching rhythms, start with a free session if you want, and let the team guide you toward the plan that fits your goals."
      />

      <section className="section section-dark">
        <div className="container">
          <FreeSessionShowcase
            title="Try a"
            highlight="free session"
            subtitle="If you want to experience the coaching style first, book a free session and see which plan feels right for you."
          />
        </div>
      </section>

      <section className="section section-darker">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Coaching Plans</div>
            <h2 className="section-title">Two ways to <span>train</span></h2>
            <p className="section-subtitle">Pick the coaching rhythm you want, submit your interest, and the team will follow up personally.</p>
          </div>

          <div className="plan-type-grid reveal">
            <div className={`plan-type-card ${activePlanTab === 'PRO' ? 'active' : ''}`} onClick={() => setActivePlanTab('PRO')}>
              <span className="plan-type-badge">BALANCED</span>
              <div className="plan-type-icon"><FiUsers /></div>
              <h3 className="plan-type-title">PRO Plan</h3>
              <p className="plan-type-desc">A steady weekly routine for most working professionals.</p>
              <span className="plan-type-link">3 days each week</span>
            </div>

            <div className={`plan-type-card ${activePlanTab === 'ADVANCE' ? 'active' : ''}`} onClick={() => setActivePlanTab('ADVANCE')}>
              <span className="plan-type-badge premium">INTENSIVE</span>
              <div className="plan-type-icon"><FiAward /></div>
              <h3 className="plan-type-title">ADVANCE Plan</h3>
              <p className="plan-type-desc">A higher-frequency routine for faster momentum and support.</p>
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
                <div className="pricing-per">Share your interest and our team will contact you directly</div>

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
