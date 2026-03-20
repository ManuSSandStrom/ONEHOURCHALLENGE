import { PLACEHOLDERS } from '../utils/constants';
import PageHero from '../components/PageHero';
import LeadCaptureButton from '../components/LeadCaptureButton';

const transformations = [
  { image: PLACEHOLDERS.transformationImages[0], quote: 'Lost 12 kgs in 4 months. The structure and consistency made the difference.', name: 'Navami P' },
  { image: PLACEHOLDERS.transformationImages[1], quote: 'From barely running 1 km to completing a 10K. The progression was easy to trust.', name: 'Meera Iyer' },
  { image: PLACEHOLDERS.transformationImages[2], quote: 'Lean muscle gain felt realistic because the coaching stayed clear and practical.', name: 'Karthik Nair' },
  { image: PLACEHOLDERS.transformationImages[3], quote: 'Yoga improved my flexibility and energy more than I expected.', name: 'Deepa Sharma' },
  { image: PLACEHOLDERS.transformationImages[4], quote: 'The zumba sessions kept me consistent because they were genuinely enjoyable.', name: 'Ravi Kumar' },
  { image: PLACEHOLDERS.transformationImages[5], quote: 'The online format fit my schedule perfectly and still delivered results.', name: 'Anjali Reddy' },
];

export default function Transformations() {
  return (
    <div className="page-wrapper page-transformations">
      <PageHero
        badge="Real Results"
        eyebrow="Proof through consistency"
        title="Transformation stories that feel"
        highlight="credible"
        description="Real member wins built on routine, guidance, and training that fits everyday life."
        metrics={[
          { value: '6', label: 'Featured Stories' },
          { value: '4.8+', label: 'Community Rating' },
          { value: '1 hour', label: 'Repeatable Routine' },
        ]}
      />

      <section className="section section-darker">
        <div className="container">
          <div className="results-overview reveal">
            <div className="results-overview-copy">
              <span className="section-badge">Transformation Lens</span>
              <h2>Visible progress comes from a system people can actually stay with.</h2>
              <p>
                These stories represent the kind of outcomes members trust: fat loss, better stamina,
                improved flexibility, stronger routines, and a training plan that fits around life.
              </p>
            </div>
            <div className="results-overview-points">
              <div>Weight-loss journeys with realistic timelines</div>
              <div>Cardio and stamina gains built through regular sessions</div>
              <div>Strength and mobility improvements without extreme routines</div>
            </div>
          </div>

          <div className="transformations-grid">
            {transformations.map((item) => (
              <div className="transformation-card reveal" key={item.name}>
                <div className="transformation-image">
                  <img src={item.image} alt={`${item.name} transformation`} loading="lazy" />
                </div>
                <div className="transformation-content">
                  <p className="transformation-quote">"{item.quote}"</p>
                  <p className="transformation-name">{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container reveal">
          <h2 className="cta-title">
            Your transformation is <span style={{ color: 'var(--color-primary)' }}>next</span>
          </h2>
          <p className="cta-subtitle">Turn inspiration into a real lead with a clean registration flow.</p>
          <LeadCaptureButton
            className="btn btn-primary btn-lg"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            context={{ sourcePage: 'Transformations', interestType: 'general', interestLabel: 'Transformation Inspired Lead' }}
            label="Start Your Journey"
          />
        </div>
      </section>
    </div>
  );
}
