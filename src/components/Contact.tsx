import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { inquiryService } from '@/services/inquiryService';
import { EmailService } from '@/services/EmailService';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error('Please fill in your name, email, and message.');
      }

      // 1. Save directly into Firestore/local database inquiries collection
      await inquiryService.submit({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        subject: 'Website Homepage Inquiry',
        message: formData.message,
        serviceType: 'General Inquiry'
      });

      // 2. Dispatch email notification via EmailJS
      try {
        await EmailService.sendEmail({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: 'Website Homepage Inquiry',
          message: formData.message
        });
      } catch (emailErr) {
        console.warn('EmailJS notification notice:', emailErr);
      }

      toast({
        title: "Inquiry Sent Successfully!",
        description: "Thank you for reaching out to ELSOL Travel. Our team will contact you shortly.",
      });

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      toast({
        title: "Submission Error",
        description: err.message || "Could not send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="elsol-section">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-heading">Contact Us</h2>
          <p className="section-subheading mx-auto">
            We're here to help plan your perfect journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Map and contact info */}
          <div>
            <div className="rounded-xl overflow-hidden shadow-lg h-80 mb-8 border border-elsol-sage/20">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4325.58014961361!2d38.7871945!3d8.995866099999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85c436b9f6c9%3A0x848a3cd3d1d0cd95!2sELSOL%20Travel%20Agent!5e1!3m2!1sen!2set!4v1741520410707!5m2!1sen!2set" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                title="ELSOL Travel Office Location"
              ></iframe>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-panel rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl hover-glow">
                <div className="flex items-start">
                  <div className="mr-4 text-elsol-sage">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-gray-100">Our Location</h3>
                    <p className="text-gray-300 text-sm">
                      Bole Medhanialem, Milkomi City Complex, 1st Floor, Office #119, Addis Ababa, Ethiopia
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-panel rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl hover-glow">
                <div className="flex items-start">
                  <div className="mr-4 text-elsol-sage">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-gray-100">Call Us</h3>
                    <p className="text-gray-300 text-sm">
                      <a href="tel:+251116673456" className="hover:text-elsol-sage transition-colors">+251 11 667 3456</a>
                    </p>
                    <p className="text-gray-300 text-sm">
                      <a href="tel:+251911234567" className="hover:text-elsol-sage transition-colors">+251 91 123 4567</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-panel rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl hover-glow">
                <div className="flex items-start">
                  <div className="mr-4 text-elsol-sage">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-gray-100">Email Us</h3>
                    <p className="text-gray-300 text-sm">
                      <a href="mailto:info@elsoltravel.com" className="hover:text-elsol-sage transition-colors">info@elsoltravel.com</a>
                    </p>
                    <p className="text-gray-300 text-sm">
                      <a href="mailto:bookings@elsoltravel.com" className="hover:text-elsol-sage transition-colors">bookings@elsoltravel.com</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-panel rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl hover-glow">
                <div className="flex items-start">
                  <div className="mr-4 text-elsol-sage">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-gray-100">Working Hours</h3>
                    <p className="text-gray-300 text-sm">Mon - Fri: 8:30AM - 6:00PM</p>
                    <p className="text-gray-300 text-sm">Sat: 9:00AM - 1:00PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Contact form */}
          <div className="glass-panel rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-100">Send Us a Message</h3>
            
            {submitted && (
              <div className="mb-6 p-4 rounded-lg bg-elsol-sage/20 border border-elsol-sage/40 flex items-center text-elsol-sage">
                <CheckCircle2 className="w-5 h-5 mr-2 flex-shrink-0" />
                <span className="text-sm">Inquiry received! Our team will contact you shortly.</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full bg-black/50 border-gray-700"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    className="w-full bg-black/50 border-gray-700"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+251 9..."
                    className="w-full bg-black/50 border-gray-700"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message / Travel Requirements
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us where you want to travel, dates, number of travelers, or flights required..."
                    required
                    className="w-full min-h-[120px] bg-black/50 border-gray-700"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-elsol-sage hover:bg-elsol-sage-light text-black font-semibold py-3 px-6 rounded-lg transition-colors shadow-glow"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Inquiry...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Send Inquiry <Send size={16} className="ml-2" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
