import React, { useState, useEffect } from "react";

const Listproducts = ({ addToCart, cart, search }) => {
  const [blogs, setBlogs] = useState([]); // Stocke les produits récupérés
  const [categorie, setCategorie] = useState(""); // Filtrer par catégorie

  // Récupération des produits depuis le backend
  const fetchBlogs = async () => {
    try {
      const response = await fetch("http://localhost:3001/blogs");
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des données");
      }
      const data = await response.json();
      setBlogs(data); // Met à jour les produits récupérés
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Filtrage par catégorie et pays
  const filteredByCategory = categorie
    ? blogs.filter((blog) => blog.categorie === categorie)
    : blogs;

  const filteredBlogs = search
    ? filteredByCategory.filter((blog) =>
        blog.pays.toLowerCase().includes(search.toLowerCase())
      )
    : filteredByCategory;

  return (
    <div>
      <h2>Liste des Produits</h2>

      {/* Filtres par catégorie */}
      <div className="filter-buttons">
        <button onClick={() => setCategorie("")}>Tous</button>
        <button onClick={() => setCategorie("Homme")}>Homme</button>
        <button onClick={() => setCategorie("Femme")}>Femme</button>
      </div>

      {/* Affichage des produits filtrés */}
      {filteredBlogs.length > 0 ? (
        <div className="product-container">
          {filteredBlogs.map((blog) => (
            <div key={blog.id} className="product-card">
              <img
                src={blog.image}
                alt={blog.title}
                className="product-image"
              />
              <h3>{blog.title}</h3>
              <p>{blog.body}</p>
              <p>Prix : {blog.prix} $</p>
              <p>Pays : {blog.pays}</p>
              <button
                onClick={() => addToCart(blog)}
                className="add-to-cart-button"
              >
                Ajouter au panier
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-products">Aucun produit disponible.</p>
      )}
    </div>
  );
};

export default Listproducts;
