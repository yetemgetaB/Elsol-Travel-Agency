import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { db } from '../Config/firebaseConfig';
import { Inquiry, InquiryStatus } from '../types/database';

const COLLECTION_NAME = 'inquiries';

export const inquiryService = {
  subscribe(callback: (inquiries: Inquiry[]) => void): () => void {
    const localCached = localStorage.getItem('inquiries_cache');
    if (localCached) {
      try {
        callback(JSON.parse(localCached));
      } catch (e) {
        callback([]);
      }
    } else {
      callback([]);
    }

    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const inquiries = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data()
          } as Inquiry));
          localStorage.setItem('inquiries_cache', JSON.stringify(inquiries));
          callback(inquiries);
        },
        (error) => {
          console.warn('Firestore inquiry sync error:', error.message);
        }
      );
      return unsubscribe;
    } catch (err) {
      console.warn('Failed to attach Firestore inquiry listener:', err);
      return () => {};
    }
  },

  async submit(inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>): Promise<Inquiry> {
    const id = `inq-${Date.now()}`;
    const newInquiry: Inquiry = {
      ...inquiry,
      id,
      status: 'new',
      createdAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, COLLECTION_NAME, id), newInquiry);
    } catch (e) {
      console.warn('Firestore inquiry submit failed, saving locally:', e);
    }

    // Cache locally as well
    const cached = localStorage.getItem('inquiries_cache');
    const list: Inquiry[] = cached ? JSON.parse(cached) : [];
    localStorage.setItem('inquiries_cache', JSON.stringify([newInquiry, ...list]));

    return newInquiry;
  },

  async updateStatus(id: string, status: InquiryStatus): Promise<void> {
    try {
      await setDoc(doc(db, COLLECTION_NAME, id), { status }, { merge: true });
    } catch (e) {
      console.warn('Firestore inquiry status update failed:', e);
    }

    const cached = localStorage.getItem('inquiries_cache');
    if (cached) {
      const list: Inquiry[] = JSON.parse(cached);
      const updated = list.map(item => item.id === id ? { ...item, status } : item);
      localStorage.setItem('inquiries_cache', JSON.stringify(updated));
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (e) {
      console.warn('Firestore inquiry delete failed:', e);
    }

    const cached = localStorage.getItem('inquiries_cache');
    if (cached) {
      const list: Inquiry[] = JSON.parse(cached);
      const updated = list.filter(item => item.id !== id);
      localStorage.setItem('inquiries_cache', JSON.stringify(updated));
    }
  }
};
