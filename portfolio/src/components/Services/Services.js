import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faCode, faServer, faDatabase } from '@fortawesome/free-solid-svg-icons';

import './Services.css';

const Services = () => (
  <section id="Services" className="services-section">
    <Container fluid>
      <h1 className="services-title">My Services</h1>
      <Row>
        <Col md={3} className="mb-4">
          <Card className="service-card">
            <Card.Body>
              <div className="service-icon">
                <FontAwesomeIcon icon={faLaptopCode} size="3x" />
              </div>
              <h2 className="service-title">Full Stack Development</h2>
              <p>
                I build complete web applications with both front-end and back-end capabilities, ensuring a seamless user experience.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="service-card">
            <Card.Body>
              <div className="service-icon">
                <FontAwesomeIcon icon={faCode} size="3x" />
              </div>
              <h2 className="service-title">Frontend Development</h2>
              <p>
                Specializing in creating beautiful and responsive user interfaces with modern technologies like React and Bootstrap.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="service-card">
            <Card.Body>
              <div className="service-icon">
                <FontAwesomeIcon icon={faServer} size="3x" />
              </div>
              <h2 className="service-title">Backend Development</h2>
              <p>
                Expertise in building robust back-end systems using Node.js, Express, and various databases to manage data efficiently.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="service-card">
            <Card.Body>
              <div className="service-icon">
                <FontAwesomeIcon icon={faDatabase} size="3x" />
              </div>
              <h2 className="service-title">Database Management</h2>
              <p>
                Skilled in managing and designing databases with SQL and NoSQL technologies to ensure data integrity and performance.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </section>
);

export default Services;
