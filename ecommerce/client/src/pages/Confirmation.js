import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 


import './Confirmation.css'
import Header from '../components/Header';

const Confirmation = () => {
  const navigate = useNavigate();

  const handleHomeRedirect = () => {
    navigate('/');
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="text-center">
          <h1 className="display-4 mb-4">Order Confirmed</h1>
          <p className="lead mb-4">Thank you for your purchase!</p>
          <p className="mb-4">
            Your order has been placed successfully and will be processed shortly. 
            We will send you a confirmation email with the details of your order.
          </p>
          <p className="mb-4">
            If you have any questions or need further assistance, please do not hesitate to contact our support team.
          </p>
          <button className="btn btn-primary btn-lg" onClick={handleHomeRedirect}>
            Return to Home
          </button>
        </div>
      </div>
    </>
  );
};

export default Confirmation;
