# Rating System Documentation

## Overview
यह rating system users को hostels को rate करने और review देने की facility देता है।

## Features

### 1. Star Rating (1-5)
- Users 1 से 5 stars तक rating दे सकते हैं
- Visual feedback के साथ interactive star selection
- Hover effects के साथ better UX

### 2. Written Reviews (Optional)
- Users अपनी rating के साथ text review भी लिख सकते हैं
- Maximum 500 characters की limit
- Review optional है, सिर्फ rating भी submit कर सकते हैं

### 3. Rating Statistics
- Average rating calculation
- Total ratings count
- Rating distribution (1-5 stars का breakdown)
- Progress bars के साथ visual representation

### 4. User Rating Management
- Users अपनी rating को update कर सकते हैं
- Each user can rate a hostel only once
- Previous rating automatically update हो जाती है

## Components

### 1. RatingDialog (`src/components/hostel/RatingDialog.tsx`)
- Star rating selector
- Review text area
- Submit/Update functionality
- Login check

### 2. RatingsList (`src/components/hostel/RatingsList.tsx`)
- Average rating display
- Rating distribution graph
- All reviews list
- Timestamps with relative time

### 3. Rating Functions (`src/lib/ratings.ts`)
- `submitRating()` - Rate submit या update करें
- `getUserRating()` - User की rating fetch करें
- `getHostelRatings()` - Hostel की सभी ratings
- `getHostelRatingStats()` - Rating statistics

## Usage

### HostelDetailsPage में rating feature:
1. "Rate Hostel" button hostel details में show होता है
2. Login users ही rate कर सकते हैं
3. User की existing rating automatically load होती है
4. Rating submit करने पर hostel stats update होते हैं

### Firestore Structure

#### Ratings Collection
```
ratings/{ratingId}
  - hostelId: string
  - userId: string
  - userName: string
  - rating: number (1-5)
  - review: string (optional)
  - createdAt: Timestamp
  - updatedAt: Timestamp (on update)
```

#### Hostels Collection (Updated Fields)
```
hostels/{hostelId}
  - rating: number (average)
  - reviews: number (count)
  ... other fields
```

## Security Rules

Firebase Firestore rules में ratings collection के लिए:
- Anyone can read ratings
- Authenticated users can create ratings
- Users can update only their own ratings
- Only admin can delete ratings

## Future Enhancements

Possible improvements:
1. Rating images/photos के साथ
2. Helpful/Not helpful votes on reviews
3. Filter reviews by rating
4. Sort reviews (newest, highest rated, etc.)
5. Reply to reviews (admin/hostel owner)
6. Report inappropriate reviews
7. Verified booking badge (only those who booked can rate)
