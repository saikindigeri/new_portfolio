
import React from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './Home.css'
import Header from '../components/Header';


const Home = () => {
  const client = localStorage.getItem('client')
  
  return (

    <>
    <Header/>
    <div className="container text-center mt-5">
      <div className="welcome-section">
        <h1 className="display-3">Hello, {client ? client : 'Guest'}!</h1>
        <h2 className="display-4">Welcome to Our E-Commerce Platform</h2>
        <p className="lead">Discover the best products and deals just for you!</p>
        <p className='lead'>
        Join thousands of satisfied customers and experience a new way to shop online. Browse our selection, take advantage of exclusive offers, and enjoy a hassle-free shopping experience with us
        </p>
        <Link to="/products" className="btn btn-primary btn-lg mt-3">Shop Now</Link>
      </div>
    </div>
    </>
 
  );
};

export default Home;
