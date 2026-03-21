import { useCallback, useEffect, useMemo, useState } from 'react';
import { FiLock, FiLogOut } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API, { adminSession } from '../utils/api';
import PageHero from '../components/PageHero';

const statusOptions = ['new', 'contacted', 'qualified', 'converted', 'closed'];

export default function AdminPortal() {
  const [stats, setStats] = useState(null);
  const [leads, setLeads] = useState([]);
  const [filters, setFilters] = useState({ page: 'all', interestType: 'all', status: 'all' });
  const [loading, setLoading] = useState(true);
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
      const params = {};
      if (filters.page !== 'all') params.page = filters.page;
      if (filters.interestType !== 'all') params.interestType = filters.interestType;
      if (filters.status !== 'all') params.status = filters.status;

      const [statsRes, leadsRes] = await Promise.all([
        API.get('/admin/stats'),
        API.get('/admin/leads', { params }),
      ]);

      setStats(statsRes.data);
      setLeads(leadsRes.data);
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
  }, [filters.page, filters.interestType, filters.status, isAuthenticated]);

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  const pageOptions = useMemo(() => {
    if (!stats?.leadsByPage) return [];
    return stats.leadsByPage.map((item) => item._id).filter(Boolean);
  }, [stats]);

  const interestOptions = useMemo(() => {
    return Array.from(new Set(leads.map((lead) => lead.interestType).filter(Boolean)));
  }, [leads]);

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
    toast.success('Logged out from admin portal');
  };

  const updateLeadStatus = async (id, status) => {
    try {
      await API.patch(`/admin/leads/${id}/status`, { status });
      setLeads((prev) => prev.map((lead) => (lead._id === id ? { ...lead, status } : lead)));
    } catch (error) {
      console.error('Update lead status failed:', error);
      toast.error('Failed to update lead status');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="page-wrapper">
        <PageHero
          badge="Admin Portal"
          title="Protected"
          highlight="admin access"
          description="Login with the admin credentials to view and manage leads."
        />

        <section className="section section-darker">
          <div className="container">
            <div className="admin-login-card reveal">
              <div className="registration-success-icon" style={{ marginBottom: '16px' }}>
                <FiLock />
              </div>
              <h2>Admin Login</h2>
              <p>Use the admin username and password from the project README or server environment settings.</p>
              <form onSubmit={handleLogin} className="registration-form" style={{ marginTop: '20px' }}>
                <input
                  className="form-input"
                  placeholder="Admin username"
                  value={credentials.username}
                  onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))}
                />
                <input
                  className="form-input"
                  type="password"
                  placeholder="Admin password"
                  value={credentials.password}
                  onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                />
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
        highlight="clear visibility"
        description="Track new registrations by page, program, and selected plan in one professional dashboard."
      />

      <section className="section section-darker">
        <div className="container">
          <div className="admin-toolbar reveal">
            <div className="admin-filter-group">
              <select className="form-input" value={filters.page} onChange={(e) => setFilters((prev) => ({ ...prev, page: e.target.value }))}>
                <option value="all">All Pages</option>
                {pageOptions.map((page) => <option key={page} value={page}>{page}</option>)}
              </select>
              <select className="form-input" value={filters.interestType} onChange={(e) => setFilters((prev) => ({ ...prev, interestType: e.target.value }))}>
                <option value="all">All Interest Types</option>
                {interestOptions.map((interest) => <option key={interest} value={interest}>{interest}</option>)}
              </select>
              <select className="form-input" value={filters.status} onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}>
                <option value="all">All Statuses</option>
                {statusOptions.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>
            <button className="btn btn-secondary" onClick={handleLogout} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <FiLogOut /> Logout
            </button>
          </div>

          <div className="admin-stats-grid reveal">
            <div className="admin-stat-card">
              <span>Total Leads</span>
              <strong>{stats?.totalLeads ?? 0}</strong>
            </div>
            <div className="admin-stat-card">
              <span>Total Contacts</span>
              <strong>{stats?.totalContacts ?? 0}</strong>
            </div>
            <div className="admin-stat-card">
              <span>Total Bookings</span>
              <strong>{stats?.totalBookings ?? 0}</strong>
            </div>
            <div className="admin-stat-card">
              <span>Total Revenue</span>
              <strong>Rs. {(stats?.totalRevenue ?? 0).toLocaleString('en-IN')}</strong>
            </div>
          </div>

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

          <div className="admin-summary-card reveal">
            <h3>Lead Inbox</h3>
            {loading ? (
              <p className="section-subtitle" style={{ maxWidth: 'none' }}>Loading leads...</p>
            ) : (
              <div className="admin-lead-list">
                {leads.map((lead) => (
                  <div className="admin-lead-card" key={lead._id}>
                    <div className="admin-lead-head">
                      <div>
                        <h4>{lead.name}</h4>
                        <p>{lead.mobile}{lead.email ? ` | ${lead.email}` : ''}</p>
                      </div>
                      <select className="form-input admin-status-select" value={lead.status} onChange={(e) => updateLeadStatus(lead._id, e.target.value)}>
                        {statusOptions.map((status) => <option key={status} value={status}>{status}</option>)}
                      </select>
                    </div>
                    <div className="admin-lead-meta">
                      <span>{lead.source}</span>
                      <span>{lead.sourcePage}</span>
                      <span>{lead.interestLabel}</span>
                      {lead.planType ? <span>{lead.planType}</span> : null}
                      {lead.duration ? <span>{lead.duration}</span> : null}
                      <span>{lead.gender}, {lead.age}</span>
                    </div>
                    {lead.message ? <p className="admin-lead-note">{lead.message}</p> : null}
                    <p className="admin-lead-date">
                      {new Date(lead.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                    </p>
                  </div>
                ))}
                {leads.length === 0 ? <p className="section-subtitle" style={{ maxWidth: 'none' }}>No leads found for the selected filters.</p> : null}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
