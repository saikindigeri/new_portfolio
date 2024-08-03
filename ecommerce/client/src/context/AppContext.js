// src/context/AppContext.js

/*
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import cookies from 'js-cookie';

// Create a context
const AppContext = createContext();

// API base URL
const API_URL = 'https://ecommerce-server-2-o3d7.onrender.com/api';

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [orderItems,setOrderItems]=useState([])

  const [res,setRes]=useState('')
console.log(user)
  // Authentication functions
  const login = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      console.log(response.data)
    cookies.set('usernme',credentials.username)
      setUser(response.data.token);
    } catch (error) {
      console.log(error)
    }
  };

  const register = async (userData) => {
    try {
      await axios.post(`${API_URL}/auth/register`, userData);
      // Optionally, auto-login after registration
      await login(userData);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('user')
  };

  const addToCart = async (id,quantity) => {
    try {
        const response = await axios.post(`${API_URL}/cart`, {product_id:id,quantity}, {
            headers: { 'Authorization': `Bearer ${user}` },
        });
        console.log(response.data.message);
        setRes(response.data.message)
    } catch (error) {
        console.error('Error adding to cart:', error);
       
          setRes('Failed to add item to cart.');
       
    }
};

const postOrder=async(productId,quantity)=>{
  try {
      const response = await axios.post(`${API_URL}/cart`, {product_id:productId,quantity}, {
          headers: { 'Authorization': `Bearer ${user}` },
      });
      console.log(response.data.message);
      setRes(response.data.message)
  } catch (error) {
      console.error('Error adding to cart:', error);
     
        setRes('Failed to add item to cart.');
     
  }
};



const removeFromCart = async (itemId) => {
  try {
      await axios.delete(`${API_URL}/cart/${itemId}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('')}` }
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

      console.log(response.data)
      setCartItems(response.data);
    } catch (error) {
      console.error('Fetch cart items error:', error);
    }
  };


  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/cart`, {
        headers: { 'Authorization': `Bearer ${user}` },
      });

      console.log(response.data)
      setOrderItems(response.data);
    } catch (error) {
      console.error('Fetch cart items error:', error);
    }
  };



  return (
    <AppContext.Provider value={{ user,fetchOrders,orderItems, login,postOrder, register, logout, cartItems,addToCart, removeFromCart, fetchCartItems,res }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);


*/ 


// src/context/AppContext.js
import React, { createContext, useState, useContext ,useEffect} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

// Create a context
const AppContext = createContext();

// API base URL
const API_URL = 'https://claw-serverr.onrender.com/api';

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [res, setRes] = useState('');

const navigate=useNavigate()

  useEffect(() => {
  
    const token = localStorage.getItem('token');
    if (token) {
      setUser(token);
    }
  }, []);

 const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('client',credentials.username)
      setUser(response.data.token); 
      setMessage('Login successful!');
      navigate('/'); 
    } else {
      setMessage('Invalid credentials');
    }
  } catch (error) {
    setMessage('Invalid credentials');
    console.error('Login error:', error);
  }
};


const register = async (userData) => {
  try {
    await axios.post(`${API_URL}/auth/register`, userData);
    await login(userData); 
  } catch (error) {
    setMessage('Registration failed. Please try again.');
    console.error('Registration error:', error);
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
    } catch (error) {
      setRes('Failed to add item to cart.');
    }
  };

  const postOrder = async (productId, quantity) => {
    try {
      const response = await axios.post(`${API_URL}/cart`, { product_id: productId, quantity }, {
        headers: { 'Authorization': `Bearer ${user}` },
      });
      setRes(response.data.message);
    } catch (error) {
      setRes('Failed to place order.');
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
    } catch (error) {
      console.error('Fetch cart items error:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/cart`, {
        headers: { 'Authorization': `Bearer ${user}` },
      });
      setOrderItems(response.data);
    } catch (error) {
      console.error('Fetch orders error:', error);
    }
  };


  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <AppContext.Provider value={{ user, message,fetchOrders, orderItems, login, postOrder, register, logout, cartItems, addToCart, removeFromCart, fetchCartItems, clearCart, res }}>
      {children}
    </AppContext.Provider>
  );
};


export const useAppContext = () => useContext(AppContext);
