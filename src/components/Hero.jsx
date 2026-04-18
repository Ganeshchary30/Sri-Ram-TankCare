import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Droplets, Users, ArrowRight } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-overlay"></div>
      <div className="container hero-container">
        <div className="hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-badge"
          >
            <ShieldCheck size={18} />
            <span>#1 Water Tank Cleaning Service in Kokapet</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-title"
          >
            Clean Water, <br/><span className="text-highlight">Healthy Lives.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-subtitle"
          >
            Professional, mechanized, and safe cleaning solutions for overhead and underground water tanks. Ensuring purity for your family and business.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hero-actions"
          >
            <a href="#contact" className="btn btn-primary btn-lg">
              Book a Service <ArrowRight size={20} />
            </a>
            <a href="#services" className="btn btn-secondary btn-lg btn-outline">
              Our Services
            </a>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="hero-stats"
          >
            <div className="stat-item">
              <div className="stat-icon"><Droplets /></div>
              <div className="stat-details">
                <span className="stat-value">11+</span>
                <span className="stat-label">Years Experience</span>
              </div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-icon"><Users /></div>
              <div className="stat-details">
                <span className="stat-value">5000+</span>
                <span className="stat-label">Happy Clients</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
