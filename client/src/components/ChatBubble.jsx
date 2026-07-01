/* ==========================================
   CHATBUBBLE.JSX - Message Bubble for Chat
   ==========================================

   WHY: Displays individual messages in the chat interface.
   Handles both user and AI messages with different styling.

   PROPS:
   - type: 'user' | 'ai' (determines alignment/style)
   - content: string (message text)
   - isLoading: boolean (shows typing indicator)
*/

function ChatBubble({ type = 'ai', content, isLoading = false }) {
    // Avatar icons based on type
    const UserAvatar = () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );

    const AIAvatar = () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
        </svg>
    );

    return (
        <div className={`message ${type}`}>
            {/* Avatar */}
            <div className="message-avatar">
                <div className={`avatar ${type === 'user' ? 'user-avatar' : 'ai-avatar'}`}>
                    {type === 'user' ? <UserAvatar /> : <AIAvatar />}
                </div>
            </div>

            {/* Bubble content */}
            <div className="bubble">
                {isLoading ? (
                    // Typing indicator for loading state
                    <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                ) : (
                    // Actual message content
                    content
                )}
            </div>
        </div>
    );
}

export default ChatBubble;
