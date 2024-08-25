import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../Header/Header';
import './CreateBlogPage.css'; 
import Footer from '../Footer/Footer';

const CreateBlogPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title || !content || !image) {
      setError('All fields are required');
      return;
    }

    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch('https://blog-backend-1-wkh7.onrender.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, image }),
      });

      if (!response.ok) {
        throw new Error('Error creating blog');
      }

      const data = await response.json();
      console.log('Blog created with ID:', data.id);
      navigate('/blogs');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
    <Header/>
    
    <div className="create-blog-pages">
      <h1>Create Blog</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-textarea"
            required
          />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="submit-btn">Create Blog</button>
      </form>
      
    </div>
    
    <Footer/>
    </>
    
  );
};

export default CreateBlogPage;
