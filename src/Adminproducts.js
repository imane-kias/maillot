import React, { useState, useEffect } from "react";

const BlogTable = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState("");
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    body: "",
    prix: "",
    categorie: "",
    image: "",
    pays: "", // Ajout de pays dans le formulaire
  });

  useEffect(() => {
    fetch("http://localhost:3001/blogs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des blogs.");
        }
        return response.json();
      })
      .then((data) => setBlogs(data))
      .catch((error) => console.error("Erreur:", error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/blogs/${id}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la suppression.");
        }
        setBlogs(blogs.filter((blog) => blog.id !== id));
        setMessage("Blog supprimé avec succès.");
      })
      .catch((error) => console.error("Erreur:", error));
  };

  const handleEdit = (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    setEditingBlogId(id);
    setEditFormData(blog);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditFormData({ ...editFormData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/blogs/${editingBlogId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editFormData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la mise à jour du blog.");
        }
        setBlogs(
          blogs.map((blog) =>
            blog.id === editingBlogId ? { ...editFormData } : blog
          )
        );
        setEditingBlogId(null);
        setMessage("Blog mis à jour avec succès.");
      })
      .catch((error) => console.error("Erreur:", error));
  };

  return (
    <div style={{ marginTop: "30px", textAlign: "center" }}>
      <h2>Liste des Produits</h2>
      {message && (
        <p style={{ color: message.includes("succès") ? "green" : "red" }}>
          {message}
        </p>
      )}

      {editingBlogId ? (
        <form
          onSubmit={handleUpdate}
          style={{
            display: "inline-block",
            textAlign: "left",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <h3>Modifier le Produit</h3>
          {/* Titre */}
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="title" style={{ fontWeight: "bold" }}>
              Titre :
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={editFormData.title}
              onChange={handleInputChange}
              style={{ display: "block", width: "100%", padding: "8px" }}
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
              value={editFormData.pays}
              onChange={handleInputChange}
              placeholder="Entrez le pays"
              style={{ display: "block", width: "100%", padding: "8px" }}
            />
          </div>

          {/* Prix */}
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="prix" style={{ fontWeight: "bold" }}>
              Prix :
            </label>
            <input
              type="number"
              id="prix"
              name="prix"
              value={editFormData.prix}
              onChange={handleInputChange}
              style={{ display: "block", width: "100%", padding: "8px" }}
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
              onChange={handleImageChange}
              style={{ display: "block", width: "100%", padding: "8px" }}
            />
          </div>

          <button type="submit" style={{ backgroundColor: "#007bff" }}>
            Enregistrer
          </button>
          <button
            onClick={() => setEditingBlogId(null)}
            style={{ marginLeft: "10px", backgroundColor: "#dc3545" }}
          >
            Annuler
          </button>
        </form>
      ) : (
        <table
          style={{ margin: "auto", borderCollapse: "collapse", width: "80%" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Titre</th>
              <th>Description</th>
              <th>Prix</th>
              <th>Catégorie</th>
              <th>Pays</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <td>{blog.id}</td>
                <td>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    style={{ width: "80px", height: "80px" }}
                  />
                </td>
                <td>{blog.title}</td>
                <td>{blog.body}</td>
                <td>{blog.prix}</td>
                <td>{blog.categorie}</td>
                <td>{blog.pays || "Non spécifié"}</td>
                <td>
                  <button onClick={() => handleEdit(blog.id)}>Modifier</button>
                  <button onClick={() => handleDelete(blog.id)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BlogTable;
