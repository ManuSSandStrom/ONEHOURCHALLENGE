import { FaWhatsapp } from 'react-icons/fa';
import { useUser, useClerk } from '@clerk/clerk-react';
import { getWhatsAppUrl } from '../utils/constants';
import toast from 'react-hot-toast';

export default function WhatsAppButton() {
  const { user, isSignedIn } = useUser();
  const clerk = useClerk();

  const handleClick = (e) => {
    e.preventDefault();
    if (!isSignedIn) {
      toast('Please login first to chat on WhatsApp', { icon: '🔒' });
      if (clerk?.openSignIn) {
        clerk.openSignIn({ forceRedirectUrl: window.location.pathname });
      }
      return;
    }

    const userName = user?.fullName || user?.firstName || '';
    const userEmail = user?.primaryEmailAddress?.emailAddress || '';
    const message = `Hi OneHour Challenge! 👋\n\nI'm ${userName} (${userEmail}).\nI'd like to know more about your fitness programs and membership plans.\n\nPlease help me get started!`;
    const url = getWhatsAppUrl(message);
    window.open(url, '_blank');
  };

  return (
    <a
      href="#"
      onClick={handleClick}
      className="whatsapp-float"
      id="whatsapp-float"
      title="Chat with us on WhatsApp"
    >
      <FaWhatsapp size={32} />
    </a>
  );
}
