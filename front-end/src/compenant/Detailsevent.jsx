import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEventById,
  selectCurrentEvent,
  selectEventsLoading,
  selectEventsError,
} from "../features/events/eventsSlice";
import AddParticipant from "./AddParticipant";
import "../style/Detailsevent.css";

export default function EventDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const event = useSelector(selectCurrentEvent);
  const loading = useSelector(selectEventsLoading);
  const error = useSelector(selectEventsError);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchEventById(id));
  }, [dispatch, id]);

  if (loading) return <p className="loading">Chargement...</p>;
  if (error) return <p className="error">Erreur : {error}</p>;
  if (!event) return <p className="not-found">Événement introuvable</p>;

  return (
    <div className="event-details-container">
      <div className="event-card">
        <h2 className="event-title">{event.title}</h2>

        <div className="event-info">
          <p><strong>Date :</strong> {event.date}</p>
          <p><strong>Lieu :</strong> {event.location}</p>
          <p><strong>Catégorie :</strong> {event.categorie}</p>
          <p><strong>Type :</strong> {event.type}</p>
          <p><strong>Description :</strong> {event.description}</p>
          <p><strong>Capacité :</strong> {event.capacity}</p>
          <p><strong>Status :</strong> {event.status}</p>
          <p><strong>Heure début :</strong> {event.start_time}</p>
          <p><strong>Heure fin :</strong> {event.end_time}</p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="participate-btn"
        >
          {showForm ? "Annuler" : "Participer"}
        </button>

        {showForm && (
          <div className="participant-form">
            <AddParticipant eventId={event.id} />
          </div>
        )}
      </div>
    </div>
  );
}
