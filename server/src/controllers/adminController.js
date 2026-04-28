import Booking from '../models/Booking.js';
import Lead from '../models/Lead.js';
import Contact from '../models/Contact.js';

// Dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    const [totalBookings, totalLeads, totalContacts, newLeads, newContacts] = await Promise.all([
      Booking.countDocuments(),
      Lead.countDocuments(),
      Contact.countDocuments(),
      Lead.countDocuments({ status: 'new' }),
      Contact.countDocuments({ status: 'new' }),
    ]);

    const [leadsByPage, leadsByInterest, leadsBySource, planEnquiries, leadsByInterestType, leadsByPlan, leadsByDuration] = await Promise.all([
      Lead.aggregate([
        { $group: { _id: '$sourcePage', count: { $sum: 1 } } },
        { $sort: { count: -1, _id: 1 } }
      ]),
      Lead.aggregate([
        { $group: { _id: '$interestLabel', count: { $sum: 1 } } },
        { $sort: { count: -1, _id: 1 } }
      ]),
      Lead.aggregate([
        { $group: { _id: '$source', count: { $sum: 1 } } },
        { $sort: { count: -1, _id: 1 } }
      ]),
      Lead.countDocuments({ $or: [{ interestType: 'plan' }, { planType: { $ne: null } }] }),
      Lead.aggregate([{ $group: { _id: '$interestType', count: { $sum: 1 } } }]),
      Lead.aggregate([{ $match: { planType: { $ne: null } } }, { $group: { _id: '$planType', count: { $sum: 1 } } }]),
      Lead.aggregate([{ $match: { duration: { $ne: null } } }, { $group: { _id: '$duration', count: { $sum: 1 } } }]),
    ]);

    const toObject = (items, keys = []) => {
      const output = Object.fromEntries(keys.map((key) => [key, 0]));
      items.forEach((item) => {
        if (item._id) output[item._id] = item.count;
      });
      return output;
    };

    res.json({
      success: true,
      data: {
        totalBookings,
        totalLeads,
        newLeads,
        totalContacts,
        newContacts,
        totalStoredEnquiries: totalLeads + totalContacts,
        planEnquiries,
        leadsByPage,
        leadsByInterest,
        leadsBySource,
        leadsByInterestType: toObject(leadsByInterestType, ['plan', 'program', 'general']),
        leadsByPlan: toObject(leadsByPlan, ['PRO', 'ADVANCE']),
        leadsByDuration: toObject(leadsByDuration, ['Starter', '3 Months', '6 Months', 'Long Term']),
      },
      totalBookings,
      totalLeads,
      newLeads,
      totalContacts,
      newContacts,
      totalStoredEnquiries: totalLeads + totalContacts,
      planEnquiries,
      leadsByPage,
      leadsByInterest,
      leadsBySource,
      leadsByInterestType: toObject(leadsByInterestType, ['plan', 'program', 'general']),
      leadsByPlan: toObject(leadsByPlan, ['PRO', 'ADVANCE']),
      leadsByDuration: toObject(leadsByDuration, ['Starter', '3 Months', '6 Months', 'Long Term']),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch stats' });
  }
};

// Export bookings as CSV
export const exportBookingsCSV = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    
    const headers = 'Name,Email,Mobile,Plan,Duration,Days,Time Slot,Date\n';
    const csv = bookings.map(b => 
      `"${b.name}","${b.email}","${b.mobile}","${b.planType}","${b.duration}","${b.preferredDays.join('; ')}","${b.preferredTimeSlot}","${b.createdAt.toISOString()}"`
    ).join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=bookings.csv');
    res.send(headers + csv);
  } catch (error) {
    res.status(500).json({ error: 'Failed to export bookings' });
  }
};
