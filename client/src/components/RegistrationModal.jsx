import { useEffect, useState } from 'react';
import { FiCheckCircle, FiX } from 'react-icons/fi';
import { useUser } from '@clerk/clerk-react';
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
  const { user, isLoaded } = useUser();
  const [formData, setFormData] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      setFormData((prev) => ({
        ...prev,
        name: user.fullName || prev.name,
        email: user.primaryEmailAddress?.emailAddress || prev.email,
      }));
    }
  }, [isLoaded, user]);

  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      setSubmitting(false);
      setFormData((prev) => ({
        ...initialFormState,
        name: prev.name && user ? prev.name : '',
        email: prev.email && user ? prev.email : '',
      }));
    }
  }, [isOpen, user]);

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
      toast.success('Registration sent to admin portal');
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
            <div className="modal-header" style={{ paddingBottom: '12px' }}>
              <h3 className="modal-title">Registration Form</h3>
            </div>
            <div className="modal-body" style={{ paddingTop: 0 }}>
              <div className="registration-context-card">
                <p className="registration-context-label">Selected Interest</p>
                <h4>{context?.interestLabel || 'General Registration'}</h4>
                <p>{context?.sourcePage || 'Website'} lead will be added directly to the admin portal.</p>
              </div>

              <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-fields-grid">
                  <div className="form-field">
                    <label htmlFor="lead-name">Name</label>
                    <input id="lead-name" className="form-input" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="Full name" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="lead-mobile">Mobile Number</label>
                    <input id="lead-mobile" className="form-input" value={formData.mobile} onChange={(e) => handleChange('mobile', e.target.value)} placeholder="10-digit mobile number" />
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
                    <input id="lead-age" type="number" min="10" max="100" className="form-input" value={formData.age} onChange={(e) => handleChange('age', e.target.value)} placeholder="Age" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="lead-email">Email</label>
                    <input id="lead-email" type="email" className="form-input" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="Optional email" />
                  </div>
                  <div className="form-field" style={{ gridColumn: '1 / -1' }}>
                    <label htmlFor="lead-message">Notes</label>
                    <textarea id="lead-message" className="form-input" rows={3} value={formData.message} onChange={(e) => handleChange('message', e.target.value)} placeholder="What are you looking for?" style={{ minHeight: '100px', resize: 'vertical' }} />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-lg" disabled={submitting} style={{ width: '100%' }}>
                  {submitting ? 'Submitting...' : 'Submit Registration'}
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="modal-body registration-success">
            <div className="registration-success-icon">
              <FiCheckCircle />
            </div>
            <h3>Lead Added Successfully</h3>
            <p>
              This registration was saved under <strong>{context?.sourcePage || 'General'}</strong> for
              <strong> {context?.interestLabel || 'General Registration'}</strong>.
            </p>
            <button className="btn btn-primary" onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
