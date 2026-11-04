import React, { useState } from 'react';
import ProductList from './ProductList';
import CartItem from './CartItem';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [page, setPage] = useState('landing'); // 'landing' | 'plants' | 'cart'

  if (page === 'plants') {
    return (
      <ProductList
        onHomeClick={() => setPage('landing')}
        onPlantsClick={() => setPage('plants')}
        onCartClick={() => setPage('cart')}
      />
    );
  }

  if (page === 'cart') {
    return (
      <CartItem
        onHomeClick={() => setPage('landing')}
        onPlantsClick={() => setPage('plants')}
        onCartClick={() => setPage('cart')}
        onContinueShopping={() => setPage('plants')}
      />
    );
  }

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Paradise Nursery</h1>
        <AboutUs />
        <button className="get-started-btn" onClick={() => setPage('plants')}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;