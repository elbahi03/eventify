import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventsByUser, selectAllEvents } from "../../features/events/eventsSlice";
import { fetchParticipantsByEvent } from "../../features/participants/participantsSlice";
import "../styles/participants.css";

export default function ParticipantsOrg() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const events = useSelector(selectAllEvents);
  const participants = useSelector((state) => state.participants.participants);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchEventsByUser(user.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (selectedEventId) {
      setLoading(true);
      dispatch(fetchParticipantsByEvent({ eventId: selectedEventId }))
        .unwrap()
        .then((data) => {
          console.log("API Response:", data);
        })
        .catch((error) => {
          console.error("Error fetching participants:", error);
        })
        .finally(() => setLoading(false));
    }
  }, [dispatch, selectedEventId]);



  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Liste des participants par événement</h2>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Choisir un événement :
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Sélectionner un événement : </option>
            {events.map((ev) => (
              <option key={ev.id} value={ev.id}>
                {ev.title}
              </option>
            ))}
          </select>
        </label>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Chargement des participants...</p>
      ) : selectedEventId ? (
        <div className="mt-4">
          {participants && participants.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {participants.map((p) => (
                <li key={p.id} className="py-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{p.full_name}</p>
                      <p className="text-gray-600">{p.email}</p>
                      <p className="text-gray-600">{p.phone_number}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {p.created_at ? new Date(p.created_at).toLocaleDateString() : ''}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600">Aucun participant pour cet événement.</p>
          )}
        </div>
      ) : null}
    </div>
  );
}