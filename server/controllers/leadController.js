import Lead from '../models/Lead.js';

export const createLead = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      gender,
      age,
      source = 'registration',
      sourcePage,
      sourcePath,
      interestType = 'general',
      interestLabel = 'General Enquiry',
      planType = null,
      duration = null,
      message = null,
    } = req.body;

    if (!name || !mobile || !gender || !age || !sourcePage) {
      return res.status(400).json({ error: 'Name, mobile, gender, age, and source page are required' });
    }

    const lead = await Lead.create({
      name,
      email: email || null,
      mobile,
      gender,
      age: Number(age),
      source,
      sourcePage,
      sourcePath: sourcePath || null,
      interestType,
      interestLabel,
      planType,
      duration,
      message,
    });

    res.status(201).json({ success: true, lead });
  } catch (error) {
    console.error('Create lead error:', error);
    res.status(500).json({ error: 'Failed to create lead' });
  }
};

export const getAllLeads = async (req, res) => {
  try {
    const { page, interestType, status } = req.query;
    const filter = {};

    if (page) filter.sourcePage = page;
    if (interestType) filter.interestType = interestType;
    if (status) filter.status = status;

    const leads = await Lead.find(filter).sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    console.error('Get leads error:', error);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
};

export const updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const lead = await Lead.findByIdAndUpdate(id, { status }, { new: true });
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    res.json({ success: true, lead });
  } catch (error) {
    console.error('Update lead status error:', error);
    res.status(500).json({ error: 'Failed to update lead status' });
  }
};
