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

export default function EventList() {
  const dispatch = useDispatch();
  const events = useSelector(selectAllEvents);
  const loading = useSelector(selectEventsLoading);
  const error = useSelector(selectEventsError);
  const navigate = useNavigate();

  const [category, setCategory] = useState("Tous");

  // Liste des catégories (exemple, tu peux générer dynamiquement)
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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Liste des Événements</h2>

      {/* Filtre catégorie */}
      <div className="mb-4">
        <label htmlFor="category" className="mr-2 font-semibold">
          Filtrer par catégorie :
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="text-center text-gray-500">Chargement...</p>}
      {error && <p className="text-center text-red-500">Erreur : {error}</p>}
      {!loading && events.length === 0 && (
        <p className="text-center text-gray-600">Aucun événement trouvé.</p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-4 border rounded shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
            <p><strong>Date :</strong> {event.date}</p>
            <p><strong>Lieu :</strong> {event.location}</p>
            {event.categorie && (
              <p><strong>Catégorie :</strong> {event.categorie}</p>
            )}

            <button
              onClick={() => handleDetails(event.id)}
              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Détails
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
