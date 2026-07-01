/* ==========================================
   NAVBAR.JSX - Navigation Component
   ==========================================

   WHY: The navbar provides consistent navigation across all pages.
   Uses React Router's NavLink for active state indication.

   FEATURES:
   - Responsive mobile menu
   - Active link highlighting
   - Hamburger menu for mobile
   - NGO branding

   HOW IT WORKS:
   1. Uses useState for mobile menu toggle
   2. Uses NavLink from react-router-dom for routing
   3. activeClassName applies styling based on current route
*/

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/navbar.css';

// SVG Icons as components for cleaner code
const HomeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);

const VolunteerIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="19" y1="8" x2="19" y2="14" />
        <line x1="22" y1="11" x2="16" y2="11" />
    </svg>
);

const DashboardIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
    </svg>
);

const ChatIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
);

const MenuIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);

const CloseIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

function Navbar() {
    // State to control mobile menu visibility
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Toggle mobile menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Close mobile menu when a link is clicked
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // Navigation links configuration
    const navLinks = [
        { to: '/', label: 'Home', icon: <HomeIcon /> },
        { to: '/volunteer', label: 'Volunteer', icon: <VolunteerIcon /> },
        { to: '/admin', label: 'Dashboard', icon: <DashboardIcon /> },
        { to: '/chat', label: 'AI Assistant', icon: <ChatIcon /> },
    ];

    return (
        <nav className={`navbar ${isMenuOpen ? 'navbar-menu-open' : ''}`}>
            <div className="navbar-container">
                {/* Brand / Logo */}
                <NavLink to="/" className="navbar-brand" onClick={closeMenu}>
                    <div className="navbar-logo-container">
                        <svg className="navbar-logo" viewBox="0 0 40 40" fill="none">
                            {/* Bird/Wing shape for NayePankh (New Wings) */}
                            <circle cx="20" cy="20" r="18" fill="#2563eb" />
                            <path
                                d="M12 22c0-5 4-10 12-8-3 1-4 3-4 5 0 3 3 4 6 4s6-2 6-5c-4 8-12 7-16 2"
                                fill="#ffffff"
                            />
                            <path
                                d="M20 16c2 0 4-1 5-3-1 2-3 3-5 3z"
                                fill="#ffffff"
                            />
                        </svg>
                    </div>
                    <span className="navbar-title">
                        Naye<span>Pankh</span>
                    </span>
                </NavLink>

                {/* Mobile menu toggle button */}
                <button
                    className="navbar-toggle"
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                >
                    {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </button>

                {/* Navigation links */}
                <ul className={`navbar-links ${isMenuOpen ? 'navbar-open' : ''}`}>
                    {navLinks.map((link) => (
                        <li key={link.to}>
                            <NavLink
                                to={link.to}
                                className={({ isActive }) =>
                                    `navbar-link ${isActive ? 'active' : ''}`
                                }
                                onClick={closeMenu}
                            >
                                {link.icon}
                                <span>{link.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
