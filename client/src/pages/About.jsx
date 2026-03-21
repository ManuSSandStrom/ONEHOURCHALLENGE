import { FiTarget, FiUsers, FiAward } from 'react-icons/fi';
import PageHero from '../components/PageHero';
import LeadCaptureButton from '../components/LeadCaptureButton';

const stats = [
  { num: '500+', title: 'Active Members', desc: 'Professionals across India training with us each week.' },
  { num: '15+', title: 'Certified Trainers', desc: 'A coaching team built around safe, structured progress.' },
  { num: '4.8+', title: 'Member Rating', desc: 'Strong satisfaction from members who stay consistent.' },
  { num: '5+', title: 'Programs', desc: 'Strength, yoga, zumba, HIIT, and functional training.' },
];

export default function About() {
  return (
    <div className="page-wrapper">
      <PageHero
        badge="About Us"
        title="Built for"
        highlight="Discipline"
        description="OneHour Challenge helps busy people train with structure, accountability, and clear progression."
      />

      <section className="section section-dark">
        <div className="container">
          <div className="about-grid">
            <div className="about-image-container reveal">
              <img
                src="https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512247/Zomba_part3_v3i9y0.png"
                alt="OneHour Challenge training session"
                className="about-image-content"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }}
              />
            </div>

            <div className="about-content reveal">
              <h2 className="section-title">
                Designed for <span>results</span>.
              </h2>
              <p className="about-text">
                We deliver one-hour live sessions that are easy to follow, professionally coached, and
                built for sustainable progress. The focus is simple: less confusion, more consistency.
              </p>

              <div className="value-cards">
                <div className="value-card">
                  <div className="value-card-icon"><FiTarget /></div>
                  <div>
                    <div className="value-card-title">Structured Programming</div>
                    <div className="value-card-desc">Every session fits into a clear training system.</div>
                  </div>
                </div>
                <div className="value-card">
                  <div className="value-card-icon"><FiUsers /></div>
                  <div>
                    <div className="value-card-title">Personal Attention</div>
                    <div className="value-card-desc">Supportive coaching without getting lost in the crowd.</div>
                  </div>
                </div>
                <div className="value-card">
                  <div className="value-card-icon"><FiAward /></div>
                  <div>
                    <div className="value-card-title">Certified Team</div>
                    <div className="value-card-desc">Experienced coaches with a professional mindset.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-darker">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Our Mission</div>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
              Make fitness feel <span style={{ fontStyle: 'italic' }}>possible</span>.
            </h2>
            <p className="section-subtitle" style={{ maxWidth: '700px' }}>
              We built the platform around one realistic promise: one focused hour can create measurable
              progress when the program, coaching, and routine all work together.
            </p>
          </div>

          <div className="steps-flow reveal">
            {stats.map((stat) => (
              <div className="step-card" key={stat.title}>
                <div className="step-icon-circle" style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                  {stat.num}
                </div>
                <h4 className="step-title">{stat.title}</h4>
                <p className="step-desc">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container reveal">
          <h2 className="cta-title">
            Ready to <span style={{ color: 'var(--color-primary)' }}>start</span>?
          </h2>
          <p className="cta-subtitle">Send a direct registration and let the team follow up from the admin portal.</p>
          <LeadCaptureButton
            className="btn btn-primary btn-lg"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            context={{ sourcePage: 'About', interestType: 'general', interestLabel: 'About Page Registration' }}
            label="Register Now"
          />
        </div>
      </section>
    </div>
  );
}
