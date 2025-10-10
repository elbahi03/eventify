import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyParticipant } from "../../features/participants/participantsSlice";
import { fetchEventsByUser, selectAllEvents } from "../../features/events/eventsSlice";
import "../styles/checkin.css";

export default function CheckinPage() {
  const dispatch = useDispatch();
  const events = useSelector(selectAllEvents);
  const user = useSelector((state) => state.auth?.user);

  const [selectedEventId, setSelectedEventId] = useState("");
  const [CIN, setCin] = useState("");
  const [message, setMessage] = useState("");
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
    setMessage("");
    setParticipant(null);

    try {
      const result = await dispatch(
        verifyParticipant({
          CIN,
          eventId: selectedEventId,
        })
      ).unwrap();

      if (result.participant) {
        setParticipant(result.participant);
        setMessage(result.message || "Participant vérifié avec succès !");
      }
    } catch (error) {
      setMessage(error || "Participant non trouvé ou CIN invalide pour cet événement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkin-page-container">
      <h2 className="checkin-title">Vérification des participants</h2>

      <div className="checkin-form-card">
        <form onSubmit={handleSubmit}>
          {/* Sélection de l'événement */}
          <div className="form-group">
            <label className="form-label">Sélectionner l'événement :</label>
            <select
              className="form-select"
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              disabled={loading}
              required
            >
              <option value="">Choisir un événement</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </select>
          </div>

          {/* Numéro CIN */}
          <div className="form-group">
            <label className="form-label">Numéro CIN :</label>
            <input
              type="text"
              className="form-input"
              value={CIN}
              onChange={(e) => setCin(e.target.value)}
              placeholder="Entrez le numéro CIN"
              disabled={loading || !selectedEventId}
              required
            />
          </div>

          {/* Bouton de vérification */}
          <button
            type="submit"
            className={`checkin-button ${loading || !CIN.trim() || !selectedEventId ? "disabled" : ""}`}
            disabled={loading || !CIN.trim() || !selectedEventId}
          >
            {loading ? "Vérification..." : "Vérifier"}
          </button>

          {/* Message d’état */}
          {message && (
            <div
              className={`status-message ${participant ? "success" : "error"}`}
            >
              {message}
            </div>
          )}
        </form>

        {/* Modal d’affichage du participant */}
        {participant && (
          <div className="modal-overlay">
            <div className="participant-card-modal">
              <button
                className="modal-close-button"
                onClick={() => setParticipant(null)}
              >
                &times;
              </button>

              <h3 className="card-title">Informations du participant</h3>

              <div className="card-info">
                <p>
                  <strong>Nom :</strong> {participant.full_name}
                </p>
                <p>
                  <strong>Email :</strong> {participant.email}
                </p>
                <p>
                  <strong>CIN :</strong> {participant.CIN}
                </p>
                <p>
                  <strong>Téléphone :</strong> {participant.phone_number}
                </p>
              </div>

              <div className="card-status success">Participant Vérifié</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}