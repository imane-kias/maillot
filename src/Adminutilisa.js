import React, { useState, useEffect } from "react";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des utilisateurs.");
        }
        return response.json();
      })
      .then((data) => setUsers(data))
      .catch((error) => console.error("Erreur:", error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la suppression.");
        }
        setUsers(users.filter((user) => user.id !== id));
        setMessage("Utilisateur supprimé avec succès.");
      })
      .catch((error) => console.error("Erreur:", error));
  };

  const handleEdit = (id) => {
    const user = users.find((user) => user.id === id);
    setEditingUserId(id);
    setEditFormData(user);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/users/${editingUserId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editFormData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la mise à jour de l'utilisateur.");
        }
        setUsers(
          users.map((user) =>
            user.id === editingUserId ? { ...editFormData } : user
          )
        );
        setEditingUserId(null);
        setMessage("Utilisateur mis à jour avec succès.");
      })
      .catch((error) => console.error("Erreur:", error));
  };

  return (
    <div style={{ marginTop: "30px", textAlign: "center" }}>
      <h2>Liste des Utilisateurs</h2>
      {message && (
        <p style={{ color: message.includes("succès") ? "green" : "red" }}>
          {message}
        </p>
      )}

      {editingUserId ? (
        <form
          onSubmit={handleUpdate}
          style={{
            display: "inline-block",
            textAlign: "left",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <h3>Modifier l'utilisateur</h3>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="name" style={{ fontWeight: "bold" }}>
              Nom :
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={editFormData.name}
              onChange={handleInputChange}
              style={{
                display: "block",
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="email" style={{ fontWeight: "bold" }}>
              Email :
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={editFormData.email}
              onChange={handleInputChange}
              style={{
                display: "block",
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
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
            Enregistrer
          </button>
          <button
            onClick={() => setEditingUserId(null)}
            style={{
              marginLeft: "10px",
              backgroundColor: "#dc3545",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Annuler
          </button>
        </form>
      ) : (
        <table
          style={{
            margin: "auto",
            borderCollapse: "collapse",
            width: "80%",
            textAlign: "left",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>ID</th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>Nom</th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Email
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {user.id}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {user.name}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {user.email}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  <button
                    onClick={() => handleEdit(user.id)}
                    style={{
                      marginRight: "10px",
                      backgroundColor: "#ffc107",
                      color: "white",
                      padding: "5px 10px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "white",
                      padding: "5px 10px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
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

export default UserTable;
