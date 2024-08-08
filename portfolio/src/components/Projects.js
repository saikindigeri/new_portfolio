
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
        image: 'path/to/image1.jpg',
        title:"Title 1",
        description: 'Project 1 description',
        tech: ['React', 'Node.js', 'MongoDB'],
        demo: 'https://example.com/demo1',
        github: 'https://github.com/example/repo1'
      },{
        image: 'path/to/image1.jpg',
        title:"Title 1",
        description: 'Project 1 description',
        tech: ['React', 'Node.js', 'MongoDB'],
        demo: 'https://example.com/demo1',
        github: 'https://github.com/example/repo1'
      },{
        image: 'path/to/image1.jpg',
        title:"Title 1",
        description: 'Project 1 description',
        tech: ['React', 'Node.js', 'MongoDB'],
        demo: 'https://example.com/demo1',
        github: 'https://github.com/example/repo1'
      },{
        image: 'path/to/image1.jpg',
        title:"Title 1",
        description: 'Project 1 description',
        tech: ['React', 'Node.js', 'MongoDB'],
        demo: 'https://example.com/demo1',
        github: 'https://github.com/example/repo1'
      },{
        image: 'path/to/image1.jpg',
        title:"Title 1",
        description: 'Project 1 description',
        tech: ['React', 'Node.js', 'MongoDB'],
        demo: 'https://example.com/demo1',
        github: 'https://github.com/example/repo1'
      },{
        image: 'path/to/image1.jpg',
        title:"Title 1",
        description: 'Project 1 description',
        tech: ['React', 'Node.js', 'MongoDB'],
        demo: 'https://example.com/demo1',
        github: 'https://github.com/example/repo1'
      },{
        image: 'path/to/image1.jpg',
        title:"Title 1",
        description: 'Project 1 description',
        tech: ['React', 'Node.js', 'MongoDB'],
        demo: 'https://example.com/demo1',
        github: 'https://github.com/example/repo1'
      },{
        image: 'path/to/image1.jpg',
        title:"Title 1",
        description: 'Project 1 description',
        tech: ['React', 'Node.js', 'MongoDB'],
        demo: 'https://example.com/demo1',
        github: 'https://github.com/example/repo1'
      },{
        image: 'path/to/image1.jpg',
        title:"Title 1",
        description: 'Project 1 description',
        tech: ['React', 'Node.js', 'MongoDB'],
        demo: 'https://example.com/demo1',
        github: 'https://github.com/example/repo1'
      },{
        image: 'path/to/image1.jpg',
        title:"Title 1",
        description: 'Project 1 description',
        tech: ['React', 'Node.js', 'MongoDB'],
        demo: 'https://example.com/demo1',
        github: 'https://github.com/example/repo1'
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
                <Card.Text className="project-description">
                    {project.title}
                  </Card.Text>
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
  