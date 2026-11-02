import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Share, ArrowLeft, Mail, Phone, Calendar, CheckCircle2, Clock, Inbox, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBlogContext } from '@/context/BlogContext';
import { useDestinationContext } from '@/context/DestinationContext';
import { inquiryService } from '@/services/inquiryService';
import { Inquiry, InquiryStatus } from '@/types/database';
import { toast } from '@/components/ui/use-toast';
import BlogEditor from '@/components/BlogEditor';
import DestinationEditor from '@/components/DestinationEditor';
import { TelegramBot } from '@/services/TelegramBot';

const telegramBot = new TelegramBot();

const Dashboard = () => {
  const navigate = useNavigate();
  const { blogPosts, deleteBlogPost } = useBlogContext();
  const { destinations, deleteDestination } = useDestinationContext();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [showDestinationEditor, setShowDestinationEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [editingDestination, setEditingDestination] = useState<any>(null);
  const [isSharing, setIsSharing] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'blogs' | 'destinations' | 'inquiries'>('inquiries');

  useEffect(() => {
    const unsubscribe = inquiryService.subscribe((list) => {
      setInquiries(list);
    });
    return () => unsubscribe();
  }, []);

  const handleShare = async (post: any) => {
    setIsSharing(post.id);
    try {
      await telegramBot.shareNewBlogPost({
        title: post.title,
        excerpt: post.excerpt,
        imageUrl: post.imageUrl,
        slug: post.slug,
        author: post.author,
      });
      
      toast({
        title: "Shared Successfully",
        description: "Blog post has been shared to Telegram channel",
      });
    } catch (error) {
      console.error('Error sharing to Telegram:', error);
      toast({
        title: "Sharing Failed",
        description: "Failed to share post to Telegram channel. Please check configuration.",
        variant: "destructive"
      });
    } finally {
      setIsSharing(null);
    }
  };

  const handleDelete = (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deleteBlogPost(postId);
      toast({
        title: "Post Deleted",
        description: "The blog post has been deleted successfully",
      });
    }
  };

  const handleDeleteDestination = (destId: string) => {
    if (window.confirm('Are you sure you want to delete this destination?')) {
      deleteDestination(destId);
      toast({
        title: "Destination Deleted",
        description: "The destination has been deleted successfully",
      });
    }
  };

  const handleInquiryStatus = async (id: string, status: InquiryStatus) => {
    await inquiryService.updateStatus(id, status);
    toast({
      title: "Status Updated",
      description: `Inquiry status changed to ${status}`,
    });
  };

  const handleDeleteInquiry = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      await inquiryService.delete(id);
      toast({
        title: "Inquiry Deleted",
        description: "Inquiry removed from records.",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              size="icon"
              className="border-elsol-sage text-elsol-sage hover:bg-elsol-sage hover:text-black"
              title="Back to Website"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold text-elsol-sage">Admin Dashboard</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={() => setActiveTab('inquiries')}
              variant={activeTab === 'inquiries' ? 'default' : 'outline'}
              className={activeTab === 'inquiries' ? 'bg-elsol-sage text-black font-semibold' : ''}
            >
              <Inbox className="h-4 w-4 mr-1.5" />
              Inquiries ({inquiries.filter(i => i.status === 'new').length})
            </Button>
            <Button
              onClick={() => setActiveTab('destinations')}
              variant={activeTab === 'destinations' ? 'default' : 'outline'}
              className={activeTab === 'destinations' ? 'bg-elsol-sage text-black font-semibold' : ''}
            >
              Destinations ({destinations.length})
            </Button>
            <Button
              onClick={() => setActiveTab('blogs')}
              variant={activeTab === 'blogs' ? 'default' : 'outline'}
              className={activeTab === 'blogs' ? 'bg-elsol-sage text-black font-semibold' : ''}
            >
              Blogs & Deals ({blogPosts.length})
            </Button>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </Button>
          </div>
        </div>

        {/* Tab 1: Inquiries / Customer Leads */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-white">Customer Leads & Booking Requests</h2>
                <p className="text-sm text-gray-400">All messages submitted through website forms are captured here in real-time.</p>
              </div>
            </div>

            <div className="grid gap-4">
              {inquiries.map((inquiry) => (
                <div key={inquiry.id} className="glass-panel rounded-xl p-6 hover-glow border border-elsol-sage/10">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-gray-100">{inquiry.name}</h3>
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                          inquiry.status === 'new' ? 'bg-elsol-sage text-black' :
                          inquiry.status === 'contacted' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                          inquiry.status === 'booked' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                          'bg-gray-800 text-gray-400'
                        }`}>
                          {inquiry.status.toUpperCase()}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-black/60 text-gray-400">
                          {inquiry.serviceType}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-elsol-sage mt-1">{inquiry.subject}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={inquiry.status}
                        onChange={(e) => handleInquiryStatus(inquiry.id, e.target.value as InquiryStatus)}
                        className="bg-black/60 border border-gray-700 text-xs text-gray-300 rounded px-2.5 py-1.5 focus:outline-none focus:border-elsol-sage"
                      >
                        <option value="new">Mark: New</option>
                        <option value="in_review">Mark: In Review</option>
                        <option value="contacted">Mark: Contacted</option>
                        <option value="booked">Mark: Booked</option>
                        <option value="archived">Mark: Archived</option>
                      </select>
                      <Button
                        onClick={() => handleDeleteInquiry(inquiry.id)}
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 hover:bg-red-500/20 hover:text-red-500 border-gray-700"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-300 bg-black/30 p-4 rounded-lg mb-4 whitespace-pre-wrap">
                    {inquiry.message}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 text-xs text-gray-400 border-t border-gray-800/80 pt-3">
                    <a href={`mailto:${inquiry.email}`} className="flex items-center text-gray-300 hover:text-elsol-sage transition-colors">
                      <Mail className="h-3.5 w-3.5 mr-1 text-elsol-sage" />
                      {inquiry.email}
                    </a>
                    {inquiry.phone && (
                      <a href={`tel:${inquiry.phone}`} className="flex items-center text-gray-300 hover:text-elsol-sage transition-colors">
                        <Phone className="h-3.5 w-3.5 mr-1 text-elsol-sage" />
                        {inquiry.phone}
                      </a>
                    )}
                    <span className="flex items-center ml-auto text-gray-500">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      {new Date(inquiry.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}

              {inquiries.length === 0 && (
                <div className="text-center py-16 glass-panel rounded-xl">
                  <Inbox className="h-12 w-12 mx-auto text-gray-600 mb-3" />
                  <p className="text-gray-400 text-base">No customer inquiries submitted yet.</p>
                  <p className="text-gray-500 text-xs mt-1">When users fill in the homepage or contact page forms, they will show up here.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Destinations */}
        {activeTab === 'destinations' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">Destinations & Tour Packages</h2>
                <p className="text-sm text-gray-400">Manage domestic and international packages displayed across the site.</p>
              </div>
              <Button
                onClick={() => {
                  setEditingDestination(null);
                  setShowDestinationEditor(true);
                }}
                className="bg-elsol-sage hover:bg-elsol-sage-light text-black font-semibold"
              >
                <Plus className="h-4 w-4 mr-2" /> New Destination
              </Button>
            </div>

            {showDestinationEditor ? (
              <DestinationEditor
                destination={editingDestination}
                isEditing={!!editingDestination}
                onCancel={() => {
                  setShowDestinationEditor(false);
                  setEditingDestination(null);
                }}
              />
            ) : (
              <div className="grid gap-4">
                {destinations.map((destination) => (
                  <div
                    key={destination.id}
                    className="glass-panel rounded-xl p-5 hover-lift border border-elsol-sage/10 flex flex-wrap items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-[280px]">
                      <img
                        src={destination.imageUrl || destination.image}
                        alt={destination.name}
                        className="w-20 h-20 rounded-lg object-cover border border-gray-700"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-gray-100">{destination.name}</h3>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-elsol-sage/20 text-elsol-sage border border-elsol-sage/30">
                            {destination.category || 'Domestic'}
                          </span>
                        </div>
                        <p className="text-gray-400 text-xs line-clamp-2 max-w-xl">{destination.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-300 mt-2">
                          <span className="text-elsol-sage font-medium">{destination.price}</span>
                          <span>{destination.duration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => {
                          setEditingDestination(destination);
                          setShowDestinationEditor(true);
                        }}
                        variant="outline"
                        size="icon"
                        className="hover:bg-elsol-sage/20 border-gray-700"
                        title="Edit Destination"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteDestination(destination.id)}
                        variant="outline"
                        size="icon"
                        className="hover:bg-red-500/20 hover:text-red-500 border-gray-700"
                        title="Delete Destination"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {destinations.length === 0 && (
                  <div className="text-center py-12 glass-panel rounded-xl">
                    <p className="text-gray-400 text-lg">No destinations yet. Click "New Destination" to create one.</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Tab 3: Blogs & Deals */}
        {activeTab === 'blogs' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">Articles & Special Flight Deals</h2>
                <p className="text-sm text-gray-400">Publish travel insights and promotional airline packages.</p>
              </div>
              <Button
                onClick={() => {
                  setEditingPost(null);
                  setShowEditor(true);
                }}
                className="bg-elsol-sage hover:bg-elsol-sage-light text-black font-semibold"
              >
                <Plus className="h-4 w-4 mr-2" /> New Post
              </Button>
            </div>

            {showEditor ? (
              <BlogEditor
                post={editingPost}
                isEditing={!!editingPost}
                onCancel={() => {
                  setShowEditor(false);
                  setEditingPost(null);
                }}
              />
            ) : (
              <div className="grid gap-4">
                {blogPosts.map((post) => (
                  <div
                    key={post.id}
                    className="glass-panel rounded-xl p-5 hover-lift border border-elsol-sage/10 flex flex-wrap items-center justify-between gap-4"
                  >
                    <div className="flex-1 min-w-[280px]">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-gray-100">{post.title}</h3>
                        {post.travelDetails && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            Flight Deal
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-xs line-clamp-2 max-w-xl">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                        <span>By {post.author}</span>
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleShare(post)}
                        variant="outline"
                        size="icon"
                        className="hover:bg-elsol-sage/20 border-gray-700"
                        disabled={isSharing === post.id}
                        title="Share to Telegram Channel"
                      >
                        <Share className={`h-4 w-4 ${isSharing === post.id ? 'animate-spin' : ''}`} />
                      </Button>
                      <Button
                        onClick={() => {
                          setEditingPost(post);
                          setShowEditor(true);
                        }}
                        variant="outline"
                        size="icon"
                        className="hover:bg-elsol-sage/20 border-gray-700"
                        title="Edit Post"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(post.id)}
                        variant="outline"
                        size="icon"
                        className="hover:bg-red-500/20 hover:text-red-500 border-gray-700"
                        title="Delete Post"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {blogPosts.length === 0 && (
                  <div className="text-center py-12 glass-panel rounded-xl">
                    <p className="text-gray-400 text-lg">No blog posts yet. Create your first post!</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
