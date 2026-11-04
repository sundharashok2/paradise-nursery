import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

const img = (seed) => `https://picsum.photos/seed/${seed}/300/300`;

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: img('snake'), cost: 15 },
      { name: 'Spider Plant', image: img('spider'), cost: 12 },
      { name: 'Peace Lily', image: img('peace'), cost: 18 },
      { name: 'Boston Fern', image: img('boston'), cost: 20 },
      { name: 'Rubber Plant', image: img('rubber'), cost: 17 },
      { name: 'Aloe Vera', image: img('aloe'), cost: 14 },
    ],
  },
  {
    category: 'Aromatic Plants',
    plants: [
      { name: 'Lavender', image: img('lavender'), cost: 20 },
      { name: 'Jasmine', image: img('jasmine'), cost: 18 },
      { name: 'Rosemary', image: img('rosemary'), cost: 15 },
      { name: 'Mint', image: img('mint'), cost: 12 },
      { name: 'Lemon Balm', image: img('lemonbalm'), cost: 14 },
      { name: 'Basil', image: img('basil'), cost: 10 },
    ],
  },
  {
    category: 'Low Light Plants',
    plants: [
      { name: 'ZZ Plant', image: img('zz'), cost: 25 },
      { name: 'Pothos', image: img('pothos'), cost: 10 },
      { name: 'Cast Iron Plant', image: img('castiron'), cost: 22 },
      { name: 'Chinese Evergreen', image: img('evergreen'), cost: 19 },
      { name: 'Lucky Bamboo', image: img('bamboo'), cost: 13 },
      { name: 'Parlor Palm', image: img('palm'), cost: 21 },
    ],
  },
];

function ProductList({ onHomeClick, onPlantsClick, onCartClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const isInCart = (name) => cartItems.some((i) => i.name === name);

  return (
    <div>
      <nav className="navbar">
        <div className="nav-brand" onClick={onHomeClick}>Paradise Nursery</div>
        <div className="nav-links">
          <a onClick={onHomeClick}>Home</a>
          <a onClick={onPlantsClick}>Plants</a>
          <a onClick={onCartClick} className="cart-link">
            🛒
            <span className="cart-count">{totalQuantity}</span>
          </a>
        </div>
      </nav>

      <div className="product-grid-container">
        {plantsArray.map((cat) => (
          <div key={cat.category}>
            <h2 className="category-title">{cat.category}</h2>
            <div className="product-grid">
              {cat.plants.map((plant) => (
                <div className="product-card" key={plant.name}>
                  <img src={plant.image} alt={plant.name} />
                  <h3>{plant.name}</h3>
                  <p className="price">${plant.cost}</p>
                  <button
                    className="add-btn"
                    disabled={isInCart(plant.name)}
                    onClick={() => dispatch(addItem(plant))}
                  >
                    {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;