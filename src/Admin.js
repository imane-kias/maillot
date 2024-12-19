import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Tableau de Bord Administrateur</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {/* Boutons pour différentes actions */}
        <Link to="/addProduct" style={buttonStyle}>
          Ajouter un Produit
        </Link>
        <Link to="/Adminproducts" style={buttonStyle}>
          Gérer les Produits
        </Link>
        <Link to="/Adminutilisa" style={buttonStyle}>
          Gérer les utilisateurs
        </Link>
      </div>
    </div>
  );
};

// Style des boutons
const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  backgroundColor: "#007bff",
  color: "white",
  borderRadius: "5px",
  transition: "0.3s",
};

export default Admin;
