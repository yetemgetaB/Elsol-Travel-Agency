import React from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, Award, Clock } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: "10K+",
    label: "Happy Customers",
    description: "Satisfied travelers who've explored Ethiopia with us"
  },
  {
    icon: Globe,
    value: "50+",
    label: "Destinations",
    description: "Unique locations across Ethiopia's diverse regions"
  },
  {
    icon: Award,
    value: "5+",
    label: "Years Experience",
    description: "Providing exceptional travel experiences"
    },
    { 
      icon: Clock, 
    value: "24/7",
    label: "Support",
    description: "Round-the-clock assistance for our clients"
  }
];

const About = () => {
  return (
    <section id="about" className="elsol-section section-bg-dark">
      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-heading mb-6">
              Your Gateway to Ethiopian Adventures
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Welcome to ELSOL Travel Agency, your premier partner for seamless international travel and authentic Ethiopian journeys. 
                Since our establishment, we've been dedicated to showcasing the rich cultural heritage, 
                breathtaking landscapes, and warm hospitality of Ethiopia to travelers from around the world.
              </p>
              <p>
                Our team of experienced local guides and travel experts work tirelessly to create 
                unforgettable journeys that combine comfort, adventure, and cultural immersion. 
                Whether you're interested in exploring ancient churches, trekking through stunning 
                mountain ranges, or experiencing traditional Ethiopian coffee ceremonies, we've got 
                you covered.
              </p>
              <p>
                We pride ourselves on sustainable tourism practices and supporting local communities 
                while ensuring our clients receive the highest quality service and attention to detail.
              </p>
          </div>

            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <a href="#contact" className="elsol-button-outline inline-flex items-center">
                Start Your Journey
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column - Stats Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 }
                    }
                  }}
                  className="glass-panel p-6 rounded-xl hover-lift hover-glow group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-lg bg-elsol-sage/10 text-elsol-sage">
                      <Icon size={24} />
                  </div>
                  <div>
                      <div className="text-2xl font-bold text-white group-hover:text-elsol-sage transition-colors duration-300">
                        {stat.value}
                      </div>
                      <div className="text-sm font-medium text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {stat.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
