import { useState } from 'react';
import { Search, MapPin, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { locations } from '@/data/hostels';

interface SearchBarProps {
  onSearch?: (filters: {
    location: string;
    priceRange: string;
    hostelType: string;
  }) => void;
  variant?: 'hero' | 'compact';
}

export function SearchBar({ onSearch, variant = 'hero' }: SearchBarProps) {
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [hostelType, setHostelType] = useState('');

  const handleSearch = () => {
    onSearch?.({
      location,
      priceRange,
      hostelType,
    });
  };

  if (variant === 'compact') {
    return (
      <div className="flex flex-col sm:flex-row gap-3 bg-card p-4 rounded-xl shadow-lg border border-border">
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={handleSearch}>
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card p-4 md:p-6 rounded-2xl shadow-xl border border-border">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Location
          </label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Select university" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Price Range
          </label>
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger>
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-5000">Under ₹5,000</SelectItem>
              <SelectItem value="5000-7500">₹5,000 - ₹7,500</SelectItem>
              <SelectItem value="7500-10000">₹7,500 - ₹10,000</SelectItem>
              <SelectItem value="10000+">Above ₹10,000</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Hostel Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Users className="w-4 h-4" />
            Hostel Type
          </label>
          <Select value={hostelType} onValueChange={setHostelType}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="boys">Boys</SelectItem>
              <SelectItem value="girls">Girls</SelectItem>
              <SelectItem value="coed">Co-ed / Co-living</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <Button size="lg" className="w-full" onClick={handleSearch}>
            <Search className="w-4 h-4 mr-2" />
            Find Hostels
          </Button>
        </div>
      </div>
    </div>
  );
}
