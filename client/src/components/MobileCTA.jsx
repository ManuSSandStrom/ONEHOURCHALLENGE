import LeadCaptureButton from './LeadCaptureButton';

export default function MobileCTA() {
  return (
    <div className="mobile-sticky-cta">
      <LeadCaptureButton
        className="btn btn-primary btn-lg"
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        context={{ sourcePage: 'Mobile CTA', interestType: 'general', interestLabel: 'Mobile Sticky Registration' }}
        label="Register Now"
      />
    </div>
  );
}
