import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../Config/firebaseConfig';

export const storageService = {
  async uploadImage(file: File, folder: 'destinations' | 'blogs' = 'destinations'): Promise<string> {
    // 5MB limit check
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('Image size should be less than 5MB');
    }

    try {
      const extension = file.name.split('.').pop() || 'jpg';
      const filename = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${extension}`;
      const storageRef = ref(storage, filename);
      
      const snapshot = await uploadBytes(storageRef, file, {
        contentType: file.type
      });
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return downloadUrl;
    } catch (error) {
      console.warn('Firebase Storage upload failed, falling back to local object URL:', error);
      // Fallback: Read as data URL only if remote storage is unreachable
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }
  }
};
