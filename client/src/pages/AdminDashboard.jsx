/* ==========================================
   ADMINDASHBOARD.JSX - Admin Dashboard Page
   ==========================================

   WHY: Provides an overview of volunteer data
   and allows administrators to manage registrations.

   FEATURES:
   - Statistics cards with metrics
   - Volunteer data table
   - Loading and error states
   - Refresh functionality
   - Responsive design

   STATE MANAGEMENT:
   - volunteers: array of volunteer objects
   - stats: calculated statistics
   - isLoading: data fetch state
   - error: API error message

   API INTEGRATION:
   Uses getVolunteers() from volunteerService

   LIFECYCLE:
   - useEffect runs on mount to fetch data
   - fetchVolunteers() can be called to refresh
*/

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardCard from '../components/DashboardCard';
import Loader from '../components/Loader';
import Button from '../components/Button';
import { getVolunteers } from '../services/volunteerService';
import '../styles/dashboard.css';

// SVG Icons for stat cards
const VolunteersIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
);

const ActiveIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

const SkillsIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

const TimeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

function AdminDashboard() {
    // ==========================================
    // STATE MANAGEMENT
    // ==========================================

    // Volunteers data array
    const [volunteers, setVolunteers] = useState([]);

    // Calculated statistics
    const [stats, setStats] = useState({
        total: 0,
        activeToday: 0,
        skillCategories: 0,
        avgResponseTime: '< 24h',
    });

    // Loading state
    const [isLoading, setIsLoading] = useState(true);

    // Error state
    const [error, setError] = useState('');

    // ==========================================
    // DATA FETCHING
    // ==========================================

    /**
     * Fetch volunteers from API
     * Called on component mount and refresh button click
     */
    const fetchVolunteers = async () => {
        setIsLoading(true);
        setError('');

        try {
            const data = await getVolunteers();
            setVolunteers(data);

            // Calculate statistics
            const totalVolunteers = data.length;

            // Count unique skill categories
            const uniqueSkills = new Set(
                data
                    .flatMap((v) =>
                        (v.skills || '')
                            .split(',')
                            .map((s) => s.trim().toLowerCase())
                    )
                    .filter(Boolean)
            );

            // Count volunteers available today (flexible or weekdays)
            const availableToday = data.filter((v) => {
                const avail = (v.availability || '').toLowerCase();
                return avail.includes('flexible') || avail.includes('weekday');
            }).length;

            setStats({
                total: totalVolunteers,
                activeToday: availableToday,
                skillCategories: uniqueSkills.size || 1,
                avgResponseTime: '< 24h',
            });
        } catch (err) {
            setError(err.message || 'Failed to load volunteer data');
        } finally {
            setIsLoading(false);
        }
    };

    // ==========================================
    // LIFECYCLE
    // ==========================================

    // Fetch data when component mounts
    useEffect(() => {
        fetchVolunteers();
    }, []);

    // ==========================================
    // HELPER FUNCTIONS
    // ==========================================

    /**
     * Format date for display
     */
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            });
        } catch {
            return dateString;
        }
    };

    /**
     * Get availability badge class
     */
    const getAvailabilityBadge = (availability) => {
        const avail = (availability || '').toLowerCase();
        if (avail.includes('flexible')) return 'success';
        if (avail.includes('weekend')) return 'warning';
        return 'primary';
    };

    // ==========================================
    // RENDER
    // ==========================================

    return (
        <div className="dashboard">
            <div className="container">
                {/* ==========================================
            DASHBOARD HEADER
            ========================================== */}
                <div className="dashboard-header">
                    <div>
                        <h1 className="dashboard-title">Admin Dashboard</h1>
                        <p className="dashboard-subtitle">
                            Manage and track volunteer registrations
                        </p>
                    </div>
                    <div className="dashboard-actions">
                        <Link to="/volunteer">
                            <Button variant="primary" size="small">
                                + Add Volunteer
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* ==========================================
            LOADING STATE
            ========================================== */}
                {isLoading && <Loader text="Loading volunteer data..." />}

                {/* ==========================================
            ERROR STATE
            ========================================== */}
                {error && (
                    <div className="dashboard-error animate-slideUp">
                        <div className="form-message error">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="15" y1="9" x2="9" y2="15" />
                                <line x1="9" y1="9" x2="15" y2="15" />
                            </svg>
                            <span>{error}</span>
                        </div>
                        <Button variant="outline" onClick={fetchVolunteers}>
                            Try Again
                        </Button>
                    </div>
                )}

                {/* ==========================================
            DASHBOARD CONTENT
            ========================================== */}
                {!isLoading && !error && (
                    <>
                        {/* Statistics Cards */}
                        <div className="stats-grid">
                            <DashboardCard
                                title="Total Volunteers"
                                value={stats.total}
                                icon={<VolunteersIcon />}
                                variant="primary"
                            />
                            <DashboardCard
                                title="Available Today"
                                value={stats.activeToday}
                                icon={<ActiveIcon />}
                                variant="success"
                            />
                            <DashboardCard
                                title="Skill Categories"
                                value={stats.skillCategories}
                                icon={<SkillsIcon />}
                                variant="accent"
                            />
                            <DashboardCard
                                title="Avg Response"
                                value={stats.avgResponseTime}
                                icon={<TimeIcon />}
                                variant="warning"
                            />
                        </div>

                        {/* Volunteers Table */}
                        <div className="table-container">
                            <div className="table-header">
                                <h3 className="table-title">Recent Registrations</h3>
                                <Button variant="ghost" size="small" onClick={fetchVolunteers}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                        <polyline points="23 4 23 10 17 10" />
                                        <polyline points="1 20 1 14 7 14" />
                                        <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
                                    </svg>
                                    Refresh
                                </Button>
                            </div>

                            {volunteers.length === 0 ? (
                                /* Empty State */
                                <div className="table-empty">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M23 21v-2a4 4 0 00-3-3.87" />
                                        <path d="M16 3.13a4 4 0 010 7.75" />
                                    </svg>
                                    <p>No volunteers registered yet</p>
                                    <Link to="/volunteer">
                                        <Button variant="primary" size="small">
                                            Add First Volunteer
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                /* Data Table */
                                <div style={{ overflowX: 'auto' }}>
                                    <table className="data-table">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Skills</th>
                                                <th>Availability</th>
                                                <th>Registered</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {volunteers.map((volunteer, index) => (
                                                <tr key={volunteer.id || index}>
                                                    <td>
                                                        <strong>{volunteer.name}</strong>
                                                    </td>
                                                    <td>{volunteer.email}</td>
                                                    <td>{volunteer.phone}</td>
                                                    <td>{volunteer.skills}</td>
                                                    <td>
                                                        <span className={`badge ${getAvailabilityBadge(volunteer.availability)}`}>
                                                            {volunteer.availability}
                                                        </span>
                                                    </td>
                                                    <td>{formatDate(volunteer.created_at || volunteer.registered)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;
