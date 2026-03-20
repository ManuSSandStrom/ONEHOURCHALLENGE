import { FiCheckCircle, FiShield, FiTrendingUp, FiUsers, FiAward } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { getWhatsAppFreeSessionUrl } from '../utils/constants';
import PageHero from '../components/PageHero';
import LeadCaptureButton from '../components/LeadCaptureButton';

const programs = [
  {
    title: 'Fitness Program',
    desc: 'Designed for weight loss, stamina building, and lean muscle gain.',
    points: ['Fat-burning circuits', 'Core strengthening', 'Lifestyle guidance'],
  },
  {
    title: 'Muscle Building',
    desc: 'For members looking to gain healthy weight and build strength progressively.',
    points: ['Resistance training', 'Recovery integration', 'Structured progression'],
  },
  {
    title: 'Posture and Mobility',
    desc: 'Correct stiffness, movement restrictions, and posture-related discomfort.',
    points: ['Corrective exercises', 'Mobility drills', 'Injury prevention'],
  },
];

const secondaryPrograms = [
  {
    title: 'Yoga and Flexibility',
    desc: 'Improve flexibility, balance, breathing, and mental clarity.',
    points: ['Better flexibility', 'Stress reduction', 'Improved body awareness'],
  },
  {
    title: 'Zumba and Cardio Dance',
    desc: 'Fun, high-energy cardio sessions that make consistency easier.',
    points: ['Fat burn', 'Cardiovascular health', 'Full-body movement'],
  },
];

export default function HowItWorks() {
  return (
    <div className="page-wrapper page-how-it-works">
      <PageHero
        badge="How It Works"
        eyebrow="From first click to steady training"
        title="A simple system with"
        highlight="real structure"
        description="Each session follows a clear format so members can train confidently, safely, and consistently."
        metrics={[
          { value: '3', label: 'Core Session Phases' },
          { value: '60 min', label: 'Guided Format' },
          { value: '5+', label: 'Training Specializations' },
        ]}
      />

      <section className="section">
        <div className="container">
          <div className="process-strip reveal">
            <div className="process-strip-item">
              <span>01</span>
              <strong>Choose your training direction</strong>
              <p>Programs and plans are separated into their own pages so members can decide with clarity.</p>
            </div>
            <div className="process-strip-item">
              <span>02</span>
              <strong>Send a clean registration</strong>
              <p>Leads move directly into the secure workspace with source tagging and better internal visibility.</p>
            </div>
            <div className="process-strip-item">
              <span>03</span>
              <strong>Start with guided consistency</strong>
              <p>The coaching model is built around repeatable one-hour sessions instead of random workouts.</p>
            </div>
          </div>

          <div className="how-it-works-grid">
            <div className="session-structure-card reveal">
              <h2 className="card-title-lg">How Our Sessions Work</h2>
              <p className="card-desc">Each 60-minute class is built to feel focused and easy to follow.</p>

              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h4>10 Minutes - Mobility and Warm-Up</h4>
                    <p>Prepare the body properly before intensity increases.</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot" style={{ background: 'var(--color-primary)' }}></div>
                  <div className="timeline-content">
                    <h4>40 Minutes - Main Workout</h4>
                    <p>Focused programming for strength, fitness, yoga, or zumba.</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h4>10 Minutes - Cool Down and Recovery</h4>
                    <p>Finish with recovery work that supports long-term consistency.</p>
                  </div>
                </div>
              </div>

              <div className="session-note">
                <FiCheckCircle style={{ color: 'var(--color-primary)' }} />
                <span>Sessions are scalable for beginners and experienced members.</span>
              </div>
            </div>

            <div className="why-choose-us reveal">
              <h3 className="section-subtitle" style={{ textAlign: 'left', marginBottom: '24px' }}>Why members stay consistent</h3>
              <div className="benefits-list">
                <div className="benefit-item">
                  <FiAward className="benefit-icon" />
                  <div>
                    <h4>Certified Trainers</h4>
                    <p>Guidance from coaches who keep form and progression in focus.</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <FiTrendingUp className="benefit-icon" />
                  <div>
                    <h4>Structured Programming</h4>
                    <p>Every session has a clear purpose instead of random intensity.</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <FiShield className="benefit-icon" />
                  <div>
                    <h4>Safe and Progressive</h4>
                    <p>Programs are designed to challenge members without overwhelming them.</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <FiUsers className="benefit-icon" />
                  <div>
                    <h4>Community Sessions</h4>
                    <p>Train in a motivating environment that still feels personal.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="programs-detail-section reveal" style={{ marginTop: '80px' }}>
            <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '40px' }}>Our Core <span>Specializations</span></h2>

            <div className="programs-detail-grid">
              {programs.map((program) => (
                <div className="program-detail-card" key={program.title}>
                  <h3>{program.title}</h3>
                  <p>{program.desc}</p>
                  <ul className="program-points">
                    {program.points.map((point) => (
                      <li key={point}><FiCheckCircle /> {point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="programs-secondary-grid" style={{ marginTop: '40px' }}>
              {secondaryPrograms.map((program) => (
                <div className="program-detail-card horizontal" key={program.title}>
                  <div>
                    <h3>{program.title}</h3>
                    <p>{program.desc}</p>
                    <div className="program-tags">
                      {program.points.map((point) => (
                        <span key={point} className="program-tag">{point}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="how-cta reveal" style={{ marginTop: '80px', textAlign: 'center' }}>
            <h2 className="cta-title">Ready to Start Your <span>Transformation</span>?</h2>
            <p className="cta-subtitle">Register your interest or book a free session on WhatsApp.</p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <LeadCaptureButton
                className="btn btn-primary btn-lg"
                context={{ sourcePage: 'How It Works', interestType: 'general', interestLabel: 'How It Works Registration' }}
                label="Register Now"
              />
              <a className="btn btn-secondary btn-lg" href={getWhatsAppFreeSessionUrl('Fitness')} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                <FaWhatsapp /> Book Free Session
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
