import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  deleteDoc,
  query, 
  where, 
  getDocs, 
  doc,
  Timestamp,
  orderBy
} from 'firebase/firestore';
import type { Hostel } from '@/data/hostels';

export interface WishlistItem {
  id: string;
  userId: string;
  hostelId: string;
  hostelName: string;
  hostelImage: string;
  hostelPrice: number;
  hostelLocation: string;
  hostelRating: number;
  hostelReviews: number;
  addedAt: Timestamp;
}

// Add hostel to wishlist
export async function addToWishlist(userId: string, hostel: Hostel) {
  try {
    // Check if already in wishlist
    const exists = await isInWishlist(userId, hostel.id);
    if (exists) {
      return { success: false, message: 'Already in wishlist' };
    }

    const wishlistRef = collection(db, 'wishlist');
    await addDoc(wishlistRef, {
      userId,
      hostelId: hostel.id,
      hostelName: hostel.name,
      hostelImage: hostel.images?.[0] || '',
      hostelPrice: hostel.price,
      hostelLocation: hostel.location,
      hostelRating: hostel.rating || 0,
      hostelReviews: hostel.reviews || 0,
      addedAt: Timestamp.now(),
    });

    return { success: true, message: 'Added to wishlist' };
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    return { success: false, message: 'Failed to add to wishlist' };
  }
}

// Remove hostel from wishlist
export async function removeFromWishlist(userId: string, hostelId: string) {
  try {
    const wishlistRef = collection(db, 'wishlist');
    const q = query(wishlistRef, where('userId', '==', userId), where('hostelId', '==', hostelId));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return { success: false, message: 'Not in wishlist' };
    }

    // Delete all matching documents (should be only one)
    const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    return { success: true, message: 'Removed from wishlist' };
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    return { success: false, message: 'Failed to remove from wishlist' };
  }
}

// Check if hostel is in user's wishlist
export async function isInWishlist(userId: string, hostelId: string): Promise<boolean> {
  try {
    const wishlistRef = collection(db, 'wishlist');
    const q = query(wishlistRef, where('userId', '==', userId), where('hostelId', '==', hostelId));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  } catch (error) {
    console.error('Error checking wishlist:', error);
    return false;
  }
}

// Get user's wishlist
export async function getUserWishlist(userId: string) {
  try {
    const wishlistRef = collection(db, 'wishlist');
    const q = query(
      wishlistRef, 
      where('userId', '==', userId),
      orderBy('addedAt', 'desc')
    );
    const snapshot = await getDocs(q);

    const wishlist: WishlistItem[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as WishlistItem[];

    return { success: true, data: wishlist };
  } catch (error) {
    console.error('Error getting wishlist:', error);
    return { success: false, data: [] };
  }
}

// Toggle wishlist (add if not present, remove if present)
export async function toggleWishlist(userId: string, hostel: Hostel) {
  const inWishlist = await isInWishlist(userId, hostel.id);
  
  if (inWishlist) {
    return await removeFromWishlist(userId, hostel.id);
  } else {
    return await addToWishlist(userId, hostel);
  }
}
