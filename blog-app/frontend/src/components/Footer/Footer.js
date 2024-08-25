
import React from 'react';
import './Footer.css';


const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="footer-container">
        <p>&copy; 2024 MyBlog. All Rights Reserved.</p>
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

