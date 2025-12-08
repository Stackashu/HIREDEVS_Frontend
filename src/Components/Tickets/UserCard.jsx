import React from 'react';
import Card from '../Card';
import { ProfileIcon } from '../Navbar';

const UserCard = ({ user, onClick, isSelected }) => (
    <Card
        padding="small"
        className={`user-card-item ${isSelected ? "selected" : ""}`}
        onClick={() => onClick(user)}
        style={{ cursor: "pointer", background: isSelected ? "rgba(59, 130, 246, 0.1)" : undefined }}
    >
        <div className="card-user-info">
            <ProfileIcon size={28} />
            <div style={{ flex: 1 }}>
                <div className="user-name">
                    {user.email ? user.email.split("@")[0] : "User"}
                </div>
                <div className="user-role-badge">
                    {user.role === "moderator" ? "Developer" : user.role}
                </div>
            </div>
        </div>
        <div className="user-email-text">
            <b>Email:</b> {user.email}
        </div>
        <div>
            <div className="user-skills-list">
                {user.skills && user.skills.length > 0 ? (
                    user.skills.map((s, i) => (
                        <span key={i} className="mini-skill-badge">
                            {s}
                        </span>
                    ))
                ) : (
                    <span className="text-muted text-xs">No skills listed</span>
                )}
            </div>
        </div>
    </Card>
);

export default UserCard;
