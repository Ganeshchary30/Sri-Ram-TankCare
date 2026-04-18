import React from 'react';
import { motion } from 'framer-motion';
import { Box, Droplet, Sparkles, Building2, Home, CheckCircle2 } from 'lucide-react';
import './Services.css';

const services = [
  {
    id: 1,
    icon: <Home size={32} />,
    title: "Residential Tank Cleaning",
    desc: "Complete 6-stage mechanized cleaning for overhead and underground tanks in individual homes and apartments.",
    features: ["Anti-bacterial treatment", "High-pressure washing", "Vacuum cleaning"]
  },
  {
    id: 2,
    icon: <Building2 size={32} />,
    title: "Commercial & Industrial",
    desc: "Large scale water storage solutions for hospitals, schools, tech parks, and factories.",
    features: ["Minimal downtime", "Certified process", "Yearly AMC available"]
  },
  {
    id: 3,
    icon: <Box size={32} />,
    title: "Sump Cleaning",
    desc: "Deep cleaning of underground sumps removing sludge, mud, and algae buildup completely.",
    features: ["Sludge removal", "Wall scrubbing", "UV radiation treatment"]
  }
];

const Services = () => {
  return (
    <section id="services" className="section services-section">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <span className="section-badge">Our Services</span>
          <h2 className="section-title">What We Do Best</h2>
          <p className="section-subtitle">We follow a rigorous mechanized cleaning process to ensure 100% bacteria-free and crystal clear water for your everyday needs.</p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="service-card"
            >
              <div className="service-icon-wrapper">
                <div className="service-icon">{service.icon}</div>
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
              <ul className="service-features">
                {service.features.map((feature, i) => (
                  <li key={i}><CheckCircle2 size={16} className="check-icon" /> {feature}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
