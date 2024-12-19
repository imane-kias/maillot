import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const Commande = () => {
  const location = useLocation();
  const { cart = [], totalPrice = 0 } = location.state || {}; // Récupération sécurisée des données du panier
  const [address, setAddress] = useState(''); // État pour stocker l'adresse
  const [isAddressSubmitted, setIsAddressSubmitted] = useState(false); // Pour valider si l'adresse a été soumise

  if (cart.length === 0) {
    return (
      <div>
        <h2>Commande Passée</h2>
        <p>Aucune commande n'a été passée.</p>
      </div>
    );
  }

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (!address) {
      alert("Veuillez entrer une adresse.");
      return;
    }
    setIsAddressSubmitted(true);
    alert("Adresse enregistrée avec succès !");
  };

  const handleApprove = (orderID) => {
    console.log('Transaction réussie avec l’ID :', orderID);
    alert('Paiement réussi ! Merci pour votre commande.');
  };

  return (
    <div>
      <h2>Commande Passée</h2>
      <p>Merci pour votre achat !</p>

      {/* Affichage des détails de la commande */}
      {cart.map((item, index) => (
        <div key={index} style={{ marginBottom: '15px' }}>
          <p>
            <strong>Produit :</strong> {item.title}
          </p>
          <p>
            <strong>Quantité :</strong> {item.qty}
          </p>
          <p>
            <strong>Prix unitaire :</strong> ${parseFloat(item.prix).toFixed(2)}
          </p>
          <p>
            <strong>Sous-total :</strong> ${(item.qty * parseFloat(item.prix || 0)).toFixed(2)}
          </p>
          <hr />
        </div>
      ))}

      <h3>Total de la commande : ${totalPrice.toFixed(2)}</h3>

      {/* Formulaire pour ajouter l'adresse */}
      {!isAddressSubmitted ? (
        <form onSubmit={handleAddressSubmit} style={{ marginBottom: '20px' }}>
          <label htmlFor="address">Adresse de livraison :</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows="3"
            style={{
              display: 'block',
              width: '100%',
              marginTop: '10px',
              padding: '10px',
            }}
          />
          <button type="submit" style={{ marginTop: '10px', padding: '10px 20px' }}>
            Ajouter l'adresse
          </button>
        </form>
      ) : (
        <p>
          <strong>Adresse enregistrée :</strong> {address}
        </p>
      )}

      {/* Bouton PayPal */}
      <PayPalScriptProvider
        options={{
          'client-id': 'test', // Remplacez "test" par votre vrai client ID PayPal
        }}
      >
        <PayPalButtons
          style={{ layout: 'vertical' }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: totalPrice.toFixed(2),
                  },
                  description: `Adresse de livraison : ${address}`,
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              handleApprove(details.id);
            });
          }}
          onError={(err) => {
            console.error('Erreur de paiement :', err);
            alert('Une erreur est survenue lors du paiement.');
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default Commande;
