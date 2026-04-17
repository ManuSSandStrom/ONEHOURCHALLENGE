import { motion as Motion } from 'framer-motion';
import {
  FiArrowRight,
  FiArrowUpRight,
  FiBarChart2,
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
  FREE_SESSION_OPTIONS,
  REVIEWS,
  TRAINERS,
  getWhatsAppUrl,
} from '../utils/constants';

const viewport = { once: true, amount: 0.22 };

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

const heroMetrics = [
  { value: '500+', label: 'active members building routines with live guided coaching' },
  { value: '4.8/5', label: 'member sentiment driven by clarity, energy, and trainer support' },
  { value: '3-5x', label: 'weekly plan rhythm depending on how fast members want momentum' },
  { value: '<60 sec', label: 'time it takes to send an enquiry from the homepage' },
];

const featureCards = [
  {
    title: 'Gym-Style Fitness',
    description: 'Build fat-loss momentum, stamina, and full-body strength with live coach guidance.',
    bullets: ['High-energy structure', 'Clear progression', 'Beginner-friendly pacing'],
    icon: FiZap,
    to: '/programs',
    tone: 'emerald',
  },
  {
    title: 'Yoga and Mobility',
    description: 'Create flexibility, posture support, and calmer body awareness that fits busy schedules.',
    bullets: ['Recovery-led flow', 'Stress support', 'Mobility gains'],
    icon: FiHeart,
    to: '/programs',
    tone: 'sky',
  },
  {
    title: 'Zumba and Cardio',
    description: 'Keep motivation high through movement that feels energetic, social, and easier to stick with.',
    bullets: ['Cardio burn', 'Group energy', 'Consistency through fun'],
    icon: FiPlayCircle,
    to: '/programs',
    tone: 'sun',
  },
  {
    title: '1-on-1 Coaching',
    description: 'Choose a more focused path when you want higher accountability and closer expert support.',
    bullets: ['Personalized guidance', 'Measured progress', 'Premium support'],
    icon: FiTarget,
    to: '/plans',
    tone: 'slate',
  },
];

const promisePillars = [
  {
    title: 'Premium first impression',
    description: 'The homepage now feels like a real product, not a brochure. Visitors understand the offer fast.',
    icon: FiShield,
  },
  {
    title: 'Lower-friction conversion',
    description: 'Clear primary actions, trust signals, and repeated CTA moments help enquiries happen sooner.',
    icon: FiTrendingUp,
  },
  {
    title: 'Coach-led credibility',
    description: 'Programs, structure, and social proof work together so the brand feels more trustworthy.',
    icon: FiUsers,
  },
];

const journeySteps = [
  {
    step: '01',
    title: 'Choose your format',
    description: 'Compare fitness, yoga, zumba, and coaching paths without getting lost in clutter.',
  },
  {
    step: '02',
    title: 'Test a free session',
    description: 'First-time visitors can try the experience before committing to a weekly rhythm.',
  },
  {
    step: '03',
    title: 'Send your enquiry',
    description: 'The lead form stays lightweight so the team gets the details needed for quick follow-up.',
  },
  {
    step: '04',
    title: 'Build consistency',
    description: 'Members move into coach-led routines designed for progress people can actually maintain.',
  },
];

const navigationCards = [
  {
    title: 'Programs',
    description: 'See every format and understand which training style fits your goal fastest.',
    to: '/programs',
  },
  {
    title: 'Plans',
    description: 'Compare balanced versus intensive coaching paths and choose the right weekly rhythm.',
    to: '/plans',
  },
  {
    title: 'Trainers',
    description: 'Meet the coaches behind the sessions and the expertise guiding the experience.',
    to: '/trainers',
  },
  {
    title: 'Contact',
    description: 'Use direct phone, WhatsApp, email, or the contact form when you want tailored guidance.',
    to: '/contact',
  },
];

