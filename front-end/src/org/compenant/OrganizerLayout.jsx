import { Outlet, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "../styles/OrganizerLayout.css";

function OrganizerLayout() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const organizerName = "Nom Organisateur";

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("token");
      navigate("/login");
    } catch (e) {
      console.error("Erreur logout", e);
    }
  };

  return (
    <div className="org-layout">
      {/* Burger icon */}
      <div className="burger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div className={isMenuOpen ? "line open" : "line"}></div>
        <div className={isMenuOpen ? "line open" : "line"}></div>
        <div className={isMenuOpen ? "line open" : "line"}></div>
      </div>

      <aside className={`org-sidebar ${isMenuOpen ? "open" : ""}`}>
        <h2>{organizerName}</h2>
        <nav>
          <NavLink to="/organizer/dashboard" onClick={() => setIsMenuOpen(false)}>
            Dashboard
          </NavLink>
          <NavLink to="/organizer/events" onClick={() => setIsMenuOpen(false)}>
            Events
          </NavLink>
          <NavLink to="/organizer/participants" onClick={() => setIsMenuOpen(false)}>
            Participants
          </NavLink>
          <NavLink to="/organizer/checkin" onClick={() => setIsMenuOpen(false)}>
            Check-in
          </NavLink>
        </nav>
        <button onClick={handleLogout}>Logout</button>
      </aside>

      <main className="org-main">
        <Outlet />
      </main>
    </div>
  );
}

export default OrganizerLayout;
