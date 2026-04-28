import { motion as Motion } from 'framer-motion';
import {
  FiArrowRight,
  FiArrowUpRight,
  FiCheckCircle,
  FiClock,
  FiHeart,
  FiMail,
  FiPhoneCall,
  FiPlayCircle,
  FiShield,
  FiStar,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiZap,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import FreeSessionShowcase from '../components/FreeSessionShowcase';
import LeadCaptureButton from '../components/LeadCaptureButton';
import {
  ADMIN_EMAIL,
  ADMIN_PHONE,
  PROGRAMS,
  REVIEWS,
  TRAINERS,
  getWhatsAppUrl,
} from '../utils/constants';

const viewport = { once: true, amount: 0.2 };

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const stats = [
  { value: '500+', label: 'members coached' },
  { value: '60 min', label: 'live guided sessions' },
  { value: '4.8/5', label: 'member rating' },
  { value: '5+', label: 'training formats' },
];

const programs = PROGRAMS;

const steps = [
  {
    title: 'Choose a direction',
    description: 'Pick fitness, yoga, zumba, functional training, or personal coaching.',
  },
  {
    title: 'Try a free session',
    description: 'Experience the trainer, pace, and format before selecting a plan.',
  },
  {
    title: 'Follow a weekly rhythm',
    description: 'Train 3 to 5 days a week with structured one-hour sessions.',
  },
];

const contactCards = [
  {
    title: 'WhatsApp',
    value: '+91 95150 22680',
    description: 'Fastest for trial sessions and plan guidance.',
    href: getWhatsAppUrl('Hi OneHour Challenge, I would like to book a free trial session.'),
    icon: <FaWhatsapp />,
  },
  {
    title: 'Call',
    value: `+91 ${ADMIN_PHONE}`,
    description: 'Speak directly with the team about your goal.',
    href: `tel:+91${ADMIN_PHONE}`,
    icon: <FiPhoneCall />,
  },
  {
    title: 'Email',
    value: ADMIN_EMAIL,
    description: 'Send goals, preferred timing, or longer questions.',
    href: `mailto:${ADMIN_EMAIL}`,
    icon: <FiMail />,
  },
];

function MotionSection({ className, children }) {
  return (
    <Motion.section
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {children}
    </Motion.section>
  );
}

export default function Home() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="container">
          <Motion.div
            className="home-hero-grid"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <Motion.div className="home-hero-copy" variants={fadeUp}>
              <span className="section-badge">Live Online Fitness Coaching</span>
              <h1 className="home-title">
                One focused hour to build a <span>stronger</span>, healthier routine.
              </h1>
              <p className="home-summary">
                Join live coach-led sessions for fitness, yoga, zumba, HIIT, and personal training.
                Start with a free trial, choose a plan, and train from anywhere with clear guidance.
              </p>

              <div className="hero-actions">
                <a
                  className="btn btn-primary btn-lg"
                  href={getWhatsAppUrl('I would like to book a free session for OneHour Challenge.')}
                  target="_blank"
                  rel="noreferrer"
                >
                  Book Free Trial <FiArrowRight />
                </a>
                <Link to="/programs" className="btn btn-secondary btn-lg">
                  Explore Programs <FiArrowUpRight />
                </Link>
              </div>

              <div className="trust-row">
                <span><FiCheckCircle /> Certified trainers</span>
                <span><FiCheckCircle /> Beginner friendly</span>
                <span><FiCheckCircle /> Online across India</span>
              </div>
            </Motion.div>

            <Motion.aside className="hero-panel" variants={fadeUp}>
              <div className="hero-panel-top">
                <span>Today&apos;s Focus</span>
                <strong>Simple, guided, consistent.</strong>
              </div>
              <div className="hero-schedule-list">
                <div>
                  <FiClock />
                  <span>Morning and evening live batches</span>
                </div>
                <div>
                  <FiUsers />
                  <span>Small-group energy with trainer attention</span>
                </div>
                <div>
                  <FiShield />
                  <span>Safe progressions for every fitness level</span>
                </div>
              </div>
              <a
                href={getWhatsAppUrl('I would like to know more about OneHour Challenge.')}
                target="_blank"
                rel="noreferrer"
                className="hero-whatsapp-link"
              >
                <FaWhatsapp /> Talk on WhatsApp
              </a>
            </Motion.aside>
          </Motion.div>

          <Motion.div
            className="metric-grid"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {stats.map((stat) => (
              <Motion.div className="metric-card" key={stat.label} variants={fadeUp}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </Motion.div>
            ))}
          </Motion.div>
        </div>
      </section>

      <MotionSection className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Programs</div>
            <h2 className="section-title">Choose the training style that fits your goal.</h2>
            <p className="section-subtitle">
              Every program is built around one-hour guided sessions, practical pacing, and a clear
              weekly rhythm.
            </p>
          </div>

          <Motion.div
            className="program-summary-grid"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {programs.map((program) => (
                <Motion.article
                  className="program-summary-card program-image-card"
                  key={program.name}
                  variants={fadeUp}
                  style={{ '--program-image': `url(${program.image})` }}
                >
                  <div className="program-image-card-content">
                    <h3>{program.name}</h3>
                    <p>{program.label}</p>
                    <ul className="program-image-features">
                      {program.features.slice(0, 3).map((feature) => <li key={feature}>{feature}</li>)}
                    </ul>
                  </div>
                  <LeadCaptureButton
                    className="text-link"
                    context={{
                      sourcePage: 'Home',
                      interestType: 'program',
                      interestLabel: program.name,
                    }}
                  >
                    Enquire now <FiArrowRight />
                  </LeadCaptureButton>
                </Motion.article>
              ))}
          </Motion.div>
        </div>
      </MotionSection>

      <MotionSection className="section section-muted">
        <div className="container">
          <div className="split-section">
            <div>
              <div className="section-badge">How It Works</div>
              <h2 className="section-title">A simple journey from first trial to weekly progress.</h2>
              <p className="section-subtitle">
                No complicated checkout or confusing content. Share your details, speak with the
                team, and start the session format that suits you.
              </p>
              <div className="hero-actions">
                <Link to="/how-it-works" className="btn btn-primary">
                  View Process <FiArrowRight />
                </Link>
                <Link to="/plans" className="btn btn-secondary">
                  Compare Plans
                </Link>
              </div>
            </div>

            <div className="step-stack">
              {steps.map((step, index) => (
                <article className="step-card" key={step.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section">
        <div className="container">
          <FreeSessionShowcase
            badge="Free Trial"
            title="Reserve a"
            highlight="starter session"
            subtitle="Try the coaching style before joining. Pick the session type and reserve your seat through WhatsApp."
          />
        </div>
      </MotionSection>

      <MotionSection className="section section-muted">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Trust</div>
            <h2 className="section-title">Professional coaching with visible support.</h2>
            <p className="section-subtitle">
              Members stay consistent when the trainer, schedule, and support system are easy to trust.
            </p>
          </div>

          <div className="proof-grid">
            <div className="reviews-grid">
              {REVIEWS.slice(0, 2).map((review) => (
                <article className="review-card" key={review.name}>
                  <div className="review-head">
                    <div className="avatar">{review.initial}</div>
                    <div>
                      <h3>{review.name}</h3>
                      <span><FiStar /> {review.rating}.0 review</span>
                    </div>
                  </div>
                  <p>{review.text}</p>
                </article>
              ))}
            </div>

            <div className="trainer-list">
              {TRAINERS.map((trainer) => (
                <article className="trainer-mini-card" key={trainer.name}>
                  <span>{trainer.experience}</span>
                  <h3>{trainer.name}</h3>
                  <p>{trainer.specialization}</p>
                  <strong>{trainer.certification}</strong>
                </article>
              ))}
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section">
        <div className="container">
          <div className="contact-strip">
            <div>
              <div className="section-badge">Start Today</div>
              <h2>Ready to choose your first session?</h2>
              <p>
                Send your details and the team will help you choose a program, batch timing, and
                plan that fits your week.
              </p>
            </div>
            <LeadCaptureButton
              className="btn btn-primary btn-lg"
              context={{
                sourcePage: 'Home',
                interestType: 'general',
                interestLabel: 'Homepage Closing Enquiry',
              }}
            >
              Send Details <FiTrendingUp />
            </LeadCaptureButton>
          </div>

          <div className="home-contact-grid">
            {contactCards.map((item) => (
              <a
                className="home-contact-card"
                key={item.title}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
              >
                <div className="card-icon">{item.icon}</div>
                <div>
                  <h3>{item.title}</h3>
                  <strong>{item.value}</strong>
                  <p>{item.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </MotionSection>
    </div>
  );
}
