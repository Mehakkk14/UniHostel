import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Eye, 
  Shield, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  Building2,
  Heart,
  Sparkles
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              About UniHostel
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-6">
              Redefining Student{' '}
              <span className="text-primary">Accommodation</span>
            </h1>
            <p className="text-lg text-muted-foreground mt-6 leading-relaxed">
              We're on a mission to make finding quality student housing as simple as ordering food online. No more endless searching, no more uncertainty—just verified, trusted accommodations at your fingertips.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  UniHostel was born out of a personal frustration. As students ourselves, we experienced the chaos of finding reliable accommodation near universities—endless calls, misleading photos, and surprise fees.
                </p>
                <p>
                  In 2023, we decided to change that. We built a platform where every listing is verified, every review is genuine, and every booking is transparent. Today, UniHostel connects thousands of students with their ideal hostels across India.
                </p>
                <p>
                  Our team of dedicated individuals works tirelessly to ensure that your hostel search is smooth, secure, and stress-free. Because we believe every student deserves a home away from home.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-card rounded-2xl p-6 border border-border shadow-lg">
                <Building2 className="w-10 h-10 text-primary mb-4" />
                <div className="text-3xl font-bold text-foreground">150+</div>
                <div className="text-sm text-muted-foreground">Verified Hostels</div>
              </div>
              <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-6 text-primary-foreground mt-8">
                <Users className="w-10 h-10 mb-4" />
                <div className="text-3xl font-bold">5K+</div>
                <div className="text-sm opacity-80">Happy Students</div>
              </div>
              <div className="bg-gradient-to-br from-accent to-primary rounded-2xl p-6 text-accent-foreground">
                <Heart className="w-10 h-10 mb-4" />
                <div className="text-3xl font-bold">10+</div>
                <div className="text-sm opacity-80">Universities in Lucknow</div>
              </div>
              <div className="bg-card rounded-2xl p-6 border border-border shadow-lg mt-8">
                <Shield className="w-10 h-10 text-primary mb-4" />
                <div className="text-3xl font-bold text-foreground">100%</div>
                <div className="text-sm text-muted-foreground">Secure Booking</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 border border-border shadow-lg"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To simplify the student accommodation search process by providing a trusted platform where quality, transparency, and convenience come together. We strive to connect every student with a safe, comfortable, and affordable home near their educational institution.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl p-8 border border-border shadow-lg"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To become India's most trusted student accommodation platform, where every student can find their perfect hostel within minutes. We envision a future where relocating for education is exciting, not stressful—where students focus on learning while we take care of their living.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Different */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wide">
              Our Promise
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              Why UniHostel is Different
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Verified Listings',
                description: 'Every hostel is personally inspected and verified by our team.',
                icon: CheckCircle2
              },
              {
                title: 'Transparent Pricing',
                description: 'No hidden fees. What you see is exactly what you pay.',
                icon: Shield
              },
              {
                title: 'Real Reviews',
                description: 'Genuine feedback from verified students who actually stayed.',
                icon: Users
              },
              {
                title: 'Instant Support',
                description: '24/7 customer support to help you at every step.',
                icon: Heart
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* For Students & Owners */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card/10 backdrop-blur-sm rounded-2xl p-8 border border-card/20"
            >
              <h3 className="text-2xl font-bold text-primary-foreground mb-4">For Students</h3>
              <ul className="space-y-3 mb-6">
                {[
                  'Browse verified hostels with real photos',
                  'Compare prices and facilities easily',
                  'Read genuine reviews from fellow students',
                  'Book instantly with secure payments',
                  'Get 24/7 support for any issues'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-primary-foreground/90">
                    <CheckCircle2 className="w-5 h-5 text-primary-foreground shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="secondary" className="bg-card text-primary hover:bg-card/90" asChild>
                <Link to="/listings">
                  Find Your Hostel
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card/10 backdrop-blur-sm rounded-2xl p-8 border border-card/20"
            >
              <h3 className="text-2xl font-bold text-primary-foreground mb-4">For Hostel Owners</h3>
              <ul className="space-y-3 mb-6">
                {[
                  'List your property for free',
                  'Reach thousands of verified students',
                  'Manage bookings from one dashboard',
                  'Get insights and analytics',
                  'Dedicated owner support team'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-primary-foreground/90">
                    <CheckCircle2 className="w-5 h-5 text-primary-foreground shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="secondary" className="bg-card text-primary hover:bg-card/90" asChild>
                <Link to="/contact">
                  List Your Hostel
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
