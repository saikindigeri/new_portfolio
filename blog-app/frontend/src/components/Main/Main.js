
import React from 'react';
import { Link } from 'react-router-dom'; 
import './Main.css';

const Main = () => {
  return (
    <main>
    
      <section className="hero" id="home">
        <div className="container">
          <h1>Welcome to MyBlog</h1>
          <p>Your go-to platform for creating and sharing amazing blog content.</p>
          <Link to="/blogs" className="cta-btn">View Blog List</Link>
        </div>
      </section>

  
      <section className="features">
        <div className="container">
          <h2>Why Choose Us?</h2>
          <div className="feature-grid">
            <div className="feature-item">
              <h3>Easy Content Creation</h3>
              <p>Create blogs effortlessly with our user-friendly editor.</p>
            </div>
            <div className="feature-item">
              <h3>Secure Data Storage</h3>
              <p>Your content is safely stored with robust security measures.</p>
            </div>
            <div className="feature-item">
              <h3>User Authentication</h3>
              <p>Protect your blogs with secure user authentication.</p>
            </div>
          </div>
        </div>
      </section>

    
      <section className="about" id="about">
        <div className="container">
          <h2>About MyBlog</h2>
          <p>MyBlog is a platform designed to help you easily create, manage, and share your blog content. Whether you're a seasoned writer or just starting, our platform offers all the tools you need to share your voice with the world.</p>
      
        </div>
      </section>
    </main>
  );
};

export default Main;
