import { useState } from 'react';
import RegistrationModal from './RegistrationModal';

export default function LeadCaptureButton({
  label = 'Register Now',
  className = 'btn btn-primary',
  style,
  context,
  children,
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className={className} style={style} onClick={() => setOpen(true)}>
        {children || label}
      </button>
      <RegistrationModal isOpen={open} onClose={() => setOpen(false)} context={context} />
    </>
  );
}
