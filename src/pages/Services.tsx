import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Services = () => {
  return (
    <Layout>
      <div className="page-header">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center section-header"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-elsol-sage">Our Services</h1>
            <div className="h-1.5 w-20 bg-elsol-sage/30 mx-auto mt-4 mb-6 rounded-full"></div>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mobile-text">
              Experience world-class travel services with ELSOL Travel. We offer comprehensive solutions tailored to your needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Flight Bookings",
                description: "International and domestic flight reservations with competitive rates and flexible options.",
                icon: "✈️"
              },
              {
                title: "Hotel Reservations",
                description: "Access to a wide network of hotels worldwide, from luxury resorts to boutique stays.",
                icon: "🏨"
              },
              {
                title: "Tour Packages",
                description: "Curated tour packages to popular destinations with expert guides and planned itineraries.",
                icon: "🌍"
              },
              {
                title: "Corporate Travel",
                description: "Specialized business travel solutions with dedicated support and expense management.",
                icon: "💼"
              },
              {
                title: "Visa Assistance",
                description: "Professional guidance for visa applications and documentation requirements.",
                icon: "📄"
              },
              {
                title: "24/7 Support",
                description: "Round-the-clock customer support for all your travel-related queries and assistance.",
                icon: "🕒"
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group hover-glow p-8 rounded-xl backdrop-blur-sm bg-black/30 border border-elsol-sage/10 text-center transition-all duration-300 hover:border-elsol-sage/30"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-100 group-hover:text-elsol-sage transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-elsol-sage">
              Need a Custom Travel Solution?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Contact us to discuss your specific travel requirements. We're here to help create your perfect travel experience.
            </p>
            <Link
              to="/contact"
              className="elsol-button inline-flex items-center hover:scale-105 transition-transform duration-300"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Services;
