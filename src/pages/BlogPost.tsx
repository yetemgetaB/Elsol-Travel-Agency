import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Facebook, Twitter, Linkedin, Send, Plane, CheckCircle, ArrowRight } from 'lucide-react';
import { useBlogContext } from '../context/BlogContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getBlogPost } = useBlogContext();
  const navigate = useNavigate();
  const post = getBlogPost(slug || '');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-glass flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <motion.div 
            className="text-center p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-200">Article or Offer Not Found</h2>
            <Link to="/blogs" className="elsol-button inline-flex items-center transition-all duration-300 hover:shadow-glow">
              <ArrowLeft size={16} className="mr-2" />
              Back to All Articles
            </Link>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const shareLinkedin = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const shareTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(post.title)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-glass text-gray-200 flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32">
        {/* Back button */}
        <motion.div 
          className="container mx-auto px-4 py-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/blogs" className="inline-flex items-center text-elsol-sage hover:underline transition-all duration-300 hover:text-white">
            <ArrowLeft size={16} className="mr-2" />
            Back to All Insights & Deals
          </Link>
        </motion.div>
        
        {/* Hero Cover Image */}
        <motion.div 
          className="w-full aspect-video max-h-[500px] overflow-hidden relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        </motion.div>
        
        {/* Content */}
        <div className="elsol-section">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-4xl mx-auto glass-panel p-8 md:p-12 rounded-2xl border border-elsol-sage/20 shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {/* Meta data */}
              <div className="flex flex-wrap items-center mb-6 text-gray-400 text-sm">
                <div className="flex items-center mr-6 mb-2">
                  <Calendar size={16} className="mr-2 text-elsol-sage" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center mr-6 mb-2">
                  <Clock size={16} className="mr-2 text-elsol-sage" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center mb-2">
                  <User size={16} className="mr-2 text-elsol-sage" />
                  <span>{post.author}</span>
                </div>
              </div>
              
              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-gray-100 leading-tight">
                {post.title}
              </h1>

              {/* Special Flight Offer Card if present */}
              {post.travelDetails && (
                <div className="mb-10 p-6 md:p-8 rounded-xl bg-elsol-sage/10 border border-elsol-sage/40 backdrop-blur-md">
                  <div className="flex items-center gap-3 mb-4">
                    <Plane className="w-6 h-6 text-elsol-sage" />
                    <h2 className="text-2xl font-bold text-white">
                      {post.travelDetails.airline} Special Package
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6 text-gray-300">
                    <div className="p-3 rounded-lg bg-black/40">
                      <span className="text-gray-400 block text-xs">Departure:</span>
                      <span className="font-semibold text-white">{post.travelDetails.departureDate} | {post.travelDetails.departureTime}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-black/40">
                      <span className="text-gray-400 block text-xs">Return:</span>
                      <span className="font-semibold text-white">{post.travelDetails.returnDate} | {post.travelDetails.returnTime}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-black/40">
                      <span className="text-gray-400 block text-xs">Baggage Allowance:</span>
                      <span className="font-semibold text-white">{post.travelDetails.baggage}</span>
                    </div>
                    {post.travelDetails.price && (
                      <div className="p-3 rounded-lg bg-black/40">
                        <span className="text-gray-400 block text-xs">Price:</span>
                        <span className="font-bold text-elsol-sage text-base">{post.travelDetails.price}</span>
                      </div>
                    )}
                  </div>

                  {post.travelDetails.additionalInfo && (
                    <p className="text-xs text-gray-300 mb-6 italic">
                      ℹ️ {post.travelDetails.additionalInfo}
                    </p>
                  )}

                  <Button
                    onClick={() => navigate(`/contact?destination=${encodeURIComponent(post.title)}`)}
                    className="w-full sm:w-auto bg-elsol-sage hover:bg-elsol-sage-light text-black font-semibold px-8 py-3"
                  >
                    Inquire About This Offer
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
              
              {/* Article Content */}
              <div 
                className="prose prose-lg max-w-none prose-headings:text-gray-100 prose-p:text-gray-300 prose-strong:text-gray-200 prose-a:text-elsol-sage mb-12 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }} 
              />
              
              {/* Functional Share buttons */}
              <div className="border-t border-gray-800 pt-6 mt-12 flex flex-wrap items-center justify-between gap-4">
                <p className="text-gray-400 text-sm">Share this article:</p>
                <div className="flex space-x-3">
                  <button 
                    onClick={shareFacebook}
                    className="p-2.5 rounded-full bg-black/60 hover:bg-elsol-sage hover:text-black transition-all duration-300 hover:scale-110 border border-gray-800"
                    title="Share on Facebook"
                  >
                    <Facebook size={18} />
                  </button>
                  <button 
                    onClick={shareTwitter}
                    className="p-2.5 rounded-full bg-black/60 hover:bg-elsol-sage hover:text-black transition-all duration-300 hover:scale-110 border border-gray-800"
                    title="Share on X"
                  >
                    <Twitter size={18} />
                  </button>
                  <button 
                    onClick={shareLinkedin}
                    className="p-2.5 rounded-full bg-black/60 hover:bg-elsol-sage hover:text-black transition-all duration-300 hover:scale-110 border border-gray-800"
                    title="Share on LinkedIn"
                  >
                    <Linkedin size={18} />
                  </button>
                  <button 
                    onClick={shareTelegram}
                    className="p-2.5 rounded-full bg-black/60 hover:bg-elsol-sage hover:text-black transition-all duration-300 hover:scale-110 border border-gray-800"
                    title="Share on Telegram"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
