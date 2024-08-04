import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { getUsernameFromToken } from '../utils/auth.js';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import './Header.css';

const Header = () => {
  const { user, cartItems } = useAppContext();
  const username = getUsernameFromToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const renderCartItemsCount = () => {
    const uniquePropertiesCount = cartItems.length;
    return uniquePropertiesCount > 0 ? (
      <span className="badge bg-primary rounded-pill ms-2">{uniquePropertiesCount}</span>
    ) : null;
  };

  return (
    <header className="bg-dark text-light shadow-sm">
      <nav className="navbar navbar-expand-lg navbar-dark container">
        <Link to="/" className="navbar-brand fw-bold">MyStore</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link">Products</Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link">
                Cart {renderCartItemsCount()}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin" className="nav-link">Admin Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link to="/orders" className="nav-link">My Orders</Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
