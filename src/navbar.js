import React from "react";

const Navbar = ({ search, setSearch, searchproduct }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <div
        className="search-container"
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Met à jour l'état `search`
          placeholder="Entrez le nom du pays..."
          style={{
            padding: "10px",
            width: "300px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            marginRight: "10px",
          }}
        />
        <button
          onClick={searchproduct} // Bouton de recherche (à affiner si besoin)
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Rechercher
        </button>
      </div>
    </div>
  );
};

export default Navbar;
