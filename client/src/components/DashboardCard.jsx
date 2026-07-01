/* ==========================================
   DASHBOARDCARD.JSX - Stat Card for Dashboard
   ==========================================

   WHY: Displays statistics in a visually appealing way.
   Part of the Admin Dashboard for showing metrics.

   PROPS:
   - title: string (label for the stat)
   - value: number/string (the main stat value)
   - icon: ReactNode (SVG icon for visual)
   - variant: 'primary' | 'success' | 'warning' | 'accent' (color)
   - trend: object (optional trend data)
*/

function DashboardCard({ title, value, icon, variant = 'primary', trend }) {
    return (
        <div className="stat-card">
            {/* Icon with color variant */}
            <div className={`stat-icon ${variant}`}>
                {icon}
            </div>

            {/* Stat content */}
            <div className="stat-content">
                <div className="stat-value">{value}</div>
                <div className="stat-label">{title}</div>

                {/* Optional trend indicator */}
                {trend && (
                    <div className={`stat-trend ${trend.direction}`}>
                        {trend.direction === 'up' ? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                <polyline points="18 15 12 9 6 15" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        )}
                        <span>{trend.value}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DashboardCard;
