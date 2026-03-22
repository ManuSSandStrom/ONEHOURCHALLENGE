import { useState } from 'react';
import { FiCheckCircle, FiUsers, FiAward, FiArrowRight, FiClock, FiZap } from 'react-icons/fi';
import { PLAN_FEATURES } from '../utils/constants';
import PageHero from '../components/PageHero';
import LeadCaptureButton from '../components/LeadCaptureButton';
import FreeSessionShowcase from '../components/FreeSessionShowcase';

const durations = [
  {
    label: 'Starter',
    note: 'Best for first-time members',
    summary: 'A simple way to begin, understand the coaching style, and build your first routine.',
  },
  {
    label: '3 Months',
    note: 'Most chosen',
    summary: 'A focused phase for building momentum, visible discipline, and measurable progress.',
    featured: true,
  },
  {
    label: '6 Months',
    note: 'Best for stronger transformation',
    summary: 'Ideal for members who want enough time to improve stamina, strength, and overall fitness.',
  },
  {
    label: 'Long Term',
    note: 'Best for lifestyle change',
    summary: 'Built for long-term consistency when fitness becomes part of your everyday routine.',
  },
];

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
            <h2 className="section-title">Choose how often you want to <span>train</span></h2>
            <p className="section-subtitle">Select the coaching rhythm that fits your time, energy, and goals. The team will help you finalize the best option.</p>
          </div>

          <div className="plans-intro-band reveal">
            <div>
              <span>Membership Direction</span>
              <h2>Simple plan selection with clear coaching paths.</h2>
            </div>
            <p>
              Start with a balanced weekly routine or choose a more intensive training schedule when
              you want faster accountability and stronger momentum.
            </p>
          </div>

          <div className="plan-type-grid reveal">
            <div className={`plan-type-card ${activePlanTab === 'PRO' ? 'active' : ''}`} onClick={() => setActivePlanTab('PRO')}>
              <span className="plan-type-badge">Balanced Coaching</span>
              <div className="plan-type-icon"><FiUsers /></div>
              <h3 className="plan-type-title">PRO Plan</h3>
              <p className="plan-type-desc">A steady weekly routine for most working professionals.</p>
              <div className="plan-type-meta">
                <span><FiClock /> 3 days each week</span>
                <span><FiZap /> Sustainable pace</span>
              </div>
            </div>

            <div className={`plan-type-card ${activePlanTab === 'ADVANCE' ? 'active' : ''}`} onClick={() => setActivePlanTab('ADVANCE')}>
              <span className="plan-type-badge premium">Intensive Coaching</span>
              <div className="plan-type-icon"><FiAward /></div>
              <h3 className="plan-type-title">ADVANCE Plan</h3>
              <p className="plan-type-desc">A higher-frequency routine for faster momentum and support.</p>
              <div className="plan-type-meta">
                <span><FiClock /> 5 days each week</span>
                <span><FiZap /> Higher accountability</span>
              </div>
            </div>
          </div>

          <div className="plans-selection-note reveal">
            <strong>{activePlanTab === 'PRO' ? 'PRO Plan' : 'ADVANCE Plan'}</strong>
            <span>
              {activePlanTab === 'PRO'
                ? 'A balanced weekly plan for members who want consistency without overload.'
                : 'A more intensive weekly plan for members aiming for faster rhythm and closer support.'}
            </span>
          </div>

          <div className="pricing-grid reveal">
            {durations.map((duration) => (
              <div className={`pricing-card ${duration.featured ? 'popular' : ''}`} key={duration.label}>
                {duration.featured ? <div className="pricing-badge">Recommended</div> : null}
                <div className="pricing-card-top">
                  <div className="pricing-duration">{duration.label}</div>
                  <div className="pricing-period">{duration.note}</div>
                </div>
                <div className="pricing-amount" style={{ fontSize: '1.45rem' }}>
                  {activePlanTab}
                </div>
                <div className="pricing-per">{duration.summary}</div>

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
                    interestLabel: `${activePlanTab} ${duration.label}`,
                    planType: activePlanTab,
                    duration: duration.label,
                  }}
                  label="Send Enquiry"
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
