import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    query: ''
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setMessage(data.message);
        // Reset form
        setFormData({ name: '', email: '', phone: '', query: '' });
      } else {
        setStatus('error');
        setMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Unable to connect to server. Please try again later.');
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Contact Us</span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Need a cleaning service? Have a question? Reach out to us today and we'll get back to you as soon as possible.</p>
        </div>

        <div className="contact-grid">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="contact-info"
          >
            <div className="info-card">
              <div className="info-icon"><Phone size={24} /></div>
              <div className="info-details">
                <h3>Call Us</h3>
                <p><a href="tel:9505090976">9505090976</a></p>
                <p className="info-sub">Direct call &amp; WhatsApp available</p>
              </div>
            </div>
            
            <div className="info-card">
              <div className="info-icon"><Mail size={24} /></div>
              <div className="info-details">
                <h3>Email Us</h3>
                <p><a href="mailto:sriramap656@gmail.com">sriramap656@gmail.com</a></p>
                <p className="info-sub">Online support 24/7</p>
              </div>
            </div>
            
            <div className="info-card">
              <div className="info-icon"><MapPin size={24} /></div>
              <div className="info-details">
                <h3>Visit Us</h3>
                <p>Kokapet</p>
                <p className="info-sub">Hyderabad, Telangana</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon"><Clock size={24} /></div>
              <div className="info-details">
                <h3>Working Hours</h3>
                <p>Mon - Sun: 8:00 AM - 8:00 PM</p>
                <p className="info-sub">Available 7 days a week</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="contact-form-wrapper"
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Send us a message</h3>

              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email Address"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <textarea
                  name="query"
                  placeholder="How can we help you?"
                  className="form-control"
                  rows="4"
                  value={formData.query}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Status Message */}
              {status === 'success' && (
                <div className="form-alert form-alert-success">
                  <CheckCircle size={18} />
                  <span>{message}</span>
                </div>
              )}
              {status === 'error' && (
                <div className="form-alert form-alert-error">
                  <AlertCircle size={18} />
                  <span>{message}</span>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <span className="btn-spinner"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Request
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
