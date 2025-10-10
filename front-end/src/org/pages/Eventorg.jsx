import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEventsByUser,
  selectAllEvents,
  selectEventsLoading,
  selectEventsError,
  deleteEvent,
  updateEvent,
  createEvent,
} from "../../features/events/eventsSlice";

export default function UserEvents() {
  const dispatch = useDispatch();

  const events = useSelector(selectAllEvents);
  const loading = useSelector(selectEventsLoading);
  const error = useSelector(selectEventsError);

  // Récupération du userId et token depuis le store auth
  const user = useSelector((state) => state.auth?.user);
  const token = useSelector((state) => state.auth?.token);

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "", date: "", location: "",start_time: "", end_time: "",categorie: "",capacity: 0,type: "",status: ""  });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newEventData, setNewEventData] = useState({
    title: "",
    description: "",
    date: "",
    start_time: "",
    end_time: "",
    location: "",
    type: "",
    categorie: "",
    capacity: 0,
    status: ""
  });

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchEventsByUser(user.id));
    }
  }, [dispatch, user]);

  const handleEditClick = (event) => {
    setEditingId(event.id);
    setFormData({
      title: event.title || "",
      description: event.description || "",
      date: event.date || "",
      location: event.location || "",
      start_time: event.start_time || "",
      end_time: event.end_time || "",
      categorie: event.categorie || "",
      capacity: event.capacity || 0,
      type: event.type || "",
      status: event.status || ""
    });
  };

  const handleDeleteClick = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet événement ?")) {
      dispatch(deleteEvent(id)).then(() => {
        if (user?.id) dispatch(fetchEventsByUser(user.id));
      });
    }
  };

  const handleUpdateSubmit = (e, id) => {
    e.preventDefault();
    dispatch(updateEvent({ id, data: formData })).then(() => {
      setEditingId(null);
      if (user?.id) dispatch(fetchEventsByUser(user.id));
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    dispatch(createEvent(newEventData)).then(() => {
      setShowCreateForm(false);
      setNewEventData({ title: "", description: "", date: "", location: "" });
      if (user?.id) dispatch(fetchEventsByUser(user.id));
    });
  };

  const handleCreateChange = (e) => {
    setNewEventData({ ...newEventData, [e.target.name]: e.target.value });
  };

  if (loading) return <p className="text-center text-gray-500">Chargement...</p>;
  if (error) return <p className="text-center text-red-500">Erreur : {error}</p>;
  if (!events || events.length === 0) return <p className="text-center text-gray-600">Vous n'avez aucun événement.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Mes Événements</h2>
      <div className="mb-6">
        {!showCreateForm ? (
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Créer un événement
          </button>
        ) : (
          <form
            onSubmit={handleCreateSubmit}
            className="bg-white shadow-md rounded-xl p-6 max-w-lg mx-auto space-y-4"
          >
            <h3 className="text-2xl font-semibold mb-4 text-center text-gray-700">
              Créer un nouvel événement
            </h3>

            {/* Titre */}
            <input
              type="text"
              name="title"
              placeholder="Titre de l'événement"
              value={newEventData.title}
              onChange={handleCreateChange}
              className="border rounded p-2 w-full"
              required
            />

            {/* Description */}
            <textarea
              name="description"
              placeholder="Description"
              value={newEventData.description}
              onChange={handleCreateChange}
              className="border rounded p-2 w-full"
              rows="3"
            />

            {/* Date */}
            <input
              type="date"
              name="date"
              value={newEventData.date}
              onChange={handleCreateChange}
              className="border rounded p-2 w-full"
              required
            />

            {/* Heure de début et fin */}
            <div className="flex space-x-3">
              <input
                type="time"
                name="start_time"
                value={newEventData.start_time}
                onChange={handleCreateChange}
                className="border rounded p-2 w-1/2"
                required
              />
              <input
                type="time"
                name="end_time"
                value={newEventData.end_time}
                onChange={handleCreateChange}
                className="border rounded p-2 w-1/2"
                required
              />
            </div>

            {/* Lieu */}
            <input
              type="text"
              name="location"
              placeholder="Lieu"
              value={newEventData.location}
              onChange={handleCreateChange}
              className="border rounded p-2 w-full"
            />

            {/* Type */}
            <select
              name="type"
              value={newEventData.type}
              onChange={handleCreateChange}
              className="border rounded p-2 w-full"
            >
              <option value="">-- Type d'événement --</option>
              <option value="présentiel">Présentiel</option>
              <option value="en ligne">En ligne</option>
              <option value="hybride">Hybride</option>
            </select>

            {/* Catégorie */}
            <input
              type="text"
              name="categorie"
              placeholder="Catégorie"
              value={newEventData.categorie}
              onChange={handleCreateChange}
              className="border rounded p-2 w-full"
            />

            {/* Capacité */}
            <input
              type="number"
              name="capacity"
              placeholder="Capacité"
              value={newEventData.capacity}
              onChange={handleCreateChange}
              className="border rounded p-2 w-full"
              min="0"
            />

            {/* Statut */}
            <select
              name="status"
              value={newEventData.status}
              onChange={handleCreateChange}
              className="border rounded p-2 w-full"
            >
              <option value="">-- Statut --</option>
              <option value="prévu">prévu</option>
              <option value="en cours">en cours</option>
              <option value="terminé">terminé</option>
              <option value="annulé">annulé</option>
            </select>

            {/* Boutons */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Créer
              </button>
            </div>
          </form>
        )}
      </div>


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
