import React from "react";
import image from "./data/Coupe-du-Monde-2026.jpg";

const Accueil = () => {
  return (
    <div>
      {/* Slogan d'accueil */}
      <div style={{ marginTop: "50px" }}>
        <h2 style={{ textAlign: "center" }}>
          Soyez prêt pour la Coupe du Monde 2026 – vos couleurs, votre style,
          votre équipe !
        </h2>

        {/* Image d'accueil */}
        <div
          style={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            src={image}
            alt="Bienvenue"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Accueil;
