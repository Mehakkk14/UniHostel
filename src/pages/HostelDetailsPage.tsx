import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { getHostelById } from '@/lib/firestore';
import { createBooking } from '@/lib/bookings';
import { useToast } from '@/hooks/use-toast';
import type { Hostel } from '@/data/hostels';
import { 
  MapPin, 
  Star, 
  Users, 
  Wifi,
  UtensilsCrossed,
  Snowflake,
  Shirt,
  Car,
  Dumbbell,
  Shield,
  BookOpen,
  Phone,
  Mail,
  User,
  Home,
  ArrowLeft,
  Calendar,
  Upload,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

const facilityIcons: Record<string, any> = {
  wifi: Wifi,
  food: UtensilsCrossed,
  ac: Snowflake,
  laundry: Shirt,
  parking: Car,
  gym: Dumbbell,
  security: Shield,
  library: BookOpen,
};

export default function HostelDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [hostel, setHostel] = useState<Hostel | null>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [bookingFormData, setBookingFormData] = useState({
    photo: '',
    name: '',
    phone: '',
    aadhaar: '',
    collegeId: ''
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    loadHostel();
  }, [id]);

  const loadHostel = async () => {
    if (!id) return;
    setLoading(true);
    const result = await getHostelById(id);
    if (result.success) {
      setHostel(result.data);
    } else {
      toast({
        title: 'Error',
        description: 'Hostel not found',
        variant: 'destructive',
      });
      navigate('/find-hostels');
    }
    setLoading(false);
  };

  const handleBookNow = async () => {
    if (!user) {
      toast({
        title: 'Login Required',
        description: 'Please login to book a hostel',
        variant: 'destructive',
      });
      return;
    }

    // Open booking form dialog
    setShowBookingDialog(true);
    setBookingFormData({
      photo: '',
      name: user.displayName || '',
      phone: '',
      aadhaar: '',
      collegeId: ''
    });
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'photo' | 'aadhaar' | 'collegeId') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 500 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload an image under 500KB',
        variant: 'destructive'
      });
      return;
    }

    try {
      const base64 = await convertToBase64(file);
      setBookingFormData(prev => ({ ...prev, [field]: base64 }));
      toast({
        title: 'File uploaded',
        description: `${field} uploaded successfully`
      });
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: 'Failed to upload file',
        variant: 'destructive'
      });
    }
  };

  const handleSubmitBooking = async () => {
    if (!bookingFormData.photo || !bookingFormData.name || !bookingFormData.phone || !bookingFormData.aadhaar || !bookingFormData.collegeId) {
      toast({
        title: 'Missing information',
        description: 'Please fill all fields and upload all documents',
        variant: 'destructive'
      });
      return;
    }

    // Validate phone number (10 digits)
    if (!/^\d{10}$/.test(bookingFormData.phone)) {
      toast({
        title: 'Invalid phone number',
        description: 'Please enter a valid 10-digit phone number',
        variant: 'destructive'
      });
      return;
    }

    if (!hostel || !user) return;

    setBooking(true);
    const bookingData = {
      hostelId: hostel.id,
      hostelName: hostel.name,
      userId: user.uid,
      userEmail: user.email || '',
      userName: bookingFormData.name,
      userPhone: bookingFormData.phone,
      userPhoto: bookingFormData.photo,
      userAadhaar: bookingFormData.aadhaar,
      userCollegeId: bookingFormData.collegeId,
      location: hostel.location,
      address: hostel.address,
      price: hostel.price,
      type: hostel.type,
      facilities: hostel.facilities,
    };

    const result = await createBooking(bookingData);
    setBooking(false);

    if (result.success) {
      setShowBookingDialog(false);
      toast({
        title: 'Booking Submitted! 🎉',
        description: 'Your booking request has been sent for approval. Check your profile for status updates.',
      });
      navigate('/profile');
    } else {
      toast({
        title: 'Booking Failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="animate-pulse space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full mx-auto"></div>
            <p className="text-muted-foreground">Loading hostel details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!hostel) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">Hostel not found</h1>
          <Button className="mt-4" asChild>
            <Link to="/find-hostels">Browse Hostels</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-muted/30">
        {/* Header */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-8">
          <div className="container mx-auto px-4">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                    {hostel.name}
                  </h1>
                  <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{hostel.location}</span>
                    <span>•</span>
                    <span>{hostel.distance}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{hostel.address}</p>
                </div>
                <Badge variant={hostel.available ? 'default' : 'secondary'} className="text-lg px-4 py-2">
                  ₹{hostel.price.toLocaleString()}/month
                </Badge>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold">{hostel.rating}</span>
                  <span className="text-muted-foreground">({hostel.reviews} reviews)</span>
                </div>
                <Badge variant="outline">{hostel.type}</Badge>
                <Badge variant={hostel.available ? 'default' : 'secondary'}>
                  {hostel.available ? 'Available' : 'Full'}
                </Badge>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Images */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Photos</h2>
                    {hostel.images && hostel.images.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {hostel.images.map((img, idx) => (
                          <div 
                            key={idx} 
                            className="aspect-video rounded-lg overflow-hidden bg-muted cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => setSelectedImage(img)}
                          >
                            <img src={img} alt={`${hostel.name} ${idx + 1}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                        <Home className="w-16 h-16 text-muted-foreground" />
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Description */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">About This Hostel</h2>
                    <p className="text-muted-foreground leading-relaxed">{hostel.description}</p>
                  </CardContent>
                </Card>

                {/* Facilities */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Facilities</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {hostel.facilities.map((facility) => {
                        const Icon = facilityIcons[facility] || Home;
                        return (
                          <div key={facility} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                            <Icon className="w-5 h-5 text-primary" />
                            <span className="capitalize">{facility}</span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Google Maps Location */}
                {hostel.googleMapLink && (
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-4">Location</h2>
                      <div className="space-y-4">
                        <iframe
                          src={hostel.googleMapLink.includes('embed') 
                            ? hostel.googleMapLink 
                            : `https://maps.google.com/maps?q=${encodeURIComponent(hostel.address)}&output=embed`}
                          width="100%"
                          height="300"
                          style={{ border: 0, borderRadius: '0.5rem' }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                        <a 
                          href={hostel.googleMapLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 text-primary hover:underline"
                        >
                          <MapPin className="w-4 h-4" />
                          Open in Google Maps
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar - Booking Card */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Price per month</p>
                      <p className="text-3xl font-bold text-primary">₹{hostel.price.toLocaleString()}</p>
                    </div>

                    <Button 
                      className="w-full" 
                      size="lg" 
                      onClick={handleBookNow}
                      disabled={!hostel.available || booking}
                    >
                      {booking ? 'Processing...' : !hostel.available ? 'Not Available' : 'Book Now'}
                    </Button>

                    <div className="space-y-2 pt-4 border-t">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Instant booking confirmation</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Shield className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Verified hostel</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Trusted by students</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Booking Form Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Complete Your Booking</DialogTitle>
            <DialogDescription>
              Please provide your details and documents to proceed with the booking
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={bookingFormData.name}
                onChange={(e) => setBookingFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={bookingFormData.phone}
                onChange={(e) => setBookingFormData(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                placeholder="Enter 10-digit phone number"
                maxLength={10}
              />
              <p className="text-xs text-muted-foreground">Enter your mobile number (10 digits)</p>
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
              <Label>Your Photo *</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'photo')}
                  className="flex-1"
                />
                {bookingFormData.photo && (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">Upload a clear photo (max 500KB)</p>
            </div>

            {/* Aadhaar Card */}
            <div className="space-y-2">
              <Label>Aadhaar Card *</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'aadhaar')}
                  className="flex-1"
                />
                {bookingFormData.aadhaar && (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">Upload your Aadhaar card (max 500KB)</p>
            </div>

            {/* College ID */}
            <div className="space-y-2">
              <Label>College ID Card *</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'collegeId')}
                  className="flex-1"
                />
                {bookingFormData.collegeId && (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">Upload your college ID (max 500KB)</p>
            </div>

            <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
              <p className="text-xs text-blue-700">
                All documents are required for verification. Your booking will be processed after admin approval.
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowBookingDialog(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={handleSubmitBooking}
              disabled={booking || !bookingFormData.photo || !bookingFormData.name || !bookingFormData.phone || !bookingFormData.aadhaar || !bookingFormData.collegeId}
            >
              {booking ? 'Submitting...' : 'Submit Booking'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-full p-0">
          <div className="relative">
            <img 
              src={selectedImage || ''} 
              alt="Full size" 
              className="w-full h-auto max-h-[90vh] object-contain"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
