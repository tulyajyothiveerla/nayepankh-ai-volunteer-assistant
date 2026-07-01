/* ==========================================
   CARD.JSX - Reusable Card Component
   ==========================================

   WHY: Cards provide a consistent container for content.
   Used extensively in home page features and other sections.

   PROPS:
   - title: string (card heading)
   - description: string (card content)
   - icon: ReactNode (SVG icon)
   - className: string (additional classes)
   - onClick: function (makes card clickable)
   - children: ReactNode (custom content instead of default)
*/

import './Card.css';

function Card({ title, description, icon, className = '', onClick, children }) {
    const classes = [
        'card',
        onClick ? 'card-clickable' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={classes} onClick={onClick}>
            {/* Icon section */}
            {icon && <div className="card-icon">{icon}</div>}

            {/* Content - either children or default title/description */}
            {children || (
                <div className="card-content">
                    {title && <h3 className="card-title">{title}</h3>}
                    {description && <p className="card-description">{description}</p>}
                </div>
            )}
        </div>
    );
}

export default Card;