const contactCards = [
  {
    title: 'WhatsApp',
    value: '+91 95150 22680',
    description: 'Fastest for free-session requests, plan comparisons, and quick coaching questions.',
    href: getWhatsAppUrl('Hi OneHour Challenge, I would like help choosing the best program for me.'),
    icon: <FaWhatsapp />,
  },
  {
    title: 'Email',
    value: ADMIN_EMAIL,
    description: 'Best when you want to share goals, preferred schedule, or a longer enquiry.',
    href: `mailto:${ADMIN_EMAIL}`,
    icon: <FiMail />,
  },
  {
    title: 'Call',
    value: `+91 ${ADMIN_PHONE}`,
    description: 'Use direct support if you already know the kind of guidance you need.',
    href: `tel:+91${ADMIN_PHONE}`,
    icon: <FiPhoneCall />,
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
    <div className="home-premium-page">
      <section className="home-premium-hero" id="hero">
        <Motion.div
          className="home-premium-orb home-premium-orb-one"
          animate={{ x: [0, 18, 0], y: [0, -14, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <Motion.div
          className="home-premium-orb home-premium-orb-two"
          animate={{ x: [0, -20, 0], y: [0, 16, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <Motion.div
          className="home-premium-orb home-premium-orb-three"
          animate={{ x: [0, 12, 0], y: [0, 14, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="container">
          <Motion.div
            className="home-premium-hero-grid"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <Motion.div className="home-premium-hero-copy" variants={fadeUp}>
              <span className="home-premium-kicker">Live Online Coaching That Feels Premium</span>
              <h1 className="home-premium-title">
                Build a stronger body and a calmer routine through one
                <span> conversion-focused fitness experience.</span>
              </h1>
              <p className="home-premium-summary">
                OneHour Challenge combines gym-style fitness, yoga, zumba, HIIT, and
                accountability-first coaching into a cleaner journey from first click to first
                session. The homepage is built to sell trust, reduce friction, and help more
                visitors turn curiosity into an enquiry.
              </p>

              <div className="home-premium-actions">
                <LeadCaptureButton
                  className="btn btn-primary btn-lg"
                  context={{
                    sourcePage: 'Home',
                    interestType: 'general',
                    interestLabel: 'Homepage Hero Enquiry',
                  }}
                >
                  Start Your Enquiry <FiArrowRight />
                </LeadCaptureButton>

                <a
                  href={getWhatsAppUrl('Hi OneHour Challenge, I want to book a free trial session.')}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary btn-lg"
                >
                  Book Free Session <FiArrowUpRight />
                </a>
              </div>

              <div className="home-premium-trust-pills">
                <span><FiCheckCircle /> Free session options</span>
                <span><FiCheckCircle /> Coach-led live sessions</span>
                <span><FiCheckCircle /> Mobile-first enquiry flow</span>
              </div>

              <div className="home-premium-proof-strip">
                <div className="home-premium-proof-badge">
                  <FiStar />
                  <span>Trusted by busy professionals across India</span>
                </div>
                <p>
                  Structured one-hour sessions, stronger CTA visibility, and a smoother path into
                  plans, programs, and direct support.
                </p>
              </div>
            </Motion.div>

            <Motion.div className="home-premium-hero-stack" variants={fadeUp}>
              <div className="home-premium-surface home-premium-surface-primary">
                <div className="home-premium-surface-head">
                  <span className="home-premium-chip">Conversion Snapshot</span>
                  <span className="home-premium-surface-note">
                    <FiBarChart2 />
                    High-intent homepage flow
                  </span>
                </div>

                <div className="home-premium-surface-grid">
                  <div className="home-premium-surface-stat">
                    <strong>5+</strong>
                    <span>training formats covering strength, cardio, recovery, and mobility</span>
                  </div>
                  <div className="home-premium-surface-stat">
                    <strong>60 min</strong>
                    <span>session length designed to feel serious but realistic for working schedules</span>
                  </div>
                  <div className="home-premium-surface-stat">
                    <strong>3-5x</strong>
                    <span>weekly plan options depending on the pace members want to maintain</span>
                  </div>
                  <div className="home-premium-surface-stat">
                    <strong>Direct</strong>
                    <span>WhatsApp, email, and form-driven follow-up instead of confusing checkout steps</span>
                  </div>
                </div>
              </div>

              <div className="home-premium-surface home-premium-live-board">
                <div className="home-premium-surface-head">
                  <div>
                    <span className="home-premium-chip home-premium-chip-accent">This Week&apos;s Free Slots</span>
                    <h2>Lead with a trial, then convert with clarity.</h2>
                  </div>
                  <div className="home-premium-live-pill">
                    <FiClock />
                    Limited seats
                  </div>
                </div>

                <div className="home-premium-live-list">
                  {FREE_SESSION_OPTIONS.map((session) => (
                    <a
                      key={session.type}
                      href={getWhatsAppUrl(`Hi OneHour Challenge, I want to reserve a ${session.type} free session.`)}
                      target="_blank"
                      rel="noreferrer"
                      className="home-premium-live-card"
                    >
                      <div>
                        <strong>{session.type}</strong>
                        <p>{session.label}</p>
                      </div>
                      <div className="home-premium-live-meta">
                        <span>{session.day}</span>
                        <span>{session.time}</span>
                        <span>{session.seats} seats left</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </Motion.div>
          </Motion.div>

          <Motion.div
            className="home-premium-metric-grid"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {heroMetrics.map((metric) => (
              <Motion.div className="home-premium-metric-card" key={metric.label} variants={fadeUp}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </Motion.div>
            ))}
          </Motion.div>
        </div>
      </section>

      <MotionSection className="section section-dark">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Program Highlights</div>
            <h2 className="section-title">
              A homepage designed to help visitors <span>choose faster and trust sooner</span>
            </h2>
            <p className="section-subtitle">
              Each training path now feels more distinct, more premium, and easier to compare at a
              glance, which makes plan discovery and lead capture feel much more intentional.
            </p>
          </div>

          <Motion.div
            className="home-premium-program-grid"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {featureCards.map((card) => {
              const Icon = card.icon;

              return (
                <Motion.article
                  key={card.title}
                  className={`home-premium-program-card tone-${card.tone}`}
                  variants={fadeUp}
                  whileHover={{ y: -10, scale: 1.01 }}
                >
                  <div className="home-premium-program-head">
                    <div className="home-premium-program-icon">
                      <Icon />
                    </div>
                    <Link to={card.to} className="home-premium-inline-link">
                      Explore <FiArrowUpRight />
                    </Link>
                  </div>

                  <h3>{card.title}</h3>
                  <p>{card.description}</p>

                  <div className="home-premium-bullet-list">
                    {card.bullets.map((bullet) => (
                      <span key={bullet}>{bullet}</span>
                    ))}
                  </div>

                  <LeadCaptureButton
                    className="btn btn-secondary"
                    style={{ marginTop: 'auto' }}
                    context={{
                      sourcePage: 'Home',
                      interestType: 'program',
                      interestLabel: `Homepage ${card.title}`,
                    }}
                    label="Enquire Now"
                  />
                </Motion.article>
              );
            })}
          </Motion.div>
        </div>
      </MotionSection>

      <MotionSection className="section section-darker">
        <div className="container">
          <div className="home-premium-story-layout">
            <div className="home-premium-story-copy">
              <div className="section-badge">Why This Converts Better</div>
              <h2 className="section-title">
                Premium trust signals, repeated CTAs, and a clearer journey toward
                <span> real conversion momentum</span>
              </h2>
              <p className="section-subtitle">
                The new home layout keeps the page visually premium without losing the actual business
                objective: more enquiries, stronger trust, and easier next steps for first-time
                visitors.
              </p>

              <div className="home-premium-promise-list">
                {promisePillars.map((pillar) => {
                  const Icon = pillar.icon;

                  return (
                    <article className="home-premium-promise-card" key={pillar.title}>
                      <div className="home-premium-promise-icon">
                        <Icon />
                      </div>
                      <div>
                        <h3>{pillar.title}</h3>
                        <p>{pillar.description}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="home-premium-journey-panel">
              <span className="home-premium-panel-kicker">Member Journey</span>
              <div className="home-premium-step-grid">
                {journeySteps.map((step) => (
                  <article className="home-premium-step-card" key={step.step}>
                    <span>{step.step}</span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section section-dark home-premium-free-shell">
        <div className="container">
          <FreeSessionShowcase
            badge="Conversion Booster"
            title="Use the"
            highlight="free-session hook"
            subtitle="Visitors who are not ready to commit can still move forward, which keeps the homepage helpful instead of high-pressure."
          />
        </div>
      </MotionSection>

      <MotionSection className="section section-darker">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Proof and Trust</div>
            <h2 className="section-title">
              The homepage now sells the brand through <span>people, outcomes, and confidence</span>
            </h2>
            <p className="section-subtitle">
              Instead of relying only on generic claims, the page now shows the trainer layer and
              member sentiment where visitors naturally look for reassurance.
            </p>
          </div>

          <div className="home-premium-proof-layout">
            <Motion.div
              className="home-premium-review-grid"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              {REVIEWS.slice(0, 4).map((review) => (
                <Motion.article className="home-premium-review-card" key={review.name} variants={fadeUp}>
                  <div className="home-premium-review-head">
                    <div className="home-premium-review-initial">{review.initial}</div>
                    <div>
                      <h3>{review.name}</h3>
                      <span>{review.date}</span>
                    </div>
                  </div>
                  <p>{review.text}</p>
                </Motion.article>
              ))}
            </Motion.div>

            <Motion.div
              className="home-premium-team-grid"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              {TRAINERS.map((trainer) => (
                <Motion.article className="home-premium-team-card" key={trainer.name} variants={fadeUp}>
                  <span className="home-premium-team-chip">{trainer.experience}</span>
                  <h3>{trainer.name}</h3>
                  <p>{trainer.specialization}</p>
                  <strong>{trainer.certification}</strong>
                </Motion.article>
              ))}
            </Motion.div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section section-dark">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Fast Navigation</div>
            <h2 className="section-title">
              Visitors can move into the <span>right decision page faster</span>
            </h2>
            <p className="section-subtitle">
              A stronger home page should not trap people in place. It should route them quickly to
              plans, programs, trainers, or direct contact depending on intent.
            </p>
          </div>

          <Motion.div
            className="home-premium-link-grid"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {navigationCards.map((item) => (
              <Motion.div key={item.title} variants={fadeUp}>
                <Link to={item.to} className="home-premium-link-card">
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <FiArrowRight />
                </Link>
              </Motion.div>
            ))}
          </Motion.div>

          <div className="home-premium-contact-grid">
            {contactCards.map((item) => (
              <a
                className="home-premium-contact-card"
                key={item.title}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
              >
                <div className="home-premium-contact-icon">{item.icon}</div>
                <div>
                  <h3>{item.title}</h3>
                  <strong>{item.value}</strong>
                  <p>{item.description}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="home-premium-close-band">
            <div>
              <span className="home-premium-kicker">Ready to convert intent into action?</span>
              <h2>Give visitors one premium path into coaching, plans, and direct team follow-up.</h2>
              <p>
                The redesigned homepage keeps the experience cleaner, calmer, and more persuasive
                without removing the simple enquiry-first model that already fits this business.
              </p>
            </div>

            <div className="home-premium-close-actions">
              <LeadCaptureButton
                className="btn btn-primary btn-lg"
                context={{
                  sourcePage: 'Home',
                  interestType: 'general',
                  interestLabel: 'Homepage Closing Enquiry',
                }}
              >
                Send Your Details <FiArrowRight />
              </LeadCaptureButton>
              <Link to="/plans" className="btn btn-secondary btn-lg">
                Compare Plans <FiArrowUpRight />
              </Link>
            </div>
          </div>
        </div>
      </MotionSection>

      <div className="home-premium-desktop-cta">
        <div className="home-premium-desktop-cta-inner">
          <div className="home-premium-desktop-cta-copy">
            <span>Limited free-session slots this week</span>
            <strong>Talk to the team and get the right program faster.</strong>
          </div>
          <div className="home-premium-desktop-cta-actions">
            <LeadCaptureButton
              className="btn btn-primary"
              context={{
                sourcePage: 'Home',
                interestType: 'general',
                interestLabel: 'Sticky Desktop CTA',
              }}
              label="Start Enquiry"
            />
            <a
              href={getWhatsAppUrl('Hi OneHour Challenge, I want to book a free session.')}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="mobile-sticky-cta home-premium-mobile-cta">
        <div className="home-premium-mobile-cta-copy">
          <span>Free-session slots are limited this week.</span>
        </div>
        <LeadCaptureButton
          className="btn btn-primary"
          context={{
            sourcePage: 'Home',
            interestType: 'general',
            interestLabel: 'Sticky Mobile CTA',
          }}
          label="Start Your Enquiry"
        />
      </div>
    </div>
  );
}
