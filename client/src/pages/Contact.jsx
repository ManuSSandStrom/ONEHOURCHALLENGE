import { useState } from 'react';
import { FiMail, FiSend, FiMapPin, FiPhoneCall, FiClock } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../utils/api';
import { ADMIN_EMAIL, ADMIN_PHONE, getWhatsAppUrl } from '../utils/constants';
import PageHero from '../components/PageHero';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    gender: '',
    age: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.mobile || !formData.gender || !formData.age || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      await API.post('/contact', {
        ...formData,
        sourcePage: 'Contact',
        sourcePath: window.location.pathname,
      });
      toast.success('Details submitted successfully');
      setFormData({ name: '', email: '', mobile: '', gender: '', age: '', message: '' });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to process. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper page-contact">
      <PageHero
        badge="Contact"
        eyebrow="Direct communication page"
        title="Let's plan your"
        highlight="next step"
        description="Share your details and goals. The OneHour Challenge team will contact you and help you choose the right next step."
        metrics={[
          { value: '1 form', label: 'Direct Lead Flow' },
          { value: 'Mon-Sat', label: 'Support Window' },
          { value: 'Online', label: 'Across India' },
        ]}
      />

      <section className="section section-darker">
        <div className="container">
          <div className="contact-service-band reveal">
            <div className="contact-service-card">
              <FiMail />
              <div>
                <strong>Program guidance</strong>
                <span>Ask about training styles, free sessions, or the right plan for your goal.</span>
              </div>
            </div>
            <div className="contact-service-card">
              <FiClock />
              <div>
                <strong>Fast response</strong>
                <span>Our team follows up quickly to help you begin without confusion or delay.</span>
              </div>
            </div>
            <div className="contact-service-card">
              <FiPhoneCall />
              <div>
                <strong>Direct contact options</strong>
                <span>Email, phone, and enquiry form all stay available on the same page.</span>
              </div>
            </div>
          </div>

          <div className="contact-grid">
            <div className="reveal">
              <div className="contact-info-card">
                <div className="contact-info-icon"><FiMail /></div>
                <div>
                  <div className="contact-info-label">Email</div>
                  <div className="contact-info-value">{ADMIN_EMAIL}</div>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-icon"><FiSend /></div>
                <div>
                  <div className="contact-info-label">Phone</div>
                  <div className="contact-info-value">+91 {ADMIN_PHONE}</div>
                </div>
              </div>

              <a
                className="btn btn-primary btn-lg"
                href={getWhatsAppUrl('I would like to know more about OneHour Challenge.')}
                target="_blank"
                rel="noreferrer"
                style={{ width: '100%', marginTop: '18px' }}
              >
                Chat on WhatsApp
              </a>

              <div className="contact-info-card">
                <div className="contact-info-icon"><FiMapPin /></div>
                <div>
                  <div className="contact-info-label">Availability</div>
                  <div className="contact-info-value">Online coaching across India</div>
                </div>
              </div>

              <div style={{ marginTop: '24px', padding: '24px', background: 'var(--color-white)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(0, 0, 0, 0.06)' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--color-gray-900)', marginBottom: '12px' }}>
                  Working Hours
                </h4>
                <p style={{ color: 'var(--color-gray-600)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                  Live sessions: 6 AM to 9 AM and 5 PM to 9 PM
                  <br />
                  Support: Monday to Saturday, 9 AM to 6 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>

            <div className="reveal">
              <form onSubmit={handleSubmit}>
                <div className="form-fields-grid" style={{ marginBottom: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input className="form-input" placeholder="Your full name" value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} autoComplete="name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input className="form-input" type="email" placeholder="Your email address" value={formData.email} onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))} autoComplete="email" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Mobile Number</label>
                    <input className="form-input" type="tel" placeholder="Your mobile number" value={formData.mobile} onChange={(e) => setFormData((prev) => ({ ...prev, mobile: e.target.value }))} autoComplete="tel" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Gender</label>
                    <select className="form-input" value={formData.gender} onChange={(e) => setFormData((prev) => ({ ...prev, gender: e.target.value }))}>
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Age</label>
                    <input className="form-input" type="number" min="10" max="100" placeholder="Your age" value={formData.age} onChange={(e) => setFormData((prev) => ({ ...prev, age: e.target.value }))} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">What are you looking for?</label>
                  <textarea className="form-textarea" placeholder="Tell us your goal, preferred program, or plan." value={formData.message} onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))} />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Registration'} <FiSend />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
