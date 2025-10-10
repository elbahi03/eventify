import { Route, Routes, useLocation } from 'react-router-dom';
import Auth from './page/auth';
import Register from './page/register';
import Home from './page/Home';
import Listevent from './compenant/Listevent';
import EventDetails from './compenant/Detailsevent';
import Headers from './compenant/header';
import './App.css';
import OrganizerLayout from './org/compenant/OrganizerLayout';
import UserEvents from './org/pages/Eventorg';
import ParticipantsOrg from './org/pages/ParticipantsOrg';
import CheckinPage from './org/pages/CheckinPage';

function App() {
  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/register", "*","/organizer/dashboard","/organizer/events", "/organizer/participants", "/organizer/checkin"];

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Headers />}
      <Routes>
        {/* Authentification organisateur */}
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        {/* Utilisateur classique */}
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Listevent />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
        {/* Dashboard organisateur */}
        <Route path="/organizer" element={<OrganizerLayout />}>
          <Route path="dashboard" element={<h1>Dashboard Organisateur</h1>} />
          <Route path="events" element={<UserEvents/>} />
          <Route path="participants" element={<ParticipantsOrg/>} />
          <Route path="checkin" element={<CheckinPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;