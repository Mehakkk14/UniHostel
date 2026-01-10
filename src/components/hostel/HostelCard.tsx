import { motion } from 'framer-motion';
import { Star, MapPin, Wifi, Utensils, Snowflake, Car, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Hostel, facilityIcons } from '@/data/hostels';
import { Link } from 'react-router-dom';

interface HostelCardProps {
  hostel: Hostel;
  index?: number;
}

const facilityIconComponents: Record<string, React.ReactNode> = {
  wifi: <Wifi className="w-3.5 h-3.5" />,
  food: <Utensils className="w-3.5 h-3.5" />,
  ac: <Snowflake className="w-3.5 h-3.5" />,
  parking: <Car className="w-3.5 h-3.5" />,
};

export function HostelCard({ hostel, index = 0 }: HostelCardProps) {
  const typeColors = {
    boys: 'bg-blue-100 text-blue-700 border-blue-200',
    girls: 'bg-pink-100 text-pink-700 border-pink-200',
    coed: 'bg-purple-100 text-purple-700 border-purple-200',
  };

  const typeLabels = {
    boys: 'Boys',
    girls: 'Girls',
    coed: 'Co-ed',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={hostel.images && hostel.images.length > 0 ? hostel.images[0] : '/placeholder.svg'}
          alt={hostel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className={`${typeColors[hostel.type]} border font-medium`}>
            {typeLabels[hostel.type]}
          </Badge>
          {!hostel.available && (
            <Badge variant="destructive">Fully Booked</Badge>
          )}
        </div>

        {/* Wishlist */}
        <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors group/heart">
          <Heart className="w-5 h-5 text-muted-foreground group-hover/heart:text-destructive transition-colors" />
        </button>

        {/* Price */}
        <div className="absolute bottom-3 right-3 bg-card px-3 py-1.5 rounded-lg shadow-lg">
          <span className="text-lg font-bold text-primary">₹{hostel.price.toLocaleString()}</span>
          <span className="text-xs text-muted-foreground">/month</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title & Rating */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg text-card-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {hostel.name}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="w-4 h-4 fill-warning text-warning" />
            <span className="font-semibold text-sm">{hostel.rating}</span>
            <span className="text-xs text-muted-foreground">({hostel.reviews})</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{hostel.location}</span>
          <span className="text-xs">• {hostel.distance}</span>
        </div>

        {/* Facilities */}
        <div className="flex flex-wrap gap-2">
          {hostel.facilities.slice(0, 4).map((facility) => (
            <span
              key={facility}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground"
            >
              {facilityIconComponents[facility] || facilityIcons[facility]}
              <span className="capitalize">{facility}</span>
            </span>
          ))}
          {hostel.facilities.length > 4 && (
            <span className="px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground">
              +{hostel.facilities.length - 4} more
            </span>
          )}
        </div>

        {/* Action */}
        <div className="pt-2 flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link to={`/hostel/${hostel.id}`}>View Details</Link>
          </Button>
          <Button size="sm" className="flex-1" disabled={!hostel.available} asChild>
            <Link to={`/hostel/${hostel.id}`}>
              {hostel.available ? 'Book Now' : 'Waitlist'}
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
