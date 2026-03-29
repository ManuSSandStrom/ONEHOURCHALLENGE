import {
  FiArrowRight,
  FiArrowUpRight,
  FiCheckCircle,
  FiClock,
  FiHeart,
  FiMail,
  FiMessageCircle,
  FiPhoneCall,
  FiPlayCircle,
  FiTarget,
  FiZap,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import FreeSessionShowcase from '../components/FreeSessionShowcase';
import LeadCaptureButton from '../components/LeadCaptureButton';
import {
  ADMIN_EMAIL,
  ADMIN_PHONE,
  REVIEWS,
  TRAINERS,
  getWhatsAppUrl,
} from '../utils/constants';

const heroStats = [
  { value: '5+', label: 'live formats across fitness, yoga, zumba, HIIT, and functional training' },
  { value: '60 min', label: 'guided sessions designed to fit real work and family schedules' },
  { value: '1:1', label: 'coach attention available for people who want closer support' },
  { value: 'Free Start', label: 'simple trial flow for first-time visitors who want to test the experience' },
];

const programHighlights = [
  {
    title: 'Gym-Style Fitness',
    description:
      'Coach-led sessions built for fat loss, stamina, and full-body strength without making beginners feel lost.',
    icon: FiZap,
    points: ['Strength focus', 'Cardio support', 'High-energy coaching'],
    to: '/programs',
  },
  {
    title: 'Yoga',
    description:
      'A calmer training path for flexibility, posture, mobility, and a more balanced body-and-mind routine.',
    icon: FiHeart,
    points: ['Mobility work', 'Breath-led flow', 'Recovery support'],
    to: '/programs',
  },
  {
    title: 'Zumba',
    description:
      'Fun, rhythmic sessions that keep motivation high while giving members a strong cardio outlet.',
    icon: FiPlayCircle,
    points: ['Dance cardio', 'Group energy', 'Consistency through fun'],
    to: '/programs',
  },
  {
    title: '1-on-1 Coaching',
    description:
      'A more personal route for members who want structured accountability and closer trainer guidance.',
    icon: FiTarget,
    points: ['Personal support', 'Clear progression', 'Focused accountability'],
    to: '/plans',
  },
];

const experiencePoints = [
  {
    title: 'Easy to begin',
    description:
      'Visitors can start with a free session, ask on WhatsApp, or go straight to plans without confusion.',
  },
  {
    title: 'Professional feel',
    description:
      'The site now guides people through training options in a cleaner, more premium way that matches a serious fitness brand.',
  },
  {
    title: 'Built for real routines',
    description:
      'Everything is framed around one-hour sessions, practical schedules, and programs people can actually stick to.',
  },
];

const visitorFlow = [
  {
    step: '01',
    title: 'Pick your style',
    description: 'Start with fitness, yoga, zumba, or a more personal 1-on-1 coaching route.',
  },
  {
    step: '02',
    title: 'Try a free session',
    description: 'Experience the coaching energy first so the decision feels easier and more confident.',
  },
  {
    step: '03',
    title: 'Choose your plan',
    description: 'Select the weekly rhythm that fits your availability, goals, and preferred pace.',
  },
  {
    step: '04',
    title: 'Stay consistent',
    description: 'Train with structure, regular sessions, and support that helps momentum keep building.',
  },
];

const quickLinks = [
  {
    title: 'Programs',
    description: 'See every training format and compare which coaching style suits your goal best.',
    to: '/programs',
  },
  {
    title: 'Plans',
    description: 'Compare coaching rhythm options for a lighter routine or a more committed schedule.',
    to: '/plans',
  },
  {
    title: 'Trainers',
    description: 'Meet the coaches behind the sessions and understand the expertise guiding the brand.',
    to: '/trainers',
  },
  {
    title: 'Contact',
    description: 'Use the direct enquiry page when you want email, call, and form support together.',
    to: '/contact',
  },
];

const closingContacts = [
  {
    title: 'WhatsApp',
    value: '+91 95150 22680',
    description: 'Quickest way to ask about free sessions, plans, or the right training format for you.',
    href: getWhatsAppUrl('Hi OneHour Challenge, I want to know which program fits me best.'),
    icon: <FaWhatsapp />,
  },
  {
    title: 'Email',
    value: ADMIN_EMAIL,
    description: 'Best when you want to share your goals, preferred timings, or a more detailed enquiry.',
    href: `mailto:${ADMIN_EMAIL}`,
    icon: <FiMail />,
  },
  {
    title: 'Call',
    value: `+91 ${ADMIN_PHONE}`,
    description: 'Use direct phone support if you already know the kind of guidance you need.',
    href: `tel:+91${ADMIN_PHONE}`,
    icon: <FiPhoneCall />,
  },
];

export default function Home() {
  return (
    <>
      <section className="fitness-home-hero" id="hero">
        <div className="container">
          <div className="fitness-hero-layout">
            <div className="fitness-hero-copy reveal">
              <span className="fitness-home-kicker">Live Online Fitness Coaching</span>
              <h1 className="fitness-home-title">
                Stronger fitness, calmer yoga, and high-energy zumba in one
                <span> smooth training journey.</span>
              </h1>
              <p className="fitness-home-summary">
                OneHour Challenge brings together gym-style fitness, yoga, zumba, HIIT, and
                functional coaching with a cleaner path from first visit to first session. The
                experience is built to feel clear, motivating, and easy to trust on every device.
              </p>

              <div className="fitness-home-actions">
                <LeadCaptureButton
                  className="btn btn-primary btn-lg"
                  context={{
                    sourcePage: 'Home',
                    interestType: 'general',
                    interestLabel: 'Homepage Primary Enquiry',
                  }}
                >
                  Start Your Enquiry <FiArrowRight />
                </LeadCaptureButton>
                <Link to="/programs" className="btn btn-secondary btn-lg">
                  Explore Programs <FiArrowUpRight />
                </Link>
              </div>

              <div className="fitness-home-mini-points">
                <span>
                  <FiCheckCircle />
                  Free trial access
                </span>
                <span>
                  <FiCheckCircle />
                  Coach guidance
                </span>
                <span>
                  <FiCheckCircle />
                  Mobile-friendly booking
                </span>
              </div>
            </div>

            <div className="fitness-hero-panel reveal">
              <div className="fitness-hero-panel-head">
                <span className="fitness-hero-panel-badge">Member Favorites</span>
                <span className="fitness-hero-panel-note">
                  <FiClock />
                  1-hour guided sessions
                </span>
              </div>

              <div className="fitness-hero-panel-grid">
                {programHighlights.slice(0, 3).map((item) => {
                  const Icon = item.icon;

                  return (
                    <article className="fitness-hero-surface" key={item.title}>
                      <div className="fitness-hero-surface-icon">
                        <Icon />
                      </div>
                      <div>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="fitness-hero-panel-footer">
                <div>
                  <strong>Free session, plan support, and direct WhatsApp follow-up</strong>
                  <p>Everything visitors need to move from interest to action without friction.</p>
                </div>
                <a
                  className="fitness-hero-panel-action"
                  href={getWhatsAppUrl('Hi OneHour Challenge, I would like help choosing between fitness, yoga, and zumba.')}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FiMessageCircle />
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="fitness-home-statbar reveal">
            {heroStats.map((stat) => (
              <div className="fitness-home-stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Training Styles</div>
            <h2 className="section-title">
              Built to attract people who want <span>movement that fits their mood and goal</span>
            </h2>
            <p className="section-subtitle">
              The homepage now gives each major training style a stronger presence so visitors can
              immediately see what makes fitness, yoga, zumba, and personal coaching different.
            </p>
          </div>

          <div className="fitness-program-grid reveal">
            {programHighlights.map((program) => {
              const Icon = program.icon;

              return (
                <article className="fitness-program-card" key={program.title}>
                  <div className="fitness-program-card-top">
                    <div className="fitness-program-icon">
                      <Icon />
                    </div>
                    <Link to={program.to} className="fitness-inline-link">
                      View more <FiArrowUpRight />
                    </Link>
                  </div>

                  <h3>{program.title}</h3>
                  <p>{program.description}</p>

                  <div className="fitness-program-points">
                    {program.points.map((point) => (
                      <span key={point}>{point}</span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-darker home-free-session-wrap">
        <div className="container">
          <FreeSessionShowcase
            title="Try the"
            highlight="free session flow"
            subtitle="Visitors can test the coaching style first, which makes the site feel more welcoming for people who are still deciding between fitness, yoga, and zumba."
          />
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="fitness-experience-grid">
            <div className="fitness-experience-copy reveal">
              <div className="section-badge">Why It Works</div>
              <h2 className="section-title">
                A more professional homepage that still feels <span>friendly and easy to use</span>
              </h2>
              <p className="section-subtitle">
                The flow now feels intentional: it introduces the training styles, supports the
                decision with a free session, and keeps enquiry actions visible without making the
                page feel crowded.
              </p>

              <div className="fitness-experience-points">
                {experiencePoints.map((item) => (
                  <article className="fitness-experience-point" key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="fitness-flow-panel reveal">
              <span className="fitness-flow-kicker">New Visitor Flow</span>
              <div className="fitness-flow-grid">
                {visitorFlow.map((item) => (
                  <article className="fitness-flow-card" key={item.step}>
                    <span>{item.step}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-darker">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Quick Access</div>
            <h2 className="section-title">
              The homepage now pushes people toward the <span>right page faster</span>
            </h2>
            <p className="section-subtitle">
              Instead of feeling like a dead-end landing section, home now acts like a clean launch
              point into programs, plans, trainers, and direct contact.
            </p>
          </div>

          <div className="fitness-link-grid reveal">
            {quickLinks.map((link) => (
              <Link key={link.title} to={link.to} className="fitness-link-card">
                <div>
                  <h3>{link.title}</h3>
                  <p>{link.description}</p>
                </div>
                <FiArrowRight />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="fitness-trust-layout">
            <div className="reveal">
              <div className="section-badge">Coaches</div>
              <h2 className="section-title">
                Trainer trust appears early so the brand feels <span>more credible</span>
              </h2>
              <p className="section-subtitle">
                Visitors can quickly understand that they are not just joining classes. They are
                joining guided sessions led by coaches with defined strengths.
              </p>

              <div className="fitness-trainer-grid">
                {TRAINERS.map((trainer) => (
                  <article className="fitness-trainer-card" key={trainer.name}>
                    <span className="fitness-trainer-chip">{trainer.experience}</span>
                    <h3>{trainer.name}</h3>
                    <p>{trainer.specialization}</p>
                    <strong>{trainer.certification}</strong>
                  </article>
                ))}
              </div>
            </div>

            <div className="reveal">
              <div className="section-badge">Member Voices</div>
              <div className="fitness-review-grid">
                {REVIEWS.map((review) => (
                  <article className="fitness-review-card" key={review.name}>
                    <div className="fitness-review-head">
                      <div className="fitness-review-initial">{review.initial}</div>
                      <div>
                        <h3>{review.name}</h3>
                        <span>{review.date}</span>
                      </div>
                    </div>
                    <p>{review.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-darker">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Contact Options</div>
            <h2 className="section-title">
              Clear next steps for people who are ready to <span>start or ask first</span>
            </h2>
            <p className="section-subtitle">
              The last section keeps WhatsApp, email, and direct calling easy to find so visitors
              always have a clear way to move forward.
            </p>
          </div>

          <div className="fitness-contact-grid reveal">
            {closingContacts.map((item) => (
              <a
                className="fitness-contact-card"
                key={item.title}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
              >
                <div className="fitness-contact-icon">{item.icon}</div>
                <div>
                  <h3>{item.title}</h3>
                  <strong>{item.value}</strong>
                  <p>{item.description}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="fitness-close-band reveal">
            <div>
              <span className="fitness-home-kicker">Ready to move?</span>
              <h2>Turn interest into action with a cleaner path to fitness, yoga, and zumba.</h2>
              <p>
                The homepage now feels more premium, more user-friendly, and more focused on the
                actual coaching experience visitors are coming to see.
              </p>
            </div>

            <div className="fitness-close-actions">
              <LeadCaptureButton
                className="btn btn-primary btn-lg"
                context={{
                  sourcePage: 'Home',
                  interestType: 'general',
                  interestLabel: 'Homepage Closing Enquiry',
                }}
              >
                Send Details <FiArrowRight />
              </LeadCaptureButton>
              <Link to="/contact" className="btn btn-secondary btn-lg">
                Open Contact Page <FiArrowUpRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
