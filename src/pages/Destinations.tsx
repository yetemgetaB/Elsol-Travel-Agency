import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import { useDestinationContext } from '@/context/DestinationContext';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight, Calendar, DollarSign, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Destinations = () => {
  const { destinations } = useDestinationContext();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Domestic', 'Historical', 'Adventure', 'International'];

  const filteredDestinations = destinations.filter(dest => {
    if (dest.isActive === false) return false;
    if (selectedCategory === 'All') return true;
    return dest.category === selectedCategory;
  });

  return (
    <Layout>
      <div className="page-header">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center section-header mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-elsol-sage">
              Discover Amazing Destinations
            </h1>
            <div className="h-1.5 w-24 bg-elsol-sage/30 mx-auto mt-4 mb-6 rounded-full"></div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mobile-text">
              Explore our handpicked collection of breathtaking destinations across Ethiopia and worldwide. Each itinerary offers unique experiences and unforgettable memories.
            </p>
          </motion.div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-elsol-sage text-black shadow-glow'
                    : 'bg-black/40 text-gray-300 border border-gray-800 hover:border-elsol-sage/50 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map((destination, index) => (
                <motion.div
                  key={destination.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  layout
                  className="glass-panel rounded-xl overflow-hidden hover-lift flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-56">
                      <img
                        src={destination.imageUrl || destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {destination.category && (
                        <span className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full bg-black/70 text-elsol-sage border border-elsol-sage/30 backdrop-blur-sm">
                          {destination.category}
                        </span>
                      )}

                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {destination.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-300">
                          {destination.duration && (
                            <span className="flex items-center text-xs">
                              <Calendar className="w-3.5 h-3.5 mr-1 text-elsol-sage" />
                              {destination.duration}
                            </span>
                          )}
                          {destination.price && (
                            <span className="flex items-center text-xs font-semibold text-elsol-sage">
                              <DollarSign className="w-3.5 h-3.5 mr-0.5" />
                              {destination.price}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-gray-300 mb-4 line-clamp-3 text-sm leading-relaxed">
                        {destination.description}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        {destination.highlights && destination.highlights.slice(0, 3).map((highlight, i) => (
                          <div key={i} className="flex items-start text-xs text-gray-400">
                            <MapPin className="w-3.5 h-3.5 mr-2 text-elsol-sage mt-0.5 flex-shrink-0" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    <Button
                      onClick={() => navigate(`/contact?destination=${encodeURIComponent(destination.name)}`)}
                      className="w-full bg-elsol-sage hover:bg-elsol-sage-light text-black font-semibold group shadow-sm"
                    >
                      Inquire & Book Now
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          {filteredDestinations.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No destinations found in this category.</p>
              <Button 
                onClick={() => setSelectedCategory('All')} 
                variant="outline"
                className="mt-4 border-elsol-sage text-elsol-sage hover:bg-elsol-sage hover:text-black"
              >
                Reset Filter
              </Button>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-20 p-8 glass-panel rounded-2xl max-w-3xl mx-auto border border-elsol-sage/20"
          >
            <h2 className="text-2xl font-bold text-elsol-sage mb-3">
              Need a Custom Itinerary or Private Tour?
            </h2>
            <p className="text-gray-300 mb-6">
              Our travel specialists will craft a personalized itinerary matched to your exact schedule, budget, and travel preferences.
            </p>
            <Button
              onClick={() => navigate('/contact')}
              className="bg-elsol-sage hover:bg-elsol-sage-light text-black font-semibold group px-6 py-2.5"
            >
              Contact Our Travel Experts
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Destinations;
