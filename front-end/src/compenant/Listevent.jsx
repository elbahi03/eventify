import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEvents,
  fetchEventsByCategory,
  selectAllEvents,
  selectEventsLoading,
  selectEventsError,
} from "../features/events/eventsSlice";
import { useNavigate } from "react-router-dom";
import "../style/Listevent.css";

export default function EventList() {
  const dispatch = useDispatch();
  const events = useSelector(selectAllEvents);
  const loading = useSelector(selectEventsLoading);
  const error = useSelector(selectEventsError);
  const navigate = useNavigate();

  const [category, setCategory] = useState("Tous");
  const categories = ["Tous", "Musique", "Sport", "Formation", "Art"];

  useEffect(() => {
    if (category === "Tous") {
      dispatch(fetchEvents());
    } else {
      dispatch(fetchEventsByCategory(category));
    }
  }, [dispatch, category]);

  const handleDetails = (id) => {
    navigate(`/events/${id}`);
  };

  return (
    <div className="event-list-container">
      <h2 className="title">Liste des Événements</h2>

      <div className="filter-section">
        <label htmlFor="category">Filtrer par catégorie :</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="loading">Chargement...</p>}
      {error && <p className="error">Erreur : {error}</p>}
      {!loading && events.length === 0 && (
        <p className="no-events">Aucun événement trouvé.</p>
      )}

      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h3>{event.title}</h3>
            <p><strong>Date :</strong> {event.date}</p>
            <p><strong>Lieu :</strong> {event.location}</p>
            {event.categorie && (
              <p><strong>Catégorie :</strong> {event.categorie}</p>
            )}

            <button onClick={() => handleDetails(event.id)}>
              Détails
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
