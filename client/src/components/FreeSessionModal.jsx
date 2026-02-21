import { FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useUser, useClerk } from '@clerk/clerk-react';
import { getWhatsAppFreeSessionUrl } from '../utils/constants';
import toast from 'react-hot-toast';

export default function FreeSessionModal({ isOpen, onClose, sessionType }) {
  const { user, isSignedIn } = useUser();
  const clerk = useClerk();

  if (!isOpen) return null;

  const userName = user?.fullName || user?.firstName || '';
  const userEmail = user?.primaryEmailAddress?.emailAddress || '';

  const handleRegister = () => {
    if (!isSignedIn) {
      toast('Please login first to register', { icon: '🔒' });
      if (clerk?.openSignIn) {
        clerk.openSignIn({ forceRedirectUrl: window.location.pathname });
      }
      onClose();
      return;
    }

    const url = getWhatsAppFreeSessionUrl(sessionType, userName, userEmail);
    window.open(url, '_blank');
    toast.success('Redirecting to WhatsApp!');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
        <button className="modal-close" onClick={onClose}>
          <FiX size={18} />
        </button>

        <div style={{ textAlign: 'center', padding: '8px 0 24px' }}>
          <div style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4caf50, #2e7d32)',
            margin: '0 auto 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
          }}>
            🎯
          </div>

          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.5rem',
            fontWeight: 800,
            color: 'var(--color-white)',
            marginBottom: '8px',
          }}>
            Free {sessionType} Session
          </h2>

          <p style={{
            color: 'var(--color-gray-400)',
            fontSize: '0.9rem',
            lineHeight: '1.5',
            marginBottom: '24px',
          }}>
            Experience a complimentary {sessionType} session with our certified trainers. No commitment required!
          </p>

          {isSignedIn ? (
            <>
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--color-dark-alt)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                marginBottom: '20px',
                textAlign: 'left',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--color-gray-400)', fontSize: '0.85rem' }}>Name</span>
                  <span style={{ color: 'var(--color-white)', fontWeight: 600, fontSize: '0.85rem' }}>{userName}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-gray-400)', fontSize: '0.85rem' }}>Email</span>
                  <span style={{ color: 'var(--color-white)', fontWeight: 600, fontSize: '0.85rem' }}>{userEmail}</span>
                </div>
              </div>

              <button
                className="btn btn-primary btn-lg"
                onClick={handleRegister}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  background: 'linear-gradient(135deg, #25d366, #128c7e)',
                }}
              >
                <FaWhatsapp size={20} /> Register via WhatsApp
              </button>
            </>
          ) : (
            <button
              className="btn btn-primary btn-lg"
              onClick={handleRegister}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              🔒 Login to Register
            </button>
          )}

          <p style={{
            color: 'var(--color-gray-600)',
            fontSize: '0.75rem',
            marginTop: '16px',
          }}>
            Your details will be shared with our trainer via WhatsApp to confirm the session.
          </p>
        </div>
      </div>
    </div>
  );
}
