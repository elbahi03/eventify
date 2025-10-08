import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEventsByUser,
  selectAllEvents,
  selectEventsLoading,
  selectEventsError,
  deleteEvent,
  updateEvent,
} from "../features/events/eventsSlice";
import { useSelector as useAuthSelector } from "react-redux";

export default function UserEvents() {
  const dispatch = useDispatch();

  const events = useSelector(selectAllEvents);
  const loading = useSelector(selectEventsLoading);
  const error = useSelector(selectEventsError);

  // Récupération du userId depuis le store auth (supposé présent)
  const user = useAuthSelector((state) => state.auth.user);
  const token = useAuthSelector((state) => state.auth.token);

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "", date: "", location: "" });

  useEffect(() => {
    if (user?.id) dispatch(fetchEventsByUser(user.id));
  }, [dispatch, user]);

  const handleEditClick = (event) => {
    setEditingId(event.id);
    setFormData({
      title: event.title || "",
      description: event.description || "",
      date: event.date || "",
      location: event.location || "",
    });
  };

  const handleDeleteClick = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet événement ?")) {
      dispatch(deleteEvent(id)).then(() => {
        dispatch(fetchEventsByUser(user.id));
      });
    }
  };

  const handleUpdateSubmit = (e, id) => {
    e.preventDefault();
    dispatch(updateEvent({ id, data: formData })).then(() => {
      setEditingId(null);
      dispatch(fetchEventsByUser(user.id));
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) return <p className="text-center text-gray-500">Chargement...</p>;
  if (error) return <p className="text-center text-red-500">Erreur : {error}</p>;
  if (!events || events.length === 0) return <p className="text-center text-gray-600">Vous n'avez aucun événement.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Mes Événements</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition">
            {editingId === event.id ? (
              <form onSubmit={(e) => handleUpdateSubmit(e, event.id)}>
                <input
                  type="text"
                  name="title"
                  placeholder="Titre"
                  value={formData.title}
                  onChange={handleChange}
                  className="border rounded p-1 mb-2 w-full"
                  required
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  className="border rounded p-1 mb-2 w-full"
                />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="border rounded p-1 mb-2 w-full"
                  required
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Lieu"
                  value={formData.location}
                  onChange={handleChange}
                  className="border rounded p-1 mb-2 w-full"
                />
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Enregistrer
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-1">
                  <strong>Date :</strong> {event.date}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Lieu :</strong> {event.location}
                </p>
                <p className="text-gray-700 mb-2">{event.description}</p>

                <div className="flex justify-between">
                  <button
                    onClick={() => handleEditClick(event)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteClick(event.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
