import { FiAward, FiBriefcase, FiTrendingUp, FiUser, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import LeadCaptureButton from '../components/LeadCaptureButton';

const pillars = [
  {
    icon: <FiAward size={40} style={{ color: 'var(--color-primary)' }} />,
    title: 'Global Certifications',
    desc: 'Coaches trained through respected certification pathways and practical client work.',
  },
  {
    icon: <FiBriefcase size={40} style={{ color: 'var(--color-primary)' }} />,
    title: 'Real Coaching Experience',
    desc: 'A team built around consistency, safety, and sustainable transformation.',
  },
  {
    icon: <FiTrendingUp size={40} style={{ color: 'var(--color-primary)' }} />,
    title: 'Evidence-Led Planning',
    desc: 'Programs are shaped around progression, accountability, and measurable progress.',
  },
];

export default function Trainers() {
  return (
    <div className="page-wrapper">
      <PageHero
        badge="Coaching Team"
        title="Professional coaching for"
        highlight="real progress"
        description="Train with a coordinated support system that blends fitness coaching, nutrition guidance, and practical accountability."
      />

      <section className="section section-darker">
        <div className="container">
          <div className="team-trio reveal">
            <div className="team-trio-member">
              <img
                src="https://res.cloudinary.com/dt37ji5yp/image/upload/v1771523022/WhatsApp_Image_2026-02-19_at_11.08.12_PM_swbslb.jpg"
                alt="Trainer certification"
                className="cert-frame"
                loading="lazy"
                style={{ transform: 'rotate(-4deg)', marginRight: '20px' }}
              />
            </div>

            <div className="team-trio-member">
              <div className="team-trio-circle trainer-circle" style={{ padding: 0, overflow: 'hidden', boxShadow: '0 8px 24px rgba(229, 57, 53, 0.25)', border: '2px solid rgba(229,57,53,0.5)' }}>
                <img
                  src="https://res.cloudinary.com/dt37ji5yp/image/upload/v1771520525/Gemini_Generated_Image_jx53w4jx53w4jx53_xu2ysc.png"
                  alt="Personal trainer"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="team-trio-label">YOUR TRAINER</div>
            </div>

            <div className="team-trio-plus">+</div>

            <div className="team-trio-member">
              <div className="team-trio-circle nutritionist-circle" style={{ padding: 0, overflow: 'hidden', boxShadow: '0 8px 24px rgba(76, 175, 80, 0.25)', border: '2px solid rgba(76, 175, 80, 0.5)' }}>
                <img
                  src="https://res.cloudinary.com/dt37ji5yp/image/upload/v1771520606/Gemini_Generated_Image_dwwqw8dwwqw8dwwq_ytwuql.png"
                  alt="Nutrition coach"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="team-trio-label">YOUR NUTRITIONIST</div>
            </div>

            <div className="team-trio-plus">+</div>

            <div className="team-trio-member">
              <div className="team-trio-circle you-circle">
                <FiUser size={40} />
              </div>
              <div className="team-trio-label">YOU</div>
            </div>

            <div className="team-trio-member">
              <img
                src="https://res.cloudinary.com/dt37ji5yp/image/upload/v1771523022/WhatsApp_Image_2026-02-19_at_11.08.13_PM_i4c9ap.jpg"
                alt="Nutrition certification"
                className="cert-frame"
                loading="lazy"
                style={{ transform: 'rotate(4deg)', marginLeft: '20px' }}
              />
            </div>
          </div>

          <p className="reveal" style={{ textAlign: 'center', color: 'var(--color-gray-500)', fontSize: '1rem', marginTop: '40px', maxWidth: '620px', marginLeft: 'auto', marginRight: 'auto', lineHeight: '1.7' }}>
            Your support system is built around coaching clarity, professional guidance, and plans that fit your real routine.
          </p>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Why Our Team Works</div>
            <h2 className="section-title">Meet Your <span>Coaches</span></h2>
            <p className="section-subtitle">A polished coaching setup designed to keep your training consistent and easy to follow.</p>
          </div>

          <div className="trainers-grid reveal">
            {pillars.map((item) => (
              <div className="trainer-card" key={item.title} style={{ textAlign: 'center', padding: '50px 30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                <div className="expertise-icon-wrapper" style={{ padding: '20px', background: 'rgba(0, 109, 60, 0.05)', borderRadius: '20px', marginBottom: '10px' }}>
                  {item.icon}
                </div>
                <h4 className="trainer-name" style={{ margin: 0 }}>{item.title}</h4>
                <p className="trainer-cert" style={{ margin: 0, opacity: 0.8 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-darker">
        <div className="container">
          <div className="trainers-admin-access reveal">
            <div>
              <div className="section-badge">Internal Access</div>
              <h3>Authorized admin entry</h3>
              <p>This login is intentionally kept off the public navigation. Use it only for internal website operations.</p>
            </div>
            <Link to="/admin" className="btn btn-secondary trainers-admin-link" style={{ textDecoration: 'none' }}>
              Open Admin Portal <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container reveal">
          <h2 className="cta-title">
            Train with the <span style={{ color: 'var(--color-primary)' }}>right team</span>
          </h2>
          <p className="cta-subtitle">Register your interest and let the team guide you toward the right coaching path.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/plans" className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              Find Your Team <FiArrowRight />
            </Link>
            <LeadCaptureButton
              className="btn btn-secondary btn-lg"
              context={{ sourcePage: 'Trainers', interestType: 'team', interestLabel: 'Trainer Team Registration' }}
              label="Register Now"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
