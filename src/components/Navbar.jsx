import React, { useState, useEffect } from 'react';
import { PhoneCall, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <div className="logo">
          <a href="#">
            <img src="/logo.png" alt="Sri Ram Tank Care" className="logo-img" />
          </a>
        </div>
        
        <nav className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <a href="#home" onClick={toggleMobileMenu}>Home</a>
          <a href="#services" onClick={toggleMobileMenu}>Services</a>
          <a href="#about" onClick={toggleMobileMenu}>About</a>
          <a href="#reviews" onClick={toggleMobileMenu}>Reviews</a>
          <a href="#contact" onClick={toggleMobileMenu}>Contact</a>
          <a href="tel:9505090976" className="nav-contact-mobile">
            <PhoneCall size={18} />
            9505090976
          </a>
        </nav>

        <div className="nav-actions">
          <a href="tel:9505090976" className="btn btn-primary nav-call-btn">
            <PhoneCall size={18} />
            Call Now
          </a>
          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} color="var(--primary-color)" /> : <Menu size={24} color="var(--primary-color)" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
