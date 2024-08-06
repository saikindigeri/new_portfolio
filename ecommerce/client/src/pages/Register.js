import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import './Register.css';
import {  useNavigate } from 'react-router-dom';

const Register = () => {
  const { register, message } = useAppContext();
  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');

const Navigate=useNavigate()


  const handleRegister = (e) => {
    e.preventDefault();
    register(username,password);
  };

const handleLog=()=>{
Navigate('/login')
}

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0 rounded-lg my-5 animate__animated animate__fadeIn animate__delay-1s">
            <div className="card-header bg-success text-white text-center py-4">
              <h3 className="fw-light my-2">Register</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleRegister}>
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
             
                {message && <div className="alert alert-danger mt-3">{message}</div>}
                <button type="submit" className="btn btn-success w-100 py-2 mt-3">Register</button>
                <div className="text-center mt-4">
            <p onClick={handleLog}>Already have an account?Log in</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
