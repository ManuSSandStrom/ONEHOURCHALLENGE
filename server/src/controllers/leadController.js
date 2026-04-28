import Lead from '../models/Lead.js';

export const createLead = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      gender,
      age,
      location,
      source = 'registration',
      sourcePage,
      sourcePath,
      interestType = 'general',
      interestLabel = 'General Enquiry',
      planType = null,
      duration = null,
      message = null,
    } = req.body;

    if (!name || !mobile || !age || !sourcePage) {
      return res.status(400).json({ success: false, message: 'Name, mobile, age, and source page are required' });
    }

    if (!/^\d{10}$/.test(String(mobile).replace(/\D/g, '').slice(-10))) {
      return res.status(400).json({ success: false, message: 'Please enter a valid 10 digit phone number' });
    }

    const lead = await Lead.create({
      name,
      email: email || null,
      mobile,
      gender: gender || null,
      age: Number(age),
      location: location || null,
      source,
      sourcePage,
      sourcePath: sourcePath || null,
      interestType,
      interestLabel,
      planType,
      duration,
      message,
    });

    res.status(201).json({ success: true, data: lead, lead, message: 'Lead created' });
  } catch (error) {
    console.error('Create lead error:', error);
    res.status(500).json({ success: false, message: 'Failed to create lead' });
  }
};

export const getAllLeads = async (req, res) => {
  try {
    const { page, interestType, status, planType, duration, search } = req.query;
    const filter = {};

    if (page) filter.sourcePage = page;
    if (interestType) filter.interestType = interestType;
    if (status) filter.status = status;
    if (planType) filter.planType = planType;
    if (duration) filter.duration = duration;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { mobile: { $regex: search, $options: 'i' } },
      ];
    }

    const leads = await Lead.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: leads, leads });
  } catch (error) {
    console.error('Get leads error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch leads' });
  }
};

export const updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const lead = await Lead.findByIdAndUpdate(id, { status }, { new: true });
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    res.json({ success: true, data: lead, lead, message: 'Lead status updated' });
  } catch (error) {
    console.error('Update lead status error:', error);
    res.status(500).json({ success: false, message: 'Failed to update lead status' });
  }
};

export const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await Lead.findByIdAndDelete(id);

    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    res.json({ success: true, message: 'Lead deleted' });
  } catch (error) {
    console.error('Delete lead error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete lead' });
  }
};
