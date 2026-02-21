import { useState, useEffect } from 'react';
import { FiX, FiCheck, FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useUser } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import API from '../utils/api';
import { DAYS_OPTIONS, TIME_SLOTS, DURATIONS, PRICING, getWhatsAppPaymentUrl } from '../utils/constants';

export default function BookingModal({ isOpen, onClose, planType, onSuccess }) {
  const { user, isLoaded } = useUser();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    planType: planType || 'PRO',
    duration: '3-Month',
    preferredDays: [],
    preferredTimeSlot: '',
  });
  const [bookingResult, setBookingResult] = useState(null);

  // Pre-fill user data from Clerk
  useEffect(() => {
    if (isLoaded && user) {
      setFormData(prev => ({
        ...prev,
        name: user.fullName || prev.name,
        email: user.primaryEmailAddress?.emailAddress || prev.email,
        // Mobile is often not available unless explicitly collected/synced
      }));
    }
  }, [isLoaded, user]);

  if (!isOpen) return null;

  const maxDays = formData.planType === 'PRO' ? 3 : 5;
  const price = PRICING[formData.planType]?.[formData.duration] || 0;

  const handleDayToggle = (day) => {
    setFormData(prev => {
      const days = prev.preferredDays.includes(day)
        ? prev.preferredDays.filter(d => d !== day)
        : prev.preferredDays.length < maxDays
          ? [...prev.preferredDays, day]
          : prev.preferredDays;
      return { ...prev, preferredDays: days };
    });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.mobile) {
      toast.error('Please fill in all personal details');
      return;
    }
    if (formData.preferredDays.length === 0) {
      toast.error('Please select at least one day');
      return;
    }
    if (!formData.preferredTimeSlot) {
      toast.error('Please select a time slot');
      return;
    }

    setLoading(true);
    try {
      // Create the booking in the background first
      const res = await API.post('/bookings', formData);
      setBookingResult(res.data.booking);
      setStep(3); // Go to WhatsApp redirection step
      toast.success('Booking recorded! Now complete on WhatsApp.');
      if (onSuccess) onSuccess(res.data.booking);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to create booking');
    }
    setLoading(false);
  };

  const handleWhatsAppPayment = () => {
    const url = getWhatsAppPaymentUrl(
      formData.planType,
      formData.duration,
      price,
      formData.name,
      formData.email
    );
    window.open(url, '_blank');
    toast.success('Redirecting to WhatsApp...');
    onClose(); // Close modal after redirecting
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target.className === 'modal-overlay' && onClose()}>
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">
            {step === 1 && 'Personal Details'}
            {step === 2 && 'Choose Schedule'}
            {step === 3 && 'Complete Payment'}
          </h3>
          <button className="modal-close" onClick={onClose}>
            <FiX />
          </button>
        </div>

        {/* Step Progress */}
        {step <= 3 && (
          <div style={{ display: 'flex', gap: '4px', padding: '0 24px', marginBottom: '8px' }}>
            {[1, 2, 3].map(s => (
              <div key={s} style={{
                flex: 1,
                height: '3px',
                borderRadius: '2px',
                background: s <= step ? 'var(--color-red)' : 'var(--color-dark-alt)',
                transition: 'background 0.3s ease',
              }} />
            ))}
          </div>
        )}

        <div className="modal-body">
          {/* Step 1: Personal Details */}
          {step === 1 && (
            <>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  className="form-input"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  className="form-input"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Mobile</label>
                <input
                  className="form-input"
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  value={formData.mobile}
                  onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Plan Type</label>
                <div className="pricing-toggle">
                  <button
                    className={`pricing-toggle-btn ${formData.planType === 'PRO' ? 'active' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, planType: 'PRO', preferredDays: [] }))}
                  >
                    PRO (3 Days)
                  </button>
                  <button
                    className={`pricing-toggle-btn ${formData.planType === 'ADVANCE' ? 'active' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, planType: 'ADVANCE', preferredDays: [] }))}
                  >
                    ADVANCE (5 Days)
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Duration</label>
                <select
                  className="form-select"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                >
                  {DURATIONS.map(d => (
                    <option key={d} value={d}>{d} — ₹{PRICING[formData.planType]?.[d]?.toLocaleString()}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* Step 2: Schedule */}
          {step === 2 && (
            <>
              <div className="form-group">
                <label className="form-label">
                  Select Days ({formData.preferredDays.length}/{maxDays})
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {DAYS_OPTIONS.map(day => (
                    <button
                      key={day}
                      className={`btn btn-sm ${formData.preferredDays.includes(day) ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => handleDayToggle(day)}
                      style={{ fontSize: '0.8rem', padding: '8px 14px' }}
                    >
                      {day.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Preferred Time Slot</label>
                <select
                  className="form-select"
                  value={formData.preferredTimeSlot}
                  onChange={(e) => setFormData(prev => ({ ...prev, preferredTimeSlot: e.target.value }))}
                >
                  <option value="">Select a time slot</option>
                  {TIME_SLOTS.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>

              <div className="card" style={{ marginTop: '20px', background: 'var(--color-black)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ color: 'var(--color-gray-400)' }}>Plan</span>
                  <span style={{ color: 'var(--color-white)', fontWeight: 700 }}>{formData.planType}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ color: 'var(--color-gray-400)' }}>Duration</span>
                  <span style={{ color: 'var(--color-white)', fontWeight: 700 }}>{formData.duration}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--color-gray-800)' }}>
                  <span style={{ color: 'var(--color-gray-300)', fontWeight: 600 }}>Total</span>
                  <span style={{ color: 'var(--color-red)', fontWeight: 800, fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>₹{price?.toLocaleString()}</span>
                </div>
              </div>
            </>
          )}

          {/* Step 3: Complete on WhatsApp (Replaced QR) */}
          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <div style={{
                width: '70px',
                height: '70px',
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: '0 8px 32px rgba(37, 211, 102, 0.3)',
              }}>
                <FaWhatsapp style={{ fontSize: '36px', color: '#fff' }} />
              </div>

              <h4 style={{ color: 'var(--color-white)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '12px' }}>
                Almost there!
              </h4>
              
              <p style={{ color: 'var(--color-gray-400)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '24px' }}>
                To complete your enrollment and get the payment details, please message us on WhatsApp. 
                Our team is ready to assist you.
              </p>

              <div style={{
                background: 'var(--color-dark)',
                border: '1px solid var(--color-dark-alt)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                textAlign: 'left',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--color-gray-500)', fontSize: '0.8rem' }}>Amount Payable</span>
                  <span style={{ color: 'var(--color-red)', fontWeight: 700 }}>₹{price.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-gray-500)', fontSize: '0.8rem' }}>Booking ID</span>
                  <span style={{ color: 'var(--color-white)', fontSize: '0.8rem', fontFamily: 'monospace' }}>{bookingResult?._id?.slice(-8).toUpperCase()}</span>
                </div>
              </div>

              <button 
                className="btn btn-primary btn-lg" 
                style={{ 
                  width: '100%', 
                  background: 'linear-gradient(135deg, #25D366, #128C7E)', 
                  borderColor: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
                onClick={handleWhatsAppPayment}
              >
                <FaWhatsapp size={20} /> Complete Payment on WhatsApp
              </button>
              
              <p style={{ marginTop: '16px', fontSize: '0.75rem', color: 'var(--color-gray-600)' }}>
                🔒 Secure confirmation via official business WhatsApp
              </p>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        {(step === 1 || step === 2) && (
          <div className="modal-footer" style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            {step === 2 && (
              <button className="btn btn-secondary" onClick={() => setStep(1)}>
                Back
              </button>
            )}
            {step === 1 && (
              <button className="btn btn-primary" onClick={() => {
                if (!formData.name || !formData.email || !formData.mobile) {
                  toast.error('Please fill in all details');
                  return;
                }
                setStep(2);
              }}>
                Next — Choose Schedule
              </button>
            )}
            {step === 2 && (
              <button className="btn btn-primary" onClick={handleSubmit} disabled={loading} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {loading ? 'Booking...' : (
                  <>Confirm & Continue <FiArrowRight /></>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
