import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import './FloatingActions.css';

const FloatingActions = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`floating-actions ${isVisible ? 'visible' : ''}`}>
      <a href="https://wa.me/919505090976?text=Hello,%20I%20am%20intrested%20in%20your%20services.%20Please%20call%20me%20back" target="_blank" rel="noopener noreferrer" className="action-btn whatsapp-btn">
        <MessageCircle size={28} />
      </a>
      <a href="tel:9505090976" className="action-btn call-btn">
        <Phone size={28} />
      </a>
    </div>
  );
};

export default FloatingActions;
