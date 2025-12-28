# Firebase Integration Guide

## Setup Instructions

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name: `unihostel` (or your preferred name)
4. Follow the setup wizard

### 2. Enable Firebase Services

#### Authentication
1. In Firebase Console, go to **Authentication**
2. Click "Get Started"
3. Enable the following sign-in methods:
   - Email/Password
   - Google (optional)

#### Firestore Database
1. Go to **Firestore Database**
2. Click "Create Database"
3. Start in **Production mode** (we'll add security rules later)
4. Choose your preferred location (closest to your users)

#### Storage
1. Go to **Storage**
2. Click "Get Started"
3. Use default security rules for now

### 3. Get Firebase Configuration

1. In Firebase Console, click the gear icon ⚙️ → Project Settings
2. Scroll down to "Your apps"
3. Click the web icon `</>`
4. Register your app with nickname "UniHostel Web"
5. Copy the config object

### 4. Configure Environment Variables

1. Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```

2. Add your Firebase config values to `.env`:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

### 5. Firestore Security Rules

Go to **Firestore Database** → **Rules** and update:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Hostels collection
    match /hostels/{hostelId} {
      // Anyone can read approved hostels
      allow read: if resource.data.approved == true;
      
      // Authenticated users can create hostels (pending approval)
      allow create: if request.auth != null;
      
      // Only admin can update/delete
      allow update, delete: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 6. Storage Security Rules

Go to **Storage** → **Rules** and update:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /hostels/{hostelId}/{allPaths=**} {
      // Anyone can read
      allow read: if true;
      
      // Authenticated users can upload
      allow write: if request.auth != null;
    }
  }
}
```

### 7. Firestore Indexes

For better query performance, create these indexes:

1. Go to **Firestore Database** → **Indexes**
2. Add composite index:
   - Collection: `hostels`
   - Fields:
     - `approved` (Ascending)
     - `createdAt` (Descending)

### 8. Test the Integration

1. Run the development server:
   ```bash
   npm run dev
   ```

2. Try submitting a hostel through the "List Your Hostel" form
3. Check Firestore Database to see the new document

## Features Implemented

### 1. Hostel Management
- ✅ Add new hostels (with approval system)
- ✅ Fetch all approved hostels
- ✅ Filter hostels by location
- ✅ Search hostels
- ✅ Update hostel details
- ✅ Delete hostels

### 2. Authentication (Ready to use)
- ✅ Email/Password signup
- ✅ Email/Password login
- ✅ Google Sign-in
- ✅ Sign out
- ✅ Auth state management

### 3. File Storage (Ready to use)
- ✅ Upload hostel images
- ✅ Delete images
- ✅ Multiple image upload

## Next Steps

### To fully integrate Firebase with the app:

1. **Update ListingsPage** to fetch from Firestore:
   ```typescript
   import { getHostels } from '@/lib/firestore';
   
   useEffect(() => {
     const fetchHostels = async () => {
       const result = await getHostels();
       if (result.success) {
         setHostels(result.data);
       }
     };
     fetchHostels();
   }, []);
   ```

2. **Add Authentication UI**:
   - Create login/signup modals
   - Update "Sign In" button in navbar
   - Add protected routes

3. **Add Image Upload**:
   - Update ContactPage form to handle file uploads
   - Use `uploadImages` function from storage.ts

4. **Add Admin Panel**:
   - Create admin route
   - Add approval system for pending hostels
   - Manage users and content

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Check your `.env` file is properly configured
- Restart the dev server after adding env variables

### "Missing or insufficient permissions"
- Update Firestore security rules
- Make sure user is authenticated for protected operations

### "Storage object not found"
- Enable Storage in Firebase Console
- Update storage security rules

## Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [Firebase Storage Documentation](https://firebase.google.com/docs/storage)
