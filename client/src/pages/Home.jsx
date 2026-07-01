/* ==========================================
   HOME.JSX - Home Page Component
   ==========================================

   WHY: The landing page introduces the NGO and its mission.
   Encourages visitors to volunteer or use the AI assistant.

   SECTIONS:
   1. Hero - Main banner with CTA
   2. About - NGO description
   3. Features - What the platform offers
   4. Call-to-Action - Buttons to get started

   COMPONENTS USED:
   - Card (for feature cards)
   - Button (for CTA buttons)
*/

import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import './Home.css';

// SVG Icons for features
const VolunteerIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
);

const AIIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
    </svg>
);

const AnalyticsIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
);

const CommunityIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
);

function Home() {
    // Feature cards data
    const features = [
        {
            title: 'Easy Registration',
            description: 'Sign up as a volunteer in minutes. Our streamlined form makes it simple to join our cause.',
            icon: <VolunteerIcon />,
        },
        {
            title: 'AI Assistant',
            description: 'Get instant answers about volunteering, events, and how you can make a difference.',
            icon: <AIIcon />,
        },
        {
            title: 'Impact Tracking',
            description: 'Track your volunteer hours and see the real impact you are making in the community.',
            icon: <AnalyticsIcon />,
        },
        {
            title: 'Community Driven',
            description: 'Join a network of passionate volunteers working together for social change.',
            icon: <CommunityIcon />,
        },
    ];

    return (
        <div className="home">
            {/* ==========================================
          HERO SECTION
          ========================================== */}
            <section className="hero">
                <div className="hero-content container">
                    <div className="hero-text">
                        <h1 className="hero-title animate-slideUp">
                            Empowering Communities, <span>One Volunteer</span> at a Time
                        </h1>
                        <p className="hero-description animate-slideUp">
                            Join NayePankh Foundation in our mission to create positive social change.
                            Whether you are here to volunteer or seeking assistance, our AI-powered
                            platform makes it easy to connect and make a difference.
                        </p>
                        <div className="hero-actions animate-slideUp">
                            <Link to="/volunteer">
                                <Button variant="primary" size="large">
                                    Become a Volunteer
                                </Button>
                            </Link>
                            <Link to="/chat">
                                <Button variant="outline" size="large">
                                    Talk to AI Assistant
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="hero-visual animate-fadeIn">
                        {/* Illustration using CSS art */}
                        <div className="hero-illustration">
                            <div className="illustration-circle main">
                                <svg viewBox="0 0 200 200" className="illustration-svg">
                                    {/* Hands coming together */}
                                    <circle cx="100" cy="100" r="90" fill="rgba(37, 99, 235, 0.1)" />
                                    <path
                                        d="M60 120c0-20 15-35 40-35s40 15 40 35-15 30-40 30-40-10-40-30z"
                                        fill="#2563eb"
                                        opacity="0.8"
                                    />
                                    <circle cx="70" cy="90" r="12" fill="#38bdf8" />
                                    <circle cx="100" cy="85" r="15" fill="#2563eb" />
                                    <circle cx="130" cy="90" r="12" fill="#38bdf8" />
                                    <path
                                        d="M50 140c25 20 75 20 100 0"
                                        fill="none"
                                        stroke="#2563eb"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>
                            <div className="illustration-circle accent"></div>
                            <div className="illustration-circle secondary"></div>
                        </div>
                    </div>
                </div>
                {/* Decorative wave */}
                <div className="hero-wave">
                    <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
                        <path
                            d="M0 60C240 120 480 0 720 60C960 120 1200 0 1440 60V120H0V60Z"
                            fill="#f8fafc"
                        />
                    </svg>
                </div>
            </section>

            {/* ==========================================
          ABOUT SECTION
          ========================================== */}
            <section className="about section">
                <div className="container">
                    <h2 className="section-title">About NayePankh Foundation</h2>
                    <p className="section-description">
                        <strong>NayePankh</strong> means "New Wings" - we believe everyone deserves
                        the opportunity to soar. Our foundation works tirelessly to empower
                        underprivileged communities through education, healthcare, and sustainable
                        development initiatives.
                    </p>
                    <p className="section-description">
                        With the help of dedicated volunteers like you, we have impacted thousands
                        of lives across rural and urban areas. Our AI-powered platform now makes
                        it easier than ever to get involved and track your contributions.
                    </p>
                </div>
            </section>

            {/* ==========================================
          FEATURES SECTION
          ========================================== */}
            <section className="features section">
                <div className="container">
                    <h2 className="section-title">What Our Platform Offers</h2>
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <Card
                                key={index}
                                title={feature.title}
                                description={feature.description}
                                icon={feature.icon}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ==========================================
          CTA SECTION
          ========================================== */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2 className="cta-title">Ready to Make a Difference?</h2>
                        <p className="cta-description">
                            Join our community of volunteers and start your journey today.
                            Every hour you give helps someone in need.
                        </p>
                        <div className="cta-actions">
                            <Link to="/volunteer">
                                <Button variant="primary" size="large">
                                    Register Now
                                </Button>
                            </Link>
                            <Link to="/admin">
                                <Button variant="outline" size="large">
                                    View Dashboard
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
          FOOTER
          ========================================== */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <span className="footer-logo">NayePankh</span>
                            <p>Empowering communities through volunteerism.</p>
                        </div>
                        <div className="footer-links">
                            <Link to="/">Home</Link>
                            <Link to="/volunteer">Volunteer</Link>
                            <Link to="/chat">AI Assistant</Link>
                            <Link to="/admin">Dashboard</Link>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2024 NayePankh Foundation. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;
