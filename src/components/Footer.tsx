import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-bg border-t border-elsol-sage/10">
      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="hover-glow p-4 rounded-xl transition-all duration-300">
            <h3 className="text-lg font-semibold mb-4 text-white">ELSOL Travel Agency</h3>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              Your trusted IATA accredited travel partner in Addis Ababa, providing exceptional international ticketing and authentic Ethiopian journeys since 2017.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://t.me/elsoltravel" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Telegram Channel" 
                className="p-2 rounded-lg bg-black/40 text-gray-400 hover:text-elsol-sage hover:bg-black/60 transition-all duration-300 hover:scale-110"
              >
                <Send size={18} />
              </a>
              <a 
                href="https://facebook.com/elsoltravel" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook Page" 
                className="p-2 rounded-lg bg-black/40 text-gray-400 hover:text-elsol-sage hover:bg-black/60 transition-all duration-300 hover:scale-110"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://instagram.com/elsoltravel" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram Profile" 
                className="p-2 rounded-lg bg-black/40 text-gray-400 hover:text-elsol-sage hover:bg-black/60 transition-all duration-300 hover:scale-110"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://linkedin.com/company/elsoltravel" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn" 
                className="p-2 rounded-lg bg-black/40 text-gray-400 hover:text-elsol-sage hover:bg-black/60 transition-all duration-300 hover:scale-110"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="hover-glow p-4 rounded-xl transition-all duration-300">
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-elsol-sage transition-colors hover:translate-x-1 transform inline-block">Home</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-elsol-sage transition-colors hover:translate-x-1 transform inline-block">Services</Link>
              </li>
              <li>
                <Link to="/destinations" className="text-gray-400 hover:text-elsol-sage transition-colors hover:translate-x-1 transform inline-block">Destinations</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-elsol-sage transition-colors hover:translate-x-1 transform inline-block">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-elsol-sage transition-colors hover:translate-x-1 transform inline-block">Contact</Link>
              </li>
              <li>
                <Link to="/blogs" className="text-gray-400 hover:text-elsol-sage transition-colors hover:translate-x-1 transform inline-block">Special Offers & Blogs</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="hover-glow p-4 rounded-xl transition-all duration-300">
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start group">
                <MapPin size={18} className="text-elsol-sage mt-1 mr-2.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-gray-400 group-hover:text-white transition-colors duration-300">
                  Bole Medhanialem, Milkomi City Complex, 1st Floor, Office #119<br />
                  Addis Ababa, Ethiopia
                </span>
              </li>
              <li className="flex items-center group">
                <Phone size={18} className="text-elsol-sage mr-2.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <div className="flex flex-col">
                  <a href="tel:+251116673456" className="text-gray-400 group-hover:text-white transition-colors duration-300">+251 11 667 3456</a>
                  <a href="tel:+251911234567" className="text-gray-400 group-hover:text-white transition-colors duration-300">+251 91 123 4567</a>
                </div>
              </li>
              <li className="flex items-center group">
                <Mail size={18} className="text-elsol-sage mr-2.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <a href="mailto:info@elsoltravel.com" className="text-gray-400 group-hover:text-white transition-colors duration-300">info@elsoltravel.com</a>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div className="hover-glow p-4 rounded-xl transition-all duration-300">
            <h3 className="text-lg font-semibold mb-4 text-white">Office Hours</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400 hover:text-white transition-colors duration-300">Monday - Friday: 8:30 AM - 6:00 PM</li>
              <li className="text-gray-400 hover:text-white transition-colors duration-300">Saturday: 9:00 AM - 1:00 PM</li>
              <li className="text-gray-400 hover:text-white transition-colors duration-300">Sunday: Closed (Emergency Support 24/7)</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-gray-800">
          <p className="text-center text-gray-400 hover:text-white transition-colors duration-300 text-sm py-1">
            {new Date().getFullYear()} ELSOL Travel Agency. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
