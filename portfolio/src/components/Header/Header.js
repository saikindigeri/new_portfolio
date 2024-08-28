import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-scroll';
import './Header.css';

const Header = () => {
  const [headerBg, setHeaderBg] = useState('#FF4500'); // Initial background color

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 100) {
      setHeaderBg('white'); // Change to white when scrolled past 100px
    } else {
      setHeaderBg('#FF4500'); // Reset to orange at the top
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="header" style={{ backgroundColor: headerBg }}>
      <Link to="Home">
      <h3 className="logo">SAI DEVA</h3></Link>
      <div>
     <Navbar expand="lg" className="navbar-custom">
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mobile" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item>
              <Link
                to="About"
                smooth={true}
                duration={1000}
                className="nav-link"
                activeClass="active"
              >
                ABOUT
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                to="Services"
                smooth={true}
                duration={1000}
                className="nav-link"
                activeClass="active"
              >
                SERVICES
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                to="Projects"
                smooth={true}
                duration={1000}
                className="nav-link"
                activeClass="active"
              >
                PROJECTS
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                to="Contact"
                smooth={true}
                duration={1000}
                className="nav-link"
                activeClass="active"
              >
                TESTIMONIALS
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                to="Contact"
                smooth={true}
                duration={1000}
                className="nav-link"
                activeClass="active"
              >
                CONTACT
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>   
      </div>
      
    </div>
  );
};

export default Header;
