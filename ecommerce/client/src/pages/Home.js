
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './Home.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {


  return (
    <>
      <Header />
      <div className="container home-con text-center">
        <div className="welcome-section m-4 p-4 rounded">
     
          <h2 className="display-5 text-secondary">Welcome to Our E-Commerce Platform</h2>
          <p className="lead text-muted">Discover the best products and deals just for you!</p>
          <p className="lead">
            Join thousands of satisfied customers and experience a new way to shop online. Browse our selection, take advantage of exclusive offers, and enjoy a hassle-free shopping experience with us.
          </p>
          <Link to="/products" className="btn btn-success btn-lg mt-3">Shop Now</Link>
        </div>

        <div className="info-section mt-5">
          <h3 className="display-6 text-info">Why Choose Us?</h3>
          <p className="lead text-dark">
            We offer a diverse range of products to cater to all your needs, with unbeatable prices and top-notch customer service.
          </p>
          <ul className="list-unstyled">
            <li className="lead text-success">✔️ Quality Products</li>
            <li className="lead text-success">✔️ Fast Shipping</li>
            <li className="lead text-success">✔️ 24/7 Customer Support</li>
          </ul>
        </div>

        <div className="testimonials-section mt-5">
          <h3 className="display-6 text-warning">What Our Customers Say</h3>
          <p className="lead text-dark">
            "The shopping experience was fantastic! Easy to navigate, great deals, and fast delivery. Highly recommend!" - Alex
          </p>
          <p className="lead text-dark">
            "I found exactly what I was looking for, and the customer service was excellent. I'll definitely shop here again." - Jamie
          </p>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Home;
