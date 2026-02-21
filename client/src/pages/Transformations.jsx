import { PLACEHOLDERS, getWhatsAppUrl } from '../utils/constants';
import { FaWhatsapp } from 'react-icons/fa';

const transformations = [
  { image: PLACEHOLDERS.transformationImages[0], quote: 'Lost 12 kgs in 4 months. The structured approach and consistency made all the difference. OneHour Challenge changed my life!', name: 'Rajesh Patel' },
  { image: PLACEHOLDERS.transformationImages[1], quote: 'From barely running 1 km to completing a 10K. The progressive programming is what sets this apart from other programs.', name: 'Meera Iyer' },
  { image: PLACEHOLDERS.transformationImages[2], quote: 'Gained 5 kgs of lean muscle in 6 months. The trainers know exactly how to push you while keeping it safe.', name: 'Karthik Nair' },
  { image: PLACEHOLDERS.transformationImages[3], quote: 'My flexibility improved dramatically with yoga sessions. I feel 10 years younger!', name: 'Deepa Sharma' },
  { image: PLACEHOLDERS.transformationImages[4], quote: 'The Zumba sessions are addictive! Lost weight without even realizing it because I was having so much fun.', name: 'Ravi Kumar' },
  { image: PLACEHOLDERS.transformationImages[5], quote: 'As a working mom, the online format is perfect. No commute, just results. Down 2 dress sizes in 3 months!', name: 'Anjali Reddy' },
];

export default function Transformations() {
  return (
    <div className="page-wrapper">
      <section className="section section-darker" style={{ flex: 1 }}>
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Real Results</div>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              Real <span>Transformations</span>
            </h1>
            <p className="section-subtitle">
              Our members don't just lose weight — they transform their lives. Here are their inspiring stories.
            </p>
          </div>

          <div className="transformations-grid">
            {transformations.map((t, i) => (
              <div className="transformation-card reveal" key={i}>
                <div className="transformation-image">
                  <span>{t.image}</span>
                </div>
                <div className="transformation-content">
                  <p className="transformation-quote">"{t.quote}"</p>
                  <p className="transformation-name">{t.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container reveal">
          <h2 className="cta-title">
            Your Transformation is <span style={{ color: 'var(--color-red)' }}>Next</span>
          </h2>
          <p className="cta-subtitle">Join the community that's changing lives, one hour at a time.</p>
          <button 
            className="btn btn-primary btn-lg" 
            onClick={() => window.open(getWhatsAppUrl('I am inspired by the transformations! I want to start my own transformation journey.'), '_blank')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            Start Your Journey <FaWhatsapp />
          </button>
        </div>
      </section>
    </div>
  );
}
