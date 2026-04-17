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
    .header { background: linear-gradient(135deg, #006d3c, #10b981); padding: 30px; text-align: center; }
    .header h1 { color: #fff; margin: 0; font-size: 24px; letter-spacing: 2px; }
    .header p { color: rgba(255,255,255,0.8); margin: 5px 0 0; font-size: 12px; letter-spacing: 3px; }
    .body { padding: 30px; color: #ddd; }
    .body h2 { color: #10b981; margin-top: 0; }
    .info-row { display: flex; justify-content: space-between; gap: 16px; padding: 10px 0; border-bottom: 1px solid #222; }
    .info-label { color: #888; font-size: 14px; }
    .info-value { color: #fff; font-weight: 600; font-size: 14px; text-align: right; }
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
      &copy; ${new Date().getFullYear()} OneHour Challenge. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

export const sendBookingEmail = async (booking) => {
  const content = `
    <p>A new booking enquiry has been received:</p>
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

export const sendContactEmail = async ({ name, email, mobile, message }) => {
  const content = `
    <p>New contact form submission:</p>
    <div class="info-row"><span class="info-label">Name</span><span class="info-value">${name}</span></div>
    <div class="info-row"><span class="info-label">Email</span><span class="info-value">${email}</span></div>
    <div class="info-row"><span class="info-label">Mobile</span><span class="info-value">${mobile || 'N/A'}</span></div>
    <div style="margin-top: 15px;">
      <p style="color: #888; font-size: 14px; margin-bottom: 5px;">Message:</p>
      <p style="color: #fff; background: #1a1a1a; padding: 15px; border-radius: 8px; border-left: 3px solid #10b981;">${message}</p>
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
    <p>A new lead has been collected:</p>
    <div class="info-row"><span class="info-label">Name</span><span class="info-value">${name || 'Not provided'}</span></div>
    <div class="info-row"><span class="info-label">Email</span><span class="info-value">${email || 'Not provided'}</span></div>
    <div class="info-row"><span class="info-label">Mobile</span><span class="info-value">${mobile || 'Not provided'}</span></div>
  `;

  try {
    await transporter.sendMail({
      from: `"OneHour Challenge" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Lead: ${name || 'Unknown'}`,
      html: emailTemplate('New Lead Captured', content),
    });
  } catch (error) {
    console.error('Lead email error:', error);
  }
};
