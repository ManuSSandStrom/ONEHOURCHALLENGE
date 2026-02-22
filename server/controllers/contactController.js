import Contact from '../models/Contact.js';
import { sendContactEmail } from '../utils/mailer.js';

export const submitContact = async (req, res) => {
  try {
    const { name, email, mobile, message } = req.body;
    if (!name || !email || !mobile || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const contact = new Contact({ name, email, mobile, message });
    await contact.save();
    // Return response immediately for speed, send email in background
    res.status(201).json({ success: true });
    sendContactEmail({ name, email, mobile, message }).catch(err => console.error('Email background fail', err));
    return;
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};
