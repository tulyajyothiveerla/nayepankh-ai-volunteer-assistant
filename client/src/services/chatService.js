/* ==========================================
   CHATSERVICE.JS - AI Chat API Service
   ==========================================

   WHY: Centralizes chat-related API calls to your
   Gemini AI backend.

   API ENDPOINT USED:
   - POST http://localhost:5000/api/chat

   HOW TO USE:
   import { sendMessage } from './services/chatService';
   const response = await sendMessage('Hello!');
*/

import axios from 'axios';

// Create axios instance for chat API
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Send a message to the AI assistant
 *
 * @param {string} message - User's message
 * @returns {Promise<string>} AI's response
 * @throws {Error} If the API call fails
 *
 * HOW IT WORKS:
 * 1. Makes POST request to /api/chat
 * 2. Sends message in request body
 * 3. Returns the AI's response text
 *
 * EXAMPLE USAGE:
 * const aiResponse = await sendMessage('How can I help?');
 * console.log(aiResponse); // AI's reply
 */
export const sendMessage = async (message) => {
    try {
        const response = await api.post('/chat', { message });
        const data = response.data;
        let reply = data.reply || data.response || data.message || data;
        if (typeof reply === 'object') {
            reply = JSON.stringify(reply);
        }
        return String(reply);
    } catch (error) {
        // Handle different error formats
        const errorMsg =
            error.response?.data?.message ||
            error.response?.data?.error ||
            'Failed to get AI response. Please try again.';
        throw new Error(errorMsg);
    }
};

/**
 * Send a message with conversation history
 * Use this if your backend supports context/conversation
 *
 * @param {string} message - Current message
 * @param {Array} history - Previous messages
 * @returns {Promise<string>} AI's response
 */
export const sendMessageWithContext = async (message, history = []) => {
    try {
        const response = await api.post('/chat', {
            message,
            history, // Send conversation context if backend supports it
        });
        return response.data.reply || response.data.response || response.data.message || response.data;
    } catch (error) {
        const message =
            error.response?.data?.message ||
            error.response?.data?.error ||
            'Failed to get AI response. Please try again.';
        throw new Error(message);
    }
};

export default {
    sendMessage,
    sendMessageWithContext,
};
