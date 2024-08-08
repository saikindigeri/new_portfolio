import React from 'react';
import './Home.css';
import { Button } from 'react-bootstrap';
import { FaArrowDown } from 'react-icons/fa';
import { Link } from 'react-scroll';

const Home = () => (
  <section id="Home" className="home-section text-center">
     <h1 className="home-title ">Welcome to My Portfolio</h1>
    <div className="home-content text-center">
     
      <h1 className="home-subtitle">I'm Sai Kumar Kindigeri, a Creative Web Developer</h1>
      <p className="home-description">
        With a strong passion for web development, I specialize in building interactive <br /> and responsive web applications.
        My journey spans across technologies like React, <br />Node.js, and more, crafting solutions that bring ideas to life.
        Let's create something extraordinary together.
      </p>
      <Button variant="primary" href="#Contact" className="home-button">
        Connect with Me
      </Button>
     
       
        <Link 
          to="About" 
          smooth={true} 
          duration={1000} 
          className="scroll-down"
        >
          <FaArrowDown size={30} />
        </Link>
    </div>
  </section>
);

export default Home;
