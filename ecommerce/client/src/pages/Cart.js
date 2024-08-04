
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import './Cart.css';
import Header from '../components/Header';

const Cart = () => {
  const { cartItems, removeFromCart, fetchCartItems,postOrder, res ,fetchOrders} = useAppContext();
  const [totalPrice, setTotalPrice] = useState(0);


  
  const handleBookNow = async (item) => {
    try {
      const order = {
        user_id: item.user_id,
        title: item.title,
        product_id: item.product_id,
        price: item.price,
        quantity: item.quantity,
        total_amount: item.price * item.quantity,
        image_url: item.image_url
      };
      await postOrder(order);
      fetchCartItems(); // Refresh cart items after booking
      fetchOrders(); // Optionally refresh orders list
    } catch (error) {
      console.error('Failed to place order:', error);
    }
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
                  <button className="btn btn-primary" onClick={handleBookNow}>Buy Now</button>
                  <h2>{res}</h2>
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
