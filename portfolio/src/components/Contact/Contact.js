import React, { useState } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import { GrSend } from "react-icons/gr";
import './Contact.css';


const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const clientData = { name, email, phone, message };

    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
      };

      const res = await fetch('https://port-backend-me61.onrender.com/client', options);

      if (res.ok) {
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setSuccess('Thank you for reaching out! I will get back to you soon.');
        setError('');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 7000); // Hide alert after 4 seconds
        setShowModal(true);
      } else {
        setError('Submission failed. Please try again.');
        setSuccess('');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      setSuccess('');
    }
  };

  return (
    <section id="Contact" className="contact-section">
      <div className="contact-container">
        <h2 className="contact-title">CONTACT ME</h2>
        <Form onSubmit={handleSubmit} className="contact-form">
          <Form.Group controlId="formName" className="form-group">
            <Form.Control
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-control"
            />
          </Form.Group>
          <Form.Group controlId="formEmail" className="form-group">
            <Form.Control
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
            />
          </Form.Group>
          <Form.Group controlId="formPhone" className="form-group">
            <Form.Control
              type="text"
              placeholder="Your Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="form-control"
            />
          </Form.Group>
          <Form.Group controlId="formMessage" className="form-group">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="form-control"
            />
          </Form.Group>
          {error && <Alert variant="danger" className="error-alert">{error}</Alert>}
          {success && showAlert && (
            <Alert variant="success" className="success-alert">
              {success}
            </Alert>
          )}
          <Button variant="primary" type="submit" className="submit-button">
           <GrSend size={30}/>
          </Button>
        </Form>

      

      </div>
    </section>
  );
};

export default Contact;
