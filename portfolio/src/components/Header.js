import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-scroll';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
        <h3  href="#Home" className='logo' >
           SAI DEVA  </h3>
      <Navbar expand="lg" className="navbar-custom">
       
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='mobile'/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item>
              <Link
                to="Home"
                smooth={true}
                duration={1000}
                className="nav-link"
                activeClass="active"
              >
                Home
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                to="About"
                smooth={true}
                duration={1000}
                className="nav-link"
                activeClass="active"
              >
                About
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
                Services
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
                Projects
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
                Contact
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
