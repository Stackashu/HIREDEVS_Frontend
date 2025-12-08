import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Components/Card";
import Button from "../Components/Button";
import Input from "../Components/Input";
import Loader from "../Components/Loader";
import Navbar from "../Components/Navbar";
import UserCard from "../Components/Tickets/UserCard";
import DetailedUserModal from "../Components/Tickets/DetailedUserModal";
import "../styles/Tickets.css";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [form, setForm] = useState({ title: "", description: "" });
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("tickets");

  const [loadingTickets, setLoadingTickets] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const ticketDetail = (e, id) => {
    navigate(`/tickets/${id}`, { state: { ticketId: id } });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Wake backend
  useEffect(() => {
    const init = async () => {
      try {
        const res = await fetch(`https://hiredevs-backend-152a.onrender.com/`);
        console.log("Backend wake-up status:", res.status);
      } catch (error) {
        console.error("Failed to connect to backend:", error);
      }
    };
    init();
  }, []);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/v1/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setForm({ title: "", description: "" });
        fetchTickets();
      } else {
        alert(data.message || "Failed to create ticket");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTickets = async () => {
    try {
      setLoadingTickets(true);
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/v1/tickets`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setTickets(data.tickets || []);
    } catch (error) {
      console.error("No ticket found", error);
    } finally {
      setLoadingTickets(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/v1/auth/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status === 200) {
        const data = await res.json();
        setUsers(data.users || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setLoggedInUser(user);
    if (!user) navigate("/login");
    else if (user.role === "admin") fetchUsers();
    fetchTickets();
  }, []); // eslint-disable-line

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="tickets-layout">
      <Navbar
        loggedInUser={loggedInUser}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        setSelectedUser={setSelectedUser}
        profileOpen={profileOpen}
        setProfileOpen={setProfileOpen}
        handleLogout={handleLogout}
      />

      <main className="dashboard-main">
        {loggedInUser?.role === "admin" && activeNav === "users" ? (
          <>
            <div className="section-header">
              <h2 className="section-title">Developers</h2>
            </div>

            {loadingUsers ? (
              <Loader />
            ) : (
              <>
                <div className="dashboard-grid">
                  {users.map((user, idx) => (
                    <UserCard key={idx} user={user} onClick={setSelectedUser} />
                  ))}
                </div>
                {users.length === 0 && <div className="empty-state">No developers found.</div>}
                {selectedUser && (
                  <DetailedUserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
                )}
              </>
            )}
          </>
        ) : (
          <>
            {loggedInUser?.role === "user" && (
              <div className="create-ticket-section">
                <Card className="create-ticket-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                  <div className="create-ticket-card-inner">
                    <h3 className="create-ticket-title">Create New Ticket</h3>
                    <div className="ticket-form-fields">
                      <Input
                        placeholder="Ticket Title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="mb-2"
                      />
                      <Input
                        placeholder="Description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="create-ticket-actions">
                      <Button onClick={handleSubmit}>Create Ticket</Button>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            <div className="section-header">
              <h2 className="section-title">Tickets</h2>
            </div>

            {loadingTickets ? (
              <Loader />
            ) : (
              <div className="dashboard-grid">
                {tickets.length > 0 ? (
                  tickets.map((tkt, idx) => (
                    <Card key={idx} className="ticket-card"
                      onClick={(e) => ticketDetail(e, tkt._id)}>
                      <div className="ticket-header">
                        <h4 className="ticket-title" title={tkt.title}>{tkt.title}</h4>
                        <span className={`status-badge status-${tkt.status}`}>
                          {tkt.status}
                        </span>
                      </div>
                      <p className="ticket-description">{tkt.description}</p>
                      <div className="ticket-meta">
                        {tkt.createdAt ? new Date(tkt.createdAt).toLocaleDateString() : ""}
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="empty-state">No tickets found.</div>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Tickets;
