import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jsPDF } from "jspdf";
import {
    addParticipant,
    selectCurrentParticipant,
    selectParticipantsError,
    selectParticipantsLoading,
    clearParticipant,
    clearError,
} from "../features/participants/participantsSlice";



export default function AddParticipant({ eventId }) {
    const dispatch = useDispatch();
    const participant = useSelector(selectCurrentParticipant);
    const error = useSelector(selectParticipantsError);
    const loading = useSelector(selectParticipantsLoading);

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone_number: "",
        CIN: "",
    });

    const handleDownloadTicket = () => {
        if (!participant) return;
    
        const doc = new jsPDF();
    
        doc.setFontSize(18);
        doc.text("Ticket d'Événement", 20, 20);
    
        doc.setFontSize(14);
        doc.text(`ID : ${participant.id}`, 20, 40);
        doc.text(`Nom : ${participant.full_name}`, 20, 50);
        doc.text(`Email : ${participant.email}`, 20, 60);
        doc.text(`Numéro : ${participant.phone_number || "-"}`, 20, 70);
        doc.text(`CIN : ${participant.CIN}`, 20, 80);
    
        doc.text("Merci pour votre participation !", 20, 100);
    
        doc.save(`ticket_${participant.full_name}.pdf`);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.full_name || !formData.email || !formData.CIN) {
            alert("Veuillez remplir tous les champs obligatoires !");
            return;
        }



        dispatch(addParticipant({ ...formData, event_id: eventId }));
    };

    const handleReset = () => {
        setFormData({ full_name: "", email: "", phone_number: "", CIN: "" });
        dispatch(clearParticipant());
        dispatch(clearError());
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded">
            <h2 className="text-xl font-bold mb-4">Ajouter un participant</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="text"
                    name="full_name"
                    placeholder="Nom complet *"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                    required
                />
                <input
                    type="text"
                    name="phone_number"
                    placeholder="Numéro téléphone"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                />
                <input
                    type="text"
                    name="CIN"
                    placeholder="CIN *"
                    value={formData.CIN}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                    required
                />

                <div className="flex justify-between">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {loading ? "Envoi..." : "Ajouter"}
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Réinitialiser
                    </button>
                </div>
            </form>

            {/* Affichage du participant ajouté */}
            {participant && (
                <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded">
                    <h3 className="font-bold text-lg mb-2">Participant ajouté avec succès</h3>
                    <p><strong>id :</strong> {participant.id}</p>
                    <p><strong>Nom :</strong> {participant.full_name}</p>
                    <p><strong>Email :</strong> {participant.email}</p>
                    <p><strong>Numéro :</strong> {participant.phone_number}</p>
                    <p><strong>CIN :</strong> {participant.CIN}</p>
                    <button
                        onClick={handleDownloadTicket}
                        className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                        Télécharger ticket
                    </button>
                </div>
            )}

            {error && (
                <div className="mt-4 p-2 bg-red-100 text-red-700 border border-red-400 rounded">
                    {error}
                </div>
            )}
        </div>
    );
}
