import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  randomEvents,
  selectAllEvents,
  selectEventsLoading,
  selectEventsError,
} from "../features/events/eventsSlice";
import { useNavigate } from "react-router-dom";
import "../style/aleratoire.css";

export default function Aleratoire() {
  const dispatch = useDispatch();
  const events = useSelector(selectAllEvents);
  const loading = useSelector(selectEventsLoading);
  const error = useSelector(selectEventsError);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(randomEvents());
  }, [dispatch]);

  if (loading) return <p className="text-center text-gray-500">Chargement...</p>;
  if (error)
    return <p className="text-center text-red-500">Erreur : {error}</p>;
  if (!events || events.length === 0)
    return <p className="text-center text-gray-600">Aucun événement trouvé.</p>;

  const handleDetails = (id) => {
    navigate(`/events/${id}`);
  };

  const handlgo = () => {
    navigate(`/events`);
  }

  return (
    <div className="sugsugtion">
      <h2 className="center"> Suggestions </h2>

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
      <button className="btn mt-4" onClick={handlgo}>voir plus</button>
    </div>
  );
}
