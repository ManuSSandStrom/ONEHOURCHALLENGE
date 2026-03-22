import { useEffect, useState } from 'react';
import { FiCheckCircle, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../utils/api';

const initialFormState = {
  name: '',
  email: '',
  mobile: '',
  gender: '',
  age: '',
  message: '',
};

export default function RegistrationModal({ isOpen, onClose, context }) {
  const [formData, setFormData] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      setSubmitting(false);
      setFormData(initialFormState);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.mobile || !formData.gender || !formData.age) {
      toast.error('Please fill in name, mobile, gender, and age');
      return;
    }

    setSubmitting(true);
    try {
      await API.post('/leads', {
        ...formData,
        age: Number(formData.age),
        source: 'registration',
        sourcePage: context?.sourcePage || 'General',
        sourcePath: window.location.pathname,
        interestType: context?.interestType || 'general',
        interestLabel: context?.interestLabel || 'General Registration',
        planType: context?.planType || null,
        duration: context?.duration || null,
      });

      setSubmitted(true);
      toast.success('Registration submitted successfully');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || 'Failed to submit registration');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content registration-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FiX />
        </button>

        {!submitted ? (
          <>
            <div className="modal-header registration-modal-header">
              <div>
                <p className="registration-kicker">Register Interest</p>
                <h3 className="modal-title">Registration Form</h3>
                <p className="registration-subtitle">Share your details and our team will contact you directly.</p>
              </div>
            </div>

            <div className="modal-body registration-modal-body">
              <div className="registration-context-card">
                <div className="registration-context-topline">
                  <p className="registration-context-label">Selected Interest</p>
                  <span className="registration-source-pill">{context?.sourcePage || 'Website'}</span>
                </div>
                <h4>{context?.interestLabel || 'General Registration'}</h4>
                <p>Share your details and the OneHour Challenge team will reach out to help with the right next step.</p>
              </div>

              <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-fields-grid">
                  <div className="form-field">
                    <label htmlFor="lead-name">Name</label>
                    <input id="lead-name" className="form-input" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="Your full name" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="lead-mobile">Mobile Number</label>
                    <input id="lead-mobile" className="form-input" inputMode="numeric" value={formData.mobile} onChange={(e) => handleChange('mobile', e.target.value)} placeholder="10-digit mobile number" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="lead-gender">Gender</label>
                    <select id="lead-gender" className="form-input" value={formData.gender} onChange={(e) => handleChange('gender', e.target.value)}>
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label htmlFor="lead-age">Age</label>
                    <input id="lead-age" type="number" min="10" max="100" className="form-input" value={formData.age} onChange={(e) => handleChange('age', e.target.value)} placeholder="Your age" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="lead-email">Email</label>
                    <input id="lead-email" type="email" className="form-input" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="Optional email" />
                  </div>
                  <div className="form-field" style={{ gridColumn: '1 / -1' }}>
                    <label htmlFor="lead-message">Notes</label>
                    <textarea id="lead-message" className="form-input registration-notes" rows={3} value={formData.message} onChange={(e) => handleChange('message', e.target.value)} placeholder="What are you looking for?" />
                  </div>
                </div>

                <div className="registration-actions">
                  <p className="registration-actions-note">Every registration is reviewed personally by the OneHour Challenge team.</p>
                  <button type="submit" className="btn btn-primary btn-lg registration-submit" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit Registration'}
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="modal-body registration-success">
            <div className="registration-success-icon">
              <FiCheckCircle />
            </div>
            <h3>Registration Received</h3>
            <p>
              Your request for <strong>{context?.interestLabel || 'General Registration'}</strong> has been
              received. The OneHour Challenge team will contact you soon.
            </p>
            <button className="btn btn-primary" onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
