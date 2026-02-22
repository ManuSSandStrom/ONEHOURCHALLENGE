import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser, SignInButton } from '@clerk/clerk-react';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Clerk hooks — safe even if ClerkProvider is not wrapping (fallback gracefully)
  let user = null;
  let isSignedIn = false;
  try {
    const clerkUser = useUser();
    user = clerkUser.user;
    isSignedIn = clerkUser.isSignedIn;
  } catch {
    // Clerk not available (no provider)
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
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
              ONEHOUR <span>CHALLENGE</span>
            </span>
          </Link>

          <div className="navbar-links">
            <button className="navbar-link" onClick={() => scrollToSection('about')}>About</button>
            <button className="navbar-link" onClick={() => scrollToSection('programs')}>Programs</button>
            <Link to="/how-it-works" className="navbar-link">How It Works</Link>
            <button className="navbar-link" onClick={() => scrollToSection('pricing')}>Pricing</button>
            <Link to="/transformations" className="navbar-link">Transformations</Link>
            <button className="navbar-link" onClick={() => scrollToSection('trainers')}>Trainers</button>
            <Link to="/contact" className="navbar-link">Contact</Link>
          </div>

          <div className="navbar-actions">
            {isSignedIn ? (
              <>
                <Link to="/dashboard" className="btn btn-sm btn-secondary hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {user?.imageUrl ? (
                    <img src={user.imageUrl} alt="" style={{ width: '22px', height: '22px', borderRadius: '50%' }} />
                  ) : null}
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <SignInButton mode="modal" forceRedirectUrl="/">
                  <button className="btn btn-sm btn-secondary hide-mobile" id="navbar-login">Login</button>
                </SignInButton>
              </>
            )}
            <button className="btn btn-sm btn-primary" onClick={() => scrollToSection('pricing')}>Join Now</button>
            <button className="mobile-menu-btn" onClick={() => setMobileOpen(true)}>
              <FiMenu />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-nav-header">
          <div className="navbar-logo">
            <img 
              src="https://res.cloudinary.com/dt37ji5yp/image/upload/v1771514832/Onehour_2__page-0001_zy1elu.jpg" 
              alt="OneHour Challenge" 
              className="navbar-logo-img"
            />
            <span className="navbar-logo-text">
              ONEHOUR <span>CHALLENGE</span>
            </span>
          </div>
          <button className="mobile-nav-close" onClick={() => setMobileOpen(false)}>
            <FiX size={24} />
          </button>
        </div>

        <div className="mobile-nav-body">
          <button className="mobile-nav-link" onClick={() => scrollToSection('about')}>About</button>
          <Link to="/how-it-works" className="mobile-nav-link">How It Works</Link>
          <button className="mobile-nav-link" onClick={() => scrollToSection('programs')}>Programs</button>
          <button className="mobile-nav-link" onClick={() => scrollToSection('pricing')}>Pricing</button>
          <Link to="/transformations" className="mobile-nav-link">Transformations</Link>
          <button className="mobile-nav-link" onClick={() => scrollToSection('trainers')}>Trainers</button>
          <Link to="/contact" className="mobile-nav-link">Contact</Link>
          {isSignedIn ? (
            <Link to="/dashboard" className="mobile-nav-link" style={{ color: 'var(--color-primary)' }}>Dashboard</Link>
          ) : (
            <SignInButton mode="modal" forceRedirectUrl="/">
              <button className="mobile-nav-link" style={{ color: 'var(--color-primary)' }}>Login</button>
            </SignInButton>
          )}
          <button className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 'auto' }} onClick={() => scrollToSection('pricing')}>Join Now</button>
        </div>
      </div>
    </>
  );
}
