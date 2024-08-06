


import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AppContext = createContext();

const API_URL = 'https://claw-serverr.onrender.com/api';

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [res, setRes] = useState('');
  const [error,setError]=useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser(token);
      fetchCartItems(); // Fetch cart items when user is set
    }
  }, []);

  const register = async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setError(null); // Clear previous errors
      } else {
        setMessage(null); // Clear previous messages
        setError(data || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setMessage(null); // Clear previous messages
      setError('Registration failed. Please check your connection.');
      console.error('Registration error:', error);
    }
  };

  // Login function
  const login = async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Store the token or user data
        setUser(data.token);
        setMessage(data.message);
        setError(null); // Clear previous errors
      } else {
        setMessage(null); // Clear previous messages
        setError(data || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setMessage(null); // Clear previous messages
      setError('Login failed. Please check your connection.');
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setMessage('');
    navigate('/login');
  };

  const addToCart = async (id, quantity) => {
    try {
      const response = await axios.post(`${API_URL}/cart`, { product_id: id, quantity }, {
        headers: { 'Authorization': `Bearer ${user}` },
      });
      setRes(response.data.message);
      fetchCartItems(); // Refresh cart items
    } catch (error) {
      setRes('Failed to add item to cart.');
    }
  };
/*
  const postOrder = async (order) => {
    try {
      const response = await axios.post(`${API_URL}/orders`, {order},{
        headers: { 'Authorization': `Bearer ${user}` },
      });
      
      setRes(response.data.message); // Handle success message or response
      fetchOrders(); // Refresh orders if needed
    } catch (error) {
      setRes('Failed to create order.'); // Handle error
      console.error('Failed to create order:', error);
    }
  };
*/
  const postOrder = async (order) => {

    const {user_id,product_id,title,price,total_amount,quantity,image_url}=order
    try {
      const response = await axios.post(`${API_URL}/orders`, {user_id,product_id,title,quantity,image_url,total_amount,price}, {
   
      });
  
      if (response.status === 200) {
        console.log('Order placed successfully:', response.data);
      setRes(response.data.message)
      navigate('/checkout'
      )
      } else {
        
      }
    } catch (error) {
    
    }
  };
  

  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`${API_URL}/cart/${itemId}`, {
        headers: { 'Authorization': `Bearer ${user}` }
      });
      setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/cart`, {
        headers: { 'Authorization': `Bearer ${user}` },
      });
      setCartItems(response.data);
      // Calculate total amount
      const total = response.data.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setTotalAmount(total);
    } catch (error) {
      console.error('Fetch cart items error:', error);
    }
  };
/*
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders`, {
        headers: { 'Authorization': `Bearer ${user}` },
      });
      setOrderItems(response.data);
    } catch (error) {
      console.error('Fetch orders error:', error);
    }
  };
*/

const fetchOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/orders`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

   
      setOrderItems(response.data)
      console.log(orderItems)
      
    
  } catch (error) {
    
  }
};
  const clearCart = () => {
    setCartItems([]);
  };


  return (
    <AppContext.Provider value={{
      user,
      message,
      fetchOrders,
      orderItems,
      login,
      postOrder,
      register,
      logout,
      cartItems,
      addToCart,
      removeFromCart,
      fetchCartItems,
      clearCart,
    error,
      totalAmount,
      res
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
