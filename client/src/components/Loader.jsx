/* ==========================================
   LOADER.JSX - Loading Spinner Component
   ==========================================

   WHY: Loading states improve UX by showing that
   something is happening. Used when fetching data
   or submitting forms.

   PROPS:
   - size: 'small' | 'medium' | 'large' (spinner size)
   - text: string (optional loading message)
   - fullPage: boolean (centers in viewport)
*/

import './Loader.css';

function Loader({ size = 'medium', text, fullPage = false }) {
    const classes = [
        'loader',
        `loader-${size}`,
        fullPage ? 'loader-fullpage' : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={classes}>
            <div className="loader-spinner">
                <svg viewBox="0 0 24 24" fill="none">
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
            </div>
            {text && <p className="loader-text">{text}</p>}
        </div>
    );
}

export default Loader;
