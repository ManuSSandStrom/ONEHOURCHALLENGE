import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiInstagram, FiMail, FiYoutube } from 'react-icons/fi';
import { getWhatsAppUrl } from '../utils/constants';

const footerLinks = {
  Programs: [
    { label: 'Fitness', to: '/programs' },
    { label: 'Yoga', to: '/programs' },
    { label: 'Zumba', to: '/programs' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Transformations', to: '/transformations' },
    { label: 'Plans', to: '/plans' },
    { label: 'Contact', to: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-cta-band reveal">
          <div>
            <span className="footer-kicker">OneHour Challenge</span>
            <h2>Professional online coaching with a more engaging digital experience.</h2>
            <p>
              Smooth motion, clearer actions, and stronger page flow now support the same trusted
              green brand identity.
            </p>
          </div>

          <div className="footer-cta-actions">
            <Link to="/plans" className="btn btn-primary">
              View Plans <FiArrowUpRight />
            </Link>
            <a
              href={getWhatsAppUrl('Hi OneHour Challenge, I would like to book a free session.')}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
            >
              WhatsApp Us <FiArrowUpRight />
            </a>
          </div>
        </div>

        <div className="footer-grid">
          <div>
            <div className="footer-brand-name">
              <img
                src="https://res.cloudinary.com/dt37ji5yp/image/upload/v1771514832/Onehour_2__page-0001_zy1elu.jpg"
                alt="OneHour Challenge"
                className="footer-brand-img"
              />
              ONEHOUR <span>CHALLENGE</span>
            </div>
            <p className="footer-brand-desc">
              Structured online fitness sessions designed for sustainable progress, visible energy,
              and a smoother member journey.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="footer-title">{title}</h4>
              {links.map((link) => (
                <Link key={link.label} to={link.to} className="footer-link">
                  {link.label}
                </Link>
              ))}
            </div>
          ))}

          <div>
            <h4 className="footer-title">Contact</h4>
            <a href="mailto:manoharbasappagari18@gmail.com" className="footer-link">
              manoharbasappagari18@gmail.com
            </a>
            <span className="footer-link">+91 95150 22680</span>
            <span className="footer-contact-note">Open for online coaching enquiries across India.</span>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            Copyright {new Date().getFullYear()} OneHour Challenge. All rights reserved.
          </p>
          <div className="footer-socials">
            <a href="#" className="footer-social" aria-label="Instagram">
              <FiInstagram />
            </a>
            <a href="#" className="footer-social" aria-label="YouTube">
              <FiYoutube />
            </a>
            <a href="mailto:manoharbasappagari18@gmail.com" className="footer-social" aria-label="Email">
              <FiMail />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
