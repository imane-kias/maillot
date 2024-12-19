import React, { useState } from "react";
import Select from "react-select";
import { countries } from "countries-list"; // Import de la liste des pays

const Addproducts = () => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    image: "",
    prix: "",
    categorie: "",
    pays: "",
  });
  const [message, setMessage] = useState("");

  // Options des pays pour react-select
  const countryOptions = Object.entries(countries).map(([code, country]) => ({
    value: country.name,
    label: country.name,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCountryChange = (selectedOption) => {
    setFormData({ ...formData, pays: selectedOption.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.body ||
      !formData.image ||
      !formData.prix ||
      !formData.categorie ||
      !formData.pays
    ) {
      setMessage("Veuillez remplir tous les champs.");
      return;
    }

    fetch("http://localhost:3001/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        setMessage("Produit ajouté avec succès !");
        setFormData({
          title: "",
          body: "",
          image: "",
          prix: "",
          categorie: "",
          pays: "",
        });
      })
      .catch((error) => setMessage("Erreur : " + error));
  };

  return (
    <div style={{ marginTop: "30px", textAlign: "center" }}>
      <h2>Ajouter un Produit</h2>
      {message && (
        <p style={{ color: message.includes("succès") ? "green" : "red" }}>
          {message}
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "inline-block",
          textAlign: "left",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        {/* Titre */}
        <div style={{ marginBottom: "15px" }}>
          <label>Titre :</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* Description */}
        <div style={{ marginBottom: "15px" }}>
          <label>Description :</label>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* Image */}
        <div style={{ marginBottom: "15px" }}>
          <label>Image :</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* Prix */}
        <div style={{ marginBottom: "15px" }}>
          <label>Prix :</label>
          <input
            type="number"
            name="prix"
            value={formData.prix}
            onChange={handleChange}
            placeholder="Entrez le prix en $"
            min="0"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* Catégorie */}
        <div style={{ marginBottom: "15px" }}>
          <label>Catégorie :</label>
          <select
            name="categorie"
            value={formData.categorie}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="">-- Sélectionnez une catégorie --</option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
          </select>
        </div>

        {/* Pays */}
        <div style={{ marginBottom: "15px" }}>
          <label>Pays :</label>
          <Select
            options={countryOptions}
            onChange={handleCountryChange}
            placeholder="Sélectionnez un pays"
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Ajouter Produit
        </button>
      </form>
    </div>
  );
};

export default Addproducts;
