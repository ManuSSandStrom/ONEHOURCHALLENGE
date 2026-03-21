import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import LeadCaptureButton from '../components/LeadCaptureButton';

const programs = [
  {
    title: '1-on-1 Training',
    image: 'https://res.cloudinary.com/dt37ji5yp/image/upload/v1771782797/Gemini_Generated_Image_s8xw7ls8xw7ls8xw_1_z96yp5.png',
    points: ['Dedicated coach support', 'Clear progression', 'Focused accountability'],
  },
  {
    title: 'Zumba',
    image: 'https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512247/Zomba_Training_kws7pi.png',
    points: ['High-energy cardio', 'Fun guided sessions', 'Group motivation'],
  },
  {
    title: 'Yoga',
    image: 'https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512244/yoga_part4_mnslxd.png',
    points: ['Flexibility work', 'Mobility support', 'Mind-body balance'],
  },
  {
    title: 'HIIT',
    image: 'https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512241/Strength_part2_tzrm1t.png',
    points: ['Efficient fat burn', 'Conditioning focus', 'Fast-paced coaching'],
  },
  {
    title: 'Functional Training',
    image: 'https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512241/ST_2_xhbjg9.png',
    points: ['Strength for daily life', 'Better movement', 'Joint-friendly programming'],
  },
];

export default function Programs() {
  return (
    <div className="page-wrapper">
      <PageHero
        badge="Programs"
        title="Professional coaching for"
        highlight="every goal"
        description="Choose from guided formats built for fat loss, strength, mobility, stamina, and long-term consistency."
      />

      <section className="section section-darker">
        <div className="container">
          <div className="programs-detail-grid reveal" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {programs.map((program) => (
              <div className="program-detail-card" key={program.title}>
                <div className="about-image-container" style={{ aspectRatio: '16/11', marginBottom: '20px' }}>
                  <img
                    src={program.image}
                    alt={program.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
                  />
                </div>
                <h3>{program.title}</h3>
                <ul className="program-points">
                  {program.points.map((point) => (
                    <li key={point}><FiCheckCircle /> {point}</li>
                  ))}
                </ul>
                <LeadCaptureButton
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: '16px' }}
                  context={{ sourcePage: 'Programs', interestType: 'program', interestLabel: program.title }}
                  label="Register Now"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container reveal">
          <h2 className="cta-title">
            Find Your <span style={{ color: 'var(--color-primary)' }}>Program</span>
          </h2>
          <p className="cta-subtitle">Each registration is tagged by program so your admin portal gets cleaner leads.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/plans" className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              View Plans <FiArrowRight />
            </Link>
            <LeadCaptureButton
              className="btn btn-secondary btn-lg"
              context={{ sourcePage: 'Programs', interestType: 'general', interestLabel: 'Programs Page Registration' }}
              label="Register Now"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
