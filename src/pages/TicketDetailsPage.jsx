import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Components/Card";
import Button from "../Components/Button";
import "../styles/TicketDetailsPage.css";

const TicketDetailsPage = () => {
  const [ticketDetail, setTicketDetail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParts = window.location.pathname.split("/");
    const ticketId = urlParts[urlParts.length - 1];
    fetchTicket(ticketId);
    // eslint-disable-next-line
  }, []);

  const fetchTicket = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/v1/tickets/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      console.log(data)
      setTicketDetail(data.ticket || null);
    } catch (error) {
      console.error("no ticket found", error);
    }
  };

  if (!ticketDetail) {
    return (
      <div className="loading-container">
        <div className="animate-pulse">Loading ticket details...</div>
      </div>
    );
  }

  return (
    <div className="ticket-details-page">
      <div className="ticket-details-container">
        <div className="back-button-container">
          <Button variant="outline" onClick={() => navigate("/")} size="small">
            Back to Tickets
          </Button>
        </div>

        <Card padding="medium" className="ticket-details-card">
          {/* Decorative background element - handled via CSS if desired, or simple inline style for dynamic blur if needed, but keeping clean for now */}

          <div className="details-header">
            <div className="details-title-section">
              <h2>
                {ticketDetail.title || "Untitled Ticket"}
              </h2>
              <div className="ticket-id">
                ID: {ticketDetail._id}
              </div>
            </div>
            <div className="ticket-badges">
              <span className={`detail-badge status-badge status-${ticketDetail.status}`}>
                {ticketDetail.status}
              </span>
              <span className={`detail-badge priority-${(ticketDetail.priority || 'Normal').toLowerCase()}`}>
                {ticketDetail.priority || "Normal"}
              </span>
            </div>
          </div>

          <div className="details-grid">
            <div className="details-col">
              <div className="info-group">
                <label className="info-label">Created By</label>
                <div className="info-value">{ticketDetail.createdBy?.email || "Unknown"}</div>
              </div>
              <div className="info-group">
                <label className="info-label">Assigned To</label>
                <div className="info-value">{ticketDetail.assignedTo?.email || "Unassigned"}</div>
              </div>
              <div className="info-group">
                <label className="info-label">Created At</label>
                <div className="info-value-secondary">
                  {ticketDetail.createdAt ? new Date(ticketDetail.createdAt).toLocaleString() : "N/A"}
                </div>
              </div>
            </div>

            <div className="details-col">
              {ticketDetail.relatedSkills && ticketDetail.relatedSkills.length > 0 && (
                <div className="info-group">
                  <label className="info-label">Related Skills</label>
                  <div className="related-skills-container">
                    {ticketDetail.relatedSkills.map((skill, idx) => (
                      <span key={idx} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="details-body">
            <div className="description-box">
              <label className="info-label">Description</label>
              <div className="description-content">
                {ticketDetail.description}
              </div>
            </div>

            {ticketDetail.helpfulNotes && (
              <div className="notes-box">
                <label className="notes-label">AI Suggested Notes</label>
                <div className="notes-content">
                  {ticketDetail.helpfulNotes}
                </div>
              </div>
            )}
          </div>

        </Card>
      </div>
    </div>
  );
};

export default TicketDetailsPage;
