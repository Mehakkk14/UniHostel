import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from '@/components/ui/card';
import { MessageCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const faqs = [
  {
    category: "General Questions",
    questions: [
      {
        q: "What is UniHostel?",
        a: "UniHostel is Lucknow's trusted student accommodation platform that connects students with verified hostels and PG accommodations near their universities. We provide transparent pricing, real reviews, and a seamless booking experience."
      },
      {
        q: "How do I search for hostels?",
        a: "You can search for hostels using our advanced search filters on the 'Find Hostels' page. Filter by location, price range, hostel type (Boys/Girls/Co-ed), facilities, and ratings to find your perfect accommodation."
      },
      {
        q: "Are the hostels verified?",
        a: "Yes! All hostels on UniHostel go through our verification process before being listed. Our team reviews each submission to ensure quality and authenticity."
      },
      {
        q: "Is UniHostel free to use?",
        a: "Yes, browsing and searching for hostels on UniHostel is completely free for students. There are no hidden charges for viewing listings or contacting hostel owners."
      }
    ]
  },
  {
    category: "Booking & Payments",
    questions: [
      {
        q: "How do I book a hostel?",
        a: "Browse hostels, select your preferred accommodation, and click 'Book Now'. You'll be guided through the booking process where you can review details and confirm your reservation."
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept various payment methods including UPI, Credit/Debit cards, Net Banking, and digital wallets. All payments are processed securely through our payment partners."
      },
      {
        q: "Can I cancel my booking?",
        a: "Yes, cancellation policies vary by hostel. Please check the specific cancellation policy mentioned in your booking confirmation. Most hostels offer refunds if cancelled within the stipulated time period."
      },
      {
        q: "Do I need to pay the full amount upfront?",
        a: "Payment terms vary by hostel. Some require full payment, while others accept monthly payments. This information is clearly mentioned in the listing details."
      }
    ]
  },
  {
    category: "For Hostel Owners",
    questions: [
      {
        q: "How can I list my hostel on UniHostel?",
        a: "Click on 'List Your Hostel' in the navigation menu or footer. Fill out the listing form with your hostel details, upload photos, and submit. Our team will review and approve your listing within 2-3 business days."
      },
      {
        q: "Is there a fee to list my hostel?",
        a: "Listing your hostel on UniHostel is free. We only charge a small commission on successful bookings, making it risk-free for hostel owners."
      },
      {
        q: "How long does the approval process take?",
        a: "Our team typically reviews and approves listings within 2-3 business days. You'll receive an email notification once your hostel is live on the platform."
      },
      {
        q: "Can I edit my listing after it's approved?",
        a: "Yes, you can request changes to your listing by contacting our support team at hello.unihostel@gmail.com. We'll process your request promptly."
      }
    ]
  },
  {
    category: "Account & Support",
    questions: [
      {
        q: "Do I need to create an account?",
        a: "While you can browse hostels without an account, creating one allows you to save favorites, manage bookings, and get personalized recommendations. It's quick and free!"
      },
      {
        q: "I forgot my password. How do I reset it?",
        a: "Click on 'Sign In', then select 'Forgot Password'. Enter your registered email address, and we'll send you instructions to reset your password."
      },
      {
        q: "How do I contact customer support?",
        a: "You can reach us via email at hello.unihostel@gmail.com or call us at +91 63069 40373. We're here to help Monday through Saturday, 9 AM to 6 PM."
      },
      {
        q: "Can I change my profile information?",
        a: "Yes, log in to your account and go to the Profile page. There you can update your personal information, contact details, and preferences."
      }
    ]
  },
  {
    category: "Safety & Security",
    questions: [
      {
        q: "How do you ensure the safety of students?",
        a: "We verify all hostels, encourage detailed reviews, and provide contact information so you can visit before booking. We also recommend checking facilities like CCTV, security guards, and entry restrictions."
      },
      {
        q: "Is my personal information secure?",
        a: "Absolutely. We use industry-standard encryption and security measures to protect your personal and payment information. Read our Privacy Policy for more details."
      },
      {
        q: "What if I face issues with my hostel?",
        a: "Contact us immediately at hello.unihostel@gmail.com. We'll work with both parties to resolve the issue fairly and quickly."
      }
    ]
  }
];

export default function FAQPage() {
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-background/80">
                Find answers to common questions about UniHostel, bookings, and our services
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQs Content */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-8">
              {faqs.map((category, idx) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <h2 className="text-2xl font-bold mb-4 text-foreground">
                    {category.category}
                  </h2>
                  <Card className="p-6">
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${idx}-${index}`}>
                          <AccordionTrigger className="text-left">
                            {faq.q}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto text-center"
            >
              <MessageCircle className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-muted-foreground mb-8">
                Can't find what you're looking for? Our support team is here to help you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/contact">
                    <Mail className="w-5 h-5 mr-2" />
                    Contact Support
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/help-center">
                    Visit Help Center
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
