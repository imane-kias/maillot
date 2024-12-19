import React, { useState, useEffect } from 'react';
// import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortOption, setSortOption] = useState('price');

  useEffect(() => {
    // Utiliser fetch pour récupérer les produits depuis une API
    fetch('/api/ProductsList')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Erreur de récupération des produits:', error));
  }, []);

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const filteredProducts = products.filter(product => 
    categoryFilter === 'all' || product.category === categoryFilter
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOption === 'price') {
      return a.price - b.price;
    }
    return a.popularity - b.popularity; 
  });

  return (
    <div>
      <h1>Produits</h1>
      
      <select onChange={handleCategoryChange}>
        <option value="all">Toutes les catégories</option>
        <option value="electronics">Électroniques</option>
        <option value="fashion">Mode</option>
      </select>

      <select onChange={handleSortChange}>
        <option value="price">Trier par prix</option>
        <option value="popularity">Trier par popularité</option>
      </select>

      <div className="product-list">
        {sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;