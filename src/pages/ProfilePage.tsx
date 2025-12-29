import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { getUserBookings } from '@/lib/bookings';
import type { Booking } from '@/lib/bookings';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Phone, 
  Home,
  Clock,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadBookings();
    }
  }, [user]);

  const loadBookings = async () => {
    if (!user) return;
    setLoading(true);
    const result = await getUserBookings(user.uid);
    if (result.success) {
      setBookings(result.data);
    }
    setLoading(false);
  };

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">Please sign in to view your profile</h1>
        </div>
      </Layout>
    );
  }

  const joinedDate = user.metadata.creationTime 
    ? new Date(user.metadata.creationTime).toLocaleDateString('en-IN', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : 'N/A';

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="mb-8">
              <CardContent className="pt-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <Avatar className="w-24 h-24 border-4 border-primary/10">
                    <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                    <AvatarFallback className="text-3xl font-bold">
                      {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl font-bold mb-2">{user.displayName || 'User'}</h1>
                    <div className="flex flex-col md:flex-row gap-4 text-muted-foreground mb-4">
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">Joined {joinedDate}</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="px-3 py-1">
                      Verified Student
                    </Badge>
                  </div>

                  <Button variant="outline">Edit Profile</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tabs Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Tabs defaultValue="bookings" className="space-y-6">
              <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-3">
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                <TabsTrigger value="info">Personal Info</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Bookings Tab */}
              <TabsContent value="bookings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Bookings</CardTitle>
                    <CardDescription>
                      Manage and track your hostel bookings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {loading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Loading bookings...</p>
                      </div>
                    ) : bookings.length > 0 ? (
                      bookings.map((booking) => (
                        <Card key={booking.id} className={`border-l-4 ${
                          booking.status === 'approved' ? 'border-l-green-500' : 
                          booking.status === 'pending' ? 'border-l-orange-500' : 
                          'border-l-red-500'
                        }`}>
                          <CardContent className="pt-6">
                            <div className="flex flex-col lg:flex-row justify-between gap-4">
                              <div className="space-y-3 flex-1">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h3 className="text-xl font-semibold mb-1">
                                      {booking.hostelName}
                                    </h3>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                      <MapPin className="w-4 h-4" />
                                      <span className="text-sm">{booking.location}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">{booking.address}</p>
                                  </div>
                                  <Badge
                                    variant={booking.status === 'approved' ? 'default' : booking.status === 'pending' ? 'secondary' : 'destructive'}
                                    className="flex items-center gap-1"
                                  >
                                    {booking.status === 'approved' ? (
                                      <CheckCircle2 className="w-3 h-3" />
                                    ) : booking.status === 'pending' ? (
                                      <Clock className="w-3 h-3" />
                                    ) : (
                                      <XCircle className="w-3 h-3" />
                                    )}
                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                  </Badge>
                                </div>

                                <Separator />

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                  <div className="flex items-center gap-2">
                                    <Home className="w-4 h-4 text-muted-foreground" />
                                    <div>
                                      <p className="text-muted-foreground text-xs">Room Type</p>
                                      <p className="font-medium">{booking.type}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-muted-foreground" />
                                    <div>
                                      <p className="text-muted-foreground text-xs">Booked On</p>
                                      <p className="font-medium">
                                        {booking.createdAt ? new Date(booking.createdAt.toDate()).toLocaleDateString('en-IN', { 
                                          day: 'numeric', 
                                          month: 'short',
                                          year: 'numeric'
                                        }) : 'N/A'}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 text-primary font-bold">₹</div>
                                    <div>
                                      <p className="text-muted-foreground text-xs">Price</p>
                                      <p className="font-medium">₹{booking.price.toLocaleString()}/mo</p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex lg:flex-col gap-2">
                                {booking.status === 'pending' && (
                                  <Badge variant="secondary" className="w-full justify-center">
                                    Waiting for Approval
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <Home className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">No bookings yet</p>
                        <p className="text-sm mt-2">Start exploring hostels to make your first booking</p>
                        <Button className="mt-4" asChild>
                          <a href="/find-hostels">Browse Hostels</a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Personal Info Tab */}
              <TabsContent value="info">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Your account details and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4">
                      <div className="flex items-center gap-4 p-4 border rounded-lg">
                        <User className="w-5 h-5 text-muted-foreground" />
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">Full Name</p>
                          <p className="font-medium">{user.displayName || 'Not set'}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-4 border rounded-lg">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">Email Address</p>
                          <p className="font-medium">{user.email}</p>
                        </div>
                        {user.emailVerified && (
                          <Badge variant="secondary">Verified</Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-4 p-4 border rounded-lg">
                        <Phone className="w-5 h-5 text-muted-foreground" />
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">Phone Number</p>
                          <p className="font-medium text-muted-foreground">Not added</p>
                        </div>
                        <Button variant="outline" size="sm">Add</Button>
                      </div>

                      <div className="flex items-center gap-4 p-4 border rounded-lg">
                        <MapPin className="w-5 h-5 text-muted-foreground" />
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">Location</p>
                          <p className="font-medium text-muted-foreground">Not added</p>
                        </div>
                        <Button variant="outline" size="sm">Add</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your account preferences and security
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        Change Password
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Notification Preferences
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Privacy Settings
                      </Button>
                      <Separator />
                      <Button variant="destructive" className="w-full">
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
