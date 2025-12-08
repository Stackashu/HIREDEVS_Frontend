import React from 'react';
import Card from '../Card';
import { ProfileIcon } from '../Navbar';

const DetailedUserModal = ({ user, onClose }) => {
    if (!user) return null;
    return (
        <div className="modal-overlay" onClick={onClose}>
            <Card className="modal-content" padding="medium" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <div className="modal-header">
                    <ProfileIcon size={48} />
                    <div>
                        <h3 className="modal-user-name">
                            {user.email ? user.email.split("@")[0] : "User"}
                        </h3>
                        <span className="modal-user-role">
                            {user.role === 'moderator' ? "Developer" : user.role}
                        </span>
                    </div>
                </div>

                <div className="modal-body">
                    <div className="modal-section">
                        <label className="modal-label">Email</label>
                        <div className="modal-value">{user.email}</div>
                    </div>

                    <div className="modal-section">
                        <label className="modal-label">Skills</label>
                        <div className="modal-skills-list">
                            {user.skills && user.skills.length > 0 ? (
                                user.skills.map((skill, idx) => (
                                    <span key={idx} className="modal-skill-badge">
                                        {skill}
                                    </span>
                                ))
                            ) : (
                                <span className="text-muted italic">None</span>
                            )}
                        </div>
                    </div>

                    <div className="modal-section">
                        <label className="modal-label">Joined</label>
                        <div className="text-md text-secondary">
                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default DetailedUserModal;
