/* ==========================================
   BUTTON.JSX - Reusable Button Component
   ==========================================

   WHY: Buttons are used everywhere. A reusable component
   ensures consistent styling and behavior across the app.

   PROPS:
   - variant: 'primary' | 'secondary' | 'outline' (styling)
   - size: 'small' | 'medium' | 'large' (dimensions)
   - disabled: boolean (interactive state)
   - loading: boolean (shows spinner)
   - onClick: function (click handler)
   - type: 'button' | 'submit' | 'reset' (form behavior)
   - className: string (additional classes)
   - children: ReactNode (button content)
*/

import './Button.css';

function Button({
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    onClick,
    type = 'button',
    className = '',
    children,
}) {
    // Build class names based on props
    const classes = [
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        disabled || loading ? 'btn-disabled' : '',
        loading ? 'btn-loading' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button
            type={type}
            className={classes}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {loading && (
                <span className="btn-spinner">
                    <svg viewBox="0 0 24 24" fill="none" className="spinner-icon">
                        <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeDasharray="31.4 31.4"
                        />
                    </svg>
                </span>
            )}
            <span className="btn-content">{children}</span>
        </button>
    );
}

export default Button;
