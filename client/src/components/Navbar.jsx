import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActive = (path) => {
    if (path === '/plans') {
      return location.pathname === '/plans' || location.pathname === '/pricing';
    }
    return location.pathname === path;
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="container">
          <Link to="/" className="navbar-logo">
            <img
              src="https://res.cloudinary.com/dt37ji5yp/image/upload/v1771514832/Onehour_2__page-0001_zy1elu.jpg"
              alt="OneHour Challenge"
              className="navbar-logo-img"
            />
            <span className="navbar-logo-text">
              <strong>ONEHOUR</strong>
              <span>CHALLENGE</span>
            </span>
          </Link>

          <div className="navbar-links">
            <Link to="/" className={`navbar-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
            <Link to="/about" className={`navbar-link ${isActive('/about') ? 'active' : ''}`}>About</Link>
            <Link to="/programs" className={`navbar-link ${isActive('/programs') ? 'active' : ''}`}>Programs</Link>
            <Link to="/how-it-works" className={`navbar-link ${isActive('/how-it-works') ? 'active' : ''}`}>How It Works</Link>
            <Link to="/plans" className={`navbar-link ${isActive('/plans') ? 'active' : ''}`}>Plans</Link>
            <Link to="/transformations" className={`navbar-link ${isActive('/transformations') ? 'active' : ''}`}>Transformations</Link>
            <Link to="/trainers" className={`navbar-link ${isActive('/trainers') ? 'active' : ''}`}>Trainers</Link>
            <Link to="/contact" className={`navbar-link ${isActive('/contact') ? 'active' : ''}`}>Contact</Link>
          </div>

          <div className="navbar-actions">
            <Link to="/plans" className="btn btn-sm btn-primary" style={{ textDecoration: 'none' }}>Join Now</Link>
            <button
              className="mobile-menu-btn"
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <FiMenu />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-nav-backdrop ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(false)}>
        <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
          <div className="mobile-nav-header">
            <div className="navbar-logo">
              <img
                src="https://res.cloudinary.com/dt37ji5yp/image/upload/v1771514832/Onehour_2__page-0001_zy1elu.jpg"
                alt="OneHour Challenge"
                className="navbar-logo-img"
              />
              <span className="navbar-logo-text">
                <strong>ONEHOUR</strong>
                <span>CHALLENGE</span>
              </span>
            </div>
            <button
              className="mobile-nav-close"
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              <FiX size={24} />
            </button>
          </div>

          <div className="mobile-nav-body">
            <Link to="/" className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
            <Link to="/about" className={`mobile-nav-link ${isActive('/about') ? 'active' : ''}`}>About</Link>
            <Link to="/programs" className={`mobile-nav-link ${isActive('/programs') ? 'active' : ''}`}>Programs</Link>
            <Link to="/how-it-works" className={`mobile-nav-link ${isActive('/how-it-works') ? 'active' : ''}`}>How It Works</Link>
            <Link to="/plans" className={`mobile-nav-link ${isActive('/plans') ? 'active' : ''}`}>Plans</Link>
            <Link to="/transformations" className={`mobile-nav-link ${isActive('/transformations') ? 'active' : ''}`}>Transformations</Link>
            <Link to="/trainers" className={`mobile-nav-link ${isActive('/trainers') ? 'active' : ''}`}>Trainers</Link>
            <Link to="/contact" className={`mobile-nav-link ${isActive('/contact') ? 'active' : ''}`}>Contact</Link>
            <Link to="/plans" className="btn btn-primary btn-lg mobile-nav-cta" style={{ textDecoration: 'none', textAlign: 'center' }}>
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
