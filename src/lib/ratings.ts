import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  doc,
  getDoc,
  updateDoc,
  Timestamp,
  orderBy,
  limit
} from 'firebase/firestore';

export interface Rating {
  id: string;
  hostelId: string;
  userId: string;
  userName: string;
  rating: number;
  review?: string;
  createdAt: Timestamp;
}

export interface RatingStats {
  averageRating: number;
  totalRatings: number;
  distribution: { [key: number]: number };
}

// Submit or update a rating
export async function submitRating(
  hostelId: string,
  userId: string,
  userName: string,
  rating: number,
  review?: string
) {
  try {
    // Check if user already rated this hostel
    const ratingsRef = collection(db, 'ratings');
    const q = query(ratingsRef, where('hostelId', '==', hostelId), where('userId', '==', userId));
    const existingRatings = await getDocs(q);

    if (!existingRatings.empty) {
      // Update existing rating
      const ratingDoc = existingRatings.docs[0];
      await updateDoc(doc(db, 'ratings', ratingDoc.id), {
        rating,
        review: review || '',
        updatedAt: Timestamp.now(),
      });
      
      await updateHostelRatingStats(hostelId);
      
      return { success: true, message: 'Rating updated successfully' };
    } else {
      // Create new rating
      await addDoc(ratingsRef, {
        hostelId,
        userId,
        userName,
        rating,
        review: review || '',
        createdAt: Timestamp.now(),
      });
      
      await updateHostelRatingStats(hostelId);
      
      return { success: true, message: 'Rating submitted successfully' };
    }
  } catch (error) {
    console.error('Error submitting rating:', error);
    return { success: false, message: 'Failed to submit rating' };
  }
}

// Get user's rating for a hostel
export async function getUserRating(hostelId: string, userId: string) {
  try {
    const ratingsRef = collection(db, 'ratings');
    const q = query(ratingsRef, where('hostelId', '==', hostelId), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const ratingDoc = snapshot.docs[0];
      return {
        success: true,
        data: { id: ratingDoc.id, ...ratingDoc.data() } as Rating,
      };
    }
    
    return { success: true, data: null };
  } catch (error) {
    console.error('Error getting user rating:', error);
    return { success: false, data: null };
  }
}

// Get all ratings for a hostel
export async function getHostelRatings(hostelId: string) {
  try {
    const ratingsRef = collection(db, 'ratings');
    const q = query(
      ratingsRef, 
      where('hostelId', '==', hostelId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    
    const ratings: Rating[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Rating[];
    
    return { success: true, data: ratings };
  } catch (error) {
    console.error('Error getting hostel ratings:', error);
    return { success: false, data: [] };
  }
}

// Get rating statistics for a hostel
export async function getHostelRatingStats(hostelId: string): Promise<RatingStats> {
  try {
    const ratingsRef = collection(db, 'ratings');
    const q = query(ratingsRef, where('hostelId', '==', hostelId));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return {
        averageRating: 0,
        totalRatings: 0,
        distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      };
    }
    
    const ratings = snapshot.docs.map(doc => doc.data().rating as number);
    const distribution: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    
    let sum = 0;
    ratings.forEach(rating => {
      sum += rating;
      distribution[rating] = (distribution[rating] || 0) + 1;
    });
    
    const averageRating = sum / ratings.length;
    
    return {
      averageRating: Math.round(averageRating * 10) / 10,
      totalRatings: ratings.length,
      distribution,
    };
  } catch (error) {
    console.error('Error getting rating stats:', error);
    return {
      averageRating: 0,
      totalRatings: 0,
      distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    };
  }
}

// Update hostel document with latest rating stats
async function updateHostelRatingStats(hostelId: string) {
  try {
    const stats = await getHostelRatingStats(hostelId);
    const hostelRef = doc(db, 'hostels', hostelId);
    
    await updateDoc(hostelRef, {
      rating: stats.averageRating,
      reviews: stats.totalRatings,
    });
  } catch (error) {
    console.error('Error updating hostel rating stats:', error);
  }
}
