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
import { BlogPost } from '../types/database';
import { seedBlogPosts } from '../data/seedData';

const COLLECTION_NAME = 'blogPosts';

export const blogService = {
  subscribe(callback: (posts: BlogPost[]) => void): () => void {
    const localCached = localStorage.getItem('blog_posts_cache');
    if (localCached) {
      try {
        callback(JSON.parse(localCached));
      } catch (e) {
        callback(seedBlogPosts);
      }
    } else {
      callback(seedBlogPosts);
    }

    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('date', 'desc'));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const remotePosts = snapshot.docs.map((docSnap) => ({
              id: docSnap.id,
              ...docSnap.data()
            } as BlogPost));
            localStorage.setItem('blog_posts_cache', JSON.stringify(remotePosts));
            callback(remotePosts);
          } else {
            this.seedInitialData();
            callback(seedBlogPosts);
          }
        },
        (error) => {
          console.warn('Firestore blog sync error (using local cache):', error.message);
          callback(seedBlogPosts);
        }
      );
      return unsubscribe;
    } catch (err) {
      console.warn('Failed to attach Firestore blog listener:', err);
      return () => {};
    }
  },

  async seedInitialData(): Promise<void> {
    try {
      for (const post of seedBlogPosts) {
        await setDoc(doc(db, COLLECTION_NAME, post.id), post, { merge: true });
      }
    } catch (e) {
      console.warn('Could not seed initial blog posts to Firestore:', e);
    }
  },

  async add(post: Omit<BlogPost, 'id'>): Promise<BlogPost> {
    const id = `post-${Date.now()}`;
    const newPost: BlogPost = {
      ...post,
      id,
      status: post.status || 'published',
      createdAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, COLLECTION_NAME, id), newPost);
    } catch (e) {
      console.warn('Firestore write failed, saving locally:', e);
    }

    const current = this.getLocalCache();
    const updated = [newPost, ...current];
    localStorage.setItem('blog_posts_cache', JSON.stringify(updated));

    return newPost;
  },

  async update(post: BlogPost): Promise<void> {
    try {
      await setDoc(doc(db, COLLECTION_NAME, post.id), post, { merge: true });
    } catch (e) {
      console.warn('Firestore update failed, updating locally:', e);
    }

    const current = this.getLocalCache();
    const updated = current.map(p => p.id === post.id ? post : p);
    localStorage.setItem('blog_posts_cache', JSON.stringify(updated));
  },

  async delete(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (e) {
      console.warn('Firestore delete failed, updating locally:', e);
    }

    const current = this.getLocalCache();
    const updated = current.filter(p => p.id !== id);
    localStorage.setItem('blog_posts_cache', JSON.stringify(updated));
  },

  getLocalCache(): BlogPost[] {
    const cached = localStorage.getItem('blog_posts_cache');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        return seedBlogPosts;
      }
    }
    return seedBlogPosts;
  }
};
