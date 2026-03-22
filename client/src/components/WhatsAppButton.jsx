import { FaWhatsapp } from 'react-icons/fa';
import { getWhatsAppUrl } from '../utils/constants';

export default function WhatsAppButton() {
  return (
    <a
      href={getWhatsAppUrl('Hi OneHour Challenge, I would like to know more about your fitness programs and membership plans.')}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-float"
      id="whatsapp-float"
      title="Chat with us on WhatsApp"
    >
      <FaWhatsapp size={32} />
      <span>WhatsApp</span>
    </a>
  );
}
