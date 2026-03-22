import { FiTarget, FiUsers, FiAward, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
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
    <div className="page-wrapper page-about">
      <PageHero
        badge="About Us"
        eyebrow="OneHour Challenge Method"
        title="Built for"
        highlight="Discipline"
        description="OneHour Challenge helps busy people train with structure, accountability, and a coaching rhythm that fits real life."
        actions={(
          <>
            <Link to="/programs" className="btn btn-primary btn-lg" style={{ textDecoration: 'none' }}>
              Explore Programs
            </Link>
            <Link to="/plans" className="btn btn-secondary btn-lg" style={{ textDecoration: 'none' }}>
              View Plans <FiArrowRight />
            </Link>
          </>
        )}
        metrics={[
          { value: '500+', label: 'Active Members' },
          { value: '15+', label: 'Certified Trainers' },
          { value: '5', label: 'Core Disciplines' },
        ]}
      />

      <section className="section section-dark">
        <div className="container">
          <div className="about-story-grid">
            <div className="about-image-container reveal">
              <img
                src="https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512247/Zomba_part3_v3i9y0.png"
                alt="OneHour Challenge training session"
                className="about-image-content"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }}
              />
            </div>

            <div className="about-editorial reveal">
              <div className="section-badge">Why People Choose Us</div>
              <h2 className="section-title">
                Designed for <span>results</span>, but built around real schedules.
              </h2>
              <p className="about-text">
                We keep the model simple: one focused hour, a coach who leads with clarity, and a
                training system that helps members stay consistent instead of restarting every month.
              </p>
              <p className="about-text">
                OneHour Challenge is built for people who want clear guidance, motivating sessions,
                and a routine they can actually sustain. The goal is simple: help members feel
                stronger, healthier, and more confident with every week of training.
              </p>

              <div className="about-editorial-points">
                <div>
                  <span>Focused delivery</span>
                  <strong>Sessions are paced so members can follow without confusion.</strong>
                </div>
                <div>
                  <span>Better accountability</span>
                  <strong>Members stay on track with guided coaching, clear plans, and regular support.</strong>
                </div>
                <div>
                  <span>Supportive community</span>
                  <strong>Every member gets a welcoming fitness space with energy, structure, and encouragement.</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-darker">
        <div className="container">
          <div className="about-principles-shell reveal">
            <div className="section-header" style={{ marginBottom: '0', textAlign: 'left' }}>
              <div className="section-badge">Operating Principles</div>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
                Make fitness feel <span style={{ fontStyle: 'italic' }}>possible</span>.
              </h2>
              <p className="section-subtitle" style={{ maxWidth: '700px', margin: '0' }}>
                We built the platform around one realistic promise: one focused hour can create
                measurable progress when the program, coaching, and routine all work together.
              </p>
            </div>

            <div className="value-cards">
              <div className="value-card">
                <div className="value-card-icon"><FiTarget /></div>
                <div>
                  <div className="value-card-title">Structured Programming</div>
                  <div className="value-card-desc">Every session fits into a clear training system with a purpose.</div>
                </div>
              </div>
              <div className="value-card">
                <div className="value-card-icon"><FiUsers /></div>
                <div>
                  <div className="value-card-title">Personal Attention</div>
                  <div className="value-card-desc">Supportive coaching without making members feel lost in a crowd.</div>
                </div>
              </div>
              <div className="value-card">
                <div className="value-card-icon"><FiAward /></div>
                <div>
                  <div className="value-card-title">Certified Team</div>
                  <div className="value-card-desc">Experienced coaches with a professional, safety-first mindset.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="steps-flow reveal" style={{ marginTop: '38px' }}>
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
          <p className="cta-subtitle">Send your registration and let the OneHour Challenge team help you begin with confidence.</p>
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
