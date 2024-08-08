
  import React, { useRef, useState, useEffect } from 'react';
  import { Card, Button } from 'react-bootstrap';
  import { FaReact, FaNodeJs, FaPython, FaDocker, FaDatabase, FaGithub } from 'react-icons/fa';
  import { SiJavascript, SiMysql, SiMongodb, SiNextdotjs, SiSocketdotio } from 'react-icons/si';
  import './Projects.css';
  
  const techIcons = {
    React: <FaReact />,
    JavaScript: <SiJavascript />,
    'Node.js': <FaNodeJs />,
    'Next.js': <SiNextdotjs />,
    Python: <FaPython />,
    'SQLite/MySQL': <FaDatabase />,
    MongoDB: <SiMongodb />,
    Docker: <FaDocker />,
    'WebSockets': <SiSocketdotio />
  };
  
  const projectsData = [
   
    {
        image: 'https://res.cloudinary.com/dyjmh036b/image/upload/v1723149230/Screenshot_2024-08-09_015448_hecr5b.png',
        title:"Nxtwave Ecommerce",
        description: 'Ecommmerce website built using rest apis',
        tech: ['React', 'Node.js', 'Css'],
        demo: 'https://sainxtcart.ccbp.tech/',
        github: 'https://github.com/saikindigeri/nxt_trendz_eCommerce.git'
      },{
        image: 'https://res.cloudinary.com/dyjmh036b/image/upload/v1723149234/Screenshot_2024-08-09_015535_ek4r3l.png',
        title:"Jobby App",
        description: 'A platform which is used to find jobs',
        tech: ['React', 'Node.js', 'Css'],
        demo: 'https://saikumarjobby.ccbp.tech/',
        github: 'https://github.com/saikindigeri/jobby_app.git'
      },{
        image: 'https://res.cloudinary.com/dyjmh036b/image/upload/v1723149334/Screenshot_2024-08-09_020518_npmg6j.png',
        title:"NxtWatch",
        description: 'Youtube like website to watch different kind of videos',
        tech: ['React', 'Node.js', 'Css'],
        demo: 'https://saikwatch.ccbp.tech/',
        github: 'https://github.com/saikindigeri/nxtwatch.git'
      },{
        image: 'https://res.cloudinary.com/dyjmh036b/image/upload/v1723149244/Screenshot_2024-08-09_015938_qo7e81.png',
        title:"Google Keep",
        description: 'A Note Keep used to maintain notes with features',
        tech: ['JavaScript', 'Node.js', 'Bootstrap'],
        demo: 'https://keep-backend-smoky.vercel.app/',
        github: 'https://github.com/saikindigeri/keep_backend.git'
      },{
        image: 'https://res.cloudinary.com/dyjmh036b/image/upload/v1723149238/Screenshot_2024-08-09_015754_i9ct6h.png',
        title:"Mahjong Game",
        description: 'Game to match pair of images or animals',
        tech: ['React', 'Css'],
        demo: 'https://mahajong-game.vercel.app/',
        github: 'https://github.com/saikindigeri/mahajong-game.git'
      },{
        image: 'https://res.cloudinary.com/dyjmh036b/image/upload/v1723150278/Screenshot_2024-08-09_022106_elyfiq.png',
        title:"Retailer Dashboard",
        description: 'A simple Dashboard to view the Data.',
        tech: ['React', 'Node.js', 'Sqlite'],
        demo: 'https://64-dashboard.vercel.app',
        github: 'https://github.com/saikindigeri/64_dashboard.git'
      },{
        image: 'https://res.cloudinary.com/dyjmh036b/image/upload/v1723149261/Screenshot_2024-08-09_020302_ekcsr1.png',
        title:"My Store",
        description: 'Ecommerce with complete Auth,Crud operations.',
        tech: ['React', 'Node.js', 'Sqlite'],
        demo: 'https://claw-serve.vercel.app/',
        github: 'https://github.com/saikindigeri/claw_serve.git'
      },{
        image: 'https://res.cloudinary.com/dyjmh036b/image/upload/v1723149247/Screenshot_2024-08-09_020101_uhyxop.png',
        title:"Finance Manager",
        description: 'Tracker used to track all the transactions ',
        tech: ['React', 'Node.js', 'MySql'],
        demo: 'https://transassign.netlify.app/',
        github: 'https://github.com/saikindigeri/finance_manager.git'
      },{
        image: 'https://res.cloudinary.com/dyjmh036b/image/upload/v1723149250/Screenshot_2024-08-09_020220_b8nwuf.png',
        title:"RealEstate App ",
        description: 'A realestate app used to book properties',
        tech: ['React', 'Node.js','Css','Bootstrap'],
        demo: 'https://totality-frontend-challenge-rust.vercel.app/',
        github: 'https://github.com/saikindigeri/totality-frontend-challenge.git'
      },{
        image: 'https://res.cloudinary.com/dyjmh036b/image/upload/v1723150052/Screenshot_2024-08-09_021629_rec02a.png',
        title:"Covid Dashboard",
        description: 'Dashboard regarding data of covid ',
        tech: ['React', 'Apis', 'Css'],
        demo: 'https://ksaicovid.ccbp.tech',
        github: 'https://github.com/saikindigeri/coviddash.git'
      },
  ];
  
  const Projects = () => {
    const containerRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const [scrollSpeed, setScrollSpeed] = useState(4); // Initial scroll speed
  
    useEffect(() => {
      let scrollInterval;
  
      if (!isPaused) {
        scrollInterval = setInterval(() => {
          if (containerRef.current) {
            containerRef.current.scrollLeft += scrollSpeed;
            if (containerRef.current.scrollLeft >= containerRef.current.scrollWidth - containerRef.current.clientWidth) {
              containerRef.current.scrollLeft = 0; // Reset scroll position
            }
          }
        }, 20); // Adjust the interval for smoother or faster scrolling
      }
  
      return () => clearInterval(scrollInterval);
    }, [isPaused, scrollSpeed]);
  
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const { clientX } = e;
        const { offsetWidth, scrollWidth, clientWidth } = containerRef.current;
        const maxScrollLeft = scrollWidth - clientWidth;
        const scrollPercentage = (clientX / window.innerWidth) * maxScrollLeft;
  
        containerRef.current.scrollLeft = scrollPercentage;
        setIsPaused(true); // Pause automatic scrolling when user interacts
  
        // Increase speed based on mouse position
        setScrollSpeed(2 + (scrollPercentage / maxScrollLeft) * 2); // Adjust speed range as needed
      }
    };
  
    const handleMouseLeave = () => {
      setIsPaused(false); // Resume scrolling when mouse leaves
    };
  
    return (
      <section id="Projects" className="projects-section">
        <h1 className="projects-title">My Projects</h1>
        <div
          className="projects-container"
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {projectsData.map((project, index) => (
            <div key={index} className="project-card-wrapper">
              <Card className="project-card">
                <Card.Img variant="top" src={project.image} className="project-image" />
                <Card.Body>
                <Card.Header className="project-des">
                    {project.title}
                  </Card.Header>
                  <Card.Text className="project-description">
                    {project.description}
                  </Card.Text>
                  <div className="tech-icons">
                    {project.tech.map((tech, idx) => (
                      <span key={idx} className="tech-icon">
                        {techIcons[tech]}
                      </span>
                    ))}
                  </div>
                  <div className="project-buttons">
                    <Button variant="primary" href={project.demo} target="_blank">
                      Demo
                    </Button>
                    <Button variant="secondary" href={project.github} target="_blank">
                      <FaGithub size={20} />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default Projects;
  