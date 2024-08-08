import React from 'react';
import Home from './components/Home/Home';
import Services from './components/Services/Services';
import Skills from './components/Skills/Skills';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer'

import Header from './components/Header/Header';
import Portfolio from './components/Portfolio/Portfolio';


const App = () => {
  return (
    <>

    
<Header/>
      <Home />
      <Services />
      <Skills />
      <About />
      <Projects /> 
      <Portfolio/>
      <Contact />

  <Footer/>
    </>
  );
};

export default App;
