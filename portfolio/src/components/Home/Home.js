import React from 'react';
import './Home.css';
import resume from '../../assets/Resume.pdf';
import { Link } from 'react-scroll';
const profileImage = 'https://res.cloudinary.com/dyjmh036b/image/upload/v1724694358/WhatsApp_Image_2024-08-08_at_8.11.51_PM_tpbzls.png';

const Home = () => (
  <section id="Home" className="home-section">
    <div className="home-content">
      <div className="text-content">
        <h1 className="home-title">Hi, I'm Sai Kumar</h1>
        <h2 className="home-subtitle">A Passionate Web Developer</h2>
        <p className="home-description">
          Crafting modern, interactive, and responsive web applications <br /> to bring your ideas to life.
        </p>
        <Link to="Contact" className="home-button">Connect with Me</Link>
        <a href={resume} className="resume-button" download="Sai_Kumar_Resume.pdf">Download Resume</a>
      </div>
      <img src={profileImage} alt="Sai Kumar" className="profile-photo" />
    </div>
  </section>
);

export default Home;
