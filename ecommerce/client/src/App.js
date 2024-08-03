
import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import { AppProvider } from './context/AppContext';
import Order from './pages/Order';
import ProductsList from './pages/ProductsList';
import AdminPanel from './pages/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';
import Orders from './pages/Order';
import Confirmation from './pages/Confirmation';
import './App.css'

const App = () => {
  return (
    
     
        
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute element={<Home/>} />} />
          <Route path="/products/:id" element={<ProtectedRoute element={<ProductDetails/>} />} />
          <Route path="/products" element={<ProtectedRoute element={<ProductsList/>} />} />
          <Route path="/cart" element={<ProtectedRoute element={<Cart/>} />} />
          <Route path="/checkout" element={<ProtectedRoute element={<Checkout />} />} />
          <Route path="/orders" element={<ProtectedRoute element={<Orders />} />} />
         
          <Route path="/confirmation" element={<ProtectedRoute element={<Confirmation />} />} />
          <Route path="/orders" element={<ProtectedRoute element={<Order />} />} />
          <Route path="/admin" element={<ProtectedRoute element={<AdminPanel />} />} />
        </Routes>
     
  );
};

export default App;
