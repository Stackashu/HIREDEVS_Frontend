import React from 'react';
import Button from './Button';

const ProfileIcon = ({ size = 32 }) => (
    <svg height={size} viewBox="0 0 24 24" width={size} style={{ verticalAlign: "middle", color: "var(--color-primary)" }}>
        <circle cx="12" cy="8" r="4" fill="currentColor" opacity="0.8" />
        <path d="M12 14c-4.42 0-8 1.79-8 4v1h16v-1c0-2.21-3.58-4-8-4z" fill="currentColor" opacity="0.5" />
    </svg>
);

const Navbar = ({
    loggedInUser,
    activeNav,
    setActiveNav,
    setSelectedUser,
    profileOpen,
    setProfileOpen,
    handleLogout
}) => {
    return (
        <nav className="dashboard-nav">
            <div className="nav-container">
                <div className="nav-brand">HIREDEVS</div>

                <div className="nav-links">
                    {loggedInUser && (
                        <>
                            <Button
                                variant={activeNav === "tickets" ? "primary" : "ghost"}
                                onClick={() => setActiveNav("tickets")}
                                size="small"
                            >
                                Tickets
                            </Button>
                            {loggedInUser.role === "admin" && (
                                <Button
                                    variant={activeNav === "users" ? "primary" : "ghost"}
                                    onClick={() => { setActiveNav("users"); setSelectedUser(null); }}
                                    size="small"
                                >
                                    Developers
                                </Button>
                            )}
                        </>
                    )}
                </div>

                <div className="nav-profile-section">
                    <div className="profile-dropdown-container">
                        <button onClick={() => setProfileOpen(!profileOpen)} className="profile-btn">
                            <ProfileIcon />
                        </button>
                        {profileOpen && loggedInUser && (
                            <div className="profile-menu">
                                <div className="menu-user-email">{loggedInUser.email}</div>
                                <div className="menu-user-role">{loggedInUser.role}</div>
                                <Button variant="danger" size="small" onClick={handleLogout} className="w-full">
                                    Logout
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
export { ProfileIcon };
