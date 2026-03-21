import { useCallback, useEffect, useMemo, useState } from 'react';
import { FiInbox, FiLayers, FiLock, FiLogOut, FiPhoneCall, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API, { adminSession } from '../utils/api';
import PageHero from '../components/PageHero';

const statusOptions = ['new', 'contacted', 'closed', 'not-interested'];
const adminViews = [
  { id: 'overview', label: 'Overview', icon: <FiLayers /> },
  { id: 'registrations', label: 'Registrations', icon: <FiInbox /> },
  { id: 'plans', label: 'Plan Enquiries', icon: <FiLayers /> },
  { id: 'contacts', label: 'Contact Requests', icon: <FiPhoneCall /> },
];

const formatStatusLabel = (status) => status.replace('-', ' ');

export default function AdminPortal() {
  const [stats, setStats] = useState(null);
  const [leads, setLeads] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(adminSession.getToken()));
  const [loginLoading, setLoginLoading] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const fetchAdminData = useCallback(async () => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const [statsRes, leadsRes, contactsRes] = await Promise.all([
        API.get('/admin/stats'),
        API.get('/admin/leads'),
        API.get('/admin/contacts'),
      ]);

      setStats(statsRes.data);
      setLeads(leadsRes.data);
      setContacts(contactsRes.data);
    } catch (error) {
      console.error('Admin portal error:', error);
      if (error.response?.status === 401) {
        adminSession.clear();
        setIsAuthenticated(false);
        toast.error('Admin session expired. Please login again.');
      }
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

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
      toast.error('Please enter admin username and password');
      return;
    }

    try {
      setLoginLoading(true);
      const res = await API.post('/admin/login', credentials);
      adminSession.setToken(res.data.token);
      setIsAuthenticated(true);
      toast.success('Admin login successful');
    } catch (error) {
      console.error('Admin login failed:', error);
      toast.error(error.response?.data?.error || 'Login failed');
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
    toast.success('Logged out from admin portal');
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
    const confirmed = window.confirm('Delete this enquiry from the admin portal?');
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
    const confirmed = window.confirm('Delete this contact request from the admin portal?');
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

  const renderLeadCard = (lead) => (
    <div className="admin-lead-card" key={lead._id}>
      <div className="admin-lead-head">
        <div>
          <h4>{lead.name}</h4>
          <p>{lead.mobile}{lead.email ? ` | ${lead.email}` : ''}</p>
        </div>
        <div className="admin-lead-actions">
          <select className="form-input admin-status-select" value={lead.status} onChange={(e) => updateLeadStatus(lead._id, e.target.value)}>
            {statusOptions.map((status) => <option key={status} value={status}>{formatStatusLabel(status)}</option>)}
          </select>
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
        <span>{lead.gender}, {lead.age}</span>
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
          <select className="form-input admin-status-select" value={contact.status} onChange={(e) => updateContactStatus(contact._id, e.target.value)}>
            {statusOptions.map((status) => <option key={status} value={status}>{formatStatusLabel(status)}</option>)}
          </select>
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

  if (!isAuthenticated) {
    return (
      <div className="page-wrapper">
        <PageHero
          badge="Admin Portal"
          title="Protected"
          highlight="admin access"
          description="Login with the admin credentials to view registrations, plan enquiries, and contact requests."
        />

        <section className="section section-darker">
          <div className="container">
            <div className="admin-login-card reveal">
              <div className="registration-success-icon" style={{ marginBottom: '16px' }}>
                <FiLock />
              </div>
              <h2>Admin Login</h2>
              <p>Use the admin credentials configured in the project setup.</p>
              <form onSubmit={handleLogin} className="registration-form" style={{ marginTop: '20px' }}>
                <input className="form-input" placeholder="Admin username" value={credentials.username} onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))} />
                <input className="form-input" type="password" placeholder="Admin password" value={credentials.password} onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))} />
                <button type="submit" className="btn btn-primary btn-lg" disabled={loginLoading}>
                  {loginLoading ? 'Logging in...' : 'Login to Admin Portal'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <PageHero
        badge="Admin Portal"
        title="Lead management with"
        highlight="clear sections"
        description="Track homepage registrations, plan enquiries, and contact form requests in separate views."
      />

      <section className="section section-darker">
        <div className="container">
          <div className="admin-toolbar reveal">
            <div className="admin-view-tabs">
              {adminViews.map((view) => (
                <button key={view.id} className={`admin-view-tab ${activeView === view.id ? 'active' : ''}`} onClick={() => setActiveView(view.id)}>
                  {view.icon} {view.label}
                </button>
              ))}
            </div>
            <button className="btn btn-secondary" onClick={handleLogout} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <FiLogOut /> Logout
            </button>
          </div>

          <div className="admin-stats-grid reveal">
            <div className="admin-stat-card">
              <span>Total Lead Records</span>
              <strong>{stats?.totalLeads ?? 0}</strong>
            </div>
            <div className="admin-stat-card">
              <span>Plan Enquiries</span>
              <strong>{stats?.planEnquiries ?? planEnquiries.length}</strong>
            </div>
            <div className="admin-stat-card">
              <span>Contact Requests</span>
              <strong>{stats?.totalContacts ?? contacts.length}</strong>
            </div>
            <div className="admin-stat-card">
              <span>Total Stored Enquiries</span>
              <strong>{stats?.totalStoredEnquiries ?? (leads.length + contacts.length)}</strong>
            </div>
          </div>

          {activeView === 'overview' ? (
            <>
              <div className="admin-summary-grid reveal">
                <div className="admin-summary-card">
                  <h3>Leads by Page</h3>
                  <div className="admin-chip-grid">
                    {stats?.leadsByPage?.map((item) => (
                      <div key={item._id} className="admin-chip">
                        <span>{item._id}</span>
                        <strong>{item.count}</strong>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="admin-summary-card">
                  <h3>Leads by Interest</h3>
                  <div className="admin-chip-grid">
                    {stats?.leadsByInterest?.map((item) => (
                      <div key={item._id} className="admin-chip">
                        <span>{item._id}</span>
                        <strong>{item.count}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="admin-summary-grid reveal">
                <div className="admin-summary-card">
                  <h3>Registration Leads</h3>
                  <p className="section-subtitle" style={{ maxWidth: 'none' }}>Homepage and page-level registrations collected across the website.</p>
                  <strong className="admin-overview-count">{registrations.length}</strong>
                </div>
                <div className="admin-summary-card">
                  <h3>Contact Form Requests</h3>
                  <p className="section-subtitle" style={{ maxWidth: 'none' }}>Direct messages submitted from the contact page.</p>
                  <strong className="admin-overview-count">{contacts.length}</strong>
                </div>
              </div>
            </>
          ) : null}

          {activeView === 'registrations' ? (
            <div className="admin-summary-card admin-lead-section reveal">
              <h3>Registration Leads</h3>
              {loading ? <p className="section-subtitle" style={{ maxWidth: 'none' }}>Loading registrations...</p> : <div className="admin-lead-list">{registrations.map(renderLeadCard)}{registrations.length === 0 ? <p className="section-subtitle" style={{ maxWidth: 'none' }}>No registration leads found.</p> : null}</div>}
            </div>
          ) : null}

          {activeView === 'plans' ? (
            <div className="admin-summary-card admin-lead-section reveal">
              <h3>Plan Enquiries</h3>
              {loading ? <p className="section-subtitle" style={{ maxWidth: 'none' }}>Loading plan enquiries...</p> : <div className="admin-lead-list">{planEnquiries.map(renderLeadCard)}{planEnquiries.length === 0 ? <p className="section-subtitle" style={{ maxWidth: 'none' }}>No plan enquiries found.</p> : null}</div>}
            </div>
          ) : null}

          {activeView === 'contacts' ? (
            <div className="admin-summary-card admin-lead-section reveal">
              <h3>Contact Requests</h3>
              {loading ? <p className="section-subtitle" style={{ maxWidth: 'none' }}>Loading contact requests...</p> : <div className="admin-lead-list">{contacts.map(renderContactCard)}{contacts.length === 0 ? <p className="section-subtitle" style={{ maxWidth: 'none' }}>No contact requests found.</p> : null}</div>}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
