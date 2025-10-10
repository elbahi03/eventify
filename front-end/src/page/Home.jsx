import React from 'react'
import Aleratoire from '../compenant/aleratoire';
import { useNavigate } from 'react-router-dom';
import '../style/home.css';

function Home() {
  const navigate = useNavigate();
  const handlevoir = () => {
    navigate(`/events`);
  };

  return (
    <div>
      <div className="hero">
        <div className="hero-content">
          <h1>Welcome to Eventify</h1>
          <p>Your ultimate event management solution</p>
          <button className="btn" onClick={handlevoir}>Get Started</button>
        </div>
      </div>
      <div className="home-section">
        <Aleratoire />
      </div>
      <div className="home-section">
        <h1> pour quoi nous ?</h1>
        <p> Eventify simplifie la gestion des événements, de la planification à l'exécution, en offrant une interface conviviale et des outils puissants pour organiser des événements mémorables.</p>
      </div>
    </div>
  )
}

export default Home;