import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams(); // Récupération de l'id à partir de l'URL

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    image: "",
    pays: "", // Ajout de la clé pays dans l'état initial
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Charger les données du produit à modifier
    fetch(`http://localhost:3001/blogs/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement du produit");
        }
        return response.json();
      })
      .then((data) => setFormData(data))
      .catch((error) => console.error("Erreur :", error));
  }, [id]); // Ajout de `id` comme dépendance

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result, // Stocke l'image en base64
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.body ||
      !formData.image ||
      !formData.pays
    ) {
      setMessage("Veuillez remplir tous les champs.");
      return;
    }

    fetch(`http://localhost:3001/blogs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la modification du produit");
        }
        return response.json();
      })
      .then(() => {
        setMessage("Produit modifié avec succès !");
      })
      .catch((error) => {
        console.error("Erreur :", error);
        setMessage("Une erreur est survenue. Veuillez réessayer.");
      });
  };

  return (
    <div style={{ marginTop: "30px", textAlign: "center" }}>
      <h2>Modifier un Produit</h2>
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
          <label htmlFor="title" style={{ fontWeight: "bold" }}>
            Titre :
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={{ display: "block", width: "100%", padding: "8px" }}
            required
          />
        </div>

        {/* Description */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="body" style={{ fontWeight: "bold" }}>
            Description :
          </label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            style={{ display: "block", width: "100%", padding: "8px" }}
            required
          />
        </div>

        {/* Pays */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="pays" style={{ fontWeight: "bold" }}>
            Pays :
          </label>
          <input
            type="text"
            id="pays"
            name="pays"
            value={formData.pays}
            onChange={handleChange}
            placeholder="Entrez le pays"
            style={{ display: "block", width: "100%", padding: "8px" }}
            required
          />
        </div>

        {/* Image */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="image" style={{ fontWeight: "bold" }}>
            Image :
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "block", width: "100%", padding: "8px" }}
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
            cursor: "pointer",
          }}
        >
          Modifier Produit
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
