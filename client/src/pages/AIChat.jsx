/* ==========================================
   AICHAT.JSX - AI Assistant Chat Page
   ==========================================

   WHY: Provides a ChatGPT-style interface for users
   to interact with the AI assistant powered by Gemini.

   FEATURES:
   - ChatGPT-style layout
   - User messages on right, AI messages on left
   - Loading animation while waiting
   - Auto-scroll to latest message
   - Enter key to send (Shift+Enter for new line)
   - Clear chat button
   - Mobile responsive

   STATE MANAGEMENT:
   - messages: array of message objects
  - inputText: current input value
   - isLoading: waiting for AI response
   - error: API error message

   API INTEGRATION:
   Uses sendMessage() from chatService

   MESSAGE STRUCTURE:
   { type: 'user' | 'ai', content: string }
*/

import { useState, useEffect, useRef } from 'react';
import ChatBubble from '../components/ChatBubble';
import { sendMessage } from '../services/chatService';
import '../styles/chat.css';

// SVG Icons
const SendIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
);

const ClearIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
);

const AIIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
    </svg>
);

const ChatIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
);

function AIChat() {
    // ==========================================
    // STATE MANAGEMENT
    // ==========================================

    // Array of chat messages
    const [messages, setMessages] = useState([]);

    // Current input value
    const [inputText, setInputText] = useState('');

    // Loading state while waiting for AI response
    const [isLoading, setIsLoading] = useState(false);

    // Error message from API
    const [error, setError] = useState('');

    // ==========================================
    // REFS
    // ==========================================

    // Reference to messages container for auto-scroll
    const messagesEndRef = useRef(null);

    // Reference to textarea for focus management
    const textareaRef = useRef(null);

    // ==========================================
    // AUTO-SCROLL
    // ==========================================

    /**
     * Scrolls to bottom of messages
     * Called whenever messages change
     */
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Auto-scroll when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Focus input on mount
    useEffect(() => {
        textareaRef.current?.focus();
    }, []);

    // ==========================================
    // CHAT HANDLERS
    // ==========================================

    /**
     * Handle input text changes
     * Also auto-resizes textarea
     */
    const handleInputChange = (e) => {
        setInputText(e.target.value);

        // Auto-resize textarea
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    };

    /**
     * Handle keyboard shortcuts
     * Enter to send, Shift+Enter for new line
     */
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    /**
     * Send message to AI
     * 1. Add user message to chat
     * 2. Call API
     * 3. Add AI response to chat
     * 4. Clear input
     */
    const handleSend = async () => {
        // Don't send empty messages
        const trimmedInput = inputText.trim();
        if (!trimmedInput || isLoading) return;

        // Clear previous error
        setError('');

        // Add user message to chat
        const userMessage = { type: 'user', content: trimmedInput };
        setMessages((prev) => [...prev, userMessage]);

        // Clear input
        setInputText('');

        // Reset textarea height
        textareaRef.current.style.height = 'auto';

        // Start loading
        setIsLoading(true);

        try {
            // Call chat service
            const response = await sendMessage(trimmedInput);

            // Add AI response to chat
            const aiMessage = { type: 'ai', content: response };
            setMessages((prev) => [...prev, aiMessage]);
        } catch (err) {
            // Show error
            setError(err.message || 'Failed to get response');

            // Optionally add error message to chat
            const errorMessage = {
                type: 'ai',
                content: 'Sorry, I encountered an error. Please try again.',
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            // Stop loading
            setIsLoading(false);
        }
    };

    /**
     * Clear all messages
     * Resets chat to initial state
     */
    const handleClearChat = () => {
        setMessages([]);
        setError('');
        setInputText('');
        textareaRef.current?.focus();
    };

    // ==========================================
    // RENDER
    // ==========================================

    return (
        <div className="chat-page">
            <div className="chat-container">
                {/* ==========================================
            CHAT HEADER
            ========================================== */}
                <header className="chat-header">
                    <div className="chat-title">
                        <AIIcon />
                        <span>AI Assistant</span>
                    </div>
                    {messages.length > 0 && (
                        <button
                            className="chat-action-btn clear-btn"
                            onClick={handleClearChat}
                            title="Clear chat"
                            aria-label="Clear chat"
                        >
                            <ClearIcon />
                        </button>
                    )}
                </header>

                {/* ==========================================
            MESSAGES AREA
            ========================================== */}
                <main className="chat-messages">
                    {/* Empty state - shown when no messages */}
                    {messages.length === 0 && !isLoading && (
                        <div className="chat-empty">
                            <ChatIcon />
                            <h3>How can I help you today?</h3>
                            <p>
                                Ask me about volunteering, NayePankh Foundation,
                                or how you can make a difference.
                            </p>
                        </div>
                    )}

                    {/* Message bubbles */}
                    {messages.map((message, index) => (
                        <ChatBubble
                            key={index}
                            type={message.type}
                            content={message.content}
                        />
                    ))}

                    {/* Loading indicator */}
                    {isLoading && (
                        <ChatBubble type="ai" isLoading={true} />
                    )}

                    {/* Error message */}
                    {error && messages.length === 0 && (
                        <div className="form-message error">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="15" y1="9" x2="9" y2="15" />
                                <line x1="9" y1="9" x2="15" y2="15" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Scroll anchor */}
                    <div ref={messagesEndRef} />
                </main>

                {/* ==========================================
            INPUT AREA
            ========================================== */}
                <footer className="chat-input-area">
                    <div className="chat-input-container">
                        <textarea
                            ref={textareaRef}
                            className="chat-input"
                            placeholder="Type your message..."
                            value={inputText}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            disabled={isLoading}
                            rows="1"
                            aria-label="Chat message input"
                        />
                        <button
                            className="chat-action-btn send-btn"
                            onClick={handleSend}
                            disabled={!inputText.trim() || isLoading}
                            title="Send message"
                            aria-label="Send message"
                        >
                            <SendIcon />
                        </button>
                    </div>
                    <p className="chat-hint">
                        Press <kbd>Enter</kbd> to send, <kbd>Shift + Enter</kbd> for new line
                    </p>
                </footer>
            </div>
        </div>
    );
}

export default AIChat;
