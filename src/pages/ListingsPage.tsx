import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { HostelCard } from '@/components/hostel/HostelCard';
import { locations, facilityLabels } from '@/data/hostels';
import { getHostels } from '@/lib/firestore';
import type { Hostel } from '@/data/hostels';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  MapPin,
  LayoutGrid,
  LayoutList
} from 'lucide-react';

export default function ListingsPage() {
  const [searchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [loading, setLoading] = useState(true);

  // Load hostels from Firebase
  useEffect(() => {
    loadHostels();
  }, []);

  const loadHostels = async () => {
    setLoading(true);
    console.log('Loading hostels from Firebase...');
    const result = await getHostels();
    console.log('Hostels result:', result);
    if (result.success) {
      console.log('Hostels loaded:', result.data);
      setHostels(result.data);
    } else {
      console.error('Failed to load hostels:', result.error);
    }
    setLoading(false);
  };

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || 'all');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'all');
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  // Filter hostels
  const filteredHostels = useMemo(() => {
    return hostels.filter((hostel) => {
      // Search query
      if (searchQuery && !hostel.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !hostel.location.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Location
      if (selectedLocation && selectedLocation !== 'all' && !hostel.location.includes(selectedLocation)) {
        return false;
      }

      // Type
      if (selectedType && selectedType !== 'all' && hostel.type !== selectedType) {
        return false;
      }

      // Facilities
      if (selectedFacilities.length > 0 && 
          !selectedFacilities.every(f => hostel.facilities.includes(f))) {
        return false;
      }

      // Rating
      if (hostel.rating < minRating) {
        return false;
      }

      // Availability
      if (showAvailableOnly && !hostel.available) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedLocation, selectedType, selectedFacilities, minRating, showAvailableOnly, hostels]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLocation('all');
    setSelectedType('all');
    setSelectedFacilities([]);
    setMinRating(0);
    setShowAvailableOnly(false);
  };

  const toggleFacility = (facility: string) => {
    setSelectedFacilities(prev => 
      prev.includes(facility) 
        ? prev.filter(f => f !== facility)
        : [...prev, facility]
    );
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Location */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Location</Label>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger>
            <SelectValue placeholder="All locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All locations</SelectItem>
            {locations.map((loc) => (
              <SelectItem key={loc} value={loc}>{loc}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Hostel Type */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Hostel Type</Label>
        <div className="space-y-2">
          {[
            { value: 'all', label: 'All Types' },
            { value: 'boys', label: 'Boys' },
            { value: 'girls', label: 'Girls' },
            { value: 'coed', label: 'Co-ed / Co-living' }
          ].map((type) => (
            <div key={type.value} className="flex items-center gap-2">
              <Checkbox
                id={`type-${type.value}`}
                checked={selectedType === type.value}
                onCheckedChange={() => setSelectedType(type.value)}
              />
              <Label htmlFor={`type-${type.value}`} className="text-sm cursor-pointer">
                {type.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Facilities */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Facilities</Label>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(facilityLabels).map(([key, label]) => (
            <div key={key} className="flex items-center gap-2">
              <Checkbox
                id={`facility-${key}`}
                checked={selectedFacilities.includes(key)}
                onCheckedChange={() => toggleFacility(key)}
              />
              <Label htmlFor={`facility-${key}`} className="text-xs cursor-pointer">
                {label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Minimum Rating</Label>
        <Select value={minRating.toString()} onValueChange={(v) => setMinRating(Number(v))}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Any rating</SelectItem>
            <SelectItem value="3">3+ stars</SelectItem>
            <SelectItem value="4">4+ stars</SelectItem>
            <SelectItem value="4.5">4.5+ stars</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Availability */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="available-only"
          checked={showAvailableOnly}
          onCheckedChange={(checked) => setShowAvailableOnly(checked as boolean)}
        />
        <Label htmlFor="available-only" className="text-sm cursor-pointer">
          Show available only
        </Label>
      </div>

      {/* Clear Filters */}
      <Button variant="outline" className="w-full" onClick={clearFilters}>
        <X className="w-4 h-4 mr-2" />
        Clear Filters
      </Button>
    </div>
  );

  return (
    <Layout>
      {loading ? (
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="animate-pulse space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full mx-auto"></div>
            <p className="text-muted-foreground">Loading hostels...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <section className="bg-gradient-to-b from-primary/5 to-background py-12">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl"
              >
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Find Your Ideal Hostel in Lucknow
                </h1>
                <p className="text-muted-foreground mt-2">
                  Browse {hostels.length} verified hostels in Lucknow
                </p>
              </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 flex flex-col sm:flex-row gap-4"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by hostel name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={loadHostels}
                disabled={loading}
              >
                {loading ? 'Refreshing...' : 'Refresh'}
              </Button>
              <Button
                variant="outline"
                className="lg:hidden"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <div className="flex border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-card hover:bg-muted'}`}
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'bg-card hover:bg-muted'}`}
                >
                  <LayoutList className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-24 bg-card p-6 rounded-2xl border border-border shadow-sm">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </h3>
                <FilterSidebar />
              </div>
            </aside>

            {/* Mobile Filter Drawer */}
            {isFilterOpen && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div 
                  className="absolute inset-0 bg-foreground/50"
                  onClick={() => setIsFilterOpen(false)}
                />
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  className="absolute left-0 top-0 bottom-0 w-80 bg-card p-6 overflow-y-auto"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4" />
                      Filters
                    </h3>
                    <button onClick={() => setIsFilterOpen(false)}>
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <FilterSidebar />
                </motion.div>
              </div>
            )}

            {/* Results */}
            <div className="flex-1">
              {/* Results Count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filteredHostels.length}</span> hostels
                </p>
                {selectedLocation && selectedLocation !== 'all' && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-sm">
                    <MapPin className="w-3 h-3 text-primary" />
                    {selectedLocation}
                    <button onClick={() => setSelectedLocation('all')}>
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              {/* Grid/List */}
              {filteredHostels.length > 0 ? (
                <div className={
                  viewMode === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                }>
                  {filteredHostels.map((hostel, index) => (
                    <HostelCard key={hostel.id} hostel={hostel} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Search className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {hostels.length === 0 ? 'No Hostels Available Yet' : 'No hostels found'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {hostels.length === 0 
                      ? 'Hostels are being reviewed and will be listed soon. Check back later!' 
                      : 'Try adjusting your filters to find more options'}
                  </p>
                  {hostels.length === 0 ? (
                    <Button asChild>
                      <Link to="/contact">List Your Hostel</Link>
                    </Button>
                  ) : (
                    <Button variant="outline" onClick={clearFilters}>
                      Clear All Filters
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      </>
      )}
    </Layout>
  );
}
