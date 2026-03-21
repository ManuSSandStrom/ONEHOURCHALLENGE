import { useState } from 'react';
import { FiMail, FiSend, FiMapPin } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../utils/api';
import { ADMIN_EMAIL, ADMIN_PHONE } from '../utils/constants';
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
  const [sent, setSent] = useState(false);

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
      toast.success('Registration sent to admin portal');
      setSent(true);
      setFormData({ name: '', email: '', mobile: '', gender: '', age: '', message: '' });
    } catch (error) {
      console.error(error);
      toast.error('Failed to process. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <PageHero
        badge="Contact"
        title="Let's plan your"
        highlight="next step"
        description="Share your details and goals. Your enquiry goes directly into the admin portal as a contact lead."
      />

      <section className="section section-darker">
        <div className="container">
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
              {sent ? (
                <div className="success-screen" style={{ padding: '60px 28px' }}>
                  <div className="success-icon">
                    <FiSend />
                  </div>
                  <h3 className="success-title">Lead Created</h3>
                  <p className="success-message">
                    Your contact details were saved successfully. The admin portal now has this enquiry under the Contact page.
                  </p>
                  <button className="btn btn-secondary" onClick={() => setSent(false)}>
                    Add Another Lead
                  </button>
                </div>
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
