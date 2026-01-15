import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { getUserBookings } from '@/lib/bookings';
import type { Booking } from '@/lib/bookings';
import { requestNotificationPermission, showNotification, checkNotificationPermission } from '@/lib/notifications';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { updatePassword, deleteUser, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
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
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    bookingUpdates: true,
    promotions: false
  });
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false
  });

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

  const handleChangePassword = async () => {
    if (!user) return;

    if (passwordData.new !== passwordData.confirm) {
      toast({
        title: 'Passwords do not match',
        description: 'New password and confirm password must match',
        variant: 'destructive'
      });
      return;
    }

    if (passwordData.new.length < 6) {
      toast({
        title: 'Password too short',
        description: 'Password must be at least 6 characters',
        variant: 'destructive'
      });
      return;
    }

    try {
      // Reauthenticate user first
      if (user.email && passwordData.current) {
        const credential = EmailAuthProvider.credential(user.email, passwordData.current);
        await reauthenticateWithCredential(user, credential);
      }

      await updatePassword(user, passwordData.new);
      toast({
        title: 'Password changed',
        description: 'Your password has been updated successfully'
      });
      setPasswordData({ current: '', new: '', confirm: '' });
      setShowPasswordDialog(false);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to change password',
        variant: 'destructive'
      });
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    const confirmed = confirm(
      'Are you sure you want to delete your account? This action cannot be undone. All your bookings and data will be permanently deleted.'
    );

    if (!confirmed) return;

    const password = prompt('Please enter your password to confirm account deletion:');
    if (!password) return;

    try {
      // Reauthenticate before deletion
      if (user.email) {
        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);
      }

      await deleteUser(user);
      toast({
        title: 'Account deleted',
        description: 'Your account has been permanently deleted'
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete account',
        variant: 'destructive'
      });
    }
  };

  const handleSaveNotifications = () => {
    // In production, save to Firestore or backend
    toast({
      title: 'Preferences saved',
      description: 'Your notification preferences have been updated'
    });
  };

  const handleSavePrivacy = () => {
    // In production, save to Firestore or backend
    toast({
      title: 'Privacy settings saved',
      description: 'Your privacy preferences have been updated'
    });
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
                  </div>
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
              <TabsList className="grid w-full md:w-auto grid-cols-3">
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
                <div className="space-y-6">
                  {/* Change Password */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Change Password</CardTitle>
                      <CardDescription>Update your account password</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {showPasswordDialog ? (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input
                              id="currentPassword"
                              type="password"
                              value={passwordData.current}
                              onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input
                              id="newPassword"
                              type="password"
                              value={passwordData.new}
                              onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input
                              id="confirmPassword"
                              type="password"
                              value={passwordData.confirm}
                              onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={handleChangePassword}>Update Password</Button>
                            <Button variant="outline" onClick={() => {
                              setShowPasswordDialog(false);
                              setPasswordData({ current: '', new: '', confirm: '' });
                            }}>Cancel</Button>
                          </div>
                        </>
                      ) : (
                        <Button onClick={() => setShowPasswordDialog(true)}>Change Password</Button>
                      )}
                    </CardContent>
                  </Card>

                  {/* Notification Preferences */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>Manage how you receive notifications</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="emailNotif">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive updates via email</p>
                        </div>
                        <Switch
                          id="emailNotif"
                          checked={notifications.email}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="smsNotif">SMS Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive updates via SMS</p>
                        </div>
                        <Switch
                          id="smsNotif"
                          checked={notifications.sms}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="bookingNotif">Booking Updates</Label>
                          <p className="text-sm text-muted-foreground">Get notified about booking status</p>
                        </div>
                        <Switch
                          id="bookingNotif"
                          checked={notifications.bookingUpdates}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, bookingUpdates: checked })}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="promoNotif">Promotional Offers</Label>
                          <p className="text-sm text-muted-foreground">Receive offers and promotions</p>
                        </div>
                        <Switch
                          id="promoNotif"
                          checked={notifications.promotions}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, promotions: checked })}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Browser Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">Get instant updates in your browser</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant={checkNotificationPermission() === 'granted' ? 'default' : 'secondary'}>
                            {checkNotificationPermission() === 'granted' ? 'Enabled' : 
                             checkNotificationPermission() === 'denied' ? 'Blocked' : 'Not Set'}
                          </Badge>
                          {checkNotificationPermission() !== 'granted' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={async () => {
                                const granted = await requestNotificationPermission();
                                if (granted) {
                                  toast({
                                    title: 'Notifications Enabled',
                                    description: 'You will now receive browser notifications'
                                  });
                                  showNotification('Notifications Enabled! 🔔', {
                                    body: 'You will now receive updates about your bookings and more.'
                                  });
                                } else {
                                  toast({
                                    title: 'Permission Denied',
                                    description: 'Please enable notifications in your browser settings',
                                    variant: 'destructive'
                                  });
                                }
                              }}
                            >
                              Enable
                            </Button>
                          )}
                          {checkNotificationPermission() === 'granted' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                showNotification('Test Notification 🔔', {
                                  body: 'This is a test notification from UniHostel. You will receive updates like this!'
                                });
                                toast({
                                  title: 'Test notification sent',
                                  description: 'Check your notifications'
                                });
                              }}
                            >
                              Test
                            </Button>
                          )}
                        </div>
                      </div>
                      <Button onClick={handleSaveNotifications}>Save Preferences</Button>
                    </CardContent>
                  </Card>

                  {/* Privacy Settings */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Privacy Settings</CardTitle>
                      <CardDescription>Control your profile visibility</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="profileVisible">Profile Visible</Label>
                          <p className="text-sm text-muted-foreground">Make your profile visible to others</p>
                        </div>
                        <Switch
                          id="profileVisible"
                          checked={privacy.profileVisible}
                          onCheckedChange={(checked) => setPrivacy({ ...privacy, profileVisible: checked })}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="showEmail">Show Email</Label>
                          <p className="text-sm text-muted-foreground">Display email on your profile</p>
                        </div>
                        <Switch
                          id="showEmail"
                          checked={privacy.showEmail}
                          onCheckedChange={(checked) => setPrivacy({ ...privacy, showEmail: checked })}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="showPhone">Show Phone</Label>
                          <p className="text-sm text-muted-foreground">Display phone on your profile</p>
                        </div>
                        <Switch
                          id="showPhone"
                          checked={privacy.showPhone}
                          onCheckedChange={(checked) => setPrivacy({ ...privacy, showPhone: checked })}
                        />
                      </div>
                      <Button onClick={handleSavePrivacy}>Save Settings</Button>
                    </CardContent>
                  </Card>

                  {/* Delete Account */}
                  <Card className="border-destructive">
                    <CardHeader>
                      <CardTitle className="text-destructive">Danger Zone</CardTitle>
                      <CardDescription>Permanently delete your account and all data</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-4">
                        <p className="text-sm text-destructive font-medium">
                          ⚠️ Warning: This action cannot be undone. All your bookings, verifications, and account data will be permanently deleted.
                        </p>
                      </div>
                      <Button variant="destructive" onClick={handleDeleteAccount}>
                        Delete My Account
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
