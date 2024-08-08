import React from 'react';
import Home from './components/Home';
import Services from './components/Services';
import Skills from './components/Skills';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer'

import Header from './components/Header';
import Portfolio from './components/Portfolio';


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
