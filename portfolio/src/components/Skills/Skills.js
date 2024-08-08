import React from 'react';
import { FaReact, FaNodeJs, FaPython, FaDocker, FaDatabase } from 'react-icons/fa';
import { SiJavascript, SiMysql, SiMongodb, SiNextdotjs, SiTypescript, SiSocketdotio } from 'react-icons/si';
import './Skills.css';

const skillsData = [
  { icon: <FaReact />, name: 'React' },
  { icon: <SiJavascript />, name: 'JavaScript' },
  { icon: <FaNodeJs />, name: 'Node.js' },
  { icon: <SiNextdotjs />, name: 'Next.js' },
  { icon: <SiTypescript />, name: 'TypeScript' },
  { icon: <FaPython />, name: 'Python' },
  { icon: <FaDatabase />, name: 'SQLite/MySQL' },
  { icon: <SiMongodb />, name: 'MongoDB' },
  { icon: <FaDocker />, name: 'Docker' },
  { icon: <SiSocketdotio />, name: 'WebSockets' },
];

const Skills = () => (
  <section id="Skills" className="skills-section">
    <h2 className="skills-heading">My Skills</h2>
    <div className="skills-container">
      {skillsData.map((skill, index) => (
        <div key={index} className="skill-item">
          <div className="skill-icon">{skill.icon}</div>
          <div className="skill-name">{skill.name}</div>
        </div>
      ))}
    </div>
  </section>
);

export default Skills;
