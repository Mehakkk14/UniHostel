import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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
  Calendar
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

    if (!hostel) return;

    setBooking(true);
    const bookingData = {
      hostelId: hostel.id,
      hostelName: hostel.name,
      userId: user.uid,
      userEmail: user.email || '',
      userName: user.displayName || user.email || '',
      location: hostel.location,
      address: hostel.address,
      price: hostel.price,
      type: hostel.type,
      facilities: hostel.facilities,
    };

    const result = await createBooking(bookingData);
    setBooking(false);

    if (result.success) {
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
                          <div key={idx} className="aspect-video rounded-lg overflow-hidden bg-muted">
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

                {/* Owner Contact */}
                {(hostel as any).ownerName && (
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-4">Contact Owner</h2>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5 text-muted-foreground" />
                          <span>{(hostel as any).ownerName}</span>
                        </div>
                        {(hostel as any).ownerEmail && (
                          <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-muted-foreground" />
                            <a href={`mailto:${(hostel as any).ownerEmail}`} className="text-primary hover:underline">
                              {(hostel as any).ownerEmail}
                            </a>
                          </div>
                        )}
                        {(hostel as any).ownerPhone && (
                          <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-muted-foreground" />
                            <a href={`tel:${(hostel as any).ownerPhone}`} className="text-primary hover:underline">
                              {(hostel as any).ownerPhone}
                            </a>
                          </div>
                        )}
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
    </Layout>
  );
}
