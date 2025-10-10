import React from 'react';
import '../style/apropos.css';

function Apropos() {
  return (
    <div className="apropos-container">
      
      <header className="apropos-header">
        <h1 className="header-title">À Propos d'Eventify</h1>
        <p className="header-tagline">Simplifier l'organisation, maximiser l'expérience.</p>
      </header>
      
      <section className="mission-section">
        <div className="section-content">
          <h2 className="section-title">Notre Mission</h2>
          <p>
            **Eventify** est né de la volonté de révolutionner la gestion d'événements. Nous fournissons aux organisateurs une plateforme **Laravel** robuste pour publier, gérer et optimiser leurs événements, tout en offrant aux utilisateurs une interface **React** fluide et agréable pour découvrir et s'inscrire.
          </p>
          <p>
            Notre objectif est de rendre l'organisation et la participation aux événements plus **efficaces, transparentes et mémorables.**
          </p>
        </div>
      </section>

      <section className="valeurs-section">
        <div className="section-content">
          <h2 className="section-title">Nos Valeurs Clés</h2>
          <div className="valeurs-grid">
            <div className="valeur-item">
              <h3 className="valeur-title">Performance</h3>
              <p>Requêtes optimisées (cache, pagination) et rapidité d'exécution grâce à notre architecture moderne.</p>
            </div>
            <div className="valeur-item">
              <h3 className="valeur-title">Fiabilité</h3>
              <p>Validation côté client et serveur, gestion des erreurs robuste et tests automatisés garantissant le bon fonctionnement.</p>
            </div>
            <div className="valeur-item">
              <h3 className="valeur-title">Clarté</h3>
              <p>Une interface utilisateur intuitive et des informations précises pour les organisateurs et les utilisateurs.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Apropos;