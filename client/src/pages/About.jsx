import { FiTarget, FiUsers, FiAward } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { getWhatsAppUrl } from '../utils/constants';

export default function About() {
  return (
    <div className="page-wrapper">
      {/* ============ ABOUT HERO ============ */}
      <section className="section section-dark" style={{ flex: 1 }}>
        <div className="container">
          <div className="about-grid">
            <div className="about-image-container reveal">
              <img
                src="https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512247/Zomba_part3_v3i9y0.png"
                alt="About OneHour Challenge"
                className="about-image-content"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }}
              />
            </div>

            <div className="about-content reveal">
              <div className="section-badge">About Us</div>
              <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                Built for <span>Discipline</span>.<br />Designed for <span>Results</span>.
              </h1>
              <p className="about-text">
                OneHour Challenge is a structured online fitness platform offering 1-hour live group
                sessions designed for real, sustainable results. We believe in consistency over intensity
                and structured programming over random workouts.
              </p>

              <div className="value-cards">
                <div className="value-card">
                  <div className="value-card-icon"><FiTarget /></div>
                  <div>
                    <div className="value-card-title">Structured Programming</div>
                    <div className="value-card-desc">Progressive plans tailored for real results</div>
                  </div>
                </div>
                <div className="value-card">
                  <div className="value-card-icon"><FiUsers /></div>
                  <div>
                    <div className="value-card-title">Limited Group Size</div>
                    <div className="value-card-desc">Personalized attention in every session</div>
                  </div>
                </div>
                <div className="value-card">
                  <div className="value-card-icon"><FiAward /></div>
                  <div>
                    <div className="value-card-title">Certified Trainers</div>
                    <div className="value-card-desc">Experienced & internationally certified</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MISSION & VALUES ============ */}
      <section className="section section-darker">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Our Mission</div>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
              Making fitness <span style={{ fontStyle: 'italic' }}>accessible</span> to everyone.
            </h2>
            <p className="section-subtitle" style={{ maxWidth: '700px' }}>
              We started with a simple idea: dedicate just one hour a day to your health. No fancy equipment,
              no gym memberships — just you, your trainer, and your commitment.
            </p>
          </div>

          <div className="steps-flow reveal">
            {[
              { num: '500+', title: 'Active Members', desc: 'Professionals from across India transforming their lives daily.' },
              { num: '15+', title: 'Certified Trainers', desc: 'ACE, ISSA, and Yoga Alliance certified coaches at your service.' },
              { num: '4.8★', title: 'Google Rating', desc: 'Rated by real members for real results and genuine impact.' },
              { num: '5+', title: 'Programs', desc: 'Yoga, Zumba, HIIT, Strength, and Functional Training available.' },
            ].map((stat, i) => (
              <div className="step-card" key={i}>
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

      {/* CTA */}
      <section className="cta-section">
        <div className="container reveal">
          <h2 className="cta-title">
            Ready to <span style={{ color: 'var(--color-primary)' }}>Start</span>?
          </h2>
          <p className="cta-subtitle">Join the community that's changing lives, one hour at a time.</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => window.open(getWhatsAppUrl('I want to learn more about OneHour Challenge!'), '_blank')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            Talk to Us <FaWhatsapp />
          </button>
        </div>
      </section>
    </div>
  );
}
