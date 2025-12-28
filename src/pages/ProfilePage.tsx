import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
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

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">Please sign in to view your profile</h1>
        </div>
      </Layout>
    );
  }

  // Mock bookings data - replace with actual Firebase data later
  const bookings = [
    {
      id: 1,
      hostelName: 'Sunrise Hostel',
      location: 'Near Lucknow University',
      checkIn: '2025-01-15',
      checkOut: '2025-06-15',
      status: 'confirmed',
      price: 5500,
      roomType: 'Double Sharing',
    },
    {
      id: 2,
      hostelName: 'Green Valley PG',
      location: 'Gomti Nagar',
      checkIn: '2024-12-01',
      checkOut: '2024-12-28',
      status: 'completed',
      price: 6000,
      roomType: 'Single Room',
    },
  ];

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
                    {bookings.length > 0 ? (
                      bookings.map((booking) => (
                        <Card key={booking.id} className="border-l-4 border-l-primary">
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
                                  </div>
                                  <Badge
                                    variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                                    className="flex items-center gap-1"
                                  >
                                    {booking.status === 'confirmed' ? (
                                      <CheckCircle2 className="w-3 h-3" />
                                    ) : (
                                      <XCircle className="w-3 h-3" />
                                    )}
                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                  </Badge>
                                </div>

                                <Separator />

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                  <div className="flex items-center gap-2">
                                    <Home className="w-4 h-4 text-muted-foreground" />
                                    <div>
                                      <p className="text-muted-foreground text-xs">Room Type</p>
                                      <p className="font-medium">{booking.roomType}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-muted-foreground" />
                                    <div>
                                      <p className="text-muted-foreground text-xs">Check In</p>
                                      <p className="font-medium">
                                        {new Date(booking.checkIn).toLocaleDateString('en-IN', { 
                                          day: 'numeric', 
                                          month: 'short' 
                                        })}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-muted-foreground" />
                                    <div>
                                      <p className="text-muted-foreground text-xs">Check Out</p>
                                      <p className="font-medium">
                                        {new Date(booking.checkOut).toLocaleDateString('en-IN', { 
                                          day: 'numeric', 
                                          month: 'short' 
                                        })}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div>
                                      <p className="text-muted-foreground text-xs">Monthly Rent</p>
                                      <p className="font-bold text-primary">₹{booking.price.toLocaleString()}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex lg:flex-col gap-2">
                                <Button variant="outline" size="sm" className="flex-1">
                                  View Details
                                </Button>
                                {booking.status === 'confirmed' && (
                                  <Button variant="destructive" size="sm" className="flex-1">
                                    Cancel
                                  </Button>
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
                        <Button className="mt-4">Browse Hostels</Button>
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
