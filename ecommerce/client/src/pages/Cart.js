/*
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './Cart.css';
import Header from '../components/Header';

const Cart = () => {
  const { cartItems, removeFromCart, fetchCartItems, res } = useAppContext();
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate('/checkout');
  };

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      if (Array.isArray(cartItems)) {
        const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setTotalPrice(total);
      }
    };

    calculateTotalPrice();
  }, [cartItems]);

  const handleRemoveCart = (id) => {
    removeFromCart(id);
  };

  return (
    <>
    <Header/>
    <div className="container mt-5">
      <h1 className="mb-4">Cart Items</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {res && (
            <div className="alert alert-success fade show" role="alert">
              {res}
            </div>
          )}
          <ul className="list-group">
            {cartItems.map(item => (
              <li className="list-group-item d-flex align-items-center justify-content-between" key={item.id}>
                <div className="d-flex align-items-center">
                  <img src={item.image_url} alt={item.title} className="img-thumbnail me-3" style={{ width: '100px' }} />
                  <div>
                    <h5>{item.title}</h5>
                    <p>Rs. {item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Total: Rs. {item.price * item.quantity}</p>
                  </div>
                </div>
                <div>
                  <button className="btn btn-danger me-2" onClick={() => handleRemoveCart(item.id)}>Remove</button>
                  <button className="btn btn-primary" onClick={handleBuyNow}>Buy Now</button>
                </div>
              </li>
            ))}
          </ul>
          <h3 className="mt-4">Total Price:Rs. {totalPrice.toFixed(2)}</h3>
        </div>
      )}
    </div>
    </>
   
  );
};

export default Cart;
*/


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Cart = () => {
  const { cartItems, postOrder } = useAppContext(); // Ensure you have addToOrders in your context
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);

  const handleBookNow = (item) => {
    postOrder(item.id,item.quantity); // Add the item to orders
    // Optionally remove from cart
    // removeFromCart(item.id);
  };

  const handleCheckoutAll = () => {
    navigate('/checkout', { state: { totalAmount } }); // Pass total amount to checkout page
  };

  // Calculate total amount
  const calculateTotalAmount = () => {
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);
    setTotalAmount(total);
  };

  // Call calculateTotalAmount when cartItems change
  React.useEffect(() => {
    calculateTotalAmount();
  }, [cartItems]);

  return (
    <div>
      <h1>Your Cart</h1>
      <ul className="list-group">
        {cartItems.map((item) => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{item.name}</h5>
              <p>Price: ${item.price}</p>
            </div>
            <button className="btn btn-primary" onClick={() => handleBookNow(item)}>Book Now</button>
          </li>
        ))}
      </ul>
      <button
        className="btn btn-success mt-3"
        onClick={handleCheckoutAll}
        disabled={cartItems.length === 0}
      >
        Checkout All (${totalAmount})
      </button>
    </div>
  );
};

export default Cart;
