export interface Hostel {
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
  googleMapLink?: string;
}

export const hostels: Hostel[] = [];

export const locations = [
  'Lucknow University',
  'BBAU Lucknow',
  'BBD University Lucknow',
  'IIM Lucknow',
  'KGMU Lucknow',
  'Amity University Lucknow',
  'ITM Lucknow',
  'RMLAU Lucknow',
  'Integral University Lucknow',
  'SRMS CET Lucknow',
  'IET Lucknow',
  'MPGI Lucknow'
];

export const facilityIcons: Record<string, string> = {
  wifi: '📶',
  food: '🍽️',
  ac: '❄️',
  laundry: '🧺',
  parking: '🚗',
  gym: '💪',
  security: '🔒',
  library: '📚'
};

export const facilityLabels: Record<string, string> = {
  wifi: 'WiFi',
  food: 'Meals Included',
  ac: 'Air Conditioning',
  laundry: 'Laundry',
  parking: 'Parking',
  gym: 'Gym',
  security: '24/7 Security',
  library: 'Library'
};
