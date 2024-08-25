

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './BlogListPage.css';
const BlogListPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    filterBlogs();
  }, [searchQuery, blogs]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('https://blog-backend-1-wkh7.onrender.com/posts', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error fetching blogs');
      }

      const data = await response.json();
      setBlogs(data);
      setFilteredBlogs(data); 
    } catch (err) {
      setError(err.message);
    }
  };

  const filterBlogs = () => {
    const query = searchQuery.toLowerCase();
    const filtered = blogs.filter(blog =>
      blog.title.toLowerCase().includes(query)
    );
    setFilteredBlogs(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleViewPage = (id) => {
    window.location.href = `/blogs/${id}`;
  };

  const handleEdit = (id) => {
    window.location.href = `/edit/${id}`;
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://blog-backend-1-wkh7.onrender.com/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error deleting blog');
      }

      fetchBlogs(); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page-container">
      <Header />
      <div className="blog-lists-page">
        <h1 className="title">Blog List</h1>
        {error && <p className="error">{error}</p>}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        {filteredBlogs.length > 0 ? (
          <ul className="blog-list">
            {filteredBlogs.map((blog) => (
              <li key={blog.id} className="blog-item">
                <h2 className="blog-title">{blog.title}</h2>
                {blog.image && <img src={blog.image} alt={blog.title} className="blog-image" />}
                <div className="blog-actions">
                  <button onClick={() => handleEdit(blog.id)} className="btn btn-edit">Edit</button>
                  <button onClick={() => handleDelete(blog.id)} className="btn btn-delete">Delete</button>
                  <button onClick={() => handleViewPage(blog.id)} className="btn btn-view">View</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-blogs">No blogs found. Please check back later!</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BlogListPage;


