import { Link } from 'react-router-dom';
import { FiInstagram, FiYoutube, FiMail } from 'react-icons/fi';

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
              Structured online fitness sessions designed for sustainable progress and a smooth member experience.
            </p>
          </div>

          <div>
            <h4 className="footer-title">Programs</h4>
            <Link to="/programs" className="footer-link">Fitness</Link>
            <Link to="/programs" className="footer-link">Zumba</Link>
            <Link to="/programs" className="footer-link">Yoga</Link>
          </div>

          <div>
            <h4 className="footer-title">Company</h4>
            <Link to="/about" className="footer-link">About Us</Link>
            <Link to="/transformations" className="footer-link">Transformations</Link>
            <Link to="/plans" className="footer-link">Plans</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
            <Link to="/admin" className="footer-link">Admin Portal</Link>
          </div>

          <div>
            <h4 className="footer-title">Contact</h4>
            <a href="mailto:manoharbasappagari18@gmail.com" className="footer-link">
              manoharbasappagari18@gmail.com
            </a>
            <span className="footer-link">+91 95150 22680</span>
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
