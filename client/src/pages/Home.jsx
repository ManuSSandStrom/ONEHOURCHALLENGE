import {
  FiArrowRight,
  FiArrowUpRight,
  FiCheckCircle,
  FiClock,
  FiMail,
  FiMessageCircle,
  FiPhoneCall,
  FiUsers,
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
  { value: '500+', label: 'Members supported with guided online coaching' },
  { value: '5', label: 'Training formats under one fitness brand' },
  { value: '1:1', label: 'Personal guidance available when needed' },
  { value: '60 min', label: 'Structured sessions built for real schedules' },
];

const enquiryPaths = [
  {
    title: 'Free session enquiry',
    label: 'Best first step',
    description:
      'Try yoga, fitness, or zumba first and understand the coaching style before choosing a full membership.',
    context: {
      sourcePage: 'Home',
      interestType: 'general',
      interestLabel: 'Free Session Enquiry',
    },
  },
  {
    title: 'Membership plan guidance',
    label: 'Most common enquiry',
    description:
      'Get help selecting the right coaching rhythm based on your time, goals, and preferred weekly pace.',
    context: {
      sourcePage: 'Home',
      interestType: 'plan',
      interestLabel: 'Membership Plan Guidance',
    },
  },
  {
    title: '1-on-1 coaching enquiry',
    label: 'Higher support',
    description:
      'Speak to the team if you want a more personal track with closer accountability and direct coach support.',
    context: {
      sourcePage: 'Home',
      interestType: 'program',
      interestLabel: '1-on-1 Coaching Enquiry',
    },
  },
];

const navigationCards = [
  {
    title: 'Programs',
    description: 'Explore yoga, HIIT, zumba, functional training, and 1-on-1 coaching in one place.',
    to: '/programs',
  },
  {
    title: 'Plans',
    description: 'Compare coaching plans and choose the weekly rhythm that fits your routine.',
    to: '/plans',
  },
  {
    title: 'How It Works',
    description: 'See the step-by-step onboarding path from enquiry to your first guided session.',
    to: '/how-it-works',
  },
  {
    title: 'Contact',
    description: 'Use the direct enquiry page when you want email, phone, and form access together.',
    to: '/contact',
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Send your enquiry',
    description:
      'Start through WhatsApp, the enquiry modal, or the contact page depending on how much guidance you need.',
  },
  {
    step: '02',
    title: 'Choose your starting route',
    description:
      'The team helps you begin with a free session, plan guidance, or 1-on-1 coaching based on your goal.',
  },
  {
    step: '03',
    title: 'Join the right schedule',
    description:
      'Pick the session style and weekly training rhythm that you can realistically stay consistent with.',
  },
  {
    step: '04',
    title: 'Build steady momentum',
    description:
      'Keep training with coach support, structured sessions, and a clearer path instead of random workouts.',
  },
];

const membershipPoints = [
  'Free sessions help first-time members experience the coaching style before committing.',
  'Programs and plans stay separate, so visitors understand both the session type and the membership path.',
  'Enquiry buttons are repeated throughout the page, which keeps contact options available without feeling forced.',
  'The structure naturally moves from discovery to trust, then into a direct next step.',
];

const closingContacts = [
  {
    title: 'WhatsApp',
    value: '+91 95150 22680',
    description: 'Quickest way to ask about free sessions, plans, or coach guidance.',
    href: getWhatsAppUrl('Hi OneHour Challenge, I would like to enquire about your coaching options.'),
    icon: <FaWhatsapp />,
  },
  {
    title: 'Email',
    value: ADMIN_EMAIL,
    description: 'Best when you want to share goals, availability, or a more detailed message.',
    href: `mailto:${ADMIN_EMAIL}`,
    icon: <FiMail />,
  },
  {
    title: 'Call',
    value: `+91 ${ADMIN_PHONE}`,
    description: 'Use direct phone support if you already know the type of help you need.',
    href: `tel:+91${ADMIN_PHONE}`,
    icon: <FiPhoneCall />,
  },
];

