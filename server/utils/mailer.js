import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const emailTemplate = (title, content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 0; background: #0a0a0a; }
    .container { max-width: 600px; margin: 0 auto; background: #111; border-radius: 12px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #c62828, #b71c1c); padding: 30px; text-align: center; }
    .header h1 { color: #fff; margin: 0; font-size: 24px; letter-spacing: 2px; }
    .header p { color: rgba(255,255,255,0.8); margin: 5px 0 0; font-size: 12px; letter-spacing: 3px; }
    .body { padding: 30px; color: #ddd; }
    .body h2 { color: #e53935; margin-top: 0; }
    .info-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #222; }
    .info-label { color: #888; font-size: 14px; }
    .info-value { color: #fff; font-weight: 600; font-size: 14px; }
    .footer { padding: 20px 30px; background: #0a0a0a; text-align: center; color: #555; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>ONEHOUR CHALLENGE</h1>
      <p>THE HOUR THAT CHANGES EVERYTHING</p>
    </div>
    <div class="body">
      <h2>${title}</h2>
      ${content}
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} OneHour Challenge. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

export const sendBookingEmail = async (booking) => {
  const content = `
    <p>A new booking has been received:</p>
    <div class="info-row"><span class="info-label">Name</span><span class="info-value">${booking.name}</span></div>
    <div class="info-row"><span class="info-label">Email</span><span class="info-value">${booking.email}</span></div>
    <div class="info-row"><span class="info-label">Mobile</span><span class="info-value">${booking.mobile}</span></div>
    <div class="info-row"><span class="info-label">Plan</span><span class="info-value">${booking.planType}</span></div>
    <div class="info-row"><span class="info-label">Duration</span><span class="info-value">${booking.duration}</span></div>
    <div class="info-row"><span class="info-label">Days</span><span class="info-value">${booking.preferredDays.join(', ')}</span></div>
    <div class="info-row"><span class="info-label">Time Slot</span><span class="info-value">${booking.preferredTimeSlot}</span></div>
  `;

  try {
    await transporter.sendMail({
      from: `"OneHour Challenge" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Booking: ${booking.name} - ${booking.planType} Plan`,
      html: emailTemplate('New Booking Received', content),
    });
  } catch (error) {
    console.error('Email send error:', error);
  }
};

export const sendPaymentConfirmationEmail = async (payment) => {
  const content = `
    <p>Payment has been confirmed:</p>
    <div class="info-row"><span class="info-label">Payment ID</span><span class="info-value">${payment.razorpayPaymentId}</span></div>
    <div class="info-row"><span class="info-label">Amount</span><span class="info-value">₹${payment.amount}</span></div>
    <div class="info-row"><span class="info-label">Plan</span><span class="info-value">${payment.planType}</span></div>
    <div class="info-row"><span class="info-label">Duration</span><span class="info-value">${payment.duration}</span></div>
    <div class="info-row"><span class="info-label">Order ID</span><span class="info-value">${payment.razorpayOrderId}</span></div>
  `;

  try {
    await transporter.sendMail({
      from: `"OneHour Challenge" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `Payment Confirmed: ₹${payment.amount} - ${payment.planType}`,
      html: emailTemplate('Payment Confirmed', content),
    });
  } catch (error) {
    console.error('Payment email error:', error);
  }
};

export const sendContactEmail = async ({ name, email, message }) => {
  const content = `
    <p>New contact form submission:</p>
    <div class="info-row"><span class="info-label">Name</span><span class="info-value">${name}</span></div>
    <div class="info-row"><span class="info-label">Email</span><span class="info-value">${email}</span></div>
    <div style="margin-top: 15px;">
      <p style="color: #888; font-size: 14px; margin-bottom: 5px;">Message:</p>
      <p style="color: #fff; background: #1a1a1a; padding: 15px; border-radius: 8px; border-left: 3px solid #e53935;">${message}</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"OneHour Challenge" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `Contact Form: ${name}`,
      html: emailTemplate('New Contact Message', content),
    });
  } catch (error) {
    console.error('Contact email error:', error);
  }
};

export const sendLeadEmail = async ({ name, email, mobile }) => {
  const content = `
    <p>AI Assistant has collected a new lead:</p>
    <div class="info-row"><span class="info-label">Name</span><span class="info-value">${name || 'Not provided'}</span></div>
    <div class="info-row"><span class="info-label">Email</span><span class="info-value">${email || 'Not provided'}</span></div>
    <div class="info-row"><span class="info-label">Mobile</span><span class="info-value">${mobile || 'Not provided'}</span></div>
  `;

  try {
    await transporter.sendMail({
      from: `"OneHour Challenge" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New AI Lead: ${name || 'Unknown'}`,
      html: emailTemplate('New Lead from AI Assistant', content),
    });
  } catch (error) {
    console.error('Lead email error:', error);
  }
};

export const sendUPIPaymentEmail = async ({ name, email, mobile, planType, duration, amount, utrNumber }) => {
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'manoharbasappagari18@gmail.com';

  // ─── Admin Notification Email ───
  const adminContent = `
    <p style="color: #ddd; font-size: 15px;">A new payment has been received and verified:</p>

    <div style="background: linear-gradient(135deg, #1a2e1a, #111); border: 1px solid #2e7d32; border-radius: 10px; padding: 20px; margin: 20px 0;">
      <h3 style="color: #4caf50; margin: 0 0 15px; font-size: 18px;">✅ Payment Successful</h3>
      <div class="info-row"><span class="info-label">Customer Name</span><span class="info-value">${name}</span></div>
      <div class="info-row"><span class="info-label">Email</span><span class="info-value">${email}</span></div>
      <div class="info-row"><span class="info-label">Mobile</span><span class="info-value">${mobile}</span></div>
      <div class="info-row"><span class="info-label">Plan</span><span class="info-value">${planType}</span></div>
      <div class="info-row"><span class="info-label">Subscription Duration</span><span class="info-value" style="color: #4caf50; font-weight: 700;">${duration}</span></div>
      <div class="info-row"><span class="info-label">Amount Paid</span><span class="info-value" style="color: #4caf50; font-size: 18px; font-weight: 800;">₹${amount}</span></div>
      <div class="info-row"><span class="info-label">UTR / Transaction ID</span><span class="info-value" style="color: #ffc107; font-family: monospace;">${utrNumber}</span></div>
    </div>

    <div style="padding: 12px 16px; background: #1a2e1a; border-radius: 8px; border-left: 3px solid #4caf50; margin-top: 15px;">
      <p style="color: #4caf50; font-weight: 600; margin: 0;">✅ Please verify this payment in your UPI app and activate the membership.</p>
    </div>
  `;

  // ─── User Confirmation Email ───
  const userContent = `
    <div style="text-align: center; margin-bottom: 25px;">
      <div style="width: 70px; height: 70px; background: linear-gradient(135deg, #4caf50, #2e7d32); border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center;">
        <span style="font-size: 32px; color: #fff;">✓</span>
      </div>
      <h2 style="color: #4caf50; margin: 0 0 5px; font-size: 22px;">Payment Successful!</h2>
      <p style="color: #888; margin: 0; font-size: 14px;">Your payment has been received successfully</p>
    </div>

    <p style="color: #ddd; font-size: 15px; line-height: 1.6;">
      Dear <strong style="color: #fff;">${name}</strong>,
    </p>
    <p style="color: #ddd; font-size: 15px; line-height: 1.6;">
      Thank you for your payment! Your <strong style="color: #e53935;">${planType}</strong> plan subscription 
      for <strong style="color: #4caf50;">${duration}</strong> has been successfully received.
    </p>

    <div style="background: linear-gradient(135deg, #1a1a2e, #111); border: 1px solid #333; border-radius: 12px; padding: 20px; margin: 20px 0;">
      <h3 style="color: #e53935; margin: 0 0 15px; font-size: 16px; letter-spacing: 1px;">SUBSCRIPTION DETAILS</h3>
      <div class="info-row"><span class="info-label">Plan</span><span class="info-value">${planType}</span></div>
      <div class="info-row"><span class="info-label">Duration</span><span class="info-value" style="color: #4caf50; font-weight: 700;">${duration}</span></div>
      <div class="info-row"><span class="info-label">Amount Paid</span><span class="info-value" style="color: #4caf50; font-size: 16px;">₹${amount}</span></div>
      <div class="info-row"><span class="info-label">Transaction ID</span><span class="info-value" style="font-family: monospace; color: #ffc107;">${utrNumber}</span></div>
      <div class="info-row"><span class="info-label">Status</span><span class="info-value" style="color: #4caf50; font-weight: 700;">✅ Successful</span></div>
    </div>

    <div style="padding: 16px; background: #1a1a2e; border-radius: 10px; border-left: 4px solid #e53935; margin: 20px 0;">
      <p style="color: #ddd; margin: 0; font-size: 14px; line-height: 1.6;">
        🔔 <strong>What's next?</strong> Our team will verify your payment and activate your 
        <strong style="color: #4caf50;">${planType}</strong> membership within 24 hours. 
        You will receive a confirmation once activated.
      </p>
    </div>

    <p style="color: #888; font-size: 13px; margin-top: 20px;">
      For any queries, contact us at <a href="mailto:${ADMIN_EMAIL}" style="color: #e53935;">${ADMIN_EMAIL}</a>
    </p>
  `;

  try {
    // Send to admin (permanent email: manoharbasappagari18@gmail.com)
    const adminMailPromise = transporter.sendMail({
      from: `"OneHour Challenge" <${process.env.EMAIL_USER}>`,
      to: ADMIN_EMAIL,
      subject: `✅ Payment Successful: ₹${amount} from ${name} — ${planType} Plan for ${duration}`,
      html: emailTemplate('Payment Received', adminContent),
    });

    // Send confirmation to the user who paid
    const userMailPromise = transporter.sendMail({
      from: `"OneHour Challenge" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `✅ Payment Successful — ${planType} Plan for ${duration} | OneHour Challenge`,
      html: emailTemplate('Payment Successful', userContent),
    });

    // Send both emails in parallel
    await Promise.all([adminMailPromise, userMailPromise]);
    console.log(`✅ Payment emails sent to admin (${ADMIN_EMAIL}) and user (${email})`);
  } catch (error) {
    console.error('UPI payment email error:', error);
  }
};
