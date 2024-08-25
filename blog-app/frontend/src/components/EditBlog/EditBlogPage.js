import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditBlogPage.css'; 
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const EditBlogPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`https://blog-backend-1-wkh7.onrender.com/posts/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error fetching blog');
      }

      const data = await response.json();
      setTitle(data.title);
      setContent(data.content);
      setImage(data.image);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title || !content || !image) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await fetch(`https://blog-backend-1-wkh7.onrender.com/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ title, content, image }),
      });

      if (!response.ok) {
        throw new Error('Error updating blog');
      }

      navigate('/blogs');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
<>

<Header/>
    <div className="edit-blog-page">
      <h1 className="page-title">Edit Blog</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="form-textarea"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">Update Blog</button>
      </form>
    </div>
    <Footer/>
</>
   
  );
};

export default EditBlogPage;
