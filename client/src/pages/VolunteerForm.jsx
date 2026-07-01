/* ==========================================
   VOLUNTEERFORM.JSX - Volunteer Registration Page
   ==========================================

   WHY: Allows users to register as volunteers.
   Handles form validation and API submission.

   FEATURES:
   - Form validation with real-time feedback
   - Loading state during submission
   - Success/error messages
   - Responsive design

   STATE MANAGEMENT:
   - formData: stores all input values
   - errors: validation errors for each field
   - isLoading: submission state
   - success: success message
   - apiError: API error message

   API INTEGRATION:
   Uses registerVolunteer() from volunteerService
*/

import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { registerVolunteer } from '../services/volunteerService';
import '../styles/form.css';
import './VolunteerForm.css';

function VolunteerForm() {
    // ==========================================
    // STATE MANAGEMENT
    // ==========================================

    // Form data state - stores all input values
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        skills: '',
        availability: '',
        message: '',
    });

    // Validation errors state
    const [errors, setErrors] = useState({});

    // Loading state for form submission
    const [isLoading, setIsLoading] = useState(false);

    // Success message after successful registration
    const [success, setSuccess] = useState(false);

    // API error message
    const [apiError, setApiError] = useState('');

    // ==========================================
    // VALIDATION FUNCTIONS
    // ==========================================

    /**
     * Validates a single field
     * Called on blur and during form submission
     */
    const validateField = (name, value) => {
        switch (name) {
            case 'name':
                if (!value.trim()) return 'Name is required';
                if (value.trim().length < 2) return 'Name must be at least 2 characters';
                return '';
            case 'email':
                if (!value.trim()) return 'Email is required';
                // Simple email regex validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return 'Please enter a valid email';
                return '';
            case 'phone':
                if (!value.trim()) return 'Phone number is required';
                // Check if phone has at least 10 digits
                const phoneDigits = value.replace(/\D/g, '');
                if (phoneDigits.length < 10) return 'Please enter a valid phone number';
                return '';
            case 'skills':
                if (!value.trim()) return 'Please tell us about your skills';
                return '';
            case 'availability':
                if (!value.trim()) return 'Please specify your availability';
                return '';
            default:
                return '';
        }
    };

    /**
     * Validates all fields
     * Returns true if form is valid
     */
    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        // Validate each required field
        Object.keys(formData).forEach((key) => {
            if (key !== 'message') { // message is optional
                const error = validateField(key, formData[key]);
                if (error) {
                    newErrors[key] = error;
                    isValid = false;
                }
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    // ==========================================
    // EVENT HANDLERS
    // ==========================================

    /**
     * Handle input changes
     * Updates formData state and clears errors
     */
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update form data
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }

        // Clear api error when user makes changes
        if (apiError) {
            setApiError('');
        }
    };

    /**
     * Handle input blur
     * Validates field when user leaves it
     */
    const handleBlur = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        if (error) {
            setErrors((prev) => ({
                ...prev,
                [name]: error,
            }));
        }
    };

    /**
     * Handle form submission
     * 1. Validates form
     * 2. Calls API
     * 3. Shows success/error message
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous messages
        setApiError('');
        setSuccess(false);

        // Validate all fields
        if (!validateForm()) {
            return;
        }

        // Start loading
        setIsLoading(true);

        try {
            // Map message to interests before sending payload
            const payload = {
                ...formData,
                interests: formData.message,
            };

            // Call API service
            await registerVolunteer(payload);

            // Show success message
            setSuccess(true);

            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                skills: '',
                availability: '',
                message: '',
            });
        } catch (error) {
            // Show API error
            setApiError(error.message || 'Registration failed. Please try again.');
        } finally {
            // Stop loading
            setIsLoading(false);
        }
    };

    // ==========================================
    // RENDER
    // ==========================================

    return (
        <div className="volunteer-page">
            <div className="container">
                <div className="volunteer-container">
                    {/* ==========================================
              FORM HEADER
              ========================================== */}
                    <div className="form-header">
                        <h1 className="form-title">Register as a Volunteer</h1>
                        <p className="form-subtitle">
                            Join NayePankh Foundation and make a difference in your community.
                        </p>
                    </div>

                    {/* ==========================================
              SUCCESS MESSAGE
              ========================================== */}
                    {success && (
                        <div className="form-message success animate-slideUp">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                            <div>
                                <strong>Registration Successful!</strong>
                                <p>Thank you for joining NayePankh. We will contact you soon.</p>
                            </div>
                        </div>
                    )}

                    {/* ==========================================
              API ERROR MESSAGE
              ========================================== */}
                    {apiError && (
                        <div className="form-message error animate-slideUp">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="15" y1="9" x2="9" y2="15" />
                                <line x1="9" y1="9" x2="15" y2="15" />
                            </svg>
                            <span>{apiError}</span>
                        </div>
                    )}

                    {/* ==========================================
              REGISTRATION FORM
              ========================================== */}
                    <form className="form-container" onSubmit={handleSubmit}>
                        {/* Name Field */}
                        <div className={`form-group ${errors.name ? 'error' : ''}`}>
                            <label className="form-label required" htmlFor="name">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-input"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled={isLoading}
                            />
                            {errors.name && (
                                <span className="form-error">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="12" y1="8" x2="12" y2="12" />
                                        <line x1="12" y1="16" x2="12.01" y2="16" />
                                    </svg>
                                    {errors.name}
                                </span>
                            )}
                        </div>

                        {/* Email and Phone in a row */}
                        <div className="form-row">
                            {/* Email Field */}
                            <div className={`form-group ${errors.email ? 'error' : ''}`}>
                                <label className="form-label required" htmlFor="email">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-input"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={isLoading}
                                />
                                {errors.email && (
                                    <span className="form-error">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                            <circle cx="12" cy="12" r="10" />
                                            <line x1="12" y1="8" x2="12" y2="12" />
                                            <line x1="12" y1="16" x2="12.01" y2="16" />
                                        </svg>
                                        {errors.email}
                                    </span>
                                )}
                            </div>

                            {/* Phone Field */}
                            <div className={`form-group ${errors.phone ? 'error' : ''}`}>
                                <label className="form-label required" htmlFor="phone">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className="form-input"
                                    placeholder="+91 XXXXX XXXXX"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={isLoading}
                                />
                                {errors.phone && (
                                    <span className="form-error">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                            <circle cx="12" cy="12" r="10" />
                                            <line x1="12" y1="8" x2="12" y2="12" />
                                            <line x1="12" y1="16" x2="12.01" y2="16" />
                                        </svg>
                                        {errors.phone}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Skills/Interests Field */}
                        <div className={`form-group ${errors.skills ? 'error' : ''}`}>
                            <label className="form-label required" htmlFor="skills">
                                Skills & Interests
                            </label>
                            <input
                                type="text"
                                id="skills"
                                name="skills"
                                className="form-input"
                                placeholder="e.g., Teaching, Healthcare, Event Management"
                                value={formData.skills}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled={isLoading}
                            />
                            {errors.skills && (
                                <span className="form-error">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="12" y1="8" x2="12" y2="12" />
                                        <line x1="12" y1="16" x2="12.01" y2="16" />
                                    </svg>
                                    {errors.skills}
                                </span>
                            )}
                        </div>

                        {/* Availability Field */}
                        <div className={`form-group ${errors.availability ? 'error' : ''}`}>
                            <label className="form-label required" htmlFor="availability">
                                Availability
                            </label>
                            <select
                                id="availability"
                                name="availability"
                                className="form-select"
                                value={formData.availability}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled={isLoading}
                            >
                                <option value="">Select your availability</option>
                                <option value="weekdays">Weekdays</option>
                                <option value="weekends">Weekends</option>
                                <option value="evenings">Evenings</option>
                                <option value="flexible">Flexible</option>
                                <option value="occasional">Occasional (Events Only)</option>
                            </select>
                            {errors.availability && (
                                <span className="form-error">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="12" y1="8" x2="12" y2="12" />
                                        <line x1="12" y1="16" x2="12.01" y2="16" />
                                    </svg>
                                    {errors.availability}
                                </span>
                            )}
                        </div>

                        {/* Message Field (Optional) */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="message">
                                Additional Message (Optional)
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                className="form-textarea"
                                placeholder="Tell us more about yourself or why you want to volunteer..."
                                value={formData.message}
                                onChange={handleChange}
                                disabled={isLoading}
                                rows="4"
                            />
                        </div>

                        {/* Form Actions */}
                        <div className="form-actions">
                            <Button
                                type="submit"
                                variant="primary"
                                size="large"
                                loading={isLoading}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Registering...' : 'Register as Volunteer'}
                            </Button>
                        </div>

                        {/* Helper Links */}
                        <div className="form-footer">
                            <p>
                                Already registered?{' '}
                                <Link to="/admin">View all volunteers</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default VolunteerForm;
