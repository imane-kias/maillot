// import React, { useState, useEffect } from 'react';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     // Charger les produits depuis JSON Server
//     fetch('http://localhost:3001/products')
//       .then((response) => response.json())
//       .then((data) => setProducts(data))
//       .catch((error) => console.error('Erreur:', error));
//   }, []);

//   return (
//     <div>
//       <h2>Liste des Produits</h2>
//       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
//         {products.map((product) => (
//           <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
//             <img
//               src={product.image}
//               alt={product.title}
//               style={{ width: '100px', height: '100px', objectFit: 'cover' }}
//             />
//             <h3>{product.title}</h3>
//             <p>{product.body}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductList;
