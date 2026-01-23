import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { getUserWishlist, removeFromWishlist, type WishlistItem } from '@/lib/wishlist';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, MapPin, Star, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function WishlistPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    loadWishlist();
  }, [user, navigate]);

  const loadWishlist = async () => {
    if (!user) return;
    setLoading(true);
    const result = await getUserWishlist(user.uid);
    if (result.success) {
      setWishlist(result.data);
    }
    setLoading(false);
  };

  const handleRemove = async (hostelId: string) => {
    if (!user) return;
    
    setRemoving(hostelId);
    const result = await removeFromWishlist(user.uid, hostelId);
    setRemoving(null);

    if (result.success) {
      setWishlist(wishlist.filter(item => item.hostelId !== hostelId));
      toast({
        title: 'Removed',
        description: 'Hostel removed from wishlist',
      });
    } else {
      toast({
        title: 'Error',
        description: result.message,
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
            <p className="text-muted-foreground">Loading wishlist...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-8 h-8 text-red-500 fill-red-500" />
              <h1 className="text-3xl md:text-4xl font-bold">My Wishlist</h1>
            </div>
            <p className="text-muted-foreground">
              {wishlist.length === 0 
                ? 'No saved hostels yet' 
                : `${wishlist.length} ${wishlist.length === 1 ? 'hostel' : 'hostels'} saved`}
            </p>
          </motion.div>

          {/* Wishlist Grid */}
          {wishlist.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Heart className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
                <p className="text-muted-foreground mb-6">
                  Start exploring hostels and save your favorites here
                </p>
                <Button asChild>
                  <Link to="/find-hostels">Browse Hostels</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <Link to={`/hostel/${item.hostelId}`}>
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={item.hostelImage || '/placeholder.svg'}
                          alt={item.hostelName}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.svg';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-3 right-3 bg-card px-3 py-1.5 rounded-lg">
                          <span className="text-lg font-bold text-primary">
                            ₹{item.hostelPrice.toLocaleString()}
                          </span>
                          <span className="text-xs text-muted-foreground">/month</span>
                        </div>
                      </div>
                    </Link>

                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <Link to={`/hostel/${item.hostelId}`}>
                          <h3 className="font-semibold text-lg hover:text-primary transition-colors line-clamp-1">
                            {item.hostelName}
                          </h3>
                        </Link>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span className="line-clamp-1">{item.hostelLocation}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                          <span className="font-semibold text-sm">{item.hostelRating || 0}</span>
                          <span className="text-xs text-muted-foreground">
                            ({item.hostelReviews || 0})
                          </span>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemove(item.hostelId)}
                          disabled={removing === item.hostelId}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
