import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogListPage from './components/BlogList/BlogListPage';
import BlogDetailsPage from './components/Blog/BlogDetailsPage';
import CreateBlogPage from './components/CreateBlog/CreateBlogPage';
import LoginPage from './components/Login/LoginPage';
import RegisterPage from './components/Register/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import EditBlogPage from './components/EditBlog/EditBlogPage';
import HomePage from './components/Home/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<ProtectedRoute><HomePage/></ProtectedRoute>} />
        <Route path="/blogs" element={<ProtectedRoute><BlogListPage /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><EditBlogPage /></ProtectedRoute>} />
        <Route path="/blogs/:id" element={<ProtectedRoute><BlogDetailsPage /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><CreateBlogPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
