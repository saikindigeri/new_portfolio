import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import './Register.css';
import {  useNavigate } from 'react-router-dom';

const Register = () => {
  const { register, message } = useAppContext();
  const [userData, setUserData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };


  const Navigate=useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    register(userData);
  };
const handleLog=()=>{
  Navigate('/login')
}
  return (
    <div className="register-container">
      <h1 className="text-center">Register</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
      
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
        <p onClick={handleLog}>Already had an account? Log In!</p>
      </form>
      {message && (
        <div className={`alert mt-3 ${message.includes('failed') ? 'alert-danger' : 'alert-success'}`} role="alert">
          {message}
        </div>
      )}
    </div>
  );
};

export default Register;
