import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { getHostelRatings, getHostelRatingStats, type Rating, type RatingStats } from '@/lib/ratings';
import { formatDistanceToNow } from 'date-fns';

interface RatingsListProps {
  hostelId: string;
}

export function RatingsList({ hostelId }: RatingsListProps) {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [stats, setStats] = useState<RatingStats>({
    averageRating: 0,
    totalRatings: 0,
    distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRatings();
  }, [hostelId]);

  const loadRatings = async () => {
    setLoading(true);
    const [ratingsResult, statsResult] = await Promise.all([
      getHostelRatings(hostelId),
      getHostelRatingStats(hostelId),
    ]);

    if (ratingsResult.success) {
      setRatings(ratingsResult.data);
    }
    setStats(statsResult);
    setLoading(false);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="h-20 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-6">Ratings & Reviews</h2>

        {stats.totalRatings === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Star className="w-12 h-12 mx-auto mb-2 text-muted-foreground/50" />
            <p>No ratings yet</p>
            <p className="text-sm">Be the first to rate this hostel!</p>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Average Rating */}
              <div className="text-center md:text-left">
                <div className="flex items-end gap-2 justify-center md:justify-start">
                  <span className="text-5xl font-bold">{stats.averageRating}</span>
                  <Star className="w-8 h-8 fill-yellow-500 text-yellow-500 mb-2" />
                </div>
                <p className="text-muted-foreground mt-2">
                  Based on {stats.totalRatings} {stats.totalRatings === 1 ? 'review' : 'reviews'}
                </p>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-sm w-8">{star} ⭐</span>
                    <Progress 
                      value={(stats.distribution[star] / stats.totalRatings) * 100} 
                      className="h-2"
                    />
                    <span className="text-sm text-muted-foreground w-8">
                      {stats.distribution[star]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-6" />

            {/* Reviews List */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Recent Reviews</h3>
              {ratings.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No reviews with comments yet</p>
              ) : (
                ratings.map((rating) => (
                  <div key={rating.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{rating.userName}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= rating.rating
                                  ? 'fill-yellow-500 text-yellow-500'
                                  : 'fill-gray-200 text-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(rating.createdAt.toDate(), { addSuffix: true })}
                      </span>
                    </div>
                    {rating.review && (
                      <p className="text-muted-foreground text-sm mt-2">{rating.review}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
