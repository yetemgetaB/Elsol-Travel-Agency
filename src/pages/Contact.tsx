import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { EmailService } from '@/services/EmailService';
import { inquiryService } from '@/services/inquiryService';
import { toast } from '@/components/ui/use-toast';

const Contact = () => {
  const [searchParams] = useSearchParams();
  const destinationParam = searchParams.get('destination');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: destinationParam ? `Booking Inquiry: ${destinationParam}` : '',
    message: destinationParam ? `Hello ELSOL Travel, I am interested in booking a trip to ${destinationParam}. Please share itinerary details and rates.` : '',
  });

  useEffect(() => {
    if (destinationParam) {
      setFormData(prev => ({
        ...prev,
        subject: `Booking Inquiry: ${destinationParam}`,
        message: `Hello ELSOL Travel, I am interested in booking a trip to ${destinationParam}. Please share itinerary details and rates.`
      }));
    }
  }, [destinationParam]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        throw new Error('Please fill in all required fields');
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }
      
      // 1. Save lead into Firestore inquiries collection
      await inquiryService.submit({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        subject: formData.subject,
        message: formData.message,
        serviceType: destinationParam ? 'Tour Booking' : 'General Inquiry',
        destinationName: destinationParam || undefined
      });

      // 2. Dispatch EmailJS notification
      try {
        await EmailService.sendEmail(formData);
      } catch (emailErr) {
        console.warn('EmailJS delivery notice:', emailErr);
      }
      
      toast({
        title: "Message Sent Successfully",
        description: "Thank you for contacting ELSOL Travel. We'll get back to you soon!",
      });

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to send message. Please try again later or contact us directly.";
        
      toast({
        title: "Error Sending Message",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout showScrollButtons={false}>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-elsol-sage">Contact Us</h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Get in touch with our team of travel experts. We're here to help you plan your perfect journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="hover-glow p-6 rounded-xl backdrop-blur-sm bg-black/30 border border-elsol-sage/10">
                <h2 className="text-2xl font-semibold mb-6 text-elsol-sage">Visit Our Office</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start group">
                    <MapPin className="w-6 h-6 text-elsol-sage mt-1 mr-3 group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <h3 className="font-medium text-gray-100">Address</h3>
                      <p className="text-gray-400">
                        Bole Medhanialem, Milkomi City Complex, 1st Floor, Office #119<br />
                        Addis Ababa, Ethiopia
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <Phone className="w-6 h-6 text-elsol-sage mt-1 mr-3 group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <h3 className="font-medium text-gray-100">Phone</h3>
                      <p className="text-gray-400">+251 911 234 567</p>
                      <p className="text-gray-400">+251 911 234 568</p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <Mail className="w-6 h-6 text-elsol-sage mt-1 mr-3 group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <h3 className="font-medium text-gray-100">Email</h3>
                      <p className="text-gray-400">info@elsol.travel</p>
                      <p className="text-gray-400">bookings@elsol.travel</p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <Clock className="w-6 h-6 text-elsol-sage mt-1 mr-3 group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <h3 className="font-medium text-gray-100">Business Hours</h3>
                      <p className="text-gray-400">Monday - Friday: 8:30 AM - 6:00 PM</p>
                      <p className="text-gray-400">Saturday: 9:00 AM - 1:00 PM</p>
                      <p className="text-gray-400">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="hover-glow rounded-xl overflow-hidden backdrop-blur-sm bg-black/30 border border-elsol-sage/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4325.58014961361!2d38.7871945!3d8.995866099999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85c436b9f6c9%3A0x848a3cd3d1d0cd95!2sELSOL%20Travel%20Agent!5e1!3m2!1sen!2set!4v1741520410707!5m2!1sen!2set"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                />
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <form onSubmit={handleSubmit} className="hover-glow p-6 rounded-xl backdrop-blur-sm bg-black/30 border border-elsol-sage/10">
                <h2 className="text-2xl font-semibold mb-6 text-elsol-sage">Send Us a Message</h2>
                
                {submitted && (
                  <div className="mb-6 p-4 rounded-lg bg-elsol-sage/20 border border-elsol-sage/40 flex items-center text-elsol-sage">
                    <CheckCircle2 className="w-5 h-5 mr-2 flex-shrink-0" />
                    <span className="text-sm">Inquiry received! Our travel desk will contact you shortly.</span>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg bg-black/50 border border-elsol-sage/20 text-white placeholder-gray-500 focus:outline-none focus:border-elsol-sage transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg bg-black/50 border border-elsol-sage/20 text-white placeholder-gray-500 focus:outline-none focus:border-elsol-sage transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg bg-black/50 border border-elsol-sage/20 text-white placeholder-gray-500 focus:outline-none focus:border-elsol-sage transition-colors"
                      placeholder="+251 9..."
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg bg-black/50 border border-elsol-sage/20 text-white placeholder-gray-500 focus:outline-none focus:border-elsol-sage transition-colors"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      required
                      className="w-full px-4 py-2 rounded-lg bg-black/50 border border-elsol-sage/20 text-white placeholder-gray-500 focus:outline-none focus:border-elsol-sage transition-colors resize-none"
                      placeholder="Tell us about your travel dates, flight destinations, or group size..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full elsol-button flex items-center justify-center group hover:scale-105 transition-transform duration-300 ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending Inquiry...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
