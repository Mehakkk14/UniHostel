# 🏠 UniHostel - Student Accommodation Platform

**Find Your Perfect Student Home in Lucknow**

UniHostel is a modern student accommodation platform specifically designed for Lucknow, connecting students with verified hostels and PG accommodations near their universities. Built with React, TypeScript, and Firebase.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://github.com/Mehakkk14/UniHostel)
[![Firebase](https://img.shields.io/badge/Firebase-integrated-orange)](https://firebase.google.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3.1-61dafb)](https://react.dev/)

---

## 🎯 Features

### For Students
- 🔍 **Smart Search & Filters** - Find hostels by location, price, facilities, and room type
- 🏆 **150+ Verified Hostels** - Pre-screened accommodations near 10+ Lucknow universities
- 👤 **User Profiles** - Track bookings, manage preferences, and save favorites
- 🔐 **Secure Authentication** - Email/Password and Google Sign-In via Firebase
- 📱 **Responsive Design** - Seamless experience across desktop and mobile
- 💳 **Booking Management** - View active and past bookings in one place

### For Hostel Owners
- 📝 **Easy Listing** - Simple form to submit hostel details with photo upload
- ⏳ **Admin Approval System** - All listings reviewed before going live
- 📊 **Contact Management** - Receive inquiries directly from interested students

### For Admins
- 🛡️ **Secure Admin Panel** - Restricted access via official UniHostel email
- ✅ **Approval Workflow** - Review and approve/reject hostel submissions
- 📈 **Analytics Dashboard** - Monitor platform stats and user activity
- 👥 **User Management** - View and manage registered users
- 📋 **Booking Oversight** - Track all platform bookings

---

## 🚀 Tech Stack

**Frontend:**
- ⚛️ React 18.3.1 - Modern UI library
- 📘 TypeScript 5.6.2 - Type-safe development
- ⚡ Vite 5.4.19 - Lightning-fast build tool
- 🎨 Tailwind CSS - Utility-first styling
- 🎭 Framer Motion - Smooth animations
- 🧩 shadcn/ui - Beautiful component library

**Backend & Services:**
- 🔥 Firebase Authentication - User management
- 🗄️ Cloud Firestore - Real-time database
- 📦 Firebase Storage - Image uploads
- 📊 Firebase Analytics - User insights

**State Management:**
- 🔄 React Query (TanStack) - Server state
- 🪝 React Context API - Global auth state

**Form & Validation:**
- 📋 React Hook Form - Form handling
- ✅ Zod - Schema validation

---

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase account

### Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/Mehakkk14/UniHostel.git
cd UniHostel

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env

# 4. Add your Firebase credentials to .env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# 5. Start development server
npm run dev
```

The app will run on `http://localhost:8080` (or `8081` if 8080 is busy)

---

## 🔧 Firebase Setup

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project: `unihostel-c1040`
   - Enable Google Analytics (optional)

2. **Enable Authentication**
   - Go to Authentication → Sign-in method
   - Enable Email/Password
   - Enable Google Sign-In
   - Add authorized domain: `localhost`

3. **Setup Firestore**
   - Go to Firestore Database
   - Create database in production mode
   - Add security rules (see `FIREBASE_SETUP.md`)

4. **Setup Storage**
   - Go to Storage
   - Create default bucket: `gs://unihostel-c1040.firebasestorage.app`
   - Add security rules (see `FIREBASE_SETUP.md`)

5. **Get Configuration**
   - Go to Project Settings → General
   - Scroll to "Your apps" → Web app
   - Copy configuration and add to `.env`

---

## 👨‍💼 Admin Access

Admin panel is restricted to the official UniHostel email:
- **Email:** `hello.unihostel@gmail.com`
- **Access:** Sign in with this email to see "Admin Panel" in the profile dropdown

**Admin Features:**
- Review pending hostel submissions
- Approve/reject listings
- View platform statistics
- Manage users and bookings

---

## 📂 Project Structure

```
unihostel/
├── src/
│   ├── components/
│   │   ├── auth/          # Authentication components
│   │   ├── layout/        # Navbar, Footer, Layout
│   │   ├── hostel/        # Hostel card components
│   │   ├── search/        # Search and filter components
│   │   └── ui/            # shadcn/ui components
│   ├── contexts/          # React Context providers
│   ├── lib/               # Firebase & utility functions
│   ├── pages/             # Page components
│   │   ├── HomePage.tsx
│   │   ├── ListingsPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── AdminPage.tsx
│   │   └── ContactPage.tsx
│   ├── hooks/             # Custom React hooks
│   ├── data/              # Static data & types
│   └── App.tsx            # Main app component
├── public/                # Static assets
│   ├── logo.png          # Main logo
│   └── logo-icon.png     # Footer icon
├── .env                   # Environment variables
└── firebase.json          # Firebase configuration
```

---

## 🎨 Key Features Explained

### Smart Filtering System
- **Location-based**: Filter by university proximity
- **Price Range**: Slider from ₹3,000 to ₹12,000/month
- **Room Types**: Single, Double Sharing, Triple Sharing
- **Facilities**: WiFi, AC, Mess, Gym, Laundry, etc.

### User Authentication Flow
1. User clicks "Sign In" or "Get Started"
2. Modal opens with Email/Password or Google options
3. Firebase handles authentication
4. User redirected to profile/dashboard

### Hostel Approval Workflow
1. Owner submits hostel via "List Your Hostel" page
2. Submission stored in Firestore with `approved: false`
3. Admin reviews in Admin Panel
4. Admin approves → Hostel goes live
5. Admin rejects → Owner notified

---

## 🌐 Available Routes

| Route | Description | Auth Required |
|-------|-------------|---------------|
| `/` | Homepage with hero & stats | No |
| `/find-hostels` | Browse all listings | No |
| `/about` | About UniHostel | No |
| `/contact` | List your hostel form | No |
| `/profile` | User profile & bookings | Yes |
| `/admin` | Admin dashboard | Admin only |

---

## 🔒 Security Features

- **Firebase Authentication** - Industry-standard user auth
- **Protected Routes** - Profile & Admin pages require login
- **Admin-only Access** - Email-based admin verification
- **Input Validation** - Zod schema validation on all forms
- **XSS Protection** - React's built-in escaping
- **Firestore Rules** - Server-side security rules

---

## 📱 Contact Information

**UniHostel Official**
- 📧 Email: hello.unihostel@gmail.com
- 📞 Phone: +91 63069 40373
- 📍 Location: Lucknow, Uttar Pradesh, India

**Social Media**
- [LinkedIn](https://linkedin.com/company/unihostel)
- [Twitter/X](https://x.com/unihostel)
- [Instagram](https://instagram.com/unihostel)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is private and proprietary. All rights reserved © 2024 UniHostel.

---

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/) & [React](https://react.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Hosted on [Firebase](https://firebase.google.com/)

---

## 📞 Support

For issues, questions, or support:
- Open an issue on GitHub
- Email: hello.unihostel@gmail.com
- Phone: +91 63069 40373

---

**Made with ❤️ for Lucknow students**
