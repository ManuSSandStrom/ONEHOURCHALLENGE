import { useEffect, useState } from 'react';
import { FiCheckCircle, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../utils/api';

const initialFormState = {
  name: '',
  email: '',
  mobile: '',
  age: '',
  location: '',
  message: '',
};

function getInquiryKicker(context) {
  const source = context?.sourcePage || 'OneHour Challenge';

  if (context?.interestType === 'program') return 'Program Enquiry';
  if (context?.interestType === 'plan') return 'Plan Enquiry';
  if (context?.interestType === 'team') return 'Trainer Enquiry';
  if (source === 'Home') return 'Free Session Enquiry';

  return 'Register Interest';
}

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

    if (!formData.name || !formData.mobile || !formData.age) {
      toast.error('Please fill in full name, phone number, and age');
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
        gender: null,
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

  const inquiryKicker = getInquiryKicker(context);
  const inquiryTitle = context?.interestLabel || 'OneHour Challenge Enquiry';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content registration-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close registration-close" onClick={onClose} aria-label="Close registration form">
          Close
        </button>

        {!submitted ? (
          <>
            <div className="modal-header registration-modal-header">
              <div>
                <p className="registration-kicker">{inquiryKicker}</p>
                <h3 className="modal-title registration-title">{inquiryTitle}</h3>
                <p className="registration-subtitle">Share your details and we will contact you directly on call or WhatsApp.</p>
                <p className="registration-topic">{context?.sourcePage || 'OneHour Challenge'}</p>
              </div>
            </div>

            <div className="modal-body registration-modal-body">
              <form onSubmit={handleSubmit} className="registration-form registration-form-clean">
                <div className="form-field registration-form-field registration-form-field-full">
                  <input
                    id="lead-name"
                    className="form-input registration-input"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Full name"
                    autoComplete="name"
                  />
                </div>

                <div className="form-field registration-form-field registration-form-field-full">
                  <input
                    id="lead-mobile"
                    className="form-input registration-input"
                    inputMode="tel"
                    value={formData.mobile}
                    onChange={(e) => handleChange('mobile', e.target.value)}
                    placeholder="Phone number"
                    autoComplete="tel"
                  />
                </div>

                <div className="registration-form-row">
                  <div className="form-field registration-form-field">
                    <input
                      id="lead-age"
                      type="number"
                      min="10"
                      max="100"
                      className="form-input registration-input"
                      value={formData.age}
                      onChange={(e) => handleChange('age', e.target.value)}
                      placeholder="Age"
                    />
                  </div>
                  <div className="form-field registration-form-field">
                    <input
                      id="lead-location"
                      className="form-input registration-input"
                      value={formData.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      placeholder="Location"
                      autoComplete="address-level2"
                    />
                  </div>
                </div>

                <div className="form-field registration-form-field registration-form-field-full">
                  <input
                    id="lead-email"
                    type="email"
                    className="form-input registration-input"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="Email address (optional)"
                    autoComplete="email"
                  />
                </div>

                <div className="form-field registration-form-field registration-form-field-full">
                  <textarea
                    id="lead-message"
                    className="form-input registration-input registration-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Message (optional)"
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-lg registration-submit registration-submit-clean" disabled={submitting}>
                  {submitting ? 'Sending Details...' : 'Send Details'}
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="modal-body registration-success registration-success-clean">
            <div className="registration-success-icon">
              <FiCheckCircle />
            </div>
            <p className="registration-kicker">Enquiry Sent</p>
            <h3>We received your details</h3>
            <p>
              Our team will contact you soon regarding <strong>{inquiryTitle}</strong>.
            </p>
            <button className="btn btn-primary registration-submit-clean" onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
