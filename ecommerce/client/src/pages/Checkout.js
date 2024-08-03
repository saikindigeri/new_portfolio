import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import './Checkout.css'; 
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, postOrder } = useAppContext();
  const [totalAmount, setTotalAmount] = useState(0);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    paymentType: 'Credit Card' 
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(total);
  }, [cartItems]);

  const validateForm = () => {
    const newErrors = {};
    if (!customerDetails.name) newErrors.name = 'Name is required';
    if (!customerDetails.email || !/\S+@\S+\.\S+/.test(customerDetails.email)) newErrors.email = 'Valid email is required';
    if (!customerDetails.address) newErrors.address = 'Address is required';
    if (!customerDetails.phone || !/^\d{10}$/.test(customerDetails.phone)) newErrors.phone = 'Valid phone number is required';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); 
  };

  const handleCheckout = async () => {
    if (!validateForm()) return; 
    setLoading(true);
    setMessage('');

    try {
      for (const item of cartItems) {
        await postOrder(item.id, item.quantity);
      }
      setMessage('Purchase successful!');
      navigate('/confirmation');
    } catch (error) {
      setMessage('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h1 className="text-center mb-4">Checkout</h1>

      <form className="checkout-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={customerDetails.name}
              onChange={handleChange}
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              required
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={customerDetails.email}
              onChange={handleChange}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              required
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            value={customerDetails.address}
            onChange={handleChange}
            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
            rows="3"
            required
          ></textarea>
          {errors.address && <div className="invalid-feedback">{errors.address}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={customerDetails.phone}
            onChange={handleChange}
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            required
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="paymentType">Payment Type:</label>
          <select
            id="paymentType"
            name="paymentType"
            value={customerDetails.paymentType}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Cryptocurrency">Cryptocurrency</option>
          </select>
        </div>

        <div className="mt-4">
          <h3>Total Amount: Rs. {totalAmount.toFixed(2)}</h3>
        </div>

        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Complete Purchase'}
        </button>
      </form>

      {message && (
        <div className={`alert mt-4 ${message.includes('failed') ? 'alert-danger' : 'alert-success'} fade-in`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Checkout;
