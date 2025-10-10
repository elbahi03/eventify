import { Outlet, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/OrganizerLayout.css";


function OrganizerLayout() {
  const navigate = useNavigate();
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
      <aside className="org-sidebar">
        <h2>{organizerName}</h2>
        <nav>
          <NavLink to="/organizer/dashboard">Dashboard</NavLink>
          <NavLink to="/organizer/events">Events</NavLink>
          <NavLink to="/organizer/participants">Participants</NavLink>
          <NavLink to="/organizer/checkin">Check-in</NavLink>
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