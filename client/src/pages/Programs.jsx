import { FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getWhatsAppUrl } from '../utils/constants';

export default function Programs() {
  return (
    <div className="page-wrapper">
      {/* ============ PROGRAMS HERO ============ */}
      <section className="section section-darker" style={{ flex: 0 }}>
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">What We Offer</div>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              Our <span>Programs</span>
            </h1>
            <p className="section-subtitle">
              Expert-led live sessions designed for every fitness goal. Choose what moves you.
            </p>
          </div>

          <div className="bento-grid reveal">
            <div className="bento-card bento-large" onClick={() => window.location.href = '/pricing'}>
              <div className="bento-card-bg">
                <img src="https://res.cloudinary.com/dt37ji5yp/image/upload/v1771782797/Gemini_Generated_Image_s8xw7ls8xw7ls8xw_1_z96yp5.png" alt="1-on-1 Training" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="bento-card-overlay"></div>
              <div className="bento-card-content">
                <h3 className="bento-card-title">1-on-1 Training</h3>
                <span className="bento-card-arrow"><FiArrowRight /></span>
              </div>
            </div>

            <div className="bento-card bento-small" onClick={() => window.location.href = '/pricing'}>
              <div className="bento-card-bg">
                <img src="https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512247/Zomba_Training_kws7pi.png" alt="Zumba" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="bento-card-overlay"></div>
              <div className="bento-card-content">
                <h3 className="bento-card-title">Zumba</h3>
                <span className="bento-card-arrow"><FiArrowRight /></span>
              </div>
            </div>

            <div className="bento-card bento-small" onClick={() => window.location.href = '/pricing'}>
              <div className="bento-card-bg">
                <img src="https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512244/yoga_part4_mnslxd.png" alt="Yoga" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="bento-card-overlay"></div>
              <div className="bento-card-content">
                <h3 className="bento-card-title">Yoga</h3>
                <span className="bento-card-arrow"><FiArrowRight /></span>
              </div>
            </div>
          </div>

          <div className="bento-row-2 reveal">
            <div className="bento-card bento-half" onClick={() => window.location.href = '/pricing'}>
              <div className="bento-card-bg">
                <img src="https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512241/Strength_part2_tzrm1t.png" alt="HIIT" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="bento-card-overlay"></div>
              <div className="bento-card-content">
                <h3 className="bento-card-title">HIIT</h3>
                <span className="bento-card-arrow"><FiArrowRight /></span>
              </div>
            </div>

            <div className="bento-card bento-half" onClick={() => window.location.href = '/pricing'}>
              <div className="bento-card-bg">
                <img src="https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512241/ST_2_xhbjg9.png" alt="Functional Training" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="bento-card-overlay"></div>
              <div className="bento-card-content">
                <h3 className="bento-card-title">Functional Training</h3>
                <span className="bento-card-arrow"><FiArrowRight /></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ZUMBA SHOWCASE ============ */}
      <section className="section section-darker">
        <div className="container">
          <div className="section-header reveal">
            <h2 className="section-title">Rhythm & Energy: <span style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>Zumba</span></h2>
          </div>
          <div className="marquee-wrapper reveal">
            <div className="marquee-track">
              {[...Array(3)].map((_, setIndex) => (
                [
                  "https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512246/Zomba_part4_a0ompc.png",
                  "https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512247/Zomba_Training_kws7pi.png",
                  "https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512245/Zomba_part1_rsiqd7.png",
                  "https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512246/zomba_part2_qunqm2.png"
                ].map((img, i) => (
                  <img src={img} alt={`Zumba ${i + 1}`} className="marquee-img" key={`zumba-${setIndex}-${i}`} />
                ))
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ YOGA SHOWCASE ============ */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-header reveal">
            <h2 className="section-title">Balance & Mindfulness: <span style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>Yoga</span></h2>
          </div>
          <div className="marquee-wrapper reveal">
            <div className="marquee-track">
              {[...Array(3)].map((_, setIndex) => (
                [
                  "https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512245/Yoga_part3_b8rhhu.png",
                  "https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512244/yoga_part2_yjfmly.png",
                  "https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512245/yoga_part5_ilnuip.png",
                  "https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512244/yoga_part1_gogtxx.png"
                ].map((img, i) => (
                  <img src={img} alt={`Yoga ${i + 1}`} className="marquee-img" key={`yoga-${setIndex}-${i}`} />
                ))
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ STRENGTH SHOWCASE ============ */}
      <section className="section section-darker">
        <div className="container">
          <div className="section-header reveal">
            <h2 className="section-title">Power & Resilience: <span style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>Strength</span></h2>
          </div>
          <div className="marquee-wrapper reveal">
            <div className="marquee-track">
              {[...Array(3)].map((_, setIndex) => (
                [
                  "https://res.cloudinary.com/dt37ji5yp/image/upload/v1771518559/Gemini_Generated_Image_fr6lltfr6lltfr6l_ttscww.png",
                  "https://res.cloudinary.com/dt37ji5yp/image/upload/v1771518467/Gemini_Generated_Image_z1aftjz1aftjz1af_bp6slu.png",
                  "https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512244/ST_4_xhlxzv.png",
                  "https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512241/Strength_part2_tzrm1t.png",
                  "https://res.cloudinary.com/dt37ji5yp/image/upload/v1771512241/Strength_Training_image_ab7ro0.png"
                ].map((img, i) => (
                  <img src={img} alt={`Strength ${i + 1}`} className="marquee-img" key={`strength-${setIndex}-${i}`} />
                ))
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container reveal">
          <h2 className="cta-title">
            Find Your <span style={{ color: 'var(--color-primary)' }}>Program</span>
          </h2>
          <p className="cta-subtitle">Choose a plan and start training with certified coaches today.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/pricing" className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              View Pricing <FiArrowRight />
            </Link>
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => window.open(getWhatsAppUrl('I am interested in your fitness programs!'), '_blank')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <FaWhatsapp /> Ask on WhatsApp
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
