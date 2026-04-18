import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Clock, Leaf } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="about-grid">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="about-content"
          >
            <span className="section-badge">Why Choose Us</span>
            <h2 className="section-title text-left">Purity You Can Trust, Service You Can Rely On.</h2>
            <p className="about-desc">
              At Sri Ram Tank Care, we believe that clean water is a fundamental right. With over 11 years of dedicated service in Kokapet, we have pioneered the 6-stage mechanized cleaning process. Our method doesn't just clean the surface; it eliminates deep-seated bacteria, algae, and sludge.
            </p>
            
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon"><Shield size={24} /></div>
                <div>
                  <h4>100% Safe</h4>
                  <p>Chemical-free and UV treated process</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><Award size={24} /></div>
                <div>
                  <h4>Certified Staff</h4>
                  <p>Trained and medically fit professionals</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><Clock size={24} /></div>
                <div>
                  <h4>Timely Service</h4>
                  <p>We respect your time and schedule</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><Leaf size={24} /></div>
                <div>
                  <h4>Eco-Friendly</h4>
                  <p>Water conservation techniques used</p>
                </div>
              </div>
            </div>
            
            <a href="#contact" className="btn btn-primary mt-4">
              Get A Free Quote
            </a>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="about-image-wrapper"
          >
            <div className="about-image">
               {/* Decorative elements representing water/cleaning */}
               <div className="water-wave"></div>
               <div className="water-wave wave2"></div>
               <div className="water-drop drop1"></div>
               <div className="water-drop drop2"></div>
               <div className="water-drop drop3"></div>
               <div className="about-image-content">
                  <div className="years-badge">
                    <span className="years-num">11+</span>
                    <span className="years-text">Years of<br/>Trust</span>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
