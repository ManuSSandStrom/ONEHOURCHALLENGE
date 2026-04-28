import Contact from '../models/Contact.js';
import Lead from '../models/Lead.js';
import { sendContactEmail } from '../utils/mailer.js';

export const submitContact = async (req, res) => {
  try {
    const { name, email, mobile, message, gender, age, sourcePage, sourcePath } = req.body;
    if (!name || !email || !mobile || !message || !gender || !age) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    const contact = new Contact({ name, email, mobile, message, gender, age: Number(age) });
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
    res.status(201).json({ success: true, data: contact, contact, message: 'Contact request submitted' });
    sendContactEmail({ name, email, mobile, message }).catch(err => console.error('Email background fail', err));
    return;
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts, contacts });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch contacts' });
  }
};

export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const contact = await Contact.findByIdAndUpdate(id, { status }, { new: true });
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    res.json({ success: true, data: contact, contact, message: 'Contact status updated' });
  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({ success: false, message: 'Failed to update contact status' });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    res.json({ success: true, message: 'Contact deleted' });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete contact' });
  }
};
