import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  Timestamp,
  doc,
  updateDoc,
  deleteDoc,
  getDoc
} from 'firebase/firestore';
import { db } from './firebase';
import { Hostel } from '@/data/hostels';

// Collection name
const HOSTELS_COLLECTION = 'hostels';

// Add a new hostel
export const addHostel = async (hostelData: Omit<Hostel, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, HOSTELS_COLLECTION), {
      ...hostelData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      approved: false // New hostels need approval
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding hostel:', error);
    return { success: false, error };
  }
};

// Get all approved hostels
export const getHostels = async () => {
  try {
    const q = query(
      collection(db, HOSTELS_COLLECTION),
      where('approved', '==', true),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const hostels: Hostel[] = [];
    
    querySnapshot.forEach((doc) => {
      hostels.push({
        id: doc.id,
        ...doc.data()
      } as Hostel);
    });
    
    return { success: true, data: hostels };
  } catch (error) {
    console.error('Error getting hostels:', error);
    return { success: false, error };
  }
};

// Get hostels by location
export const getHostelsByLocation = async (location: string) => {
  try {
    const q = query(
      collection(db, HOSTELS_COLLECTION),
      where('approved', '==', true),
      where('location', '==', location)
    );
    const querySnapshot = await getDocs(q);
    const hostels: Hostel[] = [];
    
    querySnapshot.forEach((doc) => {
      hostels.push({
        id: doc.id,
        ...doc.data()
      } as Hostel);
    });
    
    return { success: true, data: hostels };
  } catch (error) {
    console.error('Error getting hostels by location:', error);
    return { success: false, error };
  }
};

// Get a single hostel by ID
export const getHostelById = async (id: string) => {
  try {
    const docRef = doc(db, HOSTELS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { 
        success: true, 
        data: { id: docSnap.id, ...docSnap.data() } as Hostel 
      };
    } else {
      return { success: false, error: 'Hostel not found' };
    }
  } catch (error) {
    console.error('Error getting hostel:', error);
    return { success: false, error };
  }
};

// Update a hostel
export const updateHostel = async (id: string, data: Partial<Hostel>) => {
  try {
    const docRef = doc(db, HOSTELS_COLLECTION, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating hostel:', error);
    return { success: false, error };
  }
};

// Delete a hostel
export const deleteHostel = async (id: string) => {
  try {
    await deleteDoc(doc(db, HOSTELS_COLLECTION, id));
    return { success: true };
  } catch (error) {
    console.error('Error deleting hostel:', error);
    return { success: false, error };
  }
};

// Search hostels
export const searchHostels = async (searchTerm: string) => {
  try {
    const q = query(
      collection(db, HOSTELS_COLLECTION),
      where('approved', '==', true)
    );
    const querySnapshot = await getDocs(q);
    const hostels: Hostel[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // Client-side filtering for name and location
      if (
        data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.location.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        hostels.push({
          id: doc.id,
          ...data
        } as Hostel);
      }
    });
    
    return { success: true, data: hostels };
  } catch (error) {
    console.error('Error searching hostels:', error);
    return { success: false, error };
  }
};
