import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/clerk-react';
import { FiCalendar, FiUser, FiGrid, FiLogOut, FiEdit3, FiSave, FiTarget, FiActivity, FiHeart, FiTrendingUp, FiPhone, FiMail, FiCheck } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';
import API from '../utils/api';
import { getWhatsAppUrl } from '../utils/constants';

const navItems = [
  { id: 'overview', label: 'Overview', icon: <FiGrid /> },
  { id: 'profile', label: 'My Profile', icon: <FiUser /> },
  { id: 'bookings', label: 'My Bookings', icon: <FiCalendar /> },
];

const GOAL_OPTIONS = ['Weight Loss', 'Muscle Gain', 'Maintenance', 'Flexibility', 'General Fitness'];
const ACTIVITY_OPTIONS = ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Extremely Active'];
const GENDER_OPTIONS = ['Male', 'Female', 'Other'];

const GOAL_EMOJIS = {
  'Weight Loss': '🔥',
  'Muscle Gain': '💪',
  'Maintenance': '⚖️',
  'Flexibility': '🧘',
  'General Fitness': '🏃',
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState([]);
  const [profileData, setProfileData] = useState({
    name: '', email: '', phone: '', age: '', gender: '',
    height: '', weight: '', targetWeight: '', fitnessGoal: '', activityLevel: '', medicalConditions: '',
  });
  const [profileExists, setProfileExists] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  const userId = user?.id || '';
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
    if (!userId) return;
    try {
      const [bookingsRes, profileRes] = await Promise.all([
        API.get(`/bookings/user/${userId}`).catch(() => ({ data: [] })),
        API.get(`/profile/${userId}`).catch(() => ({ data: { exists: false, profile: null } })),
      ]);
      setBookings(bookingsRes.data);

      if (profileRes.data?.exists && profileRes.data?.profile) {
        const p = profileRes.data.profile;
        setProfileData({
          name: p.name || user?.fullName || '',
          email: p.email || userEmail,
          phone: p.phone || '',
          age: p.age || '',
          gender: p.gender || '',
          height: p.height || '',
          weight: p.weight || '',
          targetWeight: p.targetWeight || '',
          fitnessGoal: p.fitnessGoal || '',
          activityLevel: p.activityLevel || '',
          medicalConditions: p.medicalConditions || '',
        });
        setProfileExists(true);
      } else {
        setProfileData(prev => ({
          ...prev,
          name: user?.fullName || '',
          email: userEmail,
        }));
        setIsEditing(true);
      }
    } catch (error) {
      console.error('Dashboard fetch error:', error);
    }
  }, [userId, userEmail, user?.fullName]);

  useEffect(() => {
    if (isLoaded && userId) fetchData();
  }, [isLoaded, userId, fetchData]);

  const handleProfileSave = async () => {
    setSaving(true);
    try {
      await API.post('/profile', {
        clerkUserId: userId,
        ...profileData,
        age: profileData.age ? Number(profileData.age) : null,
        height: profileData.height ? Number(profileData.height) : null,
        weight: profileData.weight ? Number(profileData.weight) : null,
        targetWeight: profileData.targetWeight ? Number(profileData.targetWeight) : null,
      });
      setProfileExists(true);
      setIsEditing(false);
      toast.success('Profile saved successfully! 🎉');
    } catch (error) {
      console.error('Save profile error:', error);
      toast.error('Failed to save profile');
    }
    setSaving(false);
  };

  const handleWhatsAppBooking = () => {
    const msg = `Hi OneHour Challenge! 👋\n\nI'd like to book a session.\n\n👤 *Name:* ${profileData.name || userName}\n📧 *Email:* ${profileData.email || userEmail}\n📱 *Phone:* ${profileData.phone || 'N/A'}\n🎯 *Goal:* ${profileData.fitnessGoal || 'N/A'}\n\nPlease help me get started!`;
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  const bmi = profileData.weight && profileData.height
    ? (Number(profileData.weight) / ((Number(profileData.height) / 100) ** 2)).toFixed(1)
    : null;

  const getBmiCategory = (val) => {
    if (val < 18.5) return { label: 'Underweight', color: '#f59e0b' };
    if (val < 25) return { label: 'Normal', color: '#10b981' };
    if (val < 30) return { label: 'Overweight', color: '#f59e0b' };
    return { label: 'Obese', color: '#ef4444' };
  };

  const profileCompletionPercent = (() => {
    const fields = ['name', 'phone', 'age', 'gender', 'height', 'weight', 'fitnessGoal', 'activityLevel'];
    const filled = fields.filter(f => profileData[f] && profileData[f] !== '');
    return Math.round((filled.length / fields.length) * 100);
  })();

  return (
    <div className="dashboard">
      <div className="dashboard-video-bg" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' }}></div>

      <div className="dashboard-content">
        <div className="container">
          {/* ── Welcome Header ── */}
          <div className="dashboard-welcome">
            <div className="dashboard-welcome-left">
              {user?.imageUrl ? (
                <img src={user.imageUrl} alt={userName} style={{ width: '48px', height: '48px', borderRadius: '50%', border: '3px solid var(--color-primary)', objectFit: 'cover', flexShrink: 0 }} />
              ) : (
                <div className="dashboard-profile-avatar">{userName.charAt(0).toUpperCase()}</div>
              )}
              <div style={{ minWidth: 0 }}>
                <h1>Welcome, <span style={{ color: 'var(--color-primary)' }}>{userName}</span></h1>
                <p>{userEmail}</p>
              </div>
            </div>
            {profileData.fitnessGoal && (
              <div className="dashboard-goal-badge">
                <span>{GOAL_EMOJIS[profileData.fitnessGoal] || '🎯'}</span>
                <span>{profileData.fitnessGoal}</span>
              </div>
            )}
          </div>

          <div className="dashboard-grid">
            {/* ── Sidebar / Tab Nav ── */}
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
                <button className="dashboard-nav-item logout-btn" onClick={handleLogout} id="logout-btn">
                  <FiLogOut /> Logout
                </button>
              </div>
            </div>

            {/* ── Main Content ── */}
            <div className="dashboard-main">

              {/* ============ OVERVIEW ============ */}
              {activeTab === 'overview' && (
                <>
                  {/* Profile Completion */}
                  {profileCompletionPercent < 100 && (
                    <div className="dashboard-card" style={{ background: 'linear-gradient(135deg, rgba(0, 109, 60, 0.06), rgba(0, 109, 60, 0.02))', border: '1px solid rgba(0, 109, 60, 0.15)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <h4 style={{ color: 'var(--color-gray-900)', fontFamily: 'var(--font-heading)', fontWeight: 700, margin: 0, fontSize: '0.95rem' }}>
                          Complete Your Profile
                        </h4>
                        <span style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.85rem' }}>{profileCompletionPercent}%</span>
                      </div>
                      <div className="completion-bar-track">
                        <div className="completion-bar-fill" style={{ width: `${profileCompletionPercent}%` }}></div>
                      </div>
                      <p style={{ color: 'var(--color-gray-500)', fontSize: '0.78rem', marginTop: '10px', marginBottom: '12px' }}>
                        Fill in your fitness details for a personalized experience.
                      </p>
                      <button className="btn btn-primary btn-sm" onClick={() => { setActiveTab('profile'); setIsEditing(true); }} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <FiEdit3 size={14} /> Complete Profile
                      </button>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="dashboard-stat-grid">
                    <div className="dashboard-stat-card">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <FiTarget size={16} style={{ color: 'var(--color-primary)' }} />
                        <div className="dashboard-stat-label" style={{ margin: 0 }}>Goal</div>
                      </div>
                      <div className="dashboard-stat-value" style={{ color: 'var(--color-primary)' }}>
                        {profileData.fitnessGoal || '—'}
                      </div>
                    </div>
                    <div className="dashboard-stat-card">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <FiActivity size={16} style={{ color: 'var(--color-primary)' }} />
                        <div className="dashboard-stat-label" style={{ margin: 0 }}>BMI</div>
                      </div>
                      <div className="dashboard-stat-value">
                        {bmi ? (
                          <span style={{ color: getBmiCategory(Number(bmi)).color }}>
                            {bmi} <span style={{ fontSize: '0.6rem', fontWeight: 500 }}>({getBmiCategory(Number(bmi)).label})</span>
                          </span>
                        ) : '—'}
                      </div>
                    </div>
                    <div className="dashboard-stat-card">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <FiCalendar size={16} style={{ color: 'var(--color-primary)' }} />
                        <div className="dashboard-stat-label" style={{ margin: 0 }}>Bookings</div>
                      </div>
                      <div className="dashboard-stat-value">{bookings.length}</div>
                    </div>
                  </div>

                  {/* Body Metrics */}
                  {profileExists && (profileData.height || profileData.weight) && (
                    <div className="dashboard-card">
                      <h3 className="dashboard-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FiHeart style={{ color: 'var(--color-primary)' }} /> Body Metrics
                      </h3>
                      <div className="body-metrics-grid">
                        {profileData.height && (
                          <div className="body-metric-card">
                            <div className="body-metric-label">Height</div>
                            <div className="body-metric-value">{profileData.height}<span> cm</span></div>
                          </div>
                        )}
                        {profileData.weight && (
                          <div className="body-metric-card">
                            <div className="body-metric-label">Weight</div>
                            <div className="body-metric-value">{profileData.weight}<span> kg</span></div>
                          </div>
                        )}
                        {profileData.targetWeight && (
                          <div className="body-metric-card">
                            <div className="body-metric-label">Target</div>
                            <div className="body-metric-value" style={{ color: 'var(--color-primary)' }}>{profileData.targetWeight}<span> kg</span></div>
                          </div>
                        )}
                        {profileData.age && (
                          <div className="body-metric-card">
                            <div className="body-metric-label">Age</div>
                            <div className="body-metric-value">{profileData.age}<span> yrs</span></div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="dashboard-card">
                    <h3 className="dashboard-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FiTrendingUp style={{ color: 'var(--color-primary)' }} /> Quick Actions
                    </h3>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <button className="btn btn-primary btn-sm" onClick={handleWhatsAppBooking} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FaWhatsapp size={16} /> Book Session
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('profile')} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FiUser size={14} /> Edit Profile
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('bookings')} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FiCalendar size={14} /> Bookings
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* ============ MY PROFILE ============ */}
              {activeTab === 'profile' && (
                <div className="dashboard-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '10px' }}>
                    <h3 className="dashboard-card-title" style={{ margin: 0 }}>My Fitness Profile</h3>
                    {!isEditing ? (
                      <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(true)} style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                        <FiEdit3 size={14} /> Edit
                      </button>
                    ) : (
                      <button className="btn btn-primary btn-sm" onClick={handleProfileSave} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                        <FiSave size={14} /> {saving ? 'Saving...' : 'Save'}
                      </button>
                    )}
                  </div>

                  {/* Avatar Card */}
                  <div className="dashboard-profile-header">
                    {user?.imageUrl ? (
                      <img src={user.imageUrl} alt={userName} />
                    ) : (
                      <div className="dashboard-profile-avatar">
                        {userName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="dashboard-profile-info">
                      <p className="dashboard-profile-name">{profileData.name || userName}</p>
                      <p className="dashboard-profile-detail"><FiMail size={13} /> {profileData.email || userEmail}</p>
                      {profileData.phone && (
                        <p className="dashboard-profile-detail"><FiPhone size={13} /> {profileData.phone}</p>
                      )}
                    </div>
                  </div>

                  {isEditing ? (
                    /* ── Edit Mode ── */
                    <div style={{ display: 'grid', gap: '24px' }}>
                      {/* Personal Info */}
                      <div>
                        <h4 className="form-section-title">Personal Information</h4>
                        <div className="form-fields-grid">
                          <div className="form-field">
                            <label htmlFor="profile-name">Full Name</label>
                            <input className="form-input" id="profile-name" name="name" autoComplete="name" value={profileData.name} onChange={e => setProfileData({ ...profileData, name: e.target.value })} placeholder="Your full name" />
                          </div>
                          <div className="form-field">
                            <label htmlFor="profile-phone">Phone Number</label>
                            <input className="form-input" id="profile-phone" name="phone" autoComplete="tel" type="tel" value={profileData.phone} onChange={e => setProfileData({ ...profileData, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" />
                          </div>
                          <div className="form-field">
                            <label htmlFor="profile-age">Age</label>
                            <input className="form-input" id="profile-age" name="age" autoComplete="off" type="number" value={profileData.age} onChange={e => setProfileData({ ...profileData, age: e.target.value })} placeholder="25" />
                          </div>
                          <div className="form-field">
                            <label htmlFor="profile-gender">Gender</label>
                            <select className="form-input" id="profile-gender" name="gender" autoComplete="sex" value={profileData.gender} onChange={e => setProfileData({ ...profileData, gender: e.target.value })}>
                              <option value="">Select</option>
                              {GENDER_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Body Metrics */}
                      <div>
                        <h4 className="form-section-title">Body Metrics</h4>
                        <div className="form-fields-grid">
                          <div className="form-field">
                            <label htmlFor="profile-height">Height (cm)</label>
                            <input className="form-input" id="profile-height" name="height" autoComplete="off" type="number" value={profileData.height} onChange={e => setProfileData({ ...profileData, height: e.target.value })} placeholder="170" />
                          </div>
                          <div className="form-field">
                            <label htmlFor="profile-weight">Current Weight (kg)</label>
                            <input className="form-input" id="profile-weight" name="weight" autoComplete="off" type="number" value={profileData.weight} onChange={e => setProfileData({ ...profileData, weight: e.target.value })} placeholder="70" />
                          </div>
                          <div className="form-field">
                            <label htmlFor="profile-target-weight">Target Weight (kg)</label>
                            <input className="form-input" id="profile-target-weight" name="targetWeight" autoComplete="off" type="number" value={profileData.targetWeight} onChange={e => setProfileData({ ...profileData, targetWeight: e.target.value })} placeholder="65" />
                          </div>
                        </div>
                      </div>

                      {/* Fitness Goals */}
                      <div>
                        <h4 className="form-section-title">Fitness Goals</h4>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-gray-500)', marginBottom: '8px', fontWeight: 500 }}>Your Primary Goal</label>
                        <div className="goal-chips">
                          {GOAL_OPTIONS.map(goal => (
                            <button
                              key={goal}
                              type="button"
                              className={`goal-chip ${profileData.fitnessGoal === goal ? 'selected' : ''}`}
                              onClick={() => setProfileData({ ...profileData, fitnessGoal: goal })}
                            >
                              {GOAL_EMOJIS[goal]} {goal}
                              {profileData.fitnessGoal === goal && <FiCheck size={14} />}
                            </button>
                          ))}
                        </div>

                        <div style={{ marginTop: '16px' }}>
                          <div className="form-field">
                            <label htmlFor="profile-activity">Activity Level</label>
                            <select className="form-input" id="profile-activity" name="activityLevel" autoComplete="off" value={profileData.activityLevel} onChange={e => setProfileData({ ...profileData, activityLevel: e.target.value })}>
                              <option value="">Select Activity Level</option>
                              {ACTIVITY_OPTIONS.map(a => <option key={a} value={a}>{a}</option>)}
                            </select>
                          </div>
                        </div>

                        <div style={{ marginTop: '14px' }}>
                          <div className="form-field">
                            <label htmlFor="profile-medical">Medical Conditions (Optional)</label>
                            <textarea className="form-input" id="profile-medical" name="medicalConditions" autoComplete="off" value={profileData.medicalConditions} onChange={e => setProfileData({ ...profileData, medicalConditions: e.target.value })} placeholder="Any injuries, allergies, or conditions..." rows={3} style={{ minHeight: '80px', resize: 'vertical' }} />
                          </div>
                        </div>
                      </div>

                      {/* Save Button */}
                      <div style={{ paddingTop: '12px', borderTop: '1px solid var(--color-dark-alt)' }}>
                        <button className="btn btn-primary" onClick={handleProfileSave} disabled={saving} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                          <FiSave size={16} /> {saving ? 'Saving...' : 'Save Profile'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* ── View Mode ── */
                    <div>
                      {[
                        { label: 'Full Name', value: profileData.name, icon: <FiUser size={14} /> },
                        { label: 'Email', value: profileData.email, icon: <FiMail size={14} /> },
                        { label: 'Phone', value: profileData.phone, icon: <FiPhone size={14} /> },
                        { label: 'Age', value: profileData.age ? `${profileData.age} years` : '' },
                        { label: 'Gender', value: profileData.gender },
                        { label: 'Height', value: profileData.height ? `${profileData.height} cm` : '' },
                        { label: 'Weight', value: profileData.weight ? `${profileData.weight} kg` : '' },
                        { label: 'Target', value: profileData.targetWeight ? `${profileData.targetWeight} kg` : '' },
                        { label: 'Goal', value: profileData.fitnessGoal ? `${GOAL_EMOJIS[profileData.fitnessGoal] || ''} ${profileData.fitnessGoal}` : '' },
                        { label: 'Activity', value: profileData.activityLevel },
                        { label: 'BMI', value: bmi ? `${bmi} (${getBmiCategory(Number(bmi)).label})` : '' },
                      ].filter(item => item.value).map((item, i) => (
                        <div className="profile-view-row" key={i}>
                          <span className="profile-view-label">{item.icon} {item.label}</span>
                          <span className="profile-view-value">{item.value}</span>
                        </div>
                      ))}
                      {profileData.medicalConditions && (
                        <div style={{ padding: '14px 0' }}>
                          <span style={{ color: 'var(--color-gray-500)', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Medical Notes</span>
                          <p style={{ color: 'var(--color-gray-700)', fontSize: '0.82rem', lineHeight: '1.6', margin: 0, background: 'var(--color-bg-light)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>{profileData.medicalConditions}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* ============ MY BOOKINGS ============ */}
              {activeTab === 'bookings' && (
                <div className="dashboard-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', gap: '10px' }}>
                    <h3 className="dashboard-card-title" style={{ margin: 0 }}>My Bookings</h3>
                    <button className="btn btn-primary btn-sm" onClick={handleWhatsAppBooking} style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                      <FaWhatsapp size={14} /> Book
                    </button>
                  </div>

                  {bookings.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 16px' }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📋</div>
                      <h4 style={{ color: 'var(--color-gray-900)', fontFamily: 'var(--font-heading)', marginBottom: '8px', fontSize: '1rem' }}>No Bookings Yet</h4>
                      <p style={{ color: 'var(--color-gray-500)', marginBottom: '20px', maxWidth: '320px', marginLeft: 'auto', marginRight: 'auto', lineHeight: '1.6', fontSize: '0.85rem' }}>
                        Start your fitness journey by booking a session through WhatsApp.
                      </p>
                      <button className="btn btn-primary" onClick={handleWhatsAppBooking} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <FaWhatsapp size={16} /> Book First Session
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gap: '12px' }}>
                      {bookings.map((booking, i) => (
                        <div className="booking-card" key={i}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', gap: '8px' }}>
                            <span style={{ background: 'rgba(0,109,60,0.1)', color: 'var(--color-primary)', padding: '3px 12px', borderRadius: '50px', fontSize: '0.72rem', fontWeight: 700 }}>
                              {booking.planType}
                            </span>
                            <span style={{ color: booking.paymentStatus === 'completed' ? '#10b981' : '#f59e0b', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                              {booking.paymentStatus === 'completed' ? <><FiCheck size={13} /> Paid</> : '⏳ Pending'}
                            </span>
                          </div>
                          <p style={{ color: 'var(--color-gray-700)', fontSize: '0.85rem', marginBottom: '8px', fontWeight: 500 }}>
                            {booking.duration} • {booking.preferredDays?.join(', ')} • {booking.preferredTimeSlot}
                          </p>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                            <p style={{ color: 'var(--color-gray-500)', fontSize: '0.72rem', margin: 0 }}>
                              {new Date(booking.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                            <button
                              onClick={() => {
                                const msg = `Hi! Regarding my booking:\n\n📋 *Plan:* ${booking.planType}\n⏰ *Duration:* ${booking.duration}\n📅 *Days:* ${booking.preferredDays?.join(', ')}\n🕐 *Time:* ${booking.preferredTimeSlot}\n\nI need assistance.`;
                                window.open(getWhatsAppUrl(msg), '_blank');
                              }}
                              style={{ background: 'none', border: 'none', color: '#25d366', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}
                            >
                              <FaWhatsapp size={13} /> Contact
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
