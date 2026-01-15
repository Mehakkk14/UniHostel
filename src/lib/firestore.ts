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
      where('approved', '==', true)
    );
    const querySnapshot = await getDocs(q);
    const hostels: Hostel[] = [];
    
    querySnapshot.forEach((doc) => {
      hostels.push({
        id: doc.id,
        ...doc.data()
      } as Hostel);
    });
    
    // Sort by createdAt on client side
    hostels.sort((a: any, b: any) => {
      const aTime = a.createdAt?.toMillis() || 0;
      const bTime = b.createdAt?.toMillis() || 0;
      return bTime - aTime;
    });
    
    console.log('Approved hostels loaded:', hostels.length);
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

// Get pending hostels (for admin approval)
export const getPendingHostels = async () => {
  try {
    const q = query(
      collection(db, HOSTELS_COLLECTION),
      where('approved', '==', false)
    );
    const querySnapshot = await getDocs(q);
    const hostels: any[] = [];
    
    querySnapshot.forEach((doc) => {
      hostels.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    // Sort by createdAt on client side
    hostels.sort((a, b) => {
      const aTime = a.createdAt?.toMillis() || 0;
      const bTime = b.createdAt?.toMillis() || 0;
      return bTime - aTime;
    });
    
    return { success: true, data: hostels };
  } catch (error) {
    console.error('Error getting pending hostels:', error);
    return { success: false, error };
  }
};

// Get all hostels (approved and pending) for admin
export const getAllHostels = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, HOSTELS_COLLECTION));
    const hostels: Hostel[] = [];
    
    querySnapshot.forEach((doc) => {
      hostels.push({
        id: doc.id,
        ...doc.data()
      } as Hostel);
    });
    
    // Sort by createdAt on client side
    hostels.sort((a: any, b: any) => {
      const aTime = a.createdAt?.toMillis() || 0;
      const bTime = b.createdAt?.toMillis() || 0;
      return bTime - aTime;
    });
    
    return { success: true, data: hostels };
  } catch (error) {
    console.error('Error getting all hostels:', error);
    return { success: false, error };
  }
};

