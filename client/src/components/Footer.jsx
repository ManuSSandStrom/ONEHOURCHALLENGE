import { Link } from 'react-router-dom';
import { FiInstagram, FiYoutube, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
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
              Structured online fitness platform offering 1-hour live group sessions 
              designed for real, sustainable results.
            </p>
          </div>

          <div>
            <h4 className="footer-title">Programs</h4>
            <a href="/#programs" className="footer-link">Strength Training</a>
            <a href="/#programs" className="footer-link">Zumba</a>
            <a href="/#programs" className="footer-link">Yoga</a>
          </div>

          <div>
            <h4 className="footer-title">Company</h4>
            <a href="/#about" className="footer-link">About Us</a>
            <Link to="/transformations" className="footer-link">Transformations</Link>
            <a href="/#pricing" className="footer-link">Pricing</a>
            <Link to="/contact" className="footer-link">Contact</Link>
          </div>

          <div>
            <h4 className="footer-title">Contact</h4>
            <a href="mailto:manoharbasappagari18@gmail.com" className="footer-link">
              manoharbasappagari18@gmail.com
            </a>
            <a href="https://wa.me/919515022680" className="footer-link" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaWhatsapp style={{ color: '#25D366' }} /> +91 95150 22680
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} OneHour Challenge. All rights reserved.
          </p>
          <div className="footer-socials">
            <a href="https://wa.me/919515022680" className="footer-social" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp />
            </a>
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
