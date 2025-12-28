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
}

export const hostels: Hostel[] = [
  {
    id: '1',
    name: 'Sunrise Student Living',
    location: 'Near Lucknow University',
    address: '45 Hazratganj, Lucknow',
    price: 8500,
    rating: 4.8,
    reviews: 124,
    type: 'coed',
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop&q=60'
    ],
    facilities: ['wifi', 'food', 'ac', 'laundry', 'parking', 'gym'],
    description: 'Modern co-living space with premium amenities, just 5 minutes from Lucknow University campus.',
    available: true,
    distance: '0.5 km'
  },
  {
    id: '2',
    name: 'Campus Edge Hostel',
    location: 'Near BBAU Lucknow',
    address: '12 Alambagh, Lucknow',
    price: 6500,
    rating: 4.5,
    reviews: 89,
    type: 'boys',
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=60'
    ],
    facilities: ['wifi', 'food', 'laundry'],
    description: 'Affordable boys hostel with homely food and excellent study environment.',
    available: true,
    distance: '1.2 km'
  },
  {
    id: '3',
    name: 'Sakura Girls Residence',
    location: 'Near IIM Lucknow',
    address: '78 Gomti Nagar, Lucknow',
    price: 9000,
    rating: 4.9,
    reviews: 156,
    type: 'girls',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=60'
    ],
    facilities: ['wifi', 'food', 'ac', 'laundry', 'security'],
    description: 'Premium girls-only residence with 24/7 security and all modern amenities.',
    available: true,
    distance: '0.8 km'
  },
  {
    id: '4',
    name: 'Scholar\'s Den',
    location: 'Near KGMU Lucknow',
    address: '23 Chowk, Lucknow',
    price: 7500,
    rating: 4.6,
    reviews: 92,
    type: 'coed',
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop&q=60'
    ],
    facilities: ['wifi', 'food', 'library', 'laundry'],
    description: 'Perfect for medical students with dedicated study areas and healthy meal options.',
    available: false,
    distance: '1.5 km'
  },
  {
    id: '5',
    name: 'Urban Nest Hostels',
    location: 'Near Amity University Lucknow',
    address: '56 Malhaur, Lucknow',
    price: 5500,
    rating: 4.3,
    reviews: 67,
    type: 'boys',
    images: [
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1598928506311-c55ez0e3d6k8?w=800&auto=format&fit=crop&q=60'
    ],
    facilities: ['wifi', 'parking', 'laundry'],
    description: 'Budget-friendly accommodation with essential amenities for students.',
    available: true,
    distance: '2.0 km'
  },
  {
    id: '6',
    name: 'Lotus Women\'s Hostel',
    location: 'Near ITM Lucknow',
    address: '89 Sitapur Road, Lucknow',
    price: 8000,
    rating: 4.7,
    reviews: 134,
    type: 'girls',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=60'
    ],
    facilities: ['wifi', 'food', 'ac', 'laundry', 'gym', 'security'],
    description: 'Luxurious girls hostel with rooftop garden and recreation facilities.',
    available: true,
    distance: '0.3 km'
  }
];

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
