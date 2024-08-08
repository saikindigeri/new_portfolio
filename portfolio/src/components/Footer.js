import React from 'react';
import './Footer.css';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => (
  <footer className="footer-section">
    <div className="footer-content">
      <div className="footer-info">
        <h3 className="footer-title">Connect With Me</h3>
        <p className="footer-text">Feel free to reach out through the following channels:</p>
      </div>
      <div className="footer-links">
        <a href="mailto:saikumarkindigeri@example.com" className="footer-link">
          <FaEnvelope size={20} /> Email
        </a>
        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="footer-link">
          <FaGithub size={20} /> GitHub
        </a>
        <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="footer-link">
          <FaLinkedin size={20} /> LinkedIn
        </a>
        <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" className="footer-link">
          <FaTwitter size={20} /> Twitter
        </a>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; 2024 Sai Kumar Kindigeri. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
