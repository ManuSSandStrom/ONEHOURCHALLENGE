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
        // Pre-fill from Clerk data
        setProfileData(prev => ({
          ...prev,
          name: user?.fullName || '',
          email: userEmail,
        }));
        setIsEditing(true); // Show edit mode for first time
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
      <div className="dashboard-video-bg" style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      }}></div>

      <div className="dashboard-content">
        <div className="container">
          {/* Welcome Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {user?.imageUrl ? (
                <img src={user.imageUrl} alt={userName} style={{ width: '56px', height: '56px', borderRadius: '50%', border: '3px solid var(--color-primary)', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 700, color: '#fff' }}>
                  {userName.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--color-gray-900)', fontSize: '1.6rem', margin: 0 }}>
                  Welcome, <span style={{ color: 'var(--color-primary)' }}>{userName}</span>
                </h1>
                <p style={{ color: 'var(--color-gray-500)', fontSize: '0.85rem', margin: '4px 0 0' }}>{userEmail}</p>
              </div>
            </div>
            {profileData.fitnessGoal && (
              <div style={{ background: 'rgba(0, 109, 60, 0.08)', border: '1px solid rgba(0, 109, 60, 0.15)', borderRadius: 'var(--radius-md)', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.3rem' }}>{GOAL_EMOJIS[profileData.fitnessGoal] || '🎯'}</span>
                <span style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.85rem' }}>{profileData.fitnessGoal}</span>
              </div>
            )}
          </div>

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
                <button className="dashboard-nav-item logout-btn" onClick={handleLogout} id="logout-btn">
                  <FiLogOut /> Logout
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="dashboard-main">
              {/* ============ OVERVIEW ============ */}
              {activeTab === 'overview' && (
                <>
                  {/* Profile Completion Banner */}
                  {profileCompletionPercent < 100 && (
                    <div style={{ background: 'linear-gradient(135deg, rgba(0, 109, 60, 0.06), rgba(0, 109, 60, 0.02))', border: '1px solid rgba(0, 109, 60, 0.15)', borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: '24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <h4 style={{ color: 'var(--color-gray-900)', fontFamily: 'var(--font-heading)', fontWeight: 700, margin: 0, fontSize: '1rem' }}>
                          Complete Your Profile
                        </h4>
                        <span style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.9rem' }}>{profileCompletionPercent}%</span>
                      </div>
                      <div style={{ height: '6px', background: 'var(--color-dark-alt)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${profileCompletionPercent}%`, background: 'var(--color-primary)', borderRadius: '3px', transition: 'width 0.5s ease' }}></div>
                      </div>
                      <p style={{ color: 'var(--color-gray-500)', fontSize: '0.8rem', marginTop: '10px', marginBottom: '12px' }}>
                        Fill in your fitness details for a personalized experience.
                      </p>
                      <button className="btn btn-primary btn-sm" onClick={() => { setActiveTab('profile'); setIsEditing(true); }} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <FiEdit3 size={14} /> Complete Profile
                      </button>
                    </div>
                  )}

                  {/* Stats Grid */}
                  <div className="dashboard-stat-grid">
                    <div className="dashboard-stat-card">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(0, 109, 60, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <FiTarget size={18} style={{ color: 'var(--color-primary)' }} />
                        </div>
                        <div className="dashboard-stat-label">Goal</div>
                      </div>
                      <div className="dashboard-stat-value" style={{ color: 'var(--color-primary)', fontSize: '1.1rem' }}>
                        {profileData.fitnessGoal || '—'}
                      </div>
                    </div>
                    <div className="dashboard-stat-card">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(0, 109, 60, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <FiActivity size={18} style={{ color: 'var(--color-primary)' }} />
                        </div>
                        <div className="dashboard-stat-label">BMI</div>
                      </div>
                      <div className="dashboard-stat-value" style={{ fontSize: '1.1rem' }}>
                        {bmi ? (
                          <span style={{ color: getBmiCategory(Number(bmi)).color }}>
                            {bmi} <span style={{ fontSize: '0.7rem', fontWeight: 500 }}>({getBmiCategory(Number(bmi)).label})</span>
                          </span>
                        ) : '—'}
                      </div>
                    </div>
                    <div className="dashboard-stat-card">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(0, 109, 60, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <FiCalendar size={18} style={{ color: 'var(--color-primary)' }} />
                        </div>
                        <div className="dashboard-stat-label">Bookings</div>
                      </div>
                      <div className="dashboard-stat-value" style={{ fontSize: '1.1rem' }}>{bookings.length}</div>
                    </div>
                  </div>

                  {/* Body Metrics Card (if profile exists) */}
                  {profileExists && (profileData.height || profileData.weight) && (
                    <div className="dashboard-card" style={{ marginTop: '20px' }}>
                      <h3 className="dashboard-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FiHeart style={{ color: 'var(--color-primary)' }} /> Body Metrics
                      </h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px', marginTop: '16px' }}>
                        {profileData.height && (
                          <div style={{ background: 'var(--color-bg-light)', borderRadius: 'var(--radius-md)', padding: '16px', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Height</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-gray-900)', fontFamily: 'var(--font-heading)' }}>{profileData.height}<span style={{ fontSize: '0.8rem', fontWeight: 500 }}> cm</span></div>
                          </div>
                        )}
                        {profileData.weight && (
                          <div style={{ background: 'var(--color-bg-light)', borderRadius: 'var(--radius-md)', padding: '16px', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Weight</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-gray-900)', fontFamily: 'var(--font-heading)' }}>{profileData.weight}<span style={{ fontSize: '0.8rem', fontWeight: 500 }}> kg</span></div>
                          </div>
                        )}
                        {profileData.targetWeight && (
                          <div style={{ background: 'var(--color-bg-light)', borderRadius: 'var(--radius-md)', padding: '16px', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Target</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>{profileData.targetWeight}<span style={{ fontSize: '0.8rem', fontWeight: 500 }}> kg</span></div>
                          </div>
                        )}
                        {profileData.age && (
                          <div style={{ background: 'var(--color-bg-light)', borderRadius: 'var(--radius-md)', padding: '16px', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Age</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-gray-900)', fontFamily: 'var(--font-heading)' }}>{profileData.age}<span style={{ fontSize: '0.8rem', fontWeight: 500 }}> yrs</span></div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="dashboard-card" style={{ marginTop: '20px' }}>
                    <h3 className="dashboard-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FiTrendingUp style={{ color: 'var(--color-primary)' }} /> Quick Actions
                    </h3>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '16px' }}>
                      <button className="btn btn-primary" onClick={handleWhatsAppBooking} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FaWhatsapp size={18} /> Book a Session
                      </button>
                      <button className="btn btn-secondary" onClick={() => setActiveTab('profile')}>
                        <FiUser size={16} style={{ marginRight: '6px' }} /> Edit Profile
                      </button>
                      <button className="btn btn-secondary" onClick={() => setActiveTab('bookings')}>
                        <FiCalendar size={16} style={{ marginRight: '6px' }} /> View Bookings
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* ============ MY PROFILE ============ */}
              {activeTab === 'profile' && (
                <div className="dashboard-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 className="dashboard-card-title" style={{ margin: 0 }}>My Fitness Profile</h3>
                    {!isEditing ? (
                      <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(true)} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FiEdit3 size={14} /> Edit
                      </button>
                    ) : (
                      <button className="btn btn-primary btn-sm" onClick={handleProfileSave} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FiSave size={14} /> {saving ? 'Saving...' : 'Save Profile'}
                      </button>
                    )}
                  </div>

                  {/* Avatar Card */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px', padding: '20px', background: 'linear-gradient(135deg, rgba(0, 109, 60, 0.04), rgba(0, 109, 60, 0.01))', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(0, 109, 60, 0.1)' }}>
                    {user?.imageUrl ? (
                      <img src={user.imageUrl} alt={userName} style={{ width: '64px', height: '64px', borderRadius: '50%', border: '3px solid var(--color-primary)', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                        {userName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p style={{ color: 'var(--color-gray-900)', fontWeight: 700, fontSize: '1.1rem', margin: '0 0 4px', fontFamily: 'var(--font-heading)' }}>
                        {profileData.name || userName}
                      </p>
                      <p style={{ color: 'var(--color-gray-500)', fontSize: '0.85rem', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FiMail size={13} /> {profileData.email || userEmail}
                      </p>
                      {profileData.phone && (
                        <p style={{ color: 'var(--color-gray-500)', fontSize: '0.85rem', margin: '2px 0 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <FiPhone size={13} /> {profileData.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {isEditing ? (
                    /* ── Edit Mode ── */
                    <div style={{ display: 'grid', gap: '20px' }}>
                      {/* Personal Info */}
                      <div>
                        <h4 style={{ color: 'var(--color-gray-900)', fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Personal Information</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-gray-500)', marginBottom: '6px', fontWeight: 500 }}>Full Name</label>
                            <input className="form-input" value={profileData.name} onChange={e => setProfileData({ ...profileData, name: e.target.value })} placeholder="Your full name" />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-gray-500)', marginBottom: '6px', fontWeight: 500 }}>Phone Number</label>
                            <input className="form-input" value={profileData.phone} onChange={e => setProfileData({ ...profileData, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-gray-500)', marginBottom: '6px', fontWeight: 500 }}>Age</label>
                            <input className="form-input" type="number" value={profileData.age} onChange={e => setProfileData({ ...profileData, age: e.target.value })} placeholder="25" />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-gray-500)', marginBottom: '6px', fontWeight: 500 }}>Gender</label>
                            <select className="form-input" value={profileData.gender} onChange={e => setProfileData({ ...profileData, gender: e.target.value })}>
                              <option value="">Select Gender</option>
                              {GENDER_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Body Metrics */}
                      <div>
                        <h4 style={{ color: 'var(--color-gray-900)', fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Body Metrics</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-gray-500)', marginBottom: '6px', fontWeight: 500 }}>Height (cm)</label>
                            <input className="form-input" type="number" value={profileData.height} onChange={e => setProfileData({ ...profileData, height: e.target.value })} placeholder="170" />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-gray-500)', marginBottom: '6px', fontWeight: 500 }}>Current Weight (kg)</label>
                            <input className="form-input" type="number" value={profileData.weight} onChange={e => setProfileData({ ...profileData, weight: e.target.value })} placeholder="70" />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-gray-500)', marginBottom: '6px', fontWeight: 500 }}>Target Weight (kg)</label>
                            <input className="form-input" type="number" value={profileData.targetWeight} onChange={e => setProfileData({ ...profileData, targetWeight: e.target.value })} placeholder="65" />
                          </div>
                        </div>
                      </div>

                      {/* Fitness Goals */}
                      <div>
                        <h4 style={{ color: 'var(--color-gray-900)', fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Fitness Goals</h4>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-gray-500)', marginBottom: '8px', fontWeight: 500 }}>Your Primary Goal</label>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {GOAL_OPTIONS.map(goal => (
                              <button
                                key={goal}
                                type="button"
                                onClick={() => setProfileData({ ...profileData, fitnessGoal: goal })}
                                style={{
                                  padding: '10px 18px',
                                  borderRadius: 'var(--radius-md)',
                                  border: profileData.fitnessGoal === goal ? '2px solid var(--color-primary)' : '1px solid var(--color-dark-alt)',
                                  background: profileData.fitnessGoal === goal ? 'rgba(0, 109, 60, 0.08)' : 'var(--color-white)',
                                  color: profileData.fitnessGoal === goal ? 'var(--color-primary)' : 'var(--color-gray-600)',
                                  fontWeight: profileData.fitnessGoal === goal ? 700 : 500,
                                  cursor: 'pointer',
                                  fontSize: '0.85rem',
                                  transition: 'all 0.2s ease',
                                  display: 'flex', alignItems: 'center', gap: '6px',
                                }}
                              >
                                {GOAL_EMOJIS[goal]} {goal}
                                {profileData.fitnessGoal === goal && <FiCheck size={14} />}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div style={{ marginTop: '16px' }}>
                          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-gray-500)', marginBottom: '6px', fontWeight: 500 }}>Activity Level</label>
                          <select className="form-input" value={profileData.activityLevel} onChange={e => setProfileData({ ...profileData, activityLevel: e.target.value })}>
                            <option value="">Select Activity Level</option>
                            {ACTIVITY_OPTIONS.map(a => <option key={a} value={a}>{a}</option>)}
                          </select>
                        </div>

                        <div style={{ marginTop: '16px' }}>
                          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-gray-500)', marginBottom: '6px', fontWeight: 500 }}>Medical Conditions (Optional)</label>
                          <textarea className="form-textarea" value={profileData.medicalConditions} onChange={e => setProfileData({ ...profileData, medicalConditions: e.target.value })} placeholder="Any injuries, allergies, or medical conditions we should know about..." rows={3} style={{ minHeight: '80px' }} />
                        </div>
                      </div>

                      {/* Save Button (Mobile) */}
                      <div style={{ paddingTop: '16px', borderTop: '1px solid var(--color-dark-alt)' }}>
                        <button className="btn btn-primary btn-lg" onClick={handleProfileSave} disabled={saving} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                          <FiSave size={16} /> {saving ? 'Saving...' : 'Save Profile'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* ── View Mode ── */
                    <div style={{ display: 'grid', gap: '0' }}>
                      {[
                        { label: 'Full Name', value: profileData.name, icon: <FiUser size={15} /> },
                        { label: 'Email', value: profileData.email, icon: <FiMail size={15} /> },
                        { label: 'Phone', value: profileData.phone, icon: <FiPhone size={15} /> },
                        { label: 'Age', value: profileData.age ? `${profileData.age} years` : '' },
                        { label: 'Gender', value: profileData.gender },
                        { label: 'Height', value: profileData.height ? `${profileData.height} cm` : '' },
                        { label: 'Weight', value: profileData.weight ? `${profileData.weight} kg` : '' },
                        { label: 'Target Weight', value: profileData.targetWeight ? `${profileData.targetWeight} kg` : '' },
                        { label: 'Fitness Goal', value: profileData.fitnessGoal ? `${GOAL_EMOJIS[profileData.fitnessGoal] || ''} ${profileData.fitnessGoal}` : '' },
                        { label: 'Activity Level', value: profileData.activityLevel },
                        { label: 'BMI', value: bmi ? `${bmi} (${getBmiCategory(Number(bmi)).label})` : '' },
                      ].filter(item => item.value).map((item, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--color-dark-alt)' }}>
                          <span style={{ color: 'var(--color-gray-500)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {item.icon} {item.label}
                          </span>
                          <span style={{ color: 'var(--color-gray-900)', fontWeight: 600, fontSize: '0.9rem' }}>{item.value}</span>
                        </div>
                      ))}
                      {profileData.medicalConditions && (
                        <div style={{ padding: '14px 0' }}>
                          <span style={{ color: 'var(--color-gray-500)', fontSize: '0.9rem', display: 'block', marginBottom: '6px' }}>Medical Notes</span>
                          <p style={{ color: 'var(--color-gray-700)', fontSize: '0.85rem', lineHeight: '1.6', margin: 0, background: 'var(--color-bg-light)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>{profileData.medicalConditions}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* ============ MY BOOKINGS ============ */}
              {activeTab === 'bookings' && (
                <div className="dashboard-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 className="dashboard-card-title" style={{ margin: 0 }}>My Bookings</h3>
                    <button className="btn btn-primary btn-sm" onClick={handleWhatsAppBooking} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FaWhatsapp size={16} /> Book via WhatsApp
                    </button>
                  </div>

                  {bookings.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '50px 24px' }}>
                      <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📋</div>
                      <h4 style={{ color: 'var(--color-gray-900)', fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>No Bookings Yet</h4>
                      <p style={{ color: 'var(--color-gray-500)', marginBottom: '24px', maxWidth: '360px', marginLeft: 'auto', marginRight: 'auto', lineHeight: '1.6' }}>
                        Start your fitness journey by booking a session through WhatsApp. Our team will guide you!
                      </p>
                      <button className="btn btn-primary btn-lg" onClick={handleWhatsAppBooking} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <FaWhatsapp size={18} /> Book Your First Session
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gap: '14px' }}>
                      {bookings.map((booking, i) => (
                        <div key={i} style={{ background: 'var(--color-bg-light)', borderRadius: 'var(--radius-md)', padding: '20px', border: '1px solid var(--color-dark-alt)', transition: 'all 0.2s ease' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                            <div>
                              <span style={{ background: 'rgba(0,109,60,0.1)', color: 'var(--color-primary)', padding: '4px 14px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700 }}>
                                {booking.planType}
                              </span>
                            </div>
                            <span style={{ color: booking.paymentStatus === 'completed' ? '#10b981' : '#f59e0b', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                              {booking.paymentStatus === 'completed' ? <><FiCheck size={14} /> Paid</> : '⏳ Pending'}
                            </span>
                          </div>
                          <p style={{ color: 'var(--color-gray-700)', fontSize: '0.9rem', marginBottom: '8px', fontWeight: 500 }}>
                            {booking.duration} • {booking.preferredDays?.join(', ')} • {booking.preferredTimeSlot}
                          </p>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p style={{ color: 'var(--color-gray-500)', fontSize: '0.75rem', margin: 0 }}>
                              Booked on {new Date(booking.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                            <button
                              onClick={() => {
                                const msg = `Hi! Regarding my booking:\n\n📋 *Plan:* ${booking.planType}\n⏰ *Duration:* ${booking.duration}\n📅 *Days:* ${booking.preferredDays?.join(', ')}\n🕐 *Time:* ${booking.preferredTimeSlot}\n\nI need assistance with this booking.`;
                                window.open(getWhatsAppUrl(msg), '_blank');
                              }}
                              style={{ background: 'none', border: 'none', color: '#25d366', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
                            >
                              <FaWhatsapp size={14} /> Contact
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
