import { FiArrowUpRight, FiCalendar, FiClock, FiStar } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { FREE_SESSION_OPTIONS, getWhatsAppFreeSessionUrl } from '../utils/constants';

export default function FreeSessionShowcase({
  badge = 'Free Trial Sessions',
  title = 'Reserve a',
  highlight = 'free seat',
  subtitle = 'Limited seats are released each week for first-time members who want to experience the coaching style before joining.',
}) {
  return (
    <div className="free-session-showcase reveal">
      <div className="free-session-spotlight">
        <div>
          <div className="section-badge">{badge}</div>
          <h2 className="section-title">
            {title} <span>{highlight}</span>
          </h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>

        <div className="free-session-urgency">
          <span className="free-session-alert">
            <FiStar />
            New
          </span>
          <strong>Limited seats available for free</strong>
          <p>Reserve through WhatsApp before this week&apos;s live slots are filled.</p>
        </div>
      </div>

      <div className="free-sessions-grid">
        {FREE_SESSION_OPTIONS.map((session) => (
          <article
            className={`free-session-card ${session.featured ? 'highlighted' : ''}`}
            key={session.type}
          >
            <div className="free-session-card-head">
              <span className="free-session-tag">Free Session</span>
              {session.isNew ? (
                <span className="free-session-new">
                  <FiStar />
                  New
                </span>
              ) : null}
            </div>

            <h4 className="free-session-card-title">{session.type}</h4>
            <p className="free-session-card-desc">{session.label}</p>
            <p className="free-session-copy">{session.desc}</p>

            <div className="free-session-pulse">
              <span className="free-session-pulse-dot"></span>
              <strong>{session.seats} seats left</strong>
              <span>limited free access this week</span>
            </div>

            <div className="free-session-meta">
              <span>
                <FiCalendar size={14} />
                {session.day}
              </span>
              <span>
                <FiClock size={14} />
                {session.time}
              </span>
            </div>

            <a
              className="free-session-register"
              href={getWhatsAppFreeSessionUrl(session.type)}
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <FaWhatsapp />
                Reserve on WhatsApp
              </span>
              <FiArrowUpRight />
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
