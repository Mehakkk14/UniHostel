import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { isAdmin } from '@/lib/adminAuth';
import { addUniversity, getUniversities, deleteUniversity, University } from '@/lib/universities';
import { getPendingHostels, getAllHostels, approveHostel, rejectHostel, deleteHostel, getContactMessages, markMessageAsRead, deleteContactMessage, type ContactMessage, getPendingVerifications, approveVerification, rejectVerification, type StudentVerification } from '@/lib/firestore';
import { getAllBookings, approveBooking, rejectBooking, type Booking } from '@/lib/bookings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Home, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Eye,
  Trash2,
  TrendingUp,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Image as ImageIcon,
  GraduationCap,
  Plus,
  MessageSquare,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface PendingHostel {
  id: string;
  name: string;
  location: string;
  address: string;
  price: number;
  type?: string;
  roomType: string;
  facilities: string[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  ownerName?: string;
  ownerEmail?: string;
  ownerPhone?: string;
  description: string;
  images: string[];
  submittedAt: string;
  createdAt?: any;
  approved: boolean;
}

export default function AdminPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [pendingHostels, setPendingHostels] = useState<PendingHostel[]>([]);
  const [selectedHostel, setSelectedHostel] = useState<PendingHostel | null>(null);
  const [actionDialog, setActionDialog] = useState<{ open: boolean; action: 'approve' | 'reject' | null }>({
    open: false,
    action: null,
  });
  const [universities, setUniversities] = useState<University[]>([]);
  const [newUniversity, setNewUniversity] = useState({ name: '', shortName: '', area: '', city: 'Lucknow' });
  const [loadingUniversities, setLoadingUniversities] = useState(false);
  const [allHostels, setAllHostels] = useState<any[]>([]);
  const [loadingHostels, setLoadingHostels] = useState(false);
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [pendingVerifications, setPendingVerifications] = useState<StudentVerification[]>([]);
  const [loadingVerifications, setLoadingVerifications] = useState(false);

  // Load data from Firebase
  useEffect(() => {
    loadPendingHostels();
    loadAllHostels();
    loadUniversities();
    loadBookings();
    loadContactMessages();
    loadPendingVerifications();
  }, []);

  const loadPendingHostels = async () => {
    setLoadingHostels(true);
    console.log('Loading pending hostels...');
    const result = await getPendingHostels();
    console.log('Pending hostels result:', result);
    if (result.success) {
      console.log('Pending hostels data:', result.data);
      setPendingHostels(result.data);
      toast({
        title: 'Data Loaded',
        description: `Found ${result.data.length} pending hostel(s)`,
      });
    } else {
      console.error('Error loading pending hostels:', result.error);
      toast({
        title: 'Error Loading Hostels',
        description: 'Failed to load pending hostels. Check console for details.',
        variant: 'destructive',
      });
    }
    setLoadingHostels(false);
  };

  const loadAllHostels = async () => {
    const result = await getAllHostels();
    if (result.success) {
      setAllHostels(result.data);
    }
  };

  const loadBookings = async () => {
    setLoadingBookings(true);
    const result = await getAllBookings();
    if (result.success) {
      setAllBookings(result.data);
    } else {
      console.error('Error loading bookings:', result.error);
    }
    setLoadingBookings(false);
  };

  const loadContactMessages = async () => {
    setLoadingMessages(true);
    const result = await getContactMessages();
    if (result.success) {
      setContactMessages(result.data);
    } else {
      console.error('Error loading contact messages:', result.error);
    }
    setLoadingMessages(false);
  };

  const loadPendingVerifications = async () => {
    setLoadingVerifications(true);
    const result = await getPendingVerifications();
    if (result.success) {
      setPendingVerifications(result.data);
    } else {
      console.error('Error loading verifications:', result.error);
    }
    setLoadingVerifications(false);
  };

  const handleApproveVerification = async (id: string) => {
    if (!user?.email) return;
    const result = await approveVerification(id, user.email);
    if (result.success) {
      toast({
        title: 'Verification Approved',
        description: 'Student has been verified successfully',
      });
      loadPendingVerifications();
    } else {
      toast({
        title: 'Error',
        description: 'Failed to approve verification',
        variant: 'destructive',
      });
    }
  };

  const handleRejectVerification = async (id: string) => {
    if (!user?.email) return;
    const result = await rejectVerification(id, user.email);
    if (result.success) {
      toast({
        title: 'Verification Rejected',
        description: 'Student verification has been rejected',
      });
      loadPendingVerifications();
    } else {
      toast({
        title: 'Error',
        description: 'Failed to reject verification',
        variant: 'destructive',
      });
    }
  };

  const loadUniversities = async () => {
    setLoadingUniversities(true);
    const result = await getUniversities();
    if (result.success) {
      setUniversities(result.universities);
    }
    setLoadingUniversities(false);
  };

  const handleAddUniversity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUniversity.name.trim() || !newUniversity.area.trim()) {
      toast({
        title: 'Error',
        description: 'Please fill all required fields',
        variant: 'destructive',
      });
      return;
    }

    const result = await addUniversity(newUniversity);
    if (result.success) {
      toast({
        title: 'Success',
        description: 'University added successfully',
      });
      setNewUniversity({ name: '', shortName: '', area: '', city: 'Lucknow' });
      loadUniversities();
    } else {
      toast({
        title: 'Error',
        description: result.error || 'Failed to add university',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteUniversity = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;
    
    const result = await deleteUniversity(id);
    if (result.success) {
      toast({
        title: 'Success',
        description: 'University deleted successfully',
      });
      loadUniversities();
    } else {
      toast({
        title: 'Error',
        description: result.error || 'Failed to delete university',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    if (!loading && (!user || !isAdmin(user.email))) {
      toast({
        title: 'Access Denied',
        description: 'You do not have admin privileges',
        variant: 'destructive',
      });
      navigate('/');
    }
  }, [user, loading, navigate, toast]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!user || !isAdmin(user.email)) {
    return null;
  }

  const handleApprove = (hostel: PendingHostel) => {
    setSelectedHostel(hostel);
    setActionDialog({ open: true, action: 'approve' });
  };

  const handleReject = (hostel: PendingHostel) => {
    setSelectedHostel(hostel);
    setActionDialog({ open: true, action: 'reject' });
  };

  const confirmAction = async () => {
    if (!selectedHostel || !actionDialog.action) return;

    const action = actionDialog.action;
    const result = action === 'approve' 
      ? await approveHostel(selectedHostel.id)
      : await rejectHostel(selectedHostel.id);
    
    if (result.success) {
      toast({
        title: action === 'approve' ? 'Hostel Approved' : 'Hostel Rejected',
        description: `${selectedHostel.name} has been ${action === 'approve' ? 'approved and published' : 'rejected'}`,
      });
      // Reload both lists
      loadPendingHostels();
      loadAllHostels();
    } else {
      toast({
        title: 'Error',
        description: 'Failed to process hostel',
        variant: 'destructive',
      });
    }

    setActionDialog({ open: false, action: null });
    setSelectedHostel(null);
  };

  const stats = [
    {
      title: 'Pending Approvals',
      value: pendingHostels.length,
      icon: Home,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      title: 'Total Hostels',
      value: allHostels.filter(h => h.approved).length,
      icon: TrendingUp,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Total Bookings',
      value: '0',
      icon: CheckCircle2,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Admin Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 rounded-lg bg-primary/10">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage UniHostel platform</p>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Add University Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-8"
          >
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Add University Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Add New University
                  </CardTitle>
                  <CardDescription>
                    Add universities to show in location filters
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddUniversity} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="universityName">University Name *</Label>
                      <Input
                        id="universityName"
                        placeholder="e.g., Lucknow University"
                        value={newUniversity.name}
                        onChange={(e) => setNewUniversity({ ...newUniversity, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shortName">Short Name (Optional)</Label>
                      <Input
                        id="shortName"
                        placeholder="e.g., LU"
                        value={newUniversity.shortName}
                        onChange={(e) => setNewUniversity({ ...newUniversity, shortName: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="area">Area/Locality *</Label>
                      <Input
                        id="area"
                        placeholder="e.g., Babuganj, Aliganj"
                        value={newUniversity.area}
                        onChange={(e) => setNewUniversity({ ...newUniversity, area: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={newUniversity.city}
                        onChange={(e) => setNewUniversity({ ...newUniversity, city: e.target.value })}
                        disabled
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add University
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Universities List */}
              <Card>
                <CardHeader>
                  <CardTitle>Registered Universities</CardTitle>
                  <CardDescription>
                    {universities.length} universities in Lucknow
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingUniversities ? (
                    <p className="text-center text-muted-foreground py-8">Loading...</p>
                  ) : universities.length > 0 ? (
                    <div className="space-y-2 max-h-[400px] overflow-y-auto">
                      {universities.map((uni) => (
                        <div
                          key={uni.id}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <GraduationCap className="w-4 h-4 text-primary" />
                              <h4 className="font-medium">{uni.name}</h4>
                              {uni.shortName && (
                                <Badge variant="secondary" className="text-xs">
                                  {uni.shortName}
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                              <MapPin className="w-3 h-3" />
                              <span>{uni.area}, {uni.city}</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteUniversity(uni.id, uni.name)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <GraduationCap className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium">No universities added yet</p>
                      <p className="text-sm mt-2">Add your first university using the form</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Main Content - Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Tabs defaultValue="approvals" className="space-y-6">
              <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-6">
                <TabsTrigger value="approvals">
                  Pending Approvals
                  {pendingHostels.length > 0 && (
                    <Badge variant="destructive" className="ml-2 px-1.5 py-0.5 text-xs">
                      {pendingHostels.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="hostels">All Hostels</TabsTrigger>
                <TabsTrigger value="bookings">Bookings</TabsTrigger>
                <TabsTrigger value="verifications">
                  Verifications
                  {pendingVerifications.length > 0 && (
                    <Badge variant="destructive" className="ml-2 px-1.5 py-0.5 text-xs">
                      {pendingVerifications.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="messages">
                  Messages
                  {contactMessages.filter(m => !m.read).length > 0 && (
                    <Badge variant="destructive" className="ml-2 px-1.5 py-0.5 text-xs">
                      {contactMessages.filter(m => !m.read).length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="universities">Universities</TabsTrigger>
              </TabsList>

              {/* Pending Approvals Tab */}
              <TabsContent value="approvals">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Pending Hostel Approvals</CardTitle>
                        <CardDescription>
                          Review and approve hostel listings submitted by owners
                        </CardDescription>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={loadPendingHostels}
                        disabled={loadingHostels}
                      >
                        {loadingHostels ? 'Loading...' : 'Refresh'}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {loadingHostels ? (
                      <div className="text-center py-12">
                        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Loading pending hostels...</p>
                      </div>
                    ) : pendingHostels.length > 0 ? (
                      pendingHostels.map((hostel) => (
                        <Card key={hostel.id} className="border-l-4 border-l-orange-500">
                          <CardContent className="pt-6">
                            <div className="space-y-4">
                              {/* Hostel Info */}
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-xl font-semibold mb-1">{hostel.name}</h3>
                                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-sm">{hostel.location}</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-2">{hostel.address}</p>
                                </div>
                                <Badge variant="outline" className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {hostel.createdAt ? new Date(hostel.createdAt.toDate()).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  }) : 'Just now'}
                                </Badge>
                              </div>

                              {/* Details Grid */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Price</p>
                                  <p className="font-bold text-primary">₹{hostel.price.toLocaleString()}/month</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Room Type</p>
                                  <p className="font-medium">{hostel.type || hostel.roomType || 'N/A'}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Facilities</p>
                                  <p className="font-medium">{hostel.facilities.length} amenities</p>
                                </div>
                              </div>

                              {/* Contact Info */}
                              <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
                                <p className="text-sm font-medium">Contact Details:</p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                                  <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-muted-foreground" />
                                    <span>{hostel.ownerName || hostel.contactName || 'N/A'}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-muted-foreground" />
                                    <span>{hostel.ownerEmail || hostel.contactEmail || 'N/A'}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-muted-foreground" />
                                    <span>{hostel.ownerPhone || hostel.contactPhone || 'N/A'}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Description */}
                              <div>
                                <p className="text-sm font-medium mb-1">Description:</p>
                                <p className="text-sm text-muted-foreground">{hostel.description}</p>
                              </div>

                              {/* Facilities */}
                              <div>
                                <p className="text-sm font-medium mb-2">Facilities:</p>
                                <div className="flex flex-wrap gap-2">
                                  {hostel.facilities.map((facility) => (
                                    <Badge key={facility} variant="secondary">
                                      {facility}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex gap-2 pt-4 border-t">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1"
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </Button>
                                <Button
                                  variant="default"
                                  size="sm"
                                  className="flex-1"
                                  onClick={() => handleApprove(hostel)}
                                >
                                  <CheckCircle2 className="w-4 h-4 mr-2" />
                                  Approve
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="flex-1"
                                  onClick={() => handleReject(hostel)}
                                >
                                  <XCircle className="w-4 h-4 mr-2" />
                                  Reject
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <CheckCircle2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">No pending approvals</p>
                        <p className="text-sm mt-2">All hostel listings have been reviewed</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* All Hostels Tab */}
              <TabsContent value="hostels">
                <Card>
                  <CardHeader>
                    <CardTitle>All Hostels</CardTitle>
                    <CardDescription>Manage approved hostel listings ({allHostels.filter(h => h.approved).length} active)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {allHostels.filter(h => h.approved).length > 0 ? (
                      <div className="space-y-4">
                        {allHostels.filter(h => h.approved).map((hostel) => (
                          <Card key={hostel.id}>
                            <CardContent className="p-6">
                              <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                  <h3 className="font-semibold text-lg">{hostel.name}</h3>
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <MapPin className="w-4 h-4" />
                                      {hostel.location}
                                    </span>
                                    <Badge variant="secondary">{hostel.type || 'N/A'}</Badge>
                                    <span className="font-medium text-foreground">₹{hostel.price}/month</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground line-clamp-2">{hostel.description}</p>
                                </div>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={async () => {
                                    if (confirm(`Are you sure you want to delete ${hostel.name}?`)) {
                                      const result = await deleteHostel(hostel.id);
                                      if (result.success) {
                                        toast({ title: 'Success', description: 'Hostel deleted successfully' });
                                        loadAllHostels();
                                      } else {
                                        toast({ title: 'Error', description: 'Failed to delete hostel', variant: 'destructive' });
                                      }
                                    }
                                  }}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <Home className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">No hostels yet</p>
                        <p className="text-sm mt-2">Approved hostels will appear here</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Bookings Tab */}
              <TabsContent value="bookings">
                <Card>
                  <CardHeader>
                    <CardTitle>Booking Management</CardTitle>
                    <CardDescription>Monitor and manage hostel bookings ({allBookings.length} total)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loadingBookings ? (
                      <div className="text-center py-12">
                        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Loading bookings...</p>
                      </div>
                    ) : allBookings.length > 0 ? (
                      <div className="space-y-4">
                        {allBookings.map((booking) => (
                          <Card key={booking.id} className={`border-l-4 ${
                            booking.status === 'approved' ? 'border-l-green-500' : 
                            booking.status === 'pending' ? 'border-l-orange-500' : 
                            'border-l-red-500'
                          }`}>
                            <CardContent className="p-6">
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
                                      variant={booking.status === 'approved' ? 'default' : booking.status === 'pending' ? 'secondary' : 'destructive'}
                                    >
                                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                    </Badge>
                                  </div>

                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm pt-2">
                                    <div>
                                      <p className="text-muted-foreground text-xs">User</p>
                                      <p className="font-medium">{booking.userName}</p>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground text-xs">Email</p>
                                      <p className="font-medium text-xs">{booking.userEmail}</p>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground text-xs">Price</p>
                                      <p className="font-medium">₹{booking.price.toLocaleString()}/mo</p>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground text-xs">Booked On</p>
                                      <p className="font-medium">
                                        {booking.createdAt ? new Date(booking.createdAt.toDate()).toLocaleDateString('en-IN', { 
                                          day: 'numeric', 
                                          month: 'short'
                                        }) : 'N/A'}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {booking.status === 'pending' && (
                                  <div className="flex lg:flex-col gap-2">
                                    <Button
                                      size="sm"
                                      onClick={async () => {
                                        const result = await approveBooking(booking.id);
                                        if (result.success) {
                                          toast({ title: 'Success', description: 'Booking approved' });
                                          loadBookings();
                                        } else {
                                          toast({ title: 'Error', description: 'Failed to approve', variant: 'destructive' });
                                        }
                                      }}
                                    >
                                      <CheckCircle2 className="w-4 h-4 mr-1" />
                                      Approve
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={async () => {
                                        const result = await rejectBooking(booking.id);
                                        if (result.success) {
                                          toast({ title: 'Success', description: 'Booking rejected' });
                                          loadBookings();
                                        } else {
                                          toast({ title: 'Error', description: 'Failed to reject', variant: 'destructive' });
                                        }
                                      }}
                                    >
                                      <XCircle className="w-4 h-4 mr-1" />
                                      Reject
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">No bookings yet</p>
                        <p className="text-sm mt-2">Bookings will appear here once students start booking hostels</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Verifications Tab */}
              <TabsContent value="verifications">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="w-5 h-5" />
                          Student Verifications
                        </CardTitle>
                        <CardDescription>Review and approve student verification requests</CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={loadPendingVerifications}
                        disabled={loadingVerifications}
                      >
                        {loadingVerifications ? 'Loading...' : 'Refresh'}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {pendingVerifications.length > 0 ? (
                      <div className="space-y-4">
                        {pendingVerifications.map((verification) => (
                          <Card key={verification.id} className="border-primary">
                            <CardContent className="pt-6">
                              <div className="space-y-4">
                                <div className="flex items-start justify-between">
                                  <div className="space-y-1">
                                    <h4 className="font-semibold text-lg">{verification.userName}</h4>
                                    <p className="text-sm text-muted-foreground">{verification.userEmail}</p>
                                    <p className="text-xs text-muted-foreground">
                                      Submitted: {verification.createdAt?.toDate().toLocaleString()}
                                    </p>
                                  </div>
                                  <Badge variant="secondary">Pending Review</Badge>
                                </div>

                                <Separator />

                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <h5 className="font-medium mb-2 flex items-center gap-2">
                                      <FileText className="w-4 h-4" />
                                      Aadhaar Card
                                    </h5>
                                    <div className="border rounded-lg overflow-hidden">
                                      <img 
                                        src={verification.aadhaarCard} 
                                        alt="Aadhaar Card" 
                                        className="w-full h-48 object-contain bg-muted"
                                      />
                                    </div>
                                  </div>

                                  <div>
                                    <h5 className="font-medium mb-2 flex items-center gap-2">
                                      <GraduationCap className="w-4 h-4" />
                                      College ID
                                    </h5>
                                    <div className="border rounded-lg overflow-hidden">
                                      <img 
                                        src={verification.collegeId} 
                                        alt="College ID" 
                                        className="w-full h-48 object-contain bg-muted"
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="flex gap-2 justify-end">
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => {
                                      if (verification.id && confirm('Reject this verification?')) {
                                        handleRejectVerification(verification.id);
                                      }
                                    }}
                                  >
                                    <XCircle className="w-4 h-4 mr-1" />
                                    Reject
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() => {
                                      if (verification.id && confirm('Approve this student?')) {
                                        handleApproveVerification(verification.id);
                                      }
                                    }}
                                  >
                                    <CheckCircle2 className="w-4 h-4 mr-1" />
                                    Approve
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <Shield className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">No pending verifications</p>
                        <p className="text-sm mt-2">Student verification requests will appear here</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Contact Messages Tab */}
              <TabsContent value="messages">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <MessageSquare className="w-5 h-5" />
                          Contact Messages
                        </CardTitle>
                        <CardDescription>Messages from contact form</CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={loadContactMessages}
                        disabled={loadingMessages}
                      >
                        {loadingMessages ? 'Loading...' : 'Refresh'}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {contactMessages.length > 0 ? (
                      <div className="space-y-4">
                        {contactMessages.map((message) => (
                          <Card key={message.id} className={message.read ? 'opacity-70' : 'border-primary'}>
                            <CardContent className="pt-6">
                              <div className="space-y-4">
                                <div className="flex items-start justify-between">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-semibold text-lg">{message.name}</h4>
                                      {!message.read && (
                                        <Badge variant="default" className="text-xs">New</Badge>
                                      )}
                                    </div>
                                    <p className="text-sm text-muted-foreground font-medium">{message.subject}</p>
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {message.createdAt?.toDate().toLocaleString()}
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-1.5">
                                      <Mail className="w-4 h-4 text-muted-foreground" />
                                      <a href={`mailto:${message.email}`} className="text-primary hover:underline">
                                        {message.email}
                                      </a>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <Phone className="w-4 h-4 text-muted-foreground" />
                                      <a href={`tel:${message.phone}`} className="hover:underline">
                                        {message.phone}
                                      </a>
                                    </div>
                                  </div>

                                  <div className="bg-muted/50 rounded-lg p-4 border">
                                    <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                                  </div>
                                </div>

                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={async () => {
                                      if (message.id) {
                                        await markMessageAsRead(message.id);
                                        loadContactMessages();
                                        toast({
                                          title: 'Message marked as read',
                                        });
                                      }
                                    }}
                                    disabled={message.read}
                                  >
                                    <CheckCircle2 className="w-4 h-4 mr-1" />
                                    {message.read ? 'Read' : 'Mark as Read'}
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      window.location.href = `mailto:${message.email}?subject=Re: ${message.subject}`;
                                    }}
                                  >
                                    <Mail className="w-4 h-4 mr-1" />
                                    Reply via Email
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={async () => {
                                      if (message.id && confirm('Delete this message?')) {
                                        await deleteContactMessage(message.id);
                                        loadContactMessages();
                                        toast({
                                          title: 'Message deleted',
                                        });
                                      }
                                    }}
                                  >
                                    <Trash2 className="w-4 h-4 mr-1" />
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">No messages yet</p>
                        <p className="text-sm mt-2">Messages from the contact form will appear here</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={actionDialog.open} onOpenChange={(open) => setActionDialog({ ...actionDialog, open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionDialog.action === 'approve' ? 'Approve Hostel?' : 'Reject Hostel?'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {actionDialog.action === 'approve'
                ? `Are you sure you want to approve "${selectedHostel?.name}"? It will be published on the website immediately.`
                : `Are you sure you want to reject "${selectedHostel?.name}"? The owner will be notified.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmAction}
              className={actionDialog.action === 'reject' ? 'bg-destructive text-destructive-foreground' : ''}
            >
              {actionDialog.action === 'approve' ? 'Approve' : 'Reject'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}
