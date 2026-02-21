import { useState } from 'react';
import { FiMail, FiPhone, FiSend, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';
import API from '../utils/api';
import { ADMIN_EMAIL, ADMIN_PHONE } from '../utils/constants';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      // Still log to backend as a lead (optional but recommended for record keeping)
      await API.post('/contact', formData).catch(err => console.log('Lead sync failed', err));
      
      // WhatsApp Redirection
      const waMessage = `Hi OneHour Challenge! 👋\n\n*Form Submission:*\n👤 *Name:* ${formData.name}\n📧 *Email:* ${formData.email}\n💬 *Message:* ${formData.message}`;
      const waUrl = `https://wa.me/919515022680?text=${encodeURIComponent(waMessage)}`;
      
      toast.success('Opening WhatsApp...');
      setTimeout(() => {
        window.open(waUrl, '_blank');
        setSent(true);
        setFormData({ name: '', email: '', message: '' });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error('Failed to process. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <section className="section section-darker" style={{ flex: 1 }}>
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge">Get In Touch</div>
            <h2 className="section-title">Contact <span>Us</span></h2>
            <p className="section-subtitle">Have a question? We'd love to hear from you.</p>
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
                <div className="contact-info-icon" style={{ background: 'rgba(37, 211, 102, 0.1)', color: '#25D366' }}><FaWhatsapp /></div>
                <div>
                  <div className="contact-info-label">WhatsApp</div>
                  <div className="contact-info-value">+91 {ADMIN_PHONE}</div>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-icon"><FiMapPin /></div>
                <div>
                  <div className="contact-info-label">Location</div>
                  <div className="contact-info-value">Online — Available Pan India</div>
                </div>
              </div>

              <div style={{ marginTop: '24px', padding: '24px', background: 'var(--color-dark)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-dark-alt)' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--color-white)', marginBottom: '12px' }}>
                  Working Hours
                </h4>
                <p style={{ color: 'var(--color-gray-400)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                  Live Sessions: 6 AM – 9 AM & 5 PM – 9 PM<br />
                  Support: Mon – Sat, 9 AM – 6 PM<br />
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
                  <h3 className="success-title">Message Sent!</h3>
                  <p className="success-message">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button className="btn btn-secondary" onClick={() => setSent(false)}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input
                      className="form-input"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      id="contact-name"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      className="form-input"
                      type="email"
                      placeholder="Your email address"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      id="contact-email"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-textarea"
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      id="contact-message"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg" 
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'Send via WhatsApp'} <FaWhatsapp />
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
