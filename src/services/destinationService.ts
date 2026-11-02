import { 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { db } from '../Config/firebaseConfig';
import { Destination } from '../types/database';
import { seedDestinations } from '../data/seedData';

const COLLECTION_NAME = 'destinations';

export const destinationService = {
  // Subscribe to real-time updates with seed fallback
  subscribe(callback: (destinations: Destination[]) => void): () => void {
    const localCached = localStorage.getItem('destinations_cache');
    if (localCached) {
      try {
        callback(JSON.parse(localCached));
      } catch (e) {
        callback(seedDestinations);
      }
    } else {
      callback(seedDestinations);
    }

    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('name', 'asc'));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const remoteDestinations = snapshot.docs.map((docSnap) => ({
              id: docSnap.id,
              ...docSnap.data()
            } as Destination));
            localStorage.setItem('destinations_cache', JSON.stringify(remoteDestinations));
            callback(remoteDestinations);
          } else {
            // First time setup: Seed default destinations if collection is empty
            this.seedInitialData();
            callback(seedDestinations);
          }
        },
        (error) => {
          console.warn('Firestore destination sync error (using local cache):', error.message);
          callback(seedDestinations);
        }
      );
      return unsubscribe;
    } catch (err) {
      console.warn('Failed to attach Firestore destination listener:', err);
      return () => {};
    }
  },

  async seedInitialData(): Promise<void> {
    try {
      for (const dest of seedDestinations) {
        await setDoc(doc(db, COLLECTION_NAME, dest.id), dest, { merge: true });
      }
    } catch (e) {
      console.warn('Could not seed initial destinations to Firestore:', e);
    }
  },

  async add(destination: Omit<Destination, 'id'>): Promise<Destination> {
    const id = `dest-${Date.now()}`;
    const newDest: Destination = {
      ...destination,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, COLLECTION_NAME, id), newDest);
    } catch (e) {
      console.warn('Firestore write failed, saving locally:', e);
    }

    // Update local cache
    const current = this.getLocalCache();
    const updated = [...current, newDest];
    localStorage.setItem('destinations_cache', JSON.stringify(updated));

    return newDest;
  },

  async update(destination: Destination): Promise<void> {
    const updatedDest = {
      ...destination,
      updatedAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, COLLECTION_NAME, destination.id), updatedDest, { merge: true });
    } catch (e) {
      console.warn('Firestore update failed, updating locally:', e);
    }

    const current = this.getLocalCache();
    const updated = current.map(d => d.id === destination.id ? updatedDest : d);
    localStorage.setItem('destinations_cache', JSON.stringify(updated));
  },

  async delete(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (e) {
      console.warn('Firestore delete failed, updating locally:', e);
    }

    const current = this.getLocalCache();
    const updated = current.filter(d => d.id !== id);
    localStorage.setItem('destinations_cache', JSON.stringify(updated));
  },

  getLocalCache(): Destination[] {
    const cached = localStorage.getItem('destinations_cache');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        return seedDestinations;
      }
    }
    return seedDestinations;
  }
};
