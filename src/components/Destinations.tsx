import React from 'react';
import { motion } from 'framer-motion';
import { Navigation, Calendar, DollarSign } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDestinationContext } from '@/context/DestinationContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const Destinations = () => {
  const { destinations } = useDestinationContext();
  const navigate = useNavigate();

  // Show active featured destinations on homepage, limit to 8
  const displayedDestinations = destinations
    .filter(d => d.isActive !== false)
    .slice(0, 8);

  return (
    <section id="destinations" className="elsol-section section-bg-darker">
      <div className="relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="section-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Popular Destinations
          </motion.h2>
          <motion.p 
            className="section-subheading mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover Ethiopia's and worldwide most breathtaking locations 
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {displayedDestinations.map((destination) => (
            <motion.div
              key={destination.id}
              variants={itemVariants}
              onClick={() => navigate('/destinations')}
              className="glass-panel rounded-xl overflow-hidden group hover-lift hover-glow cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={destination.imageUrl || destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                {destination.category && (
                  <span className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-black/60 text-elsol-sage border border-elsol-sage/30 backdrop-blur-sm">
                    {destination.category}
                  </span>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-100 group-hover:text-elsol-sage transition-colors duration-300">
                  {destination.name}
                </h3>
                <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors duration-300 line-clamp-2">
                  {destination.description}
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-400">
                    <Calendar size={16} className="mr-1 text-elsol-sage" />
                    <span>{destination.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <DollarSign size={16} className="mr-1 text-elsol-sage" />
                    <span className="font-medium text-elsol-sage">{destination.price}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link to="/destinations" className="elsol-button-outline inline-flex items-center hover:scale-105 transition-transform">
            <Navigation size={16} className="mr-2" />
            Explore All Destinations
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Destinations;
