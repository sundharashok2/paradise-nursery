import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onHomeClick, onPlantsClick, onCartClick, onContinueShopping }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalAmount = items.reduce((sum, i) => sum + i.cost * i.quantity, 0);

  const handleIncrement = (item) =>
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleDelete = (item) => dispatch(removeItem(item.name));

  const handleCheckout = () => alert('Coming Soon');

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

      <div className="cart-container">
        <h2>Total Plants: {totalQuantity}</h2>
        <h2>Total Cart Amount: ${totalAmount}</h2>

        {items.length === 0 && <p>Your cart is empty.</p>}

        {items.map((item) => (
          <div className="cart-item" key={item.name}>
            <img src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>Unit Price: ${item.cost}</p>
              <div className="qty-controls">
                <button onClick={() => handleDecrement(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)}>+</button>
              </div>
              <p>Total: ${item.cost * item.quantity}</p>
              <button className="delete-btn" onClick={() => handleDelete(item)}>
                Delete
              </button>
            </div>
          </div>
        ))}

        <div className="cart-actions">
          <button onClick={onContinueShopping}>Continue Shopping</button>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;