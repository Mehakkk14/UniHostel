import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import {
  Search,
  BookOpen,
  Users,
  Home,
  CreditCard,
  Shield,
  MessageCircle,
  Mail,
  Phone,
  FileText,
  HelpCircle,
  Settings
} from 'lucide-react';
import { useState } from 'react';

const categories = [
  {
    icon: BookOpen,
    title: 'Getting Started',
    description: 'Learn how to use UniHostel platform',
    articles: [
      'How to create an account',
      'How to search for hostels',
      'Understanding hostel listings',
      'How to filter search results'
    ]
  },
  {
    icon: CreditCard,
    title: 'Booking & Payments',
    description: 'Information about bookings and transactions',
    articles: [
      'How to book a hostel',
      'Payment methods accepted',
      'Understanding booking fees',
      'Cancellation and refunds'
    ]
  },
  {
    icon: Home,
    title: 'For Hostel Owners',
    description: 'Guide for listing your property',
    articles: [
      'How to list your hostel',
      'Upload and manage photos',
      'Setting prices and availability',
      'Managing bookings'
    ]
  },
  {
    icon: Users,
    title: 'Account Management',
    description: 'Manage your profile and preferences',
    articles: [
      'Update profile information',
      'Reset your password',
      'Notification settings',
      'Delete your account'
    ]
  },
  {
    icon: Shield,
    title: 'Safety & Security',
    description: 'Your safety is our priority',
    articles: [
      'Hostel verification process',
      'Safety tips for students',
      'Reporting issues',
      'Data protection'
    ]
  },
  {
    icon: Settings,
    title: 'Technical Support',
    description: 'Troubleshooting and technical help',
    articles: [
      'Website not loading properly',
      'Payment failed issues',
      'Email not received',
      'Browser compatibility'
    ]
  }
];

const quickLinks = [
  { icon: MessageCircle, label: 'FAQs', href: '/faqs' },
  { icon: FileText, label: 'Terms of Service', href: '/terms' },
  { icon: Shield, label: 'Privacy Policy', href: '/privacy' },
  { icon: Mail, label: 'Contact Us', href: '/contact' }
];

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {/* Hero Section */}
        <section className="bg-foreground text-background py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center"
            >
              <HelpCircle className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                How can we help you?
              </h1>
              <p className="text-lg text-background/80 mb-8">
                Search our knowledge base or browse categories below
              </p>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for help articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-6 text-lg bg-background text-foreground"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
              <p className="text-muted-foreground">
                Select a category to find relevant help articles
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {categories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader>
                      <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                        <category.icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle>{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {category.articles.map((article, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            • {article}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl font-bold mb-2">Quick Links</h2>
              <p className="text-muted-foreground">
                Frequently accessed resources
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={link.href}>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="pt-6 text-center">
                        <link.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                        <p className="font-medium">{link.label}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto"
            >
              <Card className="border-primary/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Still need help?</CardTitle>
                  <CardDescription>
                    Our support team is ready to assist you
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <Mail className="w-10 h-10 mx-auto mb-3 text-primary" />
                      <h3 className="font-semibold mb-1">Email Support</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Get response within 24 hours
                      </p>
                      <Button variant="outline" asChild className="w-full">
                        <a href="mailto:hello.unihostel@gmail.com">
                          Send Email
                        </a>
                      </Button>
                    </div>

                    <div className="text-center">
                      <Phone className="w-10 h-10 mx-auto mb-3 text-primary" />
                      <h3 className="font-semibold mb-1">Phone Support</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Mon-Sat, 9 AM - 6 PM
                      </p>
                      <Button variant="outline" asChild className="w-full">
                        <a href="tel:+916306940373">
                          Call Now
                        </a>
                      </Button>
                    </div>

                    <div className="text-center">
                      <MessageCircle className="w-10 h-10 mx-auto mb-3 text-primary" />
                      <h3 className="font-semibold mb-1">Contact Form</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Fill out a quick form
                      </p>
                      <Button variant="outline" asChild className="w-full">
                        <Link to="/contact">
                          Contact Us
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
