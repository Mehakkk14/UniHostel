import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/search/SearchBar';
import { HostelCard } from '@/components/hostel/HostelCard';
import { Layout } from '@/components/layout/Layout';
import { getHostels } from '@/lib/firestore';
import type { Hostel } from '@/data/hostels';
import { useState, useEffect } from 'react';
import { 
  Search, 
  GitCompare, 
  CalendarCheck, 
  Shield, 
  Clock, 
  ThumbsUp,
  ArrowRight,
  Building2,
  Users,
  Star
} from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function HomePage() {
  const navigate = useNavigate();
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHostels();
  }, []);

  const loadHostels = async () => {
    setLoading(true);
    const result = await getHostels();
    if (result.success) {
      setHostels(result.data);
    }
    setLoading(false);
  };

  const featuredHostels = hostels.slice(0, 3);

  const handleSearch = (filters: { location: string; priceRange: string; hostelType: string }) => {
    const params = new URLSearchParams();
    if (filters.location) params.set('location', filters.location);
    if (filters.priceRange) params.set('price', filters.priceRange);
    if (filters.hostelType) params.set('type', filters.hostelType);
    navigate(`/find-hostels?${params.toString()}`);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroBg} 
            alt="University campus" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary-foreground text-sm font-medium backdrop-blur-sm">
                <Star className="w-4 h-4 fill-current" />
                Trusted by 10,000+ Students
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background leading-tight">
                Find Your Perfect{' '}
                <span className="text-primary">Hostel</span>{' '}
                in Lucknow
              </h1>

              <p className="text-lg md:text-xl text-background/80 max-w-xl">
                Discover verified student accommodations in Lucknow with transparent pricing, real reviews, and instant booking. Your home away from home starts here.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/find-hostels">
                    Find Hostels
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button variant="heroOutline" size="xl" asChild>
                  <Link to="/contact">
                    List Your Hostel
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-8 border-t border-background/20">
                <div>
                  <div className="text-3xl font-bold text-background">150+</div>
                  <div className="text-sm text-background/60">Verified Hostels</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-background">10+</div>
                  <div className="text-sm text-background/60">Universities in Lucknow</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-background">5K+</div>
                  <div className="text-sm text-background/60">Happy Students</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 -mt-16 relative z-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <SearchBar onSearch={handleSearch} />
          </motion.div>
        </div>
      </section>

      {/* Featured Hostels */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-12"
          >
            <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto">
              <span className="text-primary font-semibold text-sm uppercase tracking-wide">
                Top Picks
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                Featured Hostels
              </h2>
              <p className="text-muted-foreground mt-4">
                Hand-picked accommodations loved by students in Lucknow
              </p>
            </motion.div>

            {featuredHostels.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredHostels.map((hostel, index) => (
                    <HostelCard key={hostel.id} hostel={hostel} index={index} />
                  ))}
                </div>

                <motion.div variants={fadeInUp} className="text-center">
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/find-hostels">
                      View All Hostels
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </motion.div>
              </>
            ) : (
              <motion.div variants={fadeInUp} className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <Building2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No Hostels Yet</h3>
                  <p className="text-muted-foreground mb-6">
                    We're currently reviewing hostel submissions. Check back soon for verified accommodations!
                  </p>
                  <Button asChild>
                    <Link to="/contact">
                      List Your Hostel
                    </Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-12"
          >
            <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto">
              <span className="text-primary font-semibold text-sm uppercase tracking-wide">
                Simple Process
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                How It Works
              </h2>
              <p className="text-muted-foreground mt-4">
                Finding your ideal hostel is just three simple steps away
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Search,
                  title: 'Search',
                  description: 'Browse through verified hostels near your university in Lucknow with detailed filters.',
                  step: '01'
                },
                {
                  icon: GitCompare,
                  title: 'Compare',
                  description: 'Compare prices, facilities, and reviews to find your perfect match.',
                  step: '02'
                },
                {
                  icon: CalendarCheck,
                  title: 'Book',
                  description: 'Secure your spot with instant booking and move in hassle-free.',
                  step: '03'
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  className="relative bg-card p-8 rounded-2xl shadow-lg border border-border hover:shadow-xl transition-shadow group"
                >
                  <span className="absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg">
                    {item.step}
                  </span>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why UniHostel */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeInUp} className="space-y-8">
              <div>
                <span className="text-primary font-semibold text-sm uppercase tracking-wide">
                  Why Choose Us
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                  Why Students Love UniHostel
                </h2>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: Shield,
                    title: 'Verified Listings',
                    description: 'Every hostel is personally verified by our team for quality assurance.'
                  },
                  {
                    icon: Clock,
                    title: 'Instant Booking',
                    description: 'Book your hostel in minutes with our streamlined process.'
                  },
                  {
                    icon: ThumbsUp,
                    title: 'Genuine Reviews',
                    description: 'Read real reviews from verified students who stayed there.'
                  }
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button size="lg" asChild>
                <Link to="/about">
                  Learn More About Us
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-6 text-primary-foreground">
                    <Building2 className="w-10 h-10 mb-4" />
                    <div className="text-4xl font-bold">150+</div>
                    <div className="text-sm opacity-80">Verified Hostels</div>
                  </div>
                  <div className="bg-card rounded-2xl p-6 border border-border shadow-lg">
                    <Users className="w-10 h-10 text-primary mb-4" />
                    <div className="text-4xl font-bold text-foreground">5K+</div>
                    <div className="text-sm text-muted-foreground">Happy Students</div>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-card rounded-2xl p-6 border border-border shadow-lg">
                    <Star className="w-10 h-10 text-warning mb-4" />
                    <div className="text-4xl font-bold text-foreground">4.8</div>
                    <div className="text-sm text-muted-foreground">Average Rating</div>
                  </div>
                  <div className="bg-gradient-to-br from-accent to-primary rounded-2xl p-6 text-accent-foreground">
                    <Shield className="w-10 h-10 mb-4" />
                    <div className="text-4xl font-bold">100%</div>
                    <div className="text-sm opacity-80">Secure Booking</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              Are You a Hostel Owner in Lucknow?
            </h2>
            <p className="text-lg text-primary-foreground/80">
              Join UniHostel and reach thousands of students looking for accommodation in Lucknow. List your property for free and start getting bookings today.
            </p>
            <Button 
              size="xl" 
              variant="secondary"
              className="bg-card text-primary hover:bg-card/90"
              asChild
            >
              <Link to="/contact">
                List Your Hostel for Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
