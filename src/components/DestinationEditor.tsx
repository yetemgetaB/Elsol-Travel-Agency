import React, { useState, useEffect } from 'react';
import { useDestinationContext } from '@/context/DestinationContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { X, Image as ImageIcon, Link, Upload, Loader2 } from 'lucide-react';
import { storageService } from '@/services/storageService';
import { DestinationCategory } from '@/types/database';

interface DestinationEditorProps {
  destination?: any;
  isEditing?: boolean;
  onCancel: () => void;
}

const DestinationEditor: React.FC<DestinationEditorProps> = ({
  destination,
  isEditing = false,
  onCancel,
}) => {
  const { addDestination, updateDestination } = useDestinationContext();
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    imageUrl: '',
    price: '',
    duration: '',
    category: 'Domestic' as DestinationCategory,
    isFeatured: true,
    description: '',
    highlights: ['', '', '', ''],
  });
  const [imageInputType, setImageInputType] = useState<'url' | 'upload'>('url');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (isEditing && destination) {
      const img = destination.imageUrl || destination.image || '';
      setFormData({
        name: destination.name || '',
        image: img,
        imageUrl: img,
        price: destination.price || '',
        duration: destination.duration || '',
        category: destination.category || 'Domestic',
        isFeatured: destination.isFeatured !== undefined ? destination.isFeatured : true,
        description: destination.description || '',
        highlights: destination.highlights ? [...destination.highlights] : ['', ''],
      });
      setImagePreview(img);
    }
  }, [isEditing, destination]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await storageService.uploadImage(file, 'destinations');
      setImagePreview(url);
      setFormData(prev => ({ ...prev, image: url, imageUrl: url }));
      toast({
        title: "Image Ready",
        description: "Image attached successfully.",
      });
    } catch (err: any) {
      toast({
        title: "Image Upload Failed",
        description: err.message || "Could not process image",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleHighlightChange = (index: number, value: string) => {
    const newHighlights = [...formData.highlights];
    newHighlights[index] = value;
    setFormData({ ...formData, highlights: newHighlights });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const highlights = formData.highlights.filter(h => h.trim() !== '');
    
    if (highlights.length < 2) {
      toast({
        title: "Validation Error",
        description: "Please add at least 2 highlights",
        variant: "destructive"
      });
      return;
    }

    const img = formData.imageUrl || formData.image;
    if (!img) {
      toast({
        title: "Error",
        description: "Please provide an image URL or upload an image",
        variant: "destructive"
      });
      return;
    }

    const destinationData = {
      id: isEditing ? destination.id : `dest-${Date.now()}`,
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: formData.description,
      imageUrl: img,
      image: img,
      price: formData.price || 'Contact for Price',
      duration: formData.duration || 'Flexible',
      category: formData.category,
      highlights,
      isFeatured: formData.isFeatured,
      isActive: true,
      updatedAt: new Date().toISOString()
    };

    if (isEditing) {
      updateDestination(destinationData as any);
    } else {
      addDestination(destinationData as any);
    }

    onCancel();
  };

  return (
    <div className="glass-panel rounded-xl p-6 border border-elsol-sage/20 mb-8">
      <h3 className="text-xl font-bold text-elsol-sage mb-6">
        {isEditing ? 'Edit Destination' : 'Create New Destination'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Destination Name *
            </label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Lalibela or Dubai"
              required
              className="bg-black/50 border-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as DestinationCategory })}
              className="w-full h-10 px-3 py-2 bg-black/50 border border-gray-700 rounded-md text-white focus:outline-none focus:border-elsol-sage"
            >
              <option value="Domestic">Domestic</option>
              <option value="Historical">Historical</option>
              <option value="Adventure">Adventure</option>
              <option value="International">International</option>
              <option value="Cultural">Cultural</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Starting Price *
            </label>
            <Input
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="e.g. From 5,999 birr"
              required
              className="bg-black/50 border-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Duration *
            </label>
            <Input
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="e.g. 3-5 days"
              required
              className="bg-black/50 border-gray-700"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Featured Image *
          </label>
          <div className="flex gap-4 mb-4">
            <Button
              type="button"
              variant={imageInputType === 'url' ? 'default' : 'outline'}
              className={imageInputType === 'url' ? 'bg-elsol-sage text-black font-semibold' : 'border-gray-700'}
              onClick={() => setImageInputType('url')}
            >
              <Link className="w-4 h-4 mr-2" />
              Image URL
            </Button>
            <Button
              type="button"
              variant={imageInputType === 'upload' ? 'default' : 'outline'}
              className={imageInputType === 'upload' ? 'bg-elsol-sage text-black font-semibold' : 'border-gray-700'}
              onClick={() => setImageInputType('upload')}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Image
            </Button>
          </div>

          {imageInputType === 'url' ? (
            <Input
              value={formData.image}
              onChange={(e) => {
                setFormData({ ...formData, image: e.target.value, imageUrl: e.target.value });
                setImagePreview(e.target.value);
              }}
              placeholder="https://images.unsplash.com/photo-..."
              className="bg-black/50 border-gray-700"
            />
          ) : (
            <div className="space-y-4">
              <label className="w-full flex flex-col items-center px-4 py-6 bg-black/50 text-gray-300 rounded-lg border-2 border-dashed border-elsol-sage/30 cursor-pointer hover:border-elsol-sage/50 transition-colors">
                {isUploading ? (
                  <>
                    <Loader2 className="w-8 h-8 mb-2 text-elsol-sage animate-spin" />
                    <span className="text-sm">Uploading image...</span>
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-8 h-8 mb-2 text-elsol-sage" />
                    <span className="text-sm">Click to choose image (max 5MB)</span>
                  </>
                )}
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={isUploading}
                />
              </label>
            </div>
          )}

          {imagePreview && (
            <div className="mt-4">
              <p className="text-xs text-gray-400 mb-2">Image Preview:</p>
              <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-700">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Description *
          </label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe the destination experience, scenery, and tours..."
            required
            rows={3}
            className="bg-black/50 border-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Highlights (at least 2 required)
          </label>
          <div className="space-y-2">
            {formData.highlights.map((highlight, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={highlight}
                  onChange={(e) => handleHighlightChange(index, e.target.value)}
                  placeholder={`Key highlight ${index + 1}`}
                  className="bg-black/50 border-gray-700"
                />
                {formData.highlights.length > 2 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const newHighlights = formData.highlights.filter((_, i) => i !== index);
                      setFormData({ ...formData, highlights: newHighlights });
                    }}
                    className="border-gray-700 hover:bg-red-500/20 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            {formData.highlights.length < 6 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setFormData({
                    ...formData,
                    highlights: [...formData.highlights, '']
                  });
                }}
                className="w-full mt-2 border-dashed border-gray-700 hover:border-elsol-sage/50"
              >
                + Add Another Highlight
              </Button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="isFeatured"
            checked={formData.isFeatured}
            onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
            className="rounded border-gray-700 bg-black/50 text-elsol-sage focus:ring-elsol-sage"
          />
          <label htmlFor="isFeatured" className="text-sm text-gray-300 cursor-pointer">
            Feature on Homepage (Popular Destinations)
          </label>
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-800">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="border-gray-700"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isUploading}
            className="bg-elsol-sage hover:bg-elsol-sage-light text-black font-semibold"
          >
            {isEditing ? 'Save Changes' : 'Create Destination'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DestinationEditor;
