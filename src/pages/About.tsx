import React from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, 
  Target, 
  Heart, 
  Check, 
  Phone, 
  Mail, 
  MapPin,
  Award
} from 'lucide-react';
import Layout from '../components/Layout';

const teamMembers = [
  {
    name: 'Yohannes Tadesse',
    role: 'Founder & Managing Director',
    description: 'With over 15 years in the international travel industry, Yohannes leads our vision of delivering seamless travel experiences.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60'
  },
  {
    name: 'Sara Mohammed',
    role: 'Head of Ticketing & Operations',
    description: 'Sara oversees airline bookings, corporate flight schedules, and luxury travel arrangements with meticulous attention to detail.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60'
  },
  {
    name: 'Dawit Haile',
    role: 'Senior Travel Consultant',
    description: 'Specializing in historical Ethiopian tours and international destinations across the Middle East, Asia, and Europe.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60'
  },
  {
    name: 'Bethlehem Alemu',
    role: 'Customer Care & Visa Desk',
    description: 'Dedicated to helping travelers navigate visa requirements, airport protocols, and 24/7 journey support.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60'
  },
  {
    name: 'Michael Gebre',
    role: 'Tour Operations Specialist',
    description: 'Crafts custom itineraries for group excursions, domestic cultural sites, and eco-tours.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=60'
  },
  {
    name: 'Helen Tekle',
    role: 'Finance & Partner Relations',
    description: 'Managing partner airline relationships to guarantee the most competitive rates for our clients.',
    image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500&auto=format&fit=crop&q=60'
  }
];

const About = () => {
  return (
    <Layout>
      <div className="min-h-screen">
        <div className="page-header">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center section-header">
              <motion.h1 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-elsol-sage"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                About ELSOL Travel Agency
              </motion.h1>
              <div className="h-1.5 w-24 bg-elsol-sage/30 mx-auto mt-4 mb-6 rounded-full"></div>
              <motion.p 
                className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Your trusted IATA accredited travel partner, creating exceptional journeys and unforgettable memories since 2017.
              </motion.p>
            </motion.div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              className="glass-panel p-6 rounded-xl hover-glow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mb-4">
                <Eye className="w-8 h-8 text-elsol-sage" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Our Vision</h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                To be the premier travel agency in Ethiopia and East Africa, renowned for exceptional service, modern technology, and transformative journeys.
              </p>
            </motion.div>

            <motion.div 
              className="glass-panel p-6 rounded-xl hover-glow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="mb-4">
                <Target className="w-8 h-8 text-elsol-sage" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Our Mission</h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                To provide personalized, hassle-free travel solutions that exceed client expectations while promoting sustainable tourism and cultural heritage.
              </p>
            </motion.div>

            <motion.div 
              className="glass-panel p-6 rounded-xl md:col-span-2 lg:col-span-1 hover-glow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="mb-4">
                <Heart className="w-8 h-8 text-elsol-sage" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Our Core Values</h2>
              <ul className="text-gray-300 space-y-2 text-sm sm:text-base">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-elsol-sage mr-2 flex-shrink-0" />
                  <span>IATA accredited professionalism</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-elsol-sage mr-2 flex-shrink-0" />
                  <span>Integrity, transparency & fair pricing</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-elsol-sage mr-2 flex-shrink-0" />
                  <span>Round-the-clock client support</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-elsol-sage mr-2 flex-shrink-0" />
                  <span>Personalized itinerary curation</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Accreditation Banner */}
          <motion.div 
            className="my-16 p-8 rounded-2xl glass-panel border border-elsol-sage/30 flex flex-col md:flex-row items-center justify-between gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full bg-elsol-sage/10 text-elsol-sage">
                <Award className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">IATA Certified Travel Agency</h3>
                <p className="text-gray-300 text-sm max-w-xl">
                  As an officially accredited IATA agency, ELSOL Travel provides direct airline ticketing, validated safety protocols, and worldwide partner airfare access.
                </p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <span className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-elsol-sage text-black">
                Accredited Since 2017
              </span>
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-elsol-sage mb-2">Meet Our Team</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">Experienced aviation and hospitality professionals dedicated to your journeys.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={member.name}
                  className="glass-panel p-6 rounded-xl hover-lift hover-glow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <div className="mb-4">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-28 h-28 rounded-full mx-auto object-cover border-2 border-elsol-sage shadow-lg hover:border-4 transition-all duration-300"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-elsol-sage mb-3 text-sm font-medium">{member.role}</p>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{member.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Cards */}
          <motion.div 
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-elsol-sage mb-8">Get in Touch</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="glass-panel p-6 rounded-xl hover-glow">
                <div className="mb-4">
                  <Phone className="w-8 h-8 text-elsol-sage mx-auto" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Call Us</h3>
                <p className="text-gray-300 text-sm mb-1">
                  <a href="tel:+251116673456" className="hover:text-elsol-sage transition-colors">+251 11 667 3456</a>
                </p>
                <p className="text-gray-300 text-sm">
                  <a href="tel:+251911234567" className="hover:text-elsol-sage transition-colors">+251 91 123 4567</a>
                </p>
              </div>

              <div className="glass-panel p-6 rounded-xl hover-glow">
                <div className="mb-4">
                  <Mail className="w-8 h-8 text-elsol-sage mx-auto" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Email Us</h3>
                <p className="text-gray-300 text-sm mb-1">
                  <a href="mailto:info@elsoltravel.com" className="hover:text-elsol-sage transition-colors">info@elsoltravel.com</a>
                </p>
                <p className="text-gray-300 text-sm">
                  <a href="mailto:bookings@elsoltravel.com" className="hover:text-elsol-sage transition-colors">bookings@elsoltravel.com</a>
                </p>
              </div>

              <div className="glass-panel p-6 rounded-xl sm:col-span-2 lg:col-span-1 hover-glow">
                <div className="mb-4">
                  <MapPin className="w-8 h-8 text-elsol-sage mx-auto" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Our Office</h3>
                <p className="text-gray-300 text-sm">
                  Bole Medhanialem, Milkomi City Complex, 1st Floor, Office #119<br />
                  Addis Ababa, Ethiopia
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
