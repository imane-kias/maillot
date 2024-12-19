import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Listproducts from "./Listproducts";
import Signup from "./Signup";
import Login from "./Login";
import Panier from "./panier";
import BlogList from "./BlogList";
import AddProduct from "./AddProduct";
import Admin from "./Admin";
import BlogTable from "./Adminproducts";
import UserTable from "./Adminutilisa";
import Commande from "./commande";
import Contact from "./contact";
import Navbar from "./navbar"; // Import du composant Navbar

function App() {
  const [cart, setCart] = useState([]); // État pour stocker les articles du panier
  const [search, setSearch] = useState(""); // État pour la recherche

  const addToCart = (product) => {
    const exist = cart.find((item) => item.id === product.id);
    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    alert(`${product.title} a été ajouté au panier !`);
  };

  const searchProduct = () => {
    // La recherche se gère dans le composant Listproducts
  };

  return (
    <BrowserRouter>
      <div className="App">
        {/* Barre de recherche */}

        {/* Barre de navigation */}
        <header className="App-topbar">
          <div className="auth-buttons">
            <Link to="/login" className="btn-auth">
              Login
            </Link>
            <Link to="/signup" className="btn-auth">
              Inscription
            </Link>
            <Link to="/panier" className="btn-auth btn-cart">
              Panier ({cart.length})
            </Link>
          </div>
        </header>

        {/* Contenu principal */}
        <header className="App-header">
          <div className="button-group">
            <Link to="/" className="btn-primary">
              Accueil
            </Link>
            <Link to="/contact" className="btn-danger">
              Contact
            </Link>
            <Link to="/Admin" className="btn-danger">
              Admin
            </Link>
            <Link to="/Listproducts" className="btn-shopping">
              Shop
            </Link>
            <Navbar
              search={search}
              setSearch={setSearch}
              searchproduct={searchProduct}
            />
          </div>
        </header>

        {/* Routes */}
        <Routes>
          <Route path="/Admin" element={<Admin />} />
          <Route path="/" element={<BlogList />} />
          <Route
            path="/Listproducts"
            element={
              <Listproducts
                addToCart={addToCart}
                cart={cart}
                search={search} // Transmet la recherche
              />
            }
          />
          <Route
            path="/panier"
            element={<Panier cart={cart} setCart={setCart} />}
          />

          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Addproduct" element={<AddProduct />} />
          <Route path="/Adminproducts" element={<BlogTable />} />
          <Route path="/Adminutilisa" element={<UserTable />} />
          <Route path="/commande" element={<Commande />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
