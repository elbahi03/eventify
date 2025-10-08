import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jsPDF } from "jspdf";
import { QRCodeCanvas } from "qrcode.react";
import {
    addParticipant,
    selectCurrentParticipant,
    selectParticipantsError,
    selectParticipantsLoading,
    clearParticipant,
    clearError,
} from "../features/participants/participantsSlice";
import "../style/AddParticipants.css";



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
       // doc.text("Merci pour votre participation !", 20, 100);

        // Générer QR code base64
        const qrCanvas = document.getElementById("qrCodeCanvas");
        const qrImage = qrCanvas.toDataURL("image/png");
        doc.addImage(qrImage, "PNG", 70, 90, 70, 70);


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
        <div className="add-participant-container">
            <h2>Ajouter un participant</h2>

            <form onSubmit={handleSubmit} >
                <div className="inputbox">
                    <input
                        type="text"
                        name="full_name"
                        placeholder="Nom complet *"
                        className="input-field"
                        value={formData.full_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="inputbox">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email *"
                        className="input-field"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="inputbox">
                    <input
                        type="text"
                        name="phone_number"
                        placeholder="Numéro téléphone"
                        className="input-field"
                        value={formData.phone_number}
                        onChange={handleChange}
                    />
                </div>
                <div className="inputbox">
                    <input
                        type="text"
                        name="CIN"
                        placeholder="CIN *"
                        className="input-field"
                        value={formData.CIN}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="submit-button"
                        disabled={loading}
                    >
                        {loading ? "Envoi..." : "Ajouter"}
                    </button>
                    <button
                        type="button"
                        className="reset-button"
                        onClick={handleReset}
                    >
                        Réinitialiser
                    </button>
                </div>
            </form>

            {/* Affichage du participant ajouté */}
            {participant && (
                <div>
                    <h3>Participant ajouté avec succès</h3>
                    <p><strong>id :</strong> {participant.id}</p>
                    <p><strong>Nom :</strong> {participant.full_name}</p>
                    <p><strong>Email :</strong> {participant.email}</p>
                    <p><strong>Numéro :</strong> {participant.phone_number}</p>
                    <p><strong>CIN :</strong> {participant.CIN}</p>

                    {/* ✅ Génère le QR code uniquement si participant existe */}
                    <div className="my-4 flex justify-center">
                        <QRCodeCanvas
                            id="qrCodeCanvas"
                            value={JSON.stringify({
                                id: participant.id,
                                nom: participant.full_name,
                                email: participant.email,
                                CIN: participant.CIN,
                                phone: participant.phone_number,
                            })}
                            size={150}
                        />
                    </div>
                    <button
                        onClick={handleDownloadTicket}
                    >
                        Télécharger ticket
                    </button>
                </div>
            )}

            {error && (
                <div>
                    {error}
                </div>
            )}
        </div>
    );
}
