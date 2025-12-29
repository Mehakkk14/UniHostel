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
  deleteDoc
} from 'firebase/firestore';
import { db } from './firebase';

const BOOKINGS_COLLECTION = 'bookings';

export interface Booking {
  id: string;
  hostelId: string;
  hostelName: string;
  userId: string;
  userEmail: string;
  userName: string;
  location: string;
  address: string;
  price: number;
  type: string;
  facilities: string[];
  status: 'pending' | 'approved' | 'rejected';
  createdAt: any;
  approvedAt?: any;
  rejectedAt?: any;
}

// Create a new booking
export const createBooking = async (bookingData: Omit<Booking, 'id' | 'status' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, BOOKINGS_COLLECTION), {
      ...bookingData,
      status: 'pending',
      createdAt: Timestamp.now(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating booking:', error);
    return { success: false, error };
  }
};

// Get user's bookings
export const getUserBookings = async (userId: string) => {
  try {
    const q = query(
      collection(db, BOOKINGS_COLLECTION),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    const bookings: Booking[] = [];
    
    querySnapshot.forEach((doc) => {
      bookings.push({
        id: doc.id,
        ...doc.data()
      } as Booking);
    });

    // Sort by createdAt on client side
    bookings.sort((a: any, b: any) => {
      const aTime = a.createdAt?.toMillis() || 0;
      const bTime = b.createdAt?.toMillis() || 0;
      return bTime - aTime;
    });
    
    return { success: true, data: bookings };
  } catch (error) {
    console.error('Error getting user bookings:', error);
    return { success: false, error };
  }
};

// Get all bookings (admin only)
export const getAllBookings = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, BOOKINGS_COLLECTION));
    const bookings: Booking[] = [];
    
    querySnapshot.forEach((doc) => {
      bookings.push({
        id: doc.id,
        ...doc.data()
      } as Booking);
    });

    // Sort by createdAt on client side
    bookings.sort((a: any, b: any) => {
      const aTime = a.createdAt?.toMillis() || 0;
      const bTime = b.createdAt?.toMillis() || 0;
      return bTime - aTime;
    });
    
    return { success: true, data: bookings };
  } catch (error) {
    console.error('Error getting all bookings:', error);
    return { success: false, error };
  }
};

// Get pending bookings (admin)
export const getPendingBookings = async () => {
  try {
    const q = query(
      collection(db, BOOKINGS_COLLECTION),
      where('status', '==', 'pending')
    );
    const querySnapshot = await getDocs(q);
    const bookings: Booking[] = [];
    
    querySnapshot.forEach((doc) => {
      bookings.push({
        id: doc.id,
        ...doc.data()
      } as Booking);
    });

    // Sort by createdAt on client side
    bookings.sort((a: any, b: any) => {
      const aTime = a.createdAt?.toMillis() || 0;
      const bTime = b.createdAt?.toMillis() || 0;
      return bTime - aTime;
    });
    
    return { success: true, data: bookings };
  } catch (error) {
    console.error('Error getting pending bookings:', error);
    return { success: false, error };
  }
};

// Approve booking
export const approveBooking = async (id: string) => {
  try {
    const docRef = doc(db, BOOKINGS_COLLECTION, id);
    await updateDoc(docRef, {
      status: 'approved',
      approvedAt: Timestamp.now()
    });
    return { success: true };
  } catch (error) {
    console.error('Error approving booking:', error);
    return { success: false, error };
  }
};

// Reject booking
export const rejectBooking = async (id: string) => {
  try {
    const docRef = doc(db, BOOKINGS_COLLECTION, id);
    await updateDoc(docRef, {
      status: 'rejected',
      rejectedAt: Timestamp.now()
    });
    return { success: true };
  } catch (error) {
    console.error('Error rejecting booking:', error);
    return { success: false, error };
  }
};

// Delete booking
export const deleteBooking = async (id: string) => {
  try {
    await deleteDoc(doc(db, BOOKINGS_COLLECTION, id));
    return { success: true };
  } catch (error) {
    console.error('Error deleting booking:', error);
    return { success: false, error };
  }
};
