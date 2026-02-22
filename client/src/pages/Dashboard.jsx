import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/clerk-react';
import { FiCalendar, FiCreditCard, FiUser, FiSettings, FiGrid, FiLogOut } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../utils/api';
import BookingModal from '../components/BookingModal';
import { PLACEHOLDERS } from '../utils/constants';

const navItems = [
  { id: 'overview', label: 'Overview', icon: <FiGrid /> },
  { id: 'bookings', label: 'My Bookings', icon: <FiCalendar /> },
  { id: 'book', label: 'Book Sessions', icon: <FiCalendar /> },
  { id: 'payments', label: 'Payment History', icon: <FiCreditCard /> },
  { id: 'profile', label: 'Profile Settings', icon: <FiSettings /> },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [bookingOpen, setBookingOpen] = useState(false);
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  const userId = user?.id || 'demo-user';
  const userName = user?.firstName || user?.fullName || 'User';
  const userEmail = user?.primaryEmailAddress?.emailAddress || '';

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Logout failed. Please try again.');
    }
  };

  const fetchData = useCallback(async () => {
    // setLoading(true);
    try {
      const [bookingsRes, paymentsRes] = await Promise.all([
        API.get(`/bookings/user/${userId}`).catch(() => ({ data: [] })),
        API.get(`/payments/user/${userId}`).catch(() => ({ data: [] })),
      ]);
      setBookings(bookingsRes.data);
      setPayments(paymentsRes.data);
    } catch (error) {
      console.error('Dashboard fetch error:', error);
    }
    // setLoading(false);
  }, [userId]);

  useEffect(() => {
    if (isLoaded) {
       fetchData();
    }
  }, [isLoaded, fetchData]);

  return (
    <div className="dashboard">
      {/* Background video placeholder */}
      <div className="dashboard-video-bg" style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      }}>
        {/* Replace with: <video autoPlay muted loop playsInline src={PLACEHOLDERS.dashboardVideo} /> */}
      </div>

      <div className="dashboard-content">
        <div className="container">
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--color-gray-900)', marginBottom: '24px', fontSize: '1.8rem' }}>
            Welcome, <span style={{ color: 'var(--color-primary)' }}>{userName}</span>
          </h1>

          <div className="dashboard-grid">
            {/* Sidebar */}
            <div className="dashboard-sidebar">
              {navItems.map(item => (
                <button
                  key={item.id}
                  className={`dashboard-nav-item ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}

              <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--color-dark-alt)' }}>
                <button
                  className="dashboard-nav-item logout-btn"
                  onClick={handleLogout}
                  id="logout-btn"
                >
                  <FiLogOut />
                  Logout
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="dashboard-main">
              {/* Overview */}
              {activeTab === 'overview' && (
                <>
                  <div className="dashboard-stat-grid">
                    <div className="dashboard-stat-card">
                      <div className="dashboard-stat-label">Active Plan</div>
                      <div className="dashboard-stat-value" style={{ color: 'var(--color-primary)' }}>
                        {bookings.length > 0 ? bookings[0].planType : '—'}
                      </div>
                    </div>
                    <div className="dashboard-stat-card">
                      <div className="dashboard-stat-label">Total Bookings</div>
                      <div className="dashboard-stat-value">{bookings.length}</div>
                    </div>
                    <div className="dashboard-stat-card">
                      <div className="dashboard-stat-label">Payments Made</div>
                      <div className="dashboard-stat-value">{payments.length}</div>
                    </div>
                  </div>

                  <div className="dashboard-card">
                    <h3 className="dashboard-card-title">Quick Actions</h3>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <button className="btn btn-primary" onClick={() => setBookingOpen(true)}>
                        Book a Session
                      </button>
                      <button className="btn btn-secondary" onClick={() => setActiveTab('bookings')}>
                        View Bookings
                      </button>
                    </div>
                  </div>

                  {bookings.length > 0 && (
                    <div className="dashboard-card">
                      <h3 className="dashboard-card-title">Latest Booking</h3>
                      <div style={{ display: 'grid', gap: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--color-dark-alt)' }}>
                          <span style={{ color: 'var(--color-gray-400)' }}>Plan</span>
                          <span style={{ color: 'var(--color-white)', fontWeight: 600 }}>{bookings[0].planType}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--color-dark-alt)' }}>
                          <span style={{ color: 'var(--color-gray-400)' }}>Duration</span>
                          <span style={{ color: 'var(--color-white)', fontWeight: 600 }}>{bookings[0].duration}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--color-dark-alt)' }}>
                          <span style={{ color: 'var(--color-gray-400)' }}>Days</span>
                          <span style={{ color: 'var(--color-white)', fontWeight: 600 }}>{bookings[0].preferredDays?.join(', ')}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                          <span style={{ color: 'var(--color-gray-400)' }}>Time Slot</span>
                          <span style={{ color: 'var(--color-white)', fontWeight: 600 }}>{bookings[0].preferredTimeSlot}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* My Bookings */}
              {activeTab === 'bookings' && (
                <div className="dashboard-card">
                  <h3 className="dashboard-card-title">My Bookings</h3>
                  {bookings.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-gray-500)' }}>
                      <p>No bookings yet. Start your fitness journey today!</p>
                      <button className="btn btn-primary" style={{ marginTop: '16px' }} onClick={() => setBookingOpen(true)}>
                        Book Your First Session
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gap: '16px' }}>
                      {bookings.map((booking, i) => (
                        <div key={i} className="card" style={{ background: 'var(--color-dark)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                            <div>
                              <span style={{ 
                                background: 'rgba(0,109,60,0.1)', 
                                color: 'var(--color-primary)', 
                                padding: '4px 12px', 
                                borderRadius: '50px', 
                                fontSize: '0.75rem', 
                                fontWeight: 700 
                              }}>
                                {booking.planType}
                              </span>
                            </div>
                            <span style={{ 
                              color: booking.paymentStatus === 'completed' ? '#4caf50' : '#ff9800',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                            }}>
                              {booking.paymentStatus === 'completed' ? '✓ Paid' : '⏳ Pending'}
                            </span>
                          </div>
                          <p style={{ color: 'var(--color-gray-300)', fontSize: '0.85rem' }}>
                            {booking.duration} • {booking.preferredDays?.join(', ')} • {booking.preferredTimeSlot}
                          </p>
                          <p style={{ color: 'var(--color-gray-600)', fontSize: '0.75rem', marginTop: '8px' }}>
                            Booked on {new Date(booking.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Book Sessions */}
              {activeTab === 'book' && (
                <div className="dashboard-card" style={{ textAlign: 'center', padding: '60px 28px' }}>
                  <h3 className="dashboard-card-title" style={{ marginBottom: '16px' }}>Ready to Book?</h3>
                  <p style={{ color: 'var(--color-gray-400)', marginBottom: '24px' }}>
                    Choose your plan and schedule your sessions.
                  </p>
                  <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button className="btn btn-primary btn-lg" onClick={() => { setBookingOpen(true); }}>
                      Book PRO Session
                    </button>
                    <button className="btn btn-secondary btn-lg" onClick={() => { setBookingOpen(true); }}>
                      Book ADVANCE Session
                    </button>
                  </div>
                </div>
              )}

              {/* Payment History */}
              {activeTab === 'payments' && (
                <div className="dashboard-card">
                  <h3 className="dashboard-card-title">Payment History</h3>
                  {payments.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-gray-500)' }}>
                      <p>No payment history yet.</p>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gap: '12px' }}>
                      {payments.map((payment, i) => (
                        <div key={i} className="card" style={{ background: 'var(--color-dark)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <p style={{ color: 'var(--color-white)', fontWeight: 600 }}>₹{payment.amount?.toLocaleString()}</p>
                              <p style={{ color: 'var(--color-gray-500)', fontSize: '0.8rem' }}>{payment.planType} — {payment.duration}</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <span style={{ 
                                color: payment.status === 'completed' ? '#4caf50' : '#ff9800',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                              }}>
                                {payment.status === 'completed' ? '✓ Completed' : '⏳ Pending'}
                              </span>
                              <p style={{ color: 'var(--color-gray-600)', fontSize: '0.7rem', marginTop: '4px' }}>
                                {new Date(payment.createdAt).toLocaleDateString('en-IN')}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Profile Settings */}
              {activeTab === 'profile' && (
                <div className="dashboard-card">
                  <h3 className="dashboard-card-title">Profile Settings</h3>
                  <p style={{ color: 'var(--color-gray-400)', marginBottom: '24px' }}>
                    Your account details and preferences.
                  </p>

                  {/* User Avatar & Name */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', padding: '16px', background: 'var(--color-dark)', borderRadius: 'var(--radius-md)' }}>
                    {user?.imageUrl ? (
                      <img
                        src={user.imageUrl}
                        alt={userName}
                        style={{ width: '52px', height: '52px', borderRadius: '50%', border: '2px solid var(--color-primary)' }}
                      />
                    ) : (
                      <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>
                        {userName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p style={{ color: 'var(--color-gray-900)', fontWeight: 700, fontSize: '1rem', margin: '0 0 2px' }}>{user?.fullName || userName}</p>
                      <p style={{ color: 'var(--color-gray-500)', fontSize: '0.8rem', margin: 0 }}>{userEmail}</p>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--color-dark-alt)' }}>
                      <span style={{ color: 'var(--color-gray-400)' }}>Name</span>
                      <span style={{ color: 'var(--color-white)', fontWeight: 600 }}>{user?.fullName || userName}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--color-dark-alt)' }}>
                      <span style={{ color: 'var(--color-gray-400)' }}>Email</span>
                      <span style={{ color: 'var(--color-white)', fontWeight: 600 }}>{userEmail}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--color-dark-alt)' }}>
                      <span style={{ color: 'var(--color-gray-400)' }}>Authentication</span>
                      <span style={{ color: 'var(--color-white)', fontWeight: 600 }}>Google (via Clerk)</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--color-dark-alt)' }}>
                      <span style={{ color: 'var(--color-gray-400)' }}>Membership Status</span>
                      <span style={{ color: bookings.length > 0 ? '#4caf50' : 'var(--color-gray-500)', fontWeight: 600 }}>
                        {bookings.length > 0 ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <p style={{ marginTop: '24px', fontSize: '0.8rem', color: 'var(--color-gray-600)' }}>
                    For account changes, please contact support at manoharbasappagari18@gmail.com
                  </p>

                  <div style={{
                    marginTop: '32px',
                    paddingTop: '24px',
                    borderTop: '1px solid var(--color-dark-alt)',
                  }}>
                    <button
                      className="btn btn-secondary"
                      onClick={handleLogout}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#ef5350',
                        borderColor: 'rgba(229,57,53,0.3)',
                      }}
                      id="profile-logout-btn"
                    >
                      <FiLogOut /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        planType="PRO"
        onSuccess={fetchData}
      />
    </div>
  );
}
