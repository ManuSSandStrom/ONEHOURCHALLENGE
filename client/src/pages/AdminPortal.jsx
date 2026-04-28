import { useCallback, useEffect, useMemo, useState } from 'react';
import { FiArrowRight, FiImage, FiInbox, FiLayers, FiLock, FiLogOut, FiPhoneCall, FiShield, FiTrash2, FiUpload } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API, { adminSession } from '../utils/api';

const statusOptions = ['new', 'contacted', 'closed', 'not-interested'];
const adminViews = [
  { id: 'overview', label: 'Overview', icon: <FiLayers /> },
  { id: 'registrations', label: 'Registrations', icon: <FiInbox /> },
  { id: 'plans', label: 'Plan Enquiries', icon: <FiLayers /> },
  { id: 'contacts', label: 'Contact Requests', icon: <FiPhoneCall /> },
  { id: 'media', label: 'Transformations', icon: <FiImage /> },
];
const statusButtonLabels = {
  new: 'New',
  contacted: 'Contacted',
  closed: 'Closed',
  'not-interested': 'Not Interested',
};

const formatStatusLabel = (status) => status.replace('-', ' ');

export default function AdminPortal() {
  const [stats, setStats] = useState(null);
  const [leads, setLeads] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [_statsLoading, setStatsLoading] = useState(true);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [contactsLoading, setContactsLoading] = useState(false);
  const [media, setMedia] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [mediaForm, setMediaForm] = useState({ file: null, caption: '', displayOrder: 0 });
  const [mediaTab, setMediaTab] = useState('image');
  const [activeView, setActiveView] = useState('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(adminSession.getToken()));
  const [loginLoading, setLoginLoading] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const todayLabel = useMemo(
    () => new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date()),
    [],
  );

  const fetchStats = useCallback(async () => {
    if (!isAuthenticated) {
      setStatsLoading(false);
      return;
    }

    try {
      setStatsLoading(true);
      const statsRes = await API.get('/admin/stats');
      setStats(statsRes.data?.data || statsRes.data);
    } catch (error) {
      console.error('Admin portal error:', error);
      if (error.response?.status === 401) {
        adminSession.clear();
        setIsAuthenticated(false);
        toast.error('Admin session expired. Please login again.');
      } else {
        toast.error('Unable to load admin data right now.');
      }
    } finally {
      setStatsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const fetchLeads = useCallback(async () => {
    if (!isAuthenticated || leads.length > 0 || leadsLoading) return;

    try {
      setLeadsLoading(true);
      const leadsRes = await API.get('/admin/leads');
      setLeads(leadsRes.data?.data || leadsRes.data?.leads || leadsRes.data);
    } catch (error) {
      console.error('Lead fetch error:', error);
      toast.error('Unable to load registrations right now.');
    } finally {
      setLeadsLoading(false);
    }
  }, [isAuthenticated, leads.length, leadsLoading]);

  const fetchContacts = useCallback(async () => {
    if (!isAuthenticated || contacts.length > 0 || contactsLoading) return;

    try {
      setContactsLoading(true);
      const contactsRes = await API.get('/admin/contacts');
      setContacts(contactsRes.data?.data || contactsRes.data?.contacts || contactsRes.data);
    } catch (error) {
      console.error('Contact fetch error:', error);
      toast.error('Unable to load contacts right now.');
    } finally {
      setContactsLoading(false);
    }
  }, [contacts.length, contactsLoading, isAuthenticated]);

  const fetchMedia = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      setMediaLoading(true);
      const mediaRes = await API.get('/admin/media');
      setMedia(mediaRes.data?.data || mediaRes.data?.media || []);
    } catch (error) {
      console.error('Media fetch error:', error);
      toast.error('Unable to load transformation media right now.');
    } finally {
      setMediaLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (activeView === 'registrations' || activeView === 'plans') {
      fetchLeads();
    }
    if (activeView === 'contacts') {
      fetchContacts();
    }
    if (activeView === 'media') {
      fetchMedia();
    }
  }, [activeView, fetchContacts, fetchLeads, fetchMedia]);

  const registrations = useMemo(
    () => leads.filter((lead) => lead.source !== 'contact-form' && !(lead.interestType === 'plan' || lead.planType)),
    [leads],
  );

  const planEnquiries = useMemo(
    () => leads.filter((lead) => lead.interestType === 'plan' || lead.planType),
    [leads],
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
      toast.error('Please enter username and password');
      return;
    }

    try {
      setLoginLoading(true);
      const res = await API.post('/admin/login', credentials);
      adminSession.setToken(res.data.token);
      setIsAuthenticated(true);
      toast.success('Login successful');
      setStatsLoading(true);
    } catch (error) {
      console.error('Admin login failed:', error);
      toast.error(error.response?.data?.message || error.response?.data?.error || 'Login failed');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    adminSession.clear();
    setIsAuthenticated(false);
    setStats(null);
    setLeads([]);
    setContacts([]);
    setStatsLoading(false);
    setLeadsLoading(false);
    setContactsLoading(false);
      toast.success('Logged out successfully');
  };

  const updateLeadStatus = async (id, status) => {
    try {
      await API.patch(`/admin/leads/${id}/status`, { status });
      setLeads((prev) => prev.map((lead) => (lead._id === id ? { ...lead, status } : lead)));
      toast.success('Lead status updated');
    } catch (error) {
      console.error('Update lead status failed:', error);
      toast.error('Failed to update lead status');
    }
  };

  const deleteLead = async (id) => {
    const confirmed = window.confirm('Delete this enquiry from the workspace?');
    if (!confirmed) return;

    try {
      await API.delete(`/admin/leads/${id}`);
      setLeads((prev) => prev.filter((lead) => lead._id !== id));
      toast.success('Lead deleted');
    } catch (error) {
      console.error('Delete lead failed:', error);
      toast.error('Failed to delete lead');
    }
  };

  const updateContactStatus = async (id, status) => {
    try {
      await API.patch(`/admin/contacts/${id}/status`, { status });
      setContacts((prev) => prev.map((contact) => (contact._id === id ? { ...contact, status } : contact)));
      toast.success('Contact status updated');
    } catch (error) {
      console.error('Update contact status failed:', error);
      toast.error('Failed to update contact status');
    }
  };

  const deleteContact = async (id) => {
    const confirmed = window.confirm('Delete this contact request from the workspace?');
    if (!confirmed) return;

    try {
      await API.delete(`/admin/contacts/${id}`);
      setContacts((prev) => prev.filter((contact) => contact._id !== id));
      toast.success('Contact request deleted');
    } catch (error) {
      console.error('Delete contact failed:', error);
      toast.error('Failed to delete contact request');
    }
  };

  const uploadMedia = async (event) => {
    event.preventDefault();
    if (!mediaForm.file) {
      toast.error('Please choose an image or video first');
      return;
    }

    const formData = new FormData();
    formData.append('file', mediaForm.file);
    formData.append('caption', mediaForm.caption);
    formData.append('displayOrder', mediaForm.displayOrder);

    try {
      setUploading(true);
      const res = await API.post('/admin/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const uploaded = res.data?.data || res.data?.media;
      setMedia((prev) => [...prev, uploaded].filter(Boolean).sort((a, b) => a.displayOrder - b.displayOrder));
      setMediaForm({ file: null, caption: '', displayOrder: 0 });
      toast.success('Media uploaded');
    } catch (error) {
      console.error('Upload media failed:', error);
      toast.error(error.response?.data?.message || 'Failed to upload media');
    } finally {
      setUploading(false);
    }
  };

  const updateMediaOrder = async (id, displayOrder) => {
    try {
      const res = await API.patch(`/admin/media/${id}/order`, { displayOrder: Number(displayOrder) });
      const updated = res.data?.data || res.data?.media;
      setMedia((prev) => prev.map((item) => (item._id === id ? updated : item)).sort((a, b) => a.displayOrder - b.displayOrder));
      toast.success('Display order updated');
    } catch (error) {
      console.error('Update media order failed:', error);
      toast.error('Failed to update media order');
    }
  };

  const deleteMedia = async (id) => {
    const confirmed = window.confirm('Delete this media from Cloudinary and the gallery?');
    if (!confirmed) return;

    try {
      await API.delete(`/admin/media/${id}`);
      setMedia((prev) => prev.filter((item) => item._id !== id));
      toast.success('Media deleted');
    } catch (error) {
      console.error('Delete media failed:', error);
      toast.error('Failed to delete media');
    }
  };

  const renderLeadCard = (lead) => (
    <div className="admin-lead-card" key={lead._id}>
      <div className="admin-lead-head">
        <div>
          <h4>{lead.name}</h4>
          <p>{lead.mobile}{lead.email ? ` | ${lead.email}` : ''}</p>
        </div>
        <div className="admin-lead-actions">
          <div className="admin-status-actions">
            {statusOptions.map((status) => (
              <button
                key={status}
                type="button"
                className={`admin-status-btn admin-status-${status} ${lead.status === status ? 'active' : ''}`}
                onClick={() => updateLeadStatus(lead._id, status)}
              >
                {statusButtonLabels[status] || formatStatusLabel(status)}
              </button>
            ))}
          </div>
          <button className="btn btn-secondary admin-delete-btn" onClick={() => deleteLead(lead._id)}>
            <FiTrash2 />
          </button>
        </div>
      </div>
      <div className="admin-lead-meta">
        <span>{lead.sourcePage}</span>
        <span>{lead.interestLabel}</span>
        {lead.planType ? <span>{lead.planType}</span> : null}
        {lead.duration ? <span>{lead.duration}</span> : null}
        <span>{lead.age} years</span>
        {lead.location ? <span>{lead.location}</span> : null}
        {lead.gender ? <span>{lead.gender}</span> : null}
      </div>
      {lead.message ? <p className="admin-lead-note">{lead.message}</p> : null}
      <p className="admin-lead-date">{new Date(lead.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</p>
    </div>
  );

  const renderContactCard = (contact) => (
    <div className="admin-lead-card" key={contact._id}>
      <div className="admin-lead-head">
        <div>
          <h4>{contact.name}</h4>
          <p>{contact.mobile} | {contact.email}</p>
        </div>
        <div className="admin-lead-actions">
          <div className="admin-status-actions">
            {statusOptions.map((status) => (
              <button
                key={status}
                type="button"
                className={`admin-status-btn admin-status-${status} ${contact.status === status ? 'active' : ''}`}
                onClick={() => updateContactStatus(contact._id, status)}
              >
                {statusButtonLabels[status] || formatStatusLabel(status)}
              </button>
            ))}
          </div>
          <button className="btn btn-secondary admin-delete-btn" onClick={() => deleteContact(contact._id)}>
            <FiTrash2 />
          </button>
        </div>
      </div>
      <div className="admin-lead-meta">
        <span>Contact Page</span>
        <span>Direct Message</span>
      </div>
      <p className="admin-lead-note">{contact.message}</p>
      <p className="admin-lead-date">{new Date(contact.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</p>
    </div>
  );

  const renderEmptyState = (message) => (
    <div className="admin-empty-state">
      <FiShield />
      <p>{message}</p>
    </div>
  );

  if (!isAuthenticated) {
    return (
      <div className="admin-portal-shell">
        <section className="admin-login-shell">
          <div className="admin-login-panel">
            <div className="admin-login-brand">
              <div className="admin-login-icon">
                <FiLock />
              </div>
              <span className="admin-login-kicker">Restricted Workspace</span>
            </div>

            <h1>Secure Access</h1>
            <p>Authorized team members can sign in here. This workspace remains hidden from the public website.</p>

            <form onSubmit={handleLogin} className="admin-auth-form">
              <label className="admin-auth-field">
                <span>Username</span>
                <input
                  className="form-input"
                  placeholder="Enter username"
                  value={credentials.username}
                  onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))}
                />
              </label>

              <label className="admin-auth-field">
                <span>Password</span>
                <input
                  className="form-input"
                  type="password"
                  placeholder="Enter password"
                  value={credentials.password}
                  onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                />
              </label>

              <button type="submit" className="btn btn-primary btn-lg admin-auth-submit" disabled={loginLoading}>
                {loginLoading ? 'Signing In...' : <>Sign In Securely <FiArrowRight /></>}
              </button>
            </form>

            <div className="admin-login-note">This module is restricted. Unauthorized access is prohibited and monitored.</div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="admin-portal-shell">
      <div className="admin-workspace">
        <aside className="admin-sidebar-panel">
          <div className="admin-sidebar-brand">
            <span className="admin-sidebar-kicker">Operations Workspace</span>
            <h2>OneHour Challenge</h2>
            <p>Website operations panel</p>
          </div>

          <div className="admin-sidebar-status">
            <div className="admin-sidebar-status-icon">
              <FiShield />
            </div>
            <div>
              <strong>Authenticated session</strong>
              <span>{todayLabel}</span>
            </div>
          </div>

          <div className="admin-view-tabs admin-sidebar-tabs">
            {adminViews.map((view) => (
              <button key={view.id} className={`admin-view-tab ${activeView === view.id ? 'active' : ''}`} onClick={() => setActiveView(view.id)}>
                {view.icon}
                <span>{view.label}</span>
              </button>
            ))}
          </div>

          <button className="btn btn-secondary admin-signout-btn" onClick={handleLogout}>
            <FiLogOut /> Sign Out
          </button>
        </aside>

        <section className="admin-main-panel">
          <div className="admin-topbar">
            <div>
              <span className="admin-topbar-kicker">Control Overview</span>
              <h1>Website Operations Panel</h1>
            </div>
            <div className="admin-topbar-date">
              <span>Today</span>
              <strong>{todayLabel}</strong>
            </div>
          </div>

          <div className="admin-stats-grid">
            <div className="admin-stat-card admin-stat-card-primary">
              <span>Total Lead Records</span>
              <strong>{stats?.totalLeads ?? leads.length}</strong>
            </div>
            <div className="admin-stat-card">
              <span>Registration Leads</span>
              <strong>{registrations.length}</strong>
            </div>
            <div className="admin-stat-card">
              <span>Plan Enquiries</span>
              <strong>{stats?.planEnquiries ?? planEnquiries.length}</strong>
            </div>
            <div className="admin-stat-card">
              <span>Contact Requests</span>
              <strong>{stats?.totalContacts ?? contacts.length}</strong>
            </div>
          </div>

          {activeView === 'overview' ? (
            <>
              <div className="admin-summary-grid">
                <div className="admin-summary-card admin-summary-card-primary">
                  <h3>Dashboard Overview</h3>
                  <p className="section-subtitle" style={{ maxWidth: 'none' }}>
                    Monitor registrations, plan enquiries, and contact follow-ups from one organized workspace.
                  </p>
                  <strong className="admin-overview-count">
                    {stats?.totalStoredEnquiries ?? (leads.length + contacts.length)}
                  </strong>
                </div>

                <div className="admin-summary-card">
                  <h3>At a Glance</h3>
                  <div className="admin-quick-metrics">
                    <div className="admin-quick-metric">
                      <span>Total content flow</span>
                      <strong>{stats?.totalStoredEnquiries ?? (leads.length + contacts.length)}</strong>
                    </div>
                    <div className="admin-quick-metric">
                      <span>Pending follow-up pool</span>
                      <strong>{[...leads, ...contacts].filter((item) => item.status === 'new').length}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="admin-summary-grid">
                <div className="admin-summary-card">
                  <h3>Leads by Page</h3>
                  <div className="admin-chip-grid">
                    {stats?.leadsByPage?.length
                      ? stats.leadsByPage.map((item) => (
                        <div key={item._id} className="admin-chip">
                          <span>{item._id}</span>
                          <strong>{item.count}</strong>
                        </div>
                      ))
                      : renderEmptyState('No page-level lead data yet.')}
                  </div>
                </div>

                <div className="admin-summary-card">
                  <h3>Leads by Interest</h3>
                  <div className="admin-chip-grid">
                    {stats?.leadsByInterest?.length
                      ? stats.leadsByInterest.map((item) => (
                        <div key={item._id} className="admin-chip">
                          <span>{item._id}</span>
                          <strong>{item.count}</strong>
                        </div>
                      ))
                      : renderEmptyState('No interest categories available yet.')}
                  </div>
                </div>
              </div>
            </>
          ) : null}

          {activeView === 'registrations' ? (
            <div className="admin-summary-card admin-lead-section">
              <h3>Registration Leads</h3>
              {leadsLoading
                ? <p className="section-subtitle" style={{ maxWidth: 'none' }}>Syncing registrations...</p>
                : registrations.length
                  ? <div className="admin-lead-list">{registrations.map(renderLeadCard)}</div>
                  : renderEmptyState('No registration leads found.')}
            </div>
          ) : null}

          {activeView === 'plans' ? (
            <div className="admin-summary-card admin-lead-section">
              <h3>Plan Enquiries</h3>
              {leadsLoading
                ? <p className="section-subtitle" style={{ maxWidth: 'none' }}>Syncing plan enquiries...</p>
                : planEnquiries.length
                  ? <div className="admin-lead-list">{planEnquiries.map(renderLeadCard)}</div>
                  : renderEmptyState('No plan enquiries found.')}
            </div>
          ) : null}

          {activeView === 'contacts' ? (
            <div className="admin-summary-card admin-lead-section">
              <h3>Contact Requests</h3>
              {contactsLoading
                ? <p className="section-subtitle" style={{ maxWidth: 'none' }}>Syncing contact requests...</p>
                : contacts.length
                  ? <div className="admin-lead-list">{contacts.map(renderContactCard)}</div>
                  : renderEmptyState('No contact requests found.')}
            </div>
          ) : null}

          {activeView === 'media' ? (
            <div className="admin-summary-card admin-lead-section">
              <h3>Transformation Media Manager</h3>
              <p className="section-subtitle" style={{ maxWidth: 'none', margin: '8px 0 20px' }}>
                Images and videos uploaded here will appear live on the Transformations page in the order you specify.
              </p>

              <form className="admin-media-upload" onSubmit={uploadMedia}>
                <label className="admin-auth-field">
                  <span>Upload image or video</span>
                  <input
                    className="form-input"
                    type="file"
                    accept="image/jpeg,image/png,image/webp,video/mp4,video/quicktime"
                    onChange={(event) => setMediaForm((prev) => ({ ...prev, file: event.target.files?.[0] || null }))}
                  />
                </label>
                <label className="admin-auth-field">
                  <span>Caption</span>
                  <input className="form-input" value={mediaForm.caption} onChange={(event) => setMediaForm((prev) => ({ ...prev, caption: event.target.value }))} />
                </label>
                <label className="admin-auth-field">
                  <span>Display Order</span>
                  <input className="form-input" type="number" value={mediaForm.displayOrder} onChange={(event) => setMediaForm((prev) => ({ ...prev, displayOrder: event.target.value }))} />
                </label>
                <button className="btn btn-primary btn-lg" type="submit" disabled={uploading}>
                  <FiUpload /> {uploading ? 'Uploading...' : 'Upload Media'}
                </button>
              </form>

              <div className="ai-side-tabs admin-media-tabs">
                <button type="button" className={`ai-tab-btn ${mediaTab === 'image' ? 'active' : ''}`} onClick={() => setMediaTab('image')}>Images</button>
                <button type="button" className={`ai-tab-btn ${mediaTab === 'video' ? 'active' : ''}`} onClick={() => setMediaTab('video')}>Videos</button>
              </div>

              {mediaLoading ? (
                <p className="section-subtitle" style={{ maxWidth: 'none' }}>Loading media...</p>
              ) : (
                <div className="admin-media-grid">
                  {media.filter((item) => item.type === mediaTab).map((item) => (
                    <article className="admin-media-card" key={item._id}>
                      {item.type === 'image' ? (
                        <img src={item.url} alt={item.caption || 'Transformation upload'} loading="lazy" />
                      ) : (
                        <video src={item.url} poster={item.thumbnailUrl || undefined} controls preload="metadata"></video>
                      )}
                      <div className="admin-media-card-body">
                        <strong>{item.caption || 'Untitled media'}</strong>
                        <label className="admin-auth-field">
                          <span>Order</span>
                          <input
                            className="form-input"
                            type="number"
                            defaultValue={item.displayOrder}
                            onBlur={(event) => updateMediaOrder(item._id, event.target.value)}
                          />
                        </label>
                        <button className="btn btn-secondary" type="button" onClick={() => deleteMedia(item._id)}>
                          <FiTrash2 /> Delete
                        </button>
                      </div>
                    </article>
                  ))}
                  {!media.filter((item) => item.type === mediaTab).length ? renderEmptyState(`No ${mediaTab}s uploaded yet.`) : null}
                </div>
              )}
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
