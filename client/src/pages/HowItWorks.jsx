import { FiClock, FiCheckCircle, FiShield, FiTrendingUp, FiUsers, FiAward } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { getWhatsAppUrl } from '../utils/constants';

const programs = [
  {
    id: 'fitness',
    title: 'Fitness Program',
    icon: '💪',
    desc: 'Designed for weight loss, stamina building, and lean muscle gain.',
    points: [
      'Fat-burning strength circuits',
      'Functional bodyweight training',
      'Core strengthening',
      'Metabolic conditioning',
      'Lifestyle guidance'
    ]
  },
  {
    id: 'muscle',
    title: 'Muscle Building',
    icon: '🏋️‍♂️',
    desc: 'For individuals looking to gain healthy weight and increase muscle mass.',
    points: [
      'Progressive resistance training',
      'Hypertrophy-focused workouts',
      'Mobility and recovery integration',
      'Nutrition guidance support',
      'Structured progression tracking'
    ]
  },
  {
    id: 'posture',
    title: 'Posture & Mobility',
    icon: '🧍',
    desc: 'Correct rounded shoulders, back pain, and joint stiffness.',
    points: [
      'Postural assessment',
      'Corrective exercises',
      'Mobility drills',
      'Core stability work',
      'Injury prevention'
    ]
  }
];

const yogaZumba = [
  {
    title: 'Yoga & Flexibility',
    icon: '🧘',
    desc: 'Improve flexibility, balance, and mental clarity through guided flow.',
    points: ['Increased flexibility', 'Stress reduction', 'Better breathing control', 'Improved awareness']
  },
  {
    title: 'Zumba & Cardio Dance',
    icon: '💃',
    desc: 'High-energy, fun-based cardio sessions to burn calories.',
    points: ['Fat burn', 'Rhythm & coordination', 'Cardiovascular health', 'Full body movement']
  }
];

export default function HowItWorks() {
  return (
    <div className="page-wrapper" style={{ paddingTop: '100px' }}>
      <section className="section">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">How It Works</div>
            <h1 className="section-title">
              Our <span>Programs</span> & Sessions
            </h1>
            <p className="section-subtitle">
              At OneHour Challenge, our programs are designed for real people with real goals. 
              Whether you want to lose fat, gain muscle, or move better — our structured sessions deliver.
            </p>
          </div>

          <div className="how-it-works-grid">
            {/* Session Structure */}
            <div className="session-structure-card reveal">
              <h2 className="card-title-lg">How Our Sessions Work</h2>
              <p className="card-desc">Each session is structured and professionally designed to maximize results in 60 minutes.</p>
              
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h4>10 Minutes – Mobility & Warm-Up</h4>
                    <p>Preparing your joints and nervous system for the workout ahead.</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot" style={{ background: 'var(--color-red)' }}></div>
                  <div className="timeline-content">
                    <h4>40 Minutes – Main Workout</h4>
                    <p>Fitness, Yoga, or Zumba — focused, high-intensity programming.</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h4>10 Minutes – Cool Down & Recovery</h4>
                    <p>Stretching and mindfulness to kickstart the recovery process.</p>
                  </div>
                </div>
              </div>
              
              <div className="session-note">
                <FiCheckCircle style={{ color: 'var(--color-red)' }} />
                <span>Sessions are scalable for beginners and advanced participants.</span>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="why-choose-us reveal">
              <h3 className="section-subtitle" style={{ textAlign: 'left', marginBottom: '24px' }}>Why Choose OneHour Challenge?</h3>
              <div className="benefits-list">
                <div className="benefit-item">
                  <FiAward className="benefit-icon" />
                  <div>
                    <h4>Certified Trainers</h4>
                    <p>Expert guidance from licensed professionals.</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <FiTrendingUp className="benefit-icon" />
                  <div>
                    <h4>Structured Programming</h4>
                    <p>No random workouts. Every session has a purpose.</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <FiShield className="benefit-icon" />
                  <div>
                    <h4>Safe & Progressive</h4>
                    <p>We prioritize form and safety above all else.</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <FiUsers className="benefit-icon" />
                  <div>
                    <h4>Community Sessions</h4>
                    <p>Train with a supportive online community.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Program Details */}
          <div className="programs-detail-section reveal" style={{ marginTop: '80px' }}>
            <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '40px' }}>Our Core <span>Specializations</span></h2>
            
            <div className="programs-detail-grid">
              {programs.map((p, i) => (
                <div className="program-detail-card" key={i}>
                  <div className="program-icon-wrap">{p.icon}</div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <ul className="program-points">
                    {p.points.map((pt, idx) => (
                      <li key={idx}><FiCheckCircle /> {pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="programs-secondary-grid" style={{ marginTop: '40px' }}>
              {yogaZumba.map((p, i) => (
                <div className="program-detail-card horizontal" key={i}>
                  <div className="program-icon-wrap">{p.icon}</div>
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <div className="program-tags">
                      {p.points.map((pt, idx) => (
                        <span key={idx} className="program-tag">{pt}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="how-cta reveal" style={{ marginTop: '80px', textAlign: 'center' }}>
            <h2 className="cta-title">Ready to Start Your <span>Transformation</span>?</h2>
            <p className="cta-subtitle">Book your free session today and see the difference.</p>
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => window.open(getWhatsAppUrl('Hi! I want to book a free session and start my fitness journey.'), '_blank')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              Book Free Session <FaWhatsapp />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
