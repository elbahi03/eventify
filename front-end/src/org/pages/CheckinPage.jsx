import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyParticipant } from '../../features/participants/participantsSlice';
import { fetchEventsByUser, selectAllEvents } from '../../features/events/eventsSlice';

export default function CheckinPage() {
  const dispatch = useDispatch();
  const events = useSelector(selectAllEvents);
  const user = useSelector(state => state.auth?.user);
  
  const [selectedEventId, setSelectedEventId] = useState('');
  const [CIN, setCin] = useState('');
  const [message, setMessage] = useState('');
  const [participant, setParticipant] = useState(null);
  const [loading, setLoading] = useState(false);

  // Charger les événements de l'organisateur
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchEventsByUser(user.id));
    }
  }, [dispatch, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!CIN.trim() || !selectedEventId) return;

    setLoading(true);
    setMessage('');
    setParticipant(null);

    try {
      const result = await dispatch(verifyParticipant({ 
        CIN,
        eventId: selectedEventId 
      })).unwrap();
      
      if (result.participant) {
        setParticipant(result.participant);
        setMessage(result.message || 'Participant vérifié avec succès !');
      }
    } catch (error) {
      setMessage(error || 'Participant non trouvé ou CIN invalide pour cet événement.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Vérification des participants</h2>
      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Sélectionner l'événement :
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled={loading}
              required
            >
              <option value="">-- Choisir un événement --</option>
              {events.map(event => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Numéro CIN :
            <input
              type="text"
              value={CIN}
              onChange={(e) => setCin(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Entrez le numéro CIN"
              disabled={loading || !selectedEventId}
              required
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading || !CIN.trim() || !selectedEventId}
          className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            (loading || !selectedEventId) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Vérification...' : 'Vérifier'}
        </button>

        {message && (
          <div className={`mt-4 p-4 rounded ${
            participant ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}

        {participant && (
          <div className="mt-6 p-4 bg-gray-100 rounded">
            <h3 className="font-bold mb-2">Informations du participant :</h3>
            <p><strong>Nom :</strong> {participant.name}</p>
            <p><strong>Email :</strong> {participant.email}</p>
            <p><strong>CIN :</strong> {participant.CIN}</p>
            <p><strong>Événement :</strong> {events.find(e => e.id === selectedEventId)?.title || 'N/A'}</p>
          </div>
        )}
      </form>
    </div>
  );
}