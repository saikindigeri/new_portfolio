import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import './Login.css'; 
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const { login, message } = useAppContext();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
const Navigate=useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials);
  };

  const handleRegister=()=>{
    Navigate('/register')
  }

  return (
    <div className="login-container">
      <h1 className="text-center">Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
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
            value={credentials.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>

        <p onClick={handleRegister}>Not yet Registered? Sign Up!</p>
      </form>
      {message && (
        <div className={`alert mt-3 ${message.includes('failed') ? 'alert-danger' : 'alert-success'}`} role="alert">
          {message}
        </div>
      )}
    </div>
  );
};

export default Login;
