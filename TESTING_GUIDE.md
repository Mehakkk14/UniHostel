# Rating System - Testing Guide

## कैसे Test करें:

### Prerequisites:
1. Firebase setup होना चाहिए
2. User login होना चाहिए
3. कम से कम एक hostel available होना चाहिए

### Testing Steps:

#### 1. View Hostel Details
- किसी भी hostel पर click करें
- Hostel details page खुलेगा
- Initially rating 0 (0) दिखेगा

#### 2. Rate a Hostel (First Time)
- Hostel details page पर "Rate Hostel" button click करें
- Dialog खुलेगा
- Stars पर hover करने से color change होगा
- किसी भी star (1-5) पर click करें
- Optional: Review text लिखें (max 500 chars)
- "Submit" button click करें
- Success toast message आएगा

#### 3. Check Rating Update
- Page refresh होने के बाद:
  - Top में updated average rating दिखेगा
  - "Rate Hostel" button "Update Rating" में change हो जाएगा
  - Ratings & Reviews section में आपकी rating दिखेगी

#### 4. Update Your Rating
- "Update Rating" button click करें
- Dialog में आपकी previous rating दिखेगी
- Stars या review change करें
- "Update" button click करें
- Updated rating save हो जाएगी

#### 5. View All Ratings
- Ratings & Reviews section scroll करें
- देखें:
  - Average rating (बड़ा number)
  - Total reviews count
  - Rating distribution (5-star bars)
  - Recent reviews list with timestamps

### Firebase Console Check:

1. Firebase Console → Firestore Database
2. `ratings` collection में जाएं
3. आपकी rating document देखें:
   - hostelId
   - userId
   - rating (1-5)
   - review (if provided)
   - createdAt timestamp

4. `hostels` collection में जाएं
5. उस hostel के document में:
   - `rating` field updated होगा (average)
   - `reviews` field updated होगा (count)

### Expected Behavior:

✅ **Working Correctly:**
- Login users ही rate कर सकते हैं
- One user = one rating per hostel
- Ratings instantly update होती हैं
- Average calculation सही होता है
- Reviews chronological order में show होती हैं

❌ **Not Allowed:**
- Non-logged users can't rate
- Users can't rate multiple times (only update)
- Invalid ratings (< 1 or > 5)

### Common Issues & Solutions:

**Issue**: "Rate Hostel" button दिख नहीं रहा
**Solution**: Check if user is logged in

**Issue**: Rating submit नहीं हो रही
**Solution**: 
- Check Firebase connection
- Check Firestore rules updated हैं
- Check console for errors

**Issue**: Rating 0 (0) show हो रहा है
**Solution**: 
- Normal है अगर कोई rating नहीं है
- First rating submit करने के बाद update होगा

**Issue**: Reviews दिख नहीं रहे
**Solution**:
- Check if reviews text लिखी है (optional है)
- Check Firestore में ratings collection exist करता है

### Test Different Scenarios:

1. **Multiple Users Rating:**
   - अलग-अलग accounts से login करके rate करें
   - Average correctly calculate होना चाहिए

2. **Rating Distribution:**
   - Different star ratings दें (1, 2, 3, 4, 5)
   - Distribution bars सही percentage show करें

3. **Long Reviews:**
   - 500 characters की limit test करें
   - Character counter check करें

4. **Update Rating:**
   - पहले 3 stars दें
   - फिर 5 stars में update करें
   - Old rating replace होनी चाहिए (duplicate नहीं)

### Performance Check:

- Page load time: Ratings quickly load होनी चाहिए
- Submit speed: Rating instantly submit होनी चाहिए
- HMR: Development में changes instantly reflect होने चाहिए
