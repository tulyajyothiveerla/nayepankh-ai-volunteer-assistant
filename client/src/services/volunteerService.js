/* ==========================================
   VOLUNTEERSERVICE.JS - Volunteer API Service
   ==========================================

   WHY: Centralizes all volunteer-related API calls.
   This makes it easy to:
   - Change API endpoints in one place
   - Handle errors consistently
   - Test components with mock services

   API ENDPOINTS USED:
   - GET http://localhost:5000/api/volunteers
   - POST http://localhost:5000/api/volunteers

   HOW TO USE:
   import { getVolunteers, registerVolunteer } from './services/volunteerService';
   const volunteers = await getVolunteers();
*/

import axios from 'axios';

// Create an axios instance with base configuration
// This allows us to set default values for all requests
const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Fetch all volunteers from the database
 *
 * @returns {Promise<Array>} Array of volunteer objects
 * @throws {Error} If the API call fails
 *
 * HOW IT WORKS:
 * 1. Makes GET request to /api/volunteers
 * 2. Returns the data array from response
 * 3. Error is caught and re-thrown with message
 */
export const getVolunteers = async () => {
    try {
        const response = await api.get('/volunteers');
        return response.data;
    } catch (error) {
        // Extract error message from response or use generic message
        const message = error.response?.data?.message || 'Failed to fetch volunteers';
        throw new Error(message);
    }
};

/**
 * Register a new volunteer
 *
 * @param {Object} volunteerData - Volunteer information
 * @param {string} volunteerData.name - Full name
 * @param {string} volunteerData.email - Email address
 * @param {string} volunteerData.phone - Phone number
 * @param {string} volunteerData.skills - Skills/interests
 * @param {string} volunteerData.availability - Available time
 * @returns {Promise<Object>} Created volunteer object
 * @throws {Error} If validation fails or API call fails
 *
 * HOW IT WORKS:
 * 1. Makes POST request to /api/volunteers
 * 2. Sends volunteerData in request body
 * 3. Returns the created volunteer
 */
export const registerVolunteer = async (volunteerData) => {
    try {
        const response = await api.post('/volunteers', volunteerData);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to register volunteer';
        throw new Error(message);
    }
};

/**
 * Get volunteer statistics for dashboard
 * This is a helper to calculate stats from volunteer data
 *
 * @param {Array} volunteers - Array of volunteers
 * @returns {Object} Statistics object
 */
export const calculateStats = (volunteers) => {
    return {
        total: volunteers.length,
        // Add more stat calculations as needed
    };
};

export default {
    getVolunteers,
    registerVolunteer,
    calculateStats,
};
