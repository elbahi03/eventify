import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventById, selectCurrentEvent, selectEventsLoading, selectEventsError } from "../features/events/eventsSlice";
import AddParticipant from "./AddParticipant";
import { useState } from "react";

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

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;
  if (!event) return <p>Événement introuvable</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
      <p><strong>Date :</strong> {event.date}</p>
      <p><strong>Lieu :</strong> {event.location}</p>
      <p><strong>Catégorie :</strong> {event.categorie}</p>
      <p className="mt-4">{event.description}</p>
      <button
        onClick={() => setShowForm(!showForm)}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        {showForm ? "Annuler" : "Participer"}
      </button>

      {/* Formulaire participant */}
      {showForm && <AddParticipant eventId={event.id} />}
    </div>
  );
}
