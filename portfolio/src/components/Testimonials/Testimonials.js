// Testimonials.js
import React from 'react';
import './Testimonials.css'; // Ensure you create this CSS file for styling

const testimonials = [
  {
    text: "Sai Kumar's expertise in web development is exceptional. His ability to transform complex ideas into user-friendly applications is impressive. Working with Sai has been a game-changer for our projects. Highly recommended!",
    author: "Jessica Taylor",
    position: "Lead Developer at Tech Innovators"
  },
  {
    text: "Sai Kumar’s work on our website was nothing short of outstanding. His attention to detail, innovative design solutions, and responsiveness to feedback made the entire process smooth and enjoyable. Our users love the new look and feel!",
    author: "Mark Johnson",
    position: "UX/UI Designer at Creative Solutions"
  },
  {
    text: "Sai Kumar demonstrated excellent project management skills, keeping our web development project on track and within budget. His dedication, clear communication, and technical prowess contributed significantly to the success of the project. A true professional!",
    author: "Emily Davis",
    position: "Project Manager at WebWorks"
  },
 
];

const Testimonials = () => (
  <section id="Testimonials" className="testimonials-section">
    <h2 className="testimonials-title text-center">Testimonials</h2>
    <div className="testimonials-container">
      {testimonials.map((testimonial, index) => (
        <div key={index} className="testimonial-card">
          <p className="testimonial-text">"{testimonial.text}"</p>
          <p className="testimonial-author">— {testimonial.author}</p>
          <p className="testimonial-position">{testimonial.position}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Testimonials;