// Approve a hostel
export const approveHostel = async (id: string) => {
  try {
    const docRef = doc(db, HOSTELS_COLLECTION, id);
    await updateDoc(docRef, {
      approved: true,
      approvedAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return { success: true };
  } catch (error) {
    console.error('Error approving hostel:', error);
    return { success: false, error };
  }
};

// Reject and delete a hostel
export const rejectHostel = async (id: string) => {
  try {
    await deleteDoc(doc(db, HOSTELS_COLLECTION, id));
    return { success: true };
  } catch (error) {
    console.error('Error rejecting hostel:', error);
    return { success: false, error };
  }
};

// Contact Messages Collection
const CONTACT_MESSAGES_COLLECTION = 'contactMessages';

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt?: any;
  read?: boolean;
}

// Add a contact message
export const addContactMessage = async (messageData: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>) => {
  try {
    const docRef = await addDoc(collection(db, CONTACT_MESSAGES_COLLECTION), {
      ...messageData,
      createdAt: Timestamp.now(),
      read: false
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding contact message:', error);
    return { success: false, error };
  }
};

// Get all contact messages
export const getContactMessages = async () => {
  try {
    const q = query(
      collection(db, CONTACT_MESSAGES_COLLECTION),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const messages: ContactMessage[] = [];
    
    querySnapshot.forEach((doc) => {
      messages.push({
        id: doc.id,
        ...doc.data()
      } as ContactMessage);
    });
    
    return { success: true, data: messages };
  } catch (error) {
    console.error('Error getting contact messages:', error);
    return { success: false, error };
  }
};

// Mark contact message as read
export const markMessageAsRead = async (id: string) => {
  try {
    await updateDoc(doc(db, CONTACT_MESSAGES_COLLECTION, id), {
      read: true
    });
    return { success: true };
  } catch (error) {
    console.error('Error marking message as read:', error);
    return { success: false, error };
  }
};

// Delete contact message
export const deleteContactMessage = async (id: string) => {
  try {
    await deleteDoc(doc(db, CONTACT_MESSAGES_COLLECTION, id));
    return { success: true };
  } catch (error) {
    console.error('Error deleting message:', error);
    return { success: false, error };
  }
};

// Student Verification Collection
const VERIFICATIONS_COLLECTION = 'studentVerifications';

export interface StudentVerification {
  id?: string;
  userId: string;
  userName: string;
  userEmail: string;
  aadhaarCard: string; // base64 image
  collegeId: string; // base64 image
  status: 'pending' | 'approved' | 'rejected';
  createdAt?: any;
  reviewedAt?: any;
  reviewedBy?: string;
}

// Submit verification documents
export const submitVerification = async (verificationData: Omit<StudentVerification, 'id' | 'createdAt' | 'status'>) => {
  try {
    const docRef = await addDoc(collection(db, VERIFICATIONS_COLLECTION), {
      ...verificationData,
      status: 'pending',
      createdAt: Timestamp.now()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting verification:', error);
    return { success: false, error };
  }
};

// Get user's verification status
export const getUserVerification = async (userId: string) => {
  try {
    const q = query(
      collection(db, VERIFICATIONS_COLLECTION),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return { success: true, data: null };
    }
    
    // Get the most recent one
    const docs = querySnapshot.docs.sort((a: any, b: any) => {
      const aTime = a.data().createdAt?.toMillis() || 0;
      const bTime = b.data().createdAt?.toMillis() || 0;
      return bTime - aTime;
    });
    
    const doc = docs[0];
    return { 
      success: true, 
      data: { id: doc.id, ...doc.data() } as StudentVerification 
    };
  } catch (error) {
    console.error('Error getting verification:', error);
    return { success: false, error };
  }
};

// Get all pending verifications (Admin)
export const getPendingVerifications = async () => {
  try {
    const q = query(
      collection(db, VERIFICATIONS_COLLECTION),
      where('status', '==', 'pending')
    );
    const querySnapshot = await getDocs(q);
    const verifications: StudentVerification[] = [];
    
    querySnapshot.forEach((doc) => {
      verifications.push({
        id: doc.id,
        ...doc.data()
      } as StudentVerification);
    });
    
    // Sort by createdAt on client side
    verifications.sort((a: any, b: any) => {
      const aTime = a.createdAt?.toMillis() || 0;
      const bTime = b.createdAt?.toMillis() || 0;
      return bTime - aTime;
    });
    
    return { success: true, data: verifications };
  } catch (error) {
    console.error('Error getting pending verifications:', error);
    return { success: false, error };
  }
};

// Get all verifications (Admin)
export const getAllVerifications = async () => {
  try {
    const q = query(
      collection(db, VERIFICATIONS_COLLECTION)
    );
    const querySnapshot = await getDocs(q);
    const verifications: StudentVerification[] = [];
    
    querySnapshot.forEach((doc) => {
      verifications.push({
        id: doc.id,
        ...doc.data()
      } as StudentVerification);
    });
    
    // Sort by createdAt on client side
    verifications.sort((a: any, b: any) => {
      const aTime = a.createdAt?.toMillis() || 0;
      const bTime = b.createdAt?.toMillis() || 0;
      return bTime - aTime;
    });
    
    return { success: true, data: verifications };
  } catch (error) {
    console.error('Error getting verifications:', error);
    return { success: false, error };
  }
};

// Approve verification (Admin)
export const approveVerification = async (id: string, adminEmail: string) => {
  try {
    await updateDoc(doc(db, VERIFICATIONS_COLLECTION, id), {
      status: 'approved',
      reviewedAt: Timestamp.now(),
      reviewedBy: adminEmail
    });
    return { success: true };
  } catch (error) {
    console.error('Error approving verification:', error);
    return { success: false, error };
  }
};

// Reject verification (Admin)
export const rejectVerification = async (id: string, adminEmail: string) => {
  try {
    await updateDoc(doc(db, VERIFICATIONS_COLLECTION, id), {
      status: 'rejected',
      reviewedAt: Timestamp.now(),
      reviewedBy: adminEmail
    });
    return { success: true };
  } catch (error) {
    console.error('Error rejecting verification:', error);
    return { success: false, error };
  }
};

// User Analytics
const USERS_COLLECTION = 'users';

export interface UserData {
  id: string;
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  createdAt: any;
  lastLoginAt: any;
  provider: string;
}

// Get all users for analytics
export const getAllUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, USERS_COLLECTION));
    const users: UserData[] = [];
    
    querySnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data()
      } as UserData);
    });
    
    // Sort by creation date (newest first) on client side
    users.sort((a, b) => {
      const dateA = a.createdAt?.toDate?.() || new Date(0);
      const dateB = b.createdAt?.toDate?.() || new Date(0);
      return dateB.getTime() - dateA.getTime();
    });
    
    return { success: true, data: users };
  } catch (error) {
    console.error('Error getting users:', error);
    return { success: false, error, data: [] };
  }
};

// Add or update user in users collection (call this after signup/login)
export const saveUserData = async (userData: Omit<UserData, 'id'>) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userData.uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      // Update last login time
      await updateDoc(userRef, {
        lastLoginAt: Timestamp.now()
      });
    } else {
      // Create new user record
      await updateDoc(userRef, {
        ...userData,
        createdAt: Timestamp.now(),
        lastLoginAt: Timestamp.now()
      });
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error saving user data:', error);
    return { success: false, error };
  }
};
