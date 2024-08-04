import React, { useState,useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import './Login.css'; 
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token');
  const {login}=useAppContext()




  const handleLogin = (e) => {
    e.preventDefault();
    login(username,password);
  };

 



  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);



  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="card shadow-lg border-0 rounded-lg my-5 animate__animated animate__fadeIn animate__delay-1s">
          <div className="card-header  text-center ">
            <h3 className="fw-light my-2">Login</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleLogin}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Username"
                />
                <label htmlFor="username">Username</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
                <label htmlFor="password">Password</label>
              </div>
              {error && <div className="alert alert-danger mt-3">{error}</div>}
              <button type="submit" className="btn btn-primary w-100 py-2 mt-3">Login</button>
              <div className="text-center mt-4">
                <p className="mb-0">Don't have an account? <a href="/register" className="text-primary">Register here</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Login;
