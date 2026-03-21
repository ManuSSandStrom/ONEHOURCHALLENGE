import Contact from '../models/Contact.js';
import Lead from '../models/Lead.js';
import { sendContactEmail } from '../utils/mailer.js';

export const submitContact = async (req, res) => {
  try {
    const { name, email, mobile, message, gender, age, sourcePage, sourcePath } = req.body;
    if (!name || !email || !mobile || !message || !gender || !age) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const contact = new Contact({ name, email, mobile, message });
    const lead = new Lead({
      name,
      email,
      mobile,
      gender,
      age: Number(age),
      source: 'contact-form',
      sourcePage: sourcePage || 'Contact',
      sourcePath: sourcePath || '/contact',
      interestType: 'contact',
      interestLabel: 'Contact Request',
      message,
    });

    await Promise.all([contact.save(), lead.save()]);
    // Return response immediately for speed, send email in background
    res.status(201).json({ success: true });
    sendContactEmail({ name, email, mobile, message }).catch(err => console.error('Email background fail', err));
    return;
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};
