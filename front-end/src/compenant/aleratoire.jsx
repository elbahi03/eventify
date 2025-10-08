import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  randomEvents,
  selectAllEvents,
  selectEventsLoading,
  selectEventsError,
} from "../features/events/eventsSlice";
import { useNavigate } from "react-router-dom";

export default function Aleratoire () {
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
    <div>
      <h2> Sugsugtion </h2>

      <div>
        {events.map((event) => (
          <div
            key={event.id}

          >

            <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
            <p className="text-gray-600 mb-1">
              <strong>Date :</strong> {event.date}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Lieu :</strong> {event.location}
            </p>
            {event.category && (
              <p className="text-gray-600 mb-2">
                <strong>Catégorie :</strong> {event.categorie}
              </p>
            )}
            <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 w-full"
              onClick={() => handleDetails(event.id)} >
              Voir Détails
            </button>
          </div>
        ))}
      </div>
      <button className="btn mt-4" onClick={handlgo}>voir plus</button>
    </div>
  );
}
