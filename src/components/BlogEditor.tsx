import React, { useState, useEffect } from 'react';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { useBlogContext } from '../context/BlogContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '../hooks/use-toast';
import { X, Plus, Minus } from 'lucide-react';
import { TelegramBot } from '../services/TelegramBot';
import { storageService } from '../services/storageService';
import { Image as ImageIcon, Link, Upload } from 'lucide-react';
import { BlogPost, TravelDetails } from '../types/blog';

interface BlogEditorProps {
  post?: BlogPost;
  isEditing?: boolean;
  onCancel: () => void;
}

const telegramBot = new TelegramBot();

const BlogEditor: React.FC<BlogEditorProps> = ({ post, isEditing = false, onCancel }) => {
  const { addBlogPost, editBlogPost } = useBlogContext();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTravelPost, setIsTravelPost] = useState(false);
  const [imageInputType, setImageInputType] = useState<'url' | 'upload'>('url');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    imageUrl: '',
    slug: '',
    travelDetails: {
      title: '',
      airline: '',
      departureDate: '',
      returnDate: '',
      departureTime: '',
      returnTime: '',
      baggage: '',
      phones: [''],  
      emails: [''],
      price: '',
      additionalInfo: ''
    } as TravelDetails
  });

  useEffect(() => {
    if (isEditing && post) {
      setFormData({
        ...formData,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        imageUrl: post.imageUrl,
        slug: post.slug,
        travelDetails: post.travelDetails || {
          ...formData.travelDetails,
          phones: [''] 
        }
      });
      setImagePreview(post.imageUrl);
      setIsTravelPost(!!post.travelDetails);
    }
  }, [isEditing, post]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { 
        toast({
          title: "Error",
          description: "Image size should be less than 5MB",
          variant: "destructive"
        });
        return;
      }

      setSelectedImage(file);
      try {
        const url = await storageService.uploadImage(file, 'blogs');
        setImagePreview(url);
        setFormData(prev => ({ ...prev, imageUrl: url }));
      } catch (err: any) {
        toast({
          title: "Image Upload Error",
          description: err.message || "Failed to upload image",
          variant: "destructive"
        });
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === 'title') {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
      
      setFormData({
        ...formData,
        title: value,
        slug: !formData.slug ? generatedSlug : formData.slug
      });
    } else if (name.startsWith('travel.')) {
      const travelField = name.split('.')[1];
      setFormData({
        ...formData,
        travelDetails: {
          ...formData.travelDetails,
          [travelField]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handlePhoneChange = (index: number, value: string) => {
    const newPhones = [...(formData.travelDetails.phones || [''])];
    newPhones[index] = value;
    setFormData({
      ...formData,
      travelDetails: {
        ...formData.travelDetails,
        phones: newPhones
      }
    });
  };

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...formData.travelDetails.emails];
    newEmails[index] = value;
    setFormData({
      ...formData,
      travelDetails: {
        ...formData.travelDetails,
        emails: newEmails
      }
    });
  };

  const addPhone = () => {
    if (!formData.travelDetails.phones) {
      setFormData({
        ...formData,
        travelDetails: {
          ...formData.travelDetails,
          phones: ['']
        }
      });
    } else {
      setFormData({
        ...formData,
        travelDetails: {
          ...formData.travelDetails,
          phones: [...formData.travelDetails.phones, '']
        }
      });
    }
  };

  const removePhone = (index: number) => {
    const newPhones = formData.travelDetails.phones.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      travelDetails: {
        ...formData.travelDetails,
        phones: newPhones.length > 0 ? newPhones : [''] 
      }
    });
  };

  const handleDateChange = (field: 'departureDate' | 'returnDate', value: string) => {
    setFormData({
      ...formData,
      travelDetails: {
        ...formData.travelDetails,
        [field]: value
      }
    });
  };

  const validateForm = () => {
    if (isTravelPost) {
      const td = formData.travelDetails;
      if (!td.airline || !td.departureDate || !td.returnDate || 
          !td.departureTime || !td.returnTime || !td.baggage || !td.phones.length) {
        toast({
          title: "Missing Travel Details",
          description: "Please fill in all required travel fields",
          variant: "destructive"
        });
        return false;
      }
    } else {
      const { title, excerpt, content, author, imageUrl, slug } = formData;
      if (!title || !excerpt || !content || !author || !imageUrl || !slug) {
        toast({
          title: "Missing Fields",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.imageUrl && !selectedImage) {
      toast({
        title: "Error",
        description: "Please provide an image",
        variant: "destructive"
      });
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const currentDate = new Date().toISOString();
      let telegramMessage = '';
      
      if (isTravelPost) {
        const td = formData.travelDetails;
        telegramMessage = `🌟 NEW TRAVEL OPPORTUNITY 🌟\n\n${formData.title}\n\n✈️ ${td.airline}\n📅 ${td.departureDate} - ${td.returnDate}\n⏰ ${td.departureTime} - ${td.returnTime}\n🧳 ${td.baggage}\n\n💰 ${td.price || 'Contact for price'}\n\n📞 ${td.phones.join(', ')}\n📧 ${td.emails.join(', ')}\n\n${td.additionalInfo ? `ℹ️ ${td.additionalInfo}\n\n` : ''}`;
      }

      const newPost = {
        id: isEditing && post ? post.id : '',
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        author: formData.author,
        imageUrl: formData.imageUrl,
        slug: formData.slug || formData.title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-'),
        date: isEditing && post ? post.date : currentDate,
        readTime: isEditing && post ? post.readTime : "1 min read",
        telegramMessage: isTravelPost ? telegramMessage : undefined,
        travelDetails: isTravelPost ? {
          ...formData.travelDetails,
          title: formData.title,
          phones: formData.travelDetails.phones || [''],
          emails: formData.travelDetails.emails || ['']
        } : undefined
      };

      if (isEditing && post) {
        editBlogPost(newPost);
        toast({
          title: "Success!",
          description: "Post updated successfully",
        });
      } else {
        addBlogPost(newPost);
        try {
          await telegramBot.shareNewBlogPost(newPost);
          toast({
            title: "Success!",
            description: "Post created and shared to Telegram successfully",
          });
        } catch (telegramError) {
          console.error('Error sharing to Telegram:', telegramError);
          toast({
            title: "Partial Success",
            description: "Post created but failed to share to Telegram: " + (telegramError as Error).message,
            variant: "destructive"
          });
        }
      }
      
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save the post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full glass-panel rounded-xl p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-200">
          {isEditing ? 'Edit Post' : 'Create New Post'}
        </h2>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onCancel}
          className="hover:bg-elsol-sage/20"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <label className="text-sm font-medium text-gray-300">Post Type:</label>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              type="button"
              variant={!isTravelPost ? "default" : "outline"}
              onClick={() => setIsTravelPost(false)}
              className={`flex-1 sm:flex-none ${!isTravelPost ? "bg-elsol-sage text-black" : "text-elsol-sage"}`}
            >
              Regular Post
            </Button>
            <Button
              type="button"
              variant={isTravelPost ? "default" : "outline"}
              onClick={() => setIsTravelPost(true)}
              className={`flex-1 sm:flex-none ${isTravelPost ? "bg-elsol-sage text-black" : "text-elsol-sage"}`}
            >
              Travel Post
            </Button>
          </div>
        </div>

        {/* Regular post fields */}
        {!isTravelPost && (
          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                Title*
              </label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter post title"
                className="bg-black/60 border-gray-700 w-full"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="slug" className="block text-sm font-medium text-gray-300">
                URL Slug*
              </label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="enter-url-slug"
                className="bg-black/60 border-gray-700 w-full"
                required
              />
              <p className="text-xs text-gray-400">This will be used in the post URL</p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="author" className="block text-sm font-medium text-gray-300">
                Author*
              </label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Author name"
                className="bg-black/60 border-gray-700 w-full"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Featured Image
              </label>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <Button
                  type="button"
                  variant={imageInputType === 'url' ? 'default' : 'outline'}
                  className={`flex-1 sm:flex-none ${imageInputType === 'url' ? 'bg-elsol-sage text-black' : ''}`}
                  onClick={() => setImageInputType('url')}
                >
                  <Link className="w-4 h-4 mr-2" />
                  Image URL
                </Button>
                <Button
                  type="button"
                  variant={imageInputType === 'upload' ? 'default' : 'outline'}
                  className={`flex-1 sm:flex-none ${imageInputType === 'upload' ? 'bg-elsol-sage text-black' : ''}`}
                  onClick={() => setImageInputType('upload')}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
              </div>

              {imageInputType === 'url' ? (
                <Input
                  value={formData.imageUrl}
                  onChange={(e) => {
                    setFormData({ ...formData, imageUrl: e.target.value });
                    setImagePreview(e.target.value);
                  }}
                  placeholder="https://example.com/image.jpg"
                  className="bg-black/60 border-gray-700 w-full"
                />
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-center w-full">
                    <label className="w-full flex flex-col items-center px-4 py-6 bg-black/60 text-gray-300 rounded-lg border-2 border-dashed border-elsol-sage/30 cursor-pointer hover:border-elsol-sage/50 transition-colors">
                      <ImageIcon className="w-8 h-8 mb-2 text-elsol-sage" />
                      <span className="text-sm">Click to upload image (max 5MB)</span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </div>
              )}

              {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-300 mb-2">Preview:</p>
                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-300">
                Excerpt*
              </label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Brief description of the post"
                className="bg-black/60 border-gray-700 h-24 w-full"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="content" className="block text-sm font-medium text-gray-300">
                Content*
              </label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Full blog post content (HTML supported)"
                className="bg-black/60 border-gray-700 h-64 w-full"
                required
              />
              <p className="text-xs text-gray-400">HTML tags are supported for formatting</p>
            </div>
          </div>
        )}

        {/* Travel post fields */}
        {isTravelPost && (
          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                Title/Description*
              </label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Elsol travel agency"
                className="bg-black/60 border-gray-700 w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Featured Image
              </label>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <Button
                  type="button"
                  variant={imageInputType === 'url' ? 'default' : 'outline'}
                  className={`flex-1 sm:flex-none ${imageInputType === 'url' ? 'bg-elsol-sage text-black' : ''}`}
                  onClick={() => setImageInputType('url')}
                >
                  <Link className="w-4 h-4 mr-2" />
                  Image URL
                </Button>
                <Button
                  type="button"
                  variant={imageInputType === 'upload' ? 'default' : 'outline'}
                  className={`flex-1 sm:flex-none ${imageInputType === 'upload' ? 'bg-elsol-sage text-black' : ''}`}
                  onClick={() => setImageInputType('upload')}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
              </div>

              {imageInputType === 'url' ? (
                <Input
                  value={formData.imageUrl}
                  onChange={(e) => {
                    setFormData({ ...formData, imageUrl: e.target.value });
                    setImagePreview(e.target.value);
                  }}
                  placeholder="https://example.com/image.jpg"
                  className="bg-black/60 border-gray-700 w-full"
                />
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-center w-full">
                    <label className="w-full flex flex-col items-center px-4 py-6 bg-black/60 text-gray-300 rounded-lg border-2 border-dashed border-elsol-sage/30 cursor-pointer hover:border-elsol-sage/50 transition-colors">
                      <ImageIcon className="w-8 h-8 mb-2 text-elsol-sage" />
                      <span className="text-sm">Click to upload image (max 5MB)</span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </div>
              )}

              {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-300 mb-2">Preview:</p>
                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="travel.airline" className="block text-sm font-medium text-gray-300">
                Airline*
              </label>
              <Input
                id="travel.airline"
                name="travel.airline"
                value={formData.travelDetails.airline}
                onChange={handleChange}
                placeholder="e.g., FLYDUBAI"
                className="bg-black/60 border-gray-700 w-full"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="travel.departureDate" className="block text-sm font-medium text-gray-300">
                  Departure Date*
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="travel.departureDate"
                    value={formData.travelDetails.departureDate}
                    onChange={(e) => handleDateChange('departureDate', e.target.value)}
                    className="w-full bg-black/60 border border-gray-700 text-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-elsol-sage focus:border-transparent transition-colors"
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <p className="text-xs text-gray-400">Select departure date</p>
              </div>

              <div className="space-y-2">
                <label htmlFor="travel.returnDate" className="block text-sm font-medium text-gray-300">
                  Return Date*
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="travel.returnDate"
                    value={formData.travelDetails.returnDate}
                    onChange={(e) => handleDateChange('returnDate', e.target.value)}
                    className="w-full bg-black/60 border border-gray-700 text-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-elsol-sage focus:border-transparent transition-colors"
                    required
                    min={formData.travelDetails.departureDate || new Date().toISOString().split('T')[0]}
                  />
                </div>
                <p className="text-xs text-gray-400">Select return date</p>
              </div>

              <div className="space-y-2">
                <label htmlFor="travel.departureTime" className="block text-sm font-medium text-gray-300">
                  Departure Time*
                </label>
                <div className="relative">
                  <input
                    type="time"
                    id="travel.departureTime"
                    name="travel.departureTime"
                    value={formData.travelDetails.departureTime}
                    onChange={handleChange}
                    className="w-full bg-black/60 border border-gray-700 text-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-elsol-sage focus:border-transparent transition-colors"
                    required
                  />
                </div>
                <p className="text-xs text-gray-400">Select departure time</p>
              </div>

              <div className="space-y-2">
                <label htmlFor="travel.returnTime" className="block text-sm font-medium text-gray-300">
                  Return Time*
                </label>
                <div className="relative">
                  <input
                    type="time"
                    id="travel.returnTime"
                    name="travel.returnTime"
                    value={formData.travelDetails.returnTime}
                    onChange={handleChange}
                    className="w-full bg-black/60 border border-gray-700 text-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-elsol-sage focus:border-transparent transition-colors"
                    required
                  />
                </div>
                <p className="text-xs text-gray-400">Select return time</p>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="travel.baggage" className="block text-sm font-medium text-gray-300">
                Baggage*
              </label>
              <Input
                id="travel.baggage"
                name="travel.baggage"
                value={formData.travelDetails.baggage}
                onChange={handleChange}
                placeholder="e.g., 50Kg"
                className="bg-black/60 border-gray-700 w-full"
                required
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-300">
                Phone Numbers*
              </label>
              {(formData.travelDetails.phones || ['']).map((phone, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={phone || ''}
                    onChange={(e) => handlePhoneChange(index, e.target.value)}
                    placeholder="Phone number"
                    type="tel"
                    className="bg-black/60 border-gray-700 w-full"
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removePhone(index)}
                    className="hover:bg-red-500/20"
                    disabled={(formData.travelDetails.phones || ['']).length === 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  {index === (formData.travelDetails.phones || ['']).length - 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={addPhone}
                      className="hover:bg-elsol-sage/20"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <label htmlFor="travel.price" className="block text-sm font-medium text-gray-300">
                Price (Optional)
              </label>
              <Input
                id="travel.price"
                name="travel.price"
                value={formData.travelDetails.price}
                onChange={handleChange}
                placeholder="e.g., Starting from $599"
                className="bg-black/60 border-gray-700 w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="travel.additionalInfo" className="block text-sm font-medium text-gray-300">
                Additional Information (Optional)
              </label>
              <Textarea
                id="travel.additionalInfo"
                name="travel.additionalInfo"
                value={formData.travelDetails.additionalInfo}
                onChange={handleChange}
                placeholder="Any additional details or notes"
                className="bg-black/60 border-gray-700 h-24 w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="author" className="block text-sm font-medium text-gray-300">
                Author*
              </label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Author name"
                className="bg-black/60 border-gray-700 w-full"
                required
              />
            </div>
          </div>
        )}
        
        <div className="flex space-x-4 pt-4">
          <Button 
            type="submit" 
            className="bg-elsol-sage hover:bg-elsol-sage-light text-black w-full sm:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : isEditing ? 'Update Post' : 'Publish Post'}
          </Button>
          <Button 
            type="button" 
            onClick={onCancel}
            variant="outline" 
            className="border-elsol-sage text-elsol-sage hover:bg-elsol-sage hover:text-black w-full sm:w-auto"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BlogEditor;