export default function Home() {
  return (
    <>
      <section className="home-rebuild-hero" id="hero">
        <div className="container">
          <div className="home-rebuild-shell">
            <div className="home-rebuild-copy reveal">
              <span className="home-rebuild-kicker">Structured Online Fitness Coaching</span>
              <h1 className="home-rebuild-title">
                A cleaner path from
                <span> first enquiry to consistent training.</span>
              </h1>
              <p className="home-rebuild-summary">
                OneHour Challenge now leads visitors through a cleaner fitness-focused journey:
                clear entry points, visible enquiry options, guided plan selection, and trust
                built section by section without changing your brand colors or voice.
              </p>

              <div className="home-rebuild-actions">
                <LeadCaptureButton
                  className="btn btn-primary btn-lg"
                  context={{
                    sourcePage: 'Home',
                    interestType: 'general',
                    interestLabel: 'Homepage Primary Enquiry',
                  }}
                >
                  Send Enquiry <FiArrowRight />
                </LeadCaptureButton>
                <Link to="/plans" className="btn btn-secondary btn-lg">
                  Explore Plans <FiArrowUpRight />
                </Link>
              </div>

              <div className="home-rebuild-mini-points">
                <span>
                  <FiCheckCircle />
                  Free session access
                </span>
                <span>
                  <FiCheckCircle />
                  Plan guidance
                </span>
                <span>
                  <FiCheckCircle />
                  WhatsApp follow-up
                </span>
              </div>
            </div>

            <div className="home-rebuild-panel reveal">
              <div className="home-rebuild-panel-top">
                <span className="home-rebuild-panel-badge">Start Here</span>
                <span className="home-rebuild-panel-note">
                  <FiClock />
                  Guided first-step flow
                </span>
              </div>

              <h2>Enquiries now sit at the center of the homepage journey.</h2>
              <p>
                Instead of pushing every visitor into the same CTA, the page now introduces them to
                the right kind of next step first.
              </p>

              <div className="home-rebuild-panel-grid">
                <div>
                  <strong>Free session</strong>
                  <span>For first-time members who want to test the coaching style.</span>
                </div>
                <div>
                  <strong>Plan enquiry</strong>
                  <span>For members comparing weekly training options and support levels.</span>
                </div>
                <div>
                  <strong>Coach guidance</strong>
                  <span>For people who want a more personal structure from the start.</span>
                </div>
              </div>

              <a
                className="home-rebuild-panel-action"
                href={getWhatsAppUrl('Hi OneHour Challenge, I would like to know which training option fits me best.')}
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  <FiMessageCircle />
                  Ask on WhatsApp
                </span>
                <FiArrowRight />
              </a>
            </div>
          </div>

          <div className="home-rebuild-statbar reveal">
            {heroStats.map((stat) => (
              <div className="home-rebuild-stat" key={stat.label}>
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
            <div className="section-badge">Enquiry Routes</div>
            <h2 className="section-title">
              Three clear ways to <span>start the conversation</span>
            </h2>
            <p className="section-subtitle">
              The homepage now introduces focused enquiry paths early, so visitors know whether they
              should ask for a free session, plan guidance, or a more personal coaching option.
            </p>
          </div>

          <div className="home-enquiry-grid reveal">
            {enquiryPaths.map((item) => (
              <article className="home-enquiry-card" key={item.title}>
                <span className="home-enquiry-label">{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <LeadCaptureButton className="btn btn-secondary" context={item.context}>
                  Enquire Now <FiArrowRight />
                </LeadCaptureButton>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-darker home-free-session-wrap">
        <div className="container">
          <FreeSessionShowcase
            title="Use the"
            highlight="free session flow"
            subtitle="This section now sits in a more intentional place: after the main enquiry routes, but before plans and deeper trust content."
          />
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="home-membership-spotlight reveal">
            <div className="home-membership-copy">
              <div className="section-badge">Flow Structure</div>
              <h2 className="section-title">
                The homepage now behaves like a <span>guided training journey</span>
              </h2>
              <p className="section-subtitle">
                The layout now introduces a featured offer first, then a strong plans-and-programs
                section, then quick navigation, trust, and closing contact actions.
              </p>

              <div className="home-membership-points">
                {membershipPoints.map((point) => (
                  <div key={point}>
                    <FiCheckCircle />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="home-membership-card">
              <span className="home-membership-card-kicker">Featured Membership Direction</span>
              <h3>Programs and plans are now framed as the next decision after interest is created.</h3>
              <p>
                That means the page earns attention first, then gives users a stronger reason to
                move into plan comparison, trainer discovery, or direct contact.
              </p>

              <div className="home-membership-meta">
                <div>
                  <strong>Programs</strong>
                  <span>What kind of coaching do I want?</span>
                </div>
                <div>
                  <strong>Plans</strong>
                  <span>How often do I want to train?</span>
                </div>
              </div>

              <Link to="/plans" className="btn btn-primary">
                View Membership Paths <FiArrowUpRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-darker">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Quick Navigation</div>
            <h2 className="section-title">
              Important pages are now surfaced <span>as part of the homepage flow</span>
            </h2>
            <p className="section-subtitle">
              This keeps the home page from becoming a dead-end landing section and turns it into a
              launchpad for the rest of the site.
            </p>
          </div>

          <div className="home-navigation-grid reveal">
            {navigationCards.map((card) => (
              <Link key={card.title} to={card.to} className="home-navigation-card">
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
                <FiArrowRight />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">How It Flows</div>
            <h2 className="section-title">
              A simple four-step structure for <span>new visitors</span>
            </h2>
            <p className="section-subtitle">
              This structure works because it feels guided. Your homepage now follows that same idea
              using your own fitness plans, programs, and enquiry flow.
            </p>
          </div>

          <div className="home-step-grid reveal">
            {processSteps.map((step) => (
              <article className="home-step-card" key={step.step}>
                <span>{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-darker">
        <div className="container">
          <div className="home-trust-layout">
            <div className="reveal">
              <div className="section-badge">Trainer Snapshot</div>
              <h2 className="section-title">
                Coaching trust appears <span>before the final CTA</span>
              </h2>
              <p className="section-subtitle">
                That gives visitors a reason to believe in the offer before they are asked to take
                the final contact step.
              </p>

              <div className="home-team-grid">
                {TRAINERS.map((trainer) => (
                  <article className="home-team-card" key={trainer.name}>
                    <span className="home-team-pill">{trainer.experience}</span>
                    <h3>{trainer.name}</h3>
                    <p>{trainer.specialization}</p>
                    <strong>{trainer.certification}</strong>
                  </article>
                ))}
              </div>
            </div>

            <div className="reveal">
              <div className="section-badge">Member Voices</div>
              <div className="home-voice-grid">
                {REVIEWS.slice(0, 4).map((review) => (
                  <article className="home-voice-card" key={review.name}>
                    <div className="home-voice-head">
                      <div className="home-voice-initial">{review.initial}</div>
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

      <section className="section section-dark">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Final Contact Layer</div>
            <h2 className="section-title">
              The page now closes with <span>direct enquiry access</span>
            </h2>
            <p className="section-subtitle">
              Visitors who reach the bottom do not need to hunt for the next step. They can contact
              the team, open the enquiry modal, or move into the full contact page immediately.
            </p>
          </div>

          <div className="home-contact-grid reveal">
            {closingContacts.map((item) => (
              <a
                className="home-contact-card"
                key={item.title}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
              >
                <div className="home-contact-icon">{item.icon}</div>
                <div>
                  <h3>{item.title}</h3>
                  <strong>{item.value}</strong>
                  <p>{item.description}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="home-close-band reveal">
            <div>
              <span className="home-close-kicker">Ready To Start?</span>
              <h2>Use the new enquiry-led homepage to guide visitors toward the right decision.</h2>
              <p>
                We kept your brand colors, reused your existing enquiry system, and reshaped the
                homepage around your actual fitness offering, plans, and coaching journey.
              </p>
            </div>

            <div className="home-close-actions">
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
