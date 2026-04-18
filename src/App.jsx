import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Reviews />
      <Contact />
      <Footer />
      <FloatingActions />
    </>
  );
}

export default App;
