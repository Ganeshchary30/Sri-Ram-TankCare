import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import './Reviews.css';

const reviews = [
  {
    id: 1,
    name: "Ramesh Kumar",
    role: "Resident, Kokapet",
    desc: "Excellent service! The team was on time and very professional. The tank looks brand new out of nowhere. I highly recommend Sri Ram Tank Care for everyone in the area.",
    rating: 5
  },
  {
    id: 2,
    name: "Priya Reddy",
    role: "Apartment Society Head",
    desc: "We booked them for our entire apartment complex. They managed all 15 overhead tanks efficiently in a single day. The water quality has improved noticeably.",
    rating: 5
  },
  {
    id: 3,
    name: "Anand Sharma",
    role: "Business Owner",
    desc: "Very impressed with the mechanized cleaning process. No manual labor going inside the tank means it's much safer and more hygienic. Great work by the team.",
    rating: 5
  }
];

const Reviews = () => {
  return (
    <section id="reviews" className="section reviews-section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Testimonials</span>
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">Don't just take our word for it. Here is what the residents of Kokapet have to say about our services.</p>
        </div>

        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="review-card"
            >
              <div className="quote-icon">
                <Quote size={32} />
              </div>
              <div className="review-rating">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="var(--highlight-color)" color="var(--highlight-color)" />
                ))}
              </div>
              <p className="review-desc">"{review.desc}"</p>
              <div className="review-author">
                <div className="author-avatar">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="author-name">{review.name}</h4>
                  <p className="author-role">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
