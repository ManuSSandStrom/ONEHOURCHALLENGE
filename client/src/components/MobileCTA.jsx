import { FiLock } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useUser, useClerk } from '@clerk/clerk-react';
import { getWhatsAppUrl } from '../utils/constants';
import toast from 'react-hot-toast';

export default function MobileCTA() {
  const { user, isSignedIn } = useUser();
  const clerk = useClerk();

  const handleClick = (e) => {
    e.preventDefault();
    if (!isSignedIn) {
      toast('Please login first to continue', { icon: '🔒' });
      if (clerk?.openSignIn) {
        clerk.openSignIn({ forceRedirectUrl: window.location.pathname });
      }
      return;
    }

    const userName = user?.fullName || user?.firstName || '';
    const userEmail = user?.primaryEmailAddress?.emailAddress || '';
    const message = `Hi OneHour Challenge! 👋\n\nI'm ${userName} (${userEmail}).\nI'm interested in booking a session. Please guide me!\n\nThank you!`;
    const url = getWhatsAppUrl(message);
    window.open(url, '_blank');
  };

  return (
    <div className="mobile-sticky-cta">
      <button onClick={handleClick} className="btn btn-primary btn-lg" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        {isSignedIn ? (
          <><FaWhatsapp size={20} /> Join Now — Book Session</>
        ) : (
          <><FiLock size={16} /> Login to Join</>
        )}
      </button>
    </div>
  );
}
