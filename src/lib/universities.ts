import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

export interface University {
  id: string;
  name: string;
  shortName?: string;
  area: string;
  city: string;
  createdAt: any;
}

// Add new university
export const addUniversity = async (universityData: Omit<University, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'universities'), {
      ...universityData,
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error('Error adding university:', error);
    return { success: false, error: error.message };
  }
};

// Get all universities
export const getUniversities = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'universities'));
    const universities: University[] = [];
    querySnapshot.forEach((doc) => {
      universities.push({
        id: doc.id,
        ...doc.data(),
      } as University);
    });
    return { success: true, universities };
  } catch (error: any) {
    console.error('Error getting universities:', error);
    return { success: false, error: error.message, universities: [] };
  }
};

// Delete university
export const deleteUniversity = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'universities', id));
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting university:', error);
    return { success: false, error: error.message };
  }
};

// Update university
export const updateUniversity = async (id: string, universityData: Partial<University>) => {
  try {
    await updateDoc(doc(db, 'universities', id), universityData);
    return { success: true };
  } catch (error: any) {
    console.error('Error updating university:', error);
    return { success: false, error: error.message };
  }
};
