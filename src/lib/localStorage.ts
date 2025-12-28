// Local storage service as temporary backend replacement
export interface StoredHostel {
  id: string;
  name: string;
  location: string;
  address: string;
  price: number;
  rating: number;
  reviews: number;
  type: 'boys' | 'girls' | 'coed';
  images: string[];
  facilities: string[];
  description: string;
  available: boolean;
  distance: string;
  ownerName?: string;
  ownerEmail?: string;
  ownerPhone?: string;
  createdAt: string;
  approved: boolean;
}

const STORAGE_KEY = 'unihostel_hostels';

// Get all hostels from localStorage
export const getLocalHostels = (): StoredHostel[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

// Add a new hostel to localStorage
export const addLocalHostel = (hostelData: Omit<StoredHostel, 'id' | 'createdAt'>): { success: boolean; id?: string; error?: any } => {
  try {
    const hostels = getLocalHostels();
    const newHostel: StoredHostel = {
      ...hostelData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    hostels.push(newHostel);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(hostels));
    
    return { success: true, id: newHostel.id };
  } catch (error) {
    console.error('Error adding to localStorage:', error);
    return { success: false, error };
  }
};

// Get approved hostels only
export const getApprovedLocalHostels = (): StoredHostel[] => {
  const hostels = getLocalHostels();
  return hostels.filter(h => h.approved);
};

// Search hostels
export const searchLocalHostels = (query: string): StoredHostel[] => {
  const hostels = getApprovedLocalHostels();
  const lowerQuery = query.toLowerCase();
  
  return hostels.filter(h => 
    h.name.toLowerCase().includes(lowerQuery) ||
    h.location.toLowerCase().includes(lowerQuery) ||
    h.address.toLowerCase().includes(lowerQuery)
  );
};

// Get hostels by location
export const getLocalHostelsByLocation = (location: string): StoredHostel[] => {
  const hostels = getApprovedLocalHostels();
  return hostels.filter(h => h.location.includes(location));
};

// Clear all data (for testing)
export const clearLocalStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
};
