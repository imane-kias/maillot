import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (password === "111") {
      navigate("/Admin");
    } else {
      setMessage(`Bienvenue, ${email}!`);
      navigate("/Listproducts");
    }
  };

  return (
    <div style={{ marginTop: "30px", textAlign: "center" }}>
      <h3>Login</h3>
      {message && (
        <p style={{ color: message.includes("Bienvenue") ? "green" : "red" }}>
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
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="email" style={{ fontWeight: "bold" }}>
            Email :
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              display: "block",
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="password" style={{ fontWeight: "bold" }}>
            Mot de passe :
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{
              display: "block",
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            required
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
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Login;
