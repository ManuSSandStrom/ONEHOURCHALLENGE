import Booking from '../models/Booking.js';
import Lead from '../models/Lead.js';
import Contact from '../models/Contact.js';

// Dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    const [totalBookings, totalLeads, totalContacts] = await Promise.all([
      Booking.countDocuments(),
      Lead.countDocuments(),
      Contact.countDocuments(),
    ]);

    const [leadsByPage, leadsByInterest] = await Promise.all([
      Lead.aggregate([
        { $group: { _id: '$sourcePage', count: { $sum: 1 } } },
        { $sort: { count: -1, _id: 1 } }
      ]),
      Lead.aggregate([
        { $group: { _id: '$interestLabel', count: { $sum: 1 } } },
        { $sort: { count: -1, _id: 1 } }
      ]),
    ]);

    const [leadsByPage, leadsByInterest] = await Promise.all([
      Lead.aggregate([
        { $group: { _id: '$sourcePage', count: { $sum: 1 } } },
        { $sort: { count: -1, _id: 1 } }
      ]),
      Lead.aggregate([
        { $group: { _id: '$interestLabel', count: { $sum: 1 } } },
        { $sort: { count: -1, _id: 1 } }
      ]),
    ]);

    res.json({
      totalBookings,
      totalLeads,
      totalContacts,
      leadsByPage,
      leadsByInterest,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

// Export bookings as CSV
export const exportBookingsCSV = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    
    const headers = 'Name,Email,Mobile,Plan,Duration,Days,Time Slot,Payment Status,Date\n';
    const csv = bookings.map(b => 
      `"${b.name}","${b.email}","${b.mobile}","${b.planType}","${b.duration}","${b.preferredDays.join('; ')}","${b.preferredTimeSlot}","${b.paymentStatus}","${b.createdAt.toISOString()}"`
    ).join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=bookings.csv');
    res.send(headers + csv);
  } catch (error) {
    res.status(500).json({ error: 'Failed to export bookings' });
  }
};
