import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { Destination } from '../types/database';
import { destinationService } from '../services/destinationService';
import { seedDestinations } from '../data/seedData';

// Extended type to keep backward compatibility with components using .image instead of .imageUrl
export type DestinationItem = Destination & {
  image?: string;
};

interface DestinationContextType {
  destinations: DestinationItem[];
  addDestination: (destination: Omit<Destination, 'id'> | Destination) => Promise<void>;
  updateDestination: (destination: Destination) => Promise<void>;
  deleteDestination: (id: string) => Promise<void>;
  refreshDestinations?: () => Promise<void>;
}

const DestinationContext = createContext<DestinationContextType | undefined>(undefined);

export const useDestinationContext = () => {
  const context = useContext(DestinationContext);
  if (!context) {
    throw new Error('useDestinationContext must be used within a DestinationProvider');
  }
  return context;
};

export const DestinationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [destinations, setDestinations] = useState<DestinationItem[]>(() => {
    return destinationService.getLocalCache().map(normalizeDestination);
  });

  function normalizeDestination(d: Destination | any): DestinationItem {
    const img = d.imageUrl || d.image || '';
    return {
      ...d,
      imageUrl: img,
      image: img,
      category: d.category || 'Domestic',
      price: d.price || 'Contact for Price',
      duration: d.duration || 'Flexible',
      isFeatured: d.isFeatured !== undefined ? d.isFeatured : true,
      isActive: d.isActive !== undefined ? d.isActive : true
    };
  }

  // Subscribe to real-time updates from Firestore/local sync
  useEffect(() => {
    const unsubscribe = destinationService.subscribe((remoteList) => {
      setDestinations(remoteList.map(normalizeDestination));
    });

    return () => unsubscribe();
  }, []);

  const addDestination = async (destination: Omit<Destination, 'id'> | Destination) => {
    try {
      const normalized = normalizeDestination(destination);
      const created = await destinationService.add(normalized);
      toast({
        title: "Destination Added",
        description: `"${created.name}" is now available.`,
      });
    } catch (err) {
      console.error('Failed to add destination:', err);
      toast({
        title: "Error",
        description: "Could not save destination. Please try again.",
        variant: "destructive"
      });
    }
  };

  const updateDestination = async (updatedDestination: Destination) => {
    try {
      const normalized = normalizeDestination(updatedDestination);
      await destinationService.update(normalized);
      toast({
        title: "Destination Updated",
        description: `"${updatedDestination.name}" has been updated.`,
      });
    } catch (err) {
      console.error('Failed to update destination:', err);
      toast({
        title: "Error",
        description: "Could not update destination.",
        variant: "destructive"
      });
    }
  };

  const deleteDestination = async (id: string) => {
    try {
      await destinationService.delete(id);
      toast({
        title: "Destination Deleted",
        description: "Destination removed successfully.",
      });
    } catch (err) {
      console.error('Failed to delete destination:', err);
      toast({
        title: "Error",
        description: "Could not delete destination.",
        variant: "destructive"
      });
    }
  };

  return (
    <DestinationContext.Provider value={{
      destinations,
      addDestination,
      updateDestination,
      deleteDestination,
    }}>
      {children}
    </DestinationContext.Provider>
  );
};
