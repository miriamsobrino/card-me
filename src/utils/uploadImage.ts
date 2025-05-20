import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../config/firebase-config';

export const uploadImage = async (id: string, file: File) => {
  const storageRef = ref(storage, `images/${id}/${file.name}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};
