
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { FileText, BookOpen, Scale, AlertTriangle, RefreshCw, CreditCard, HelpCircle } from 'lucide-react';

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-glass">
      <Header />
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            className="max-w-4xl mx-auto glass-panel p-8 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center mb-8">
              <div className="bg-elsol-sage/20 p-4 rounded-full">
                <BookOpen size={40} className="text-elsol-sage" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-100">Terms and Conditions</h1>
            
            <div className="space-y-8 text-gray-300">
              <section>
                <div className="flex items-center mb-4">
                  <FileText className="text-elsol-sage mr-3" size={24} />
                  <h2 className="text-xl font-semibold text-gray-100">Introduction</h2>
                </div>
                <p>
                  These terms and conditions outline the rules and regulations for the use of ELSOL TRAVEL's website. 
                  By accessing this website, we assume you accept these terms and conditions in full. 
                  Do not continue to use ELSOL TRAVEL's website if you do not accept all of the terms and conditions stated on this page.
                </p>
              </section>
              
              <section>
                <div className="flex items-center mb-4">
                  <Scale className="text-elsol-sage mr-3" size={24} />
                  <h2 className="text-xl font-semibold text-gray-100">Booking and Payments</h2>
                </div>
                <p>
                  When making a booking with ELSOL TRAVEL, the lead passenger accepts these terms on behalf of all passengers in the booking. 
                  Payment terms are as follows:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>A non-refundable deposit of 30% is required at the time of booking.</li>
                  <li>Full payment is required 60 days prior to departure.</li>
                  <li>For bookings made within 60 days of departure, full payment is required at the time of booking.</li>
                  <li>Payment can be made by credit card, bank transfer, or other methods as agreed with ELSOL TRAVEL.</li>
                </ul>
              </section>
              
              <section>
                <div className="flex items-center mb-4">
                  <RefreshCw className="text-elsol-sage mr-3" size={24} />
                  <h2 className="text-xl font-semibold text-gray-100">Cancellation and Refunds</h2>
                </div>
                <p>
                  If you need to cancel your booking, the following cancellation fees apply:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>More than 60 days before departure: Loss of deposit</li>
                  <li>59-30 days before departure: 50% of total booking cost</li>
                  <li>29-15 days before departure: 75% of total booking cost</li>
                  <li>14 days or less before departure: 100% of total booking cost</li>
                </ul>
                <p className="mt-2">
                  We strongly recommend that all travelers purchase travel insurance to protect against unforeseen circumstances.
                </p>
              </section>
              
              <section>
                <div className="flex items-center mb-4">
                  <AlertTriangle className="text-elsol-sage mr-3" size={24} />
                  <h2 className="text-xl font-semibold text-gray-100">Travel Documents and Requirements</h2>
                </div>
                <p>
                  It is the traveler's responsibility to ensure they have the correct travel documents required for their journey, including:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>A valid passport with at least 6 months validity from the return date</li>
                  <li>Necessary visas for all countries on the itinerary</li>
                  <li>Health certificates or vaccinations as required by destination countries</li>
                  <li>Travel insurance documentation</li>
                </ul>
                <p className="mt-2">
                  ELSOL TRAVEL cannot be held responsible for any denied boarding or entry to a country due to insufficient documentation.
                </p>
              </section>
              
              <section>
                <div className="flex items-center mb-4">
                  <CreditCard className="text-elsol-sage mr-3" size={24} />
                  <h2 className="text-xl font-semibold text-gray-100">Pricing and Payment Security</h2>
                </div>
                <p>
                  All prices are subject to availability and can be withdrawn or varied without notice. 
                  We take all reasonable steps to ensure that your payment information is secure. 
                  However, we cannot be held responsible for any breach that occurs beyond our reasonable control.
                </p>
              </section>
              
              <section>
                <div className="flex items-center mb-4">
                  <HelpCircle className="text-elsol-sage mr-3" size={24} />
                  <h2 className="text-xl font-semibold text-gray-100">Contact Information</h2>
                </div>
                <p>
                  If you have any questions about these terms and conditions, please contact us:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>By email: info@elsoltravel.com</li>
                  <li>By visiting our office: Bole Medhanialem, Addis Ababa, Ethiopia</li>
                  <li>By phone: +251 11 667 3456 / +251 91 123 4567</li>
                </ul>
              </section>
            </div>
            
            <div className="mt-10 pt-6 border-t border-gray-700 text-center">
              <p className="text-gray-400">Last updated: June 2023</p>
              <p className="text-gray-400 mt-2">
                By using our services, you acknowledge that you have read and understood these terms and conditions and agree to be bound by them.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
