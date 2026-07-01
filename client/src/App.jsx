/* ==========================================
   APP.JSX - Main Application Component
   ==========================================

   WHY: This is the root component that sets up routing
   and provides the overall app structure.

   ROUTING STRUCTURE:
   - / (Home Page)
   - /volunteer (Volunteer Registration)
   - /admin (Admin Dashboard)
   - /chat (AI Assistant)

   HOW REACT ROUTER WORKS:
   1. BrowserRouter wraps the app to enable routing
   2. Routes defines which component shows for each URL
   3. Route maps a path to a component
   4. Link/NavLink navigate between routes without page reload

   COMPONENT HIERARCHY:
   App
   └── Navbar (always visible)
   └── Routes
       └── Route -> Page Component
*/

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import VolunteerForm from './pages/VolunteerForm';
import AdminDashboard from './pages/AdminDashboard';
import AIChat from './pages/AIChat';

// Import global styles
import './styles/theme.css';

function App() {
  return (
    <BrowserRouter>
      {/* Main app wrapper */}
      <div className="app">
        {/* Navbar - visible on all pages */}
        <Navbar />

        {/* Main content area - renders based on current route */}
        <main className="main-content">
          <Routes>
            {/* Home Page Route */}
            <Route path="/" element={<Home />} />

            {/* Volunteer Registration Route */}
            <Route path="/volunteer" element={<VolunteerForm />} />

            {/* Admin Dashboard Route */}
            <Route path="/admin" element={<AdminDashboard />} />

            {/* AI Chat Assistant Route */}
            <Route path="/chat" element={<AIChat />} />

            {/* 404 - Redirect unknown routes to home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
