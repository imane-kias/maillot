import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Panier = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const removeFromCart = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const incrementQty = (product) => {
    setCart(
      cart.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decrementQty = (product) => {
    setCart(
      cart.map((item) =>
        item.id === product.id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.qty * parseFloat(item.prix || 0),
    0
  );

  const handleOrder = () => {
    // Envoyer les détails du panier à la page de commande
    navigate('/commande', {
      state: { cart, totalPrice },
    });

    setCart([]); // Vide le panier après la commande
  };

  return (
    <div className="panier-container">
      <h2>Votre Panier</h2>
      {cart.length > 0 ? (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="panier-item">
                <img src={item.image} alt={item.title} />
                <div className="panier-item-info">
                  <h4>{item.title}</h4>
                  <p>Prix unitaire : ${parseFloat(item.prix).toFixed(2)}</p>
                  <p>Quantité : {item.qty}</p>
                  <p>Total : ${(item.qty * parseFloat(item.prix || 0)).toFixed(2)}</p>
                </div>
                <div>
                  <button onClick={() => incrementQty(item)} className="button button-increment">
                    +
                  </button>
                  <button onClick={() => decrementQty(item)} className="button button-decrement">
                    -
                  </button>
                  <button onClick={() => removeFromCart(item)} className="button button-remove">
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total : ${totalPrice.toFixed(2)}</h3>
          <button onClick={clearCart} className="button-clear">
            Vider le panier
          </button>
          <button onClick={handleOrder} className="button-order">
            Passer la commande
          </button>
        </>
      ) : (
        <p>Votre panier est vide.</p>
      )}
    </div>
  );
};

export default Panier;
