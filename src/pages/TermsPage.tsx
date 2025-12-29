import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Mail } from 'lucide-react';

export default function TermsPage() {
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
              <FileText className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Terms of Service
              </h1>
              <p className="text-lg text-background/80">
                Last updated: December 29, 2025
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardContent className="p-8 space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">1. Acceptance of Terms</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      By accessing and using UniHostel's platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this platform.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">2. Use License</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p className="leading-relaxed">
                        UniHostel grants you a limited, non-exclusive, non-transferable license to:
                      </p>
                      <ul className="space-y-2 list-disc list-inside">
                        <li>Access and use the platform for personal, non-commercial purposes</li>
                        <li>Search for and book student accommodations</li>
                        <li>Create and manage your user account</li>
                      </ul>
                      <p className="leading-relaxed">
                        This license does not include:
                      </p>
                      <ul className="space-y-2 list-disc list-inside">
                        <li>Modifying or copying the platform materials</li>
                        <li>Using the materials for commercial purposes</li>
                        <li>Attempting to reverse engineer any software on the platform</li>
                        <li>Removing any copyright or proprietary notations</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">3. User Accounts</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p className="leading-relaxed">
                        When you create an account with us, you must provide accurate, complete, and current information. You are responsible for:
                      </p>
                      <ul className="space-y-2 list-disc list-inside">
                        <li>Maintaining the security of your account credentials</li>
                        <li>All activities that occur under your account</li>
                        <li>Notifying us immediately of any unauthorized use</li>
                        <li>Ensuring you are at least 18 years of age</li>
                      </ul>
                      <p className="leading-relaxed">
                        We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activities.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">4. Bookings and Payments</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <h3 className="text-lg font-semibold text-foreground">4.1 Booking Process</h3>
                      <p className="leading-relaxed">
                        When you make a booking through UniHostel, you enter into a direct agreement with the hostel owner. UniHostel acts as an intermediary platform facilitating this connection.
                      </p>
                      
                      <h3 className="text-lg font-semibold text-foreground">4.2 Payment Terms</h3>
                      <ul className="space-y-2 list-disc list-inside">
                        <li>All prices are displayed in Indian Rupees (INR)</li>
                        <li>Payment must be made through our approved payment methods</li>
                        <li>Additional charges may apply as specified in the listing</li>
                        <li>Payment confirmation will be sent via email</li>
                      </ul>

                      <h3 className="text-lg font-semibold text-foreground">4.3 Cancellations and Refunds</h3>
                      <p className="leading-relaxed">
                        Cancellation policies vary by hostel and are clearly stated in each listing. Refunds are processed according to the specific hostel's cancellation policy. Please review the cancellation terms before making a booking.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">5. For Hostel Owners</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p className="leading-relaxed">
                        If you list your hostel on UniHostel, you agree to:
                      </p>
                      <ul className="space-y-2 list-disc list-inside">
                        <li>Provide accurate and truthful information about your property</li>
                        <li>Maintain the quality and standards described in your listing</li>
                        <li>Honor all confirmed bookings made through the platform</li>
                        <li>Comply with all local laws and regulations</li>
                        <li>Pay applicable commission fees for bookings</li>
                        <li>Respond promptly to booking inquiries</li>
                        <li>Keep your availability calendar updated</li>
                      </ul>
                      <p className="leading-relaxed">
                        UniHostel reserves the right to remove listings that violate these terms or receive multiple complaints.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">6. Prohibited Activities</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Users are prohibited from:
                    </p>
                    <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                      <li>Posting false, misleading, or fraudulent content</li>
                      <li>Harassing, threatening, or abusing other users</li>
                      <li>Violating any laws or regulations</li>
                      <li>Attempting to gain unauthorized access to the platform</li>
                      <li>Distributing viruses or malicious code</li>
                      <li>Scraping or data mining without permission</li>
                      <li>Circumventing the platform to avoid fees</li>
                      <li>Creating fake accounts or impersonating others</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">7. Intellectual Property</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      All content on UniHostel, including but not limited to text, graphics, logos, images, and software, is the property of UniHostel or its licensors and is protected by copyright and trademark laws. Unauthorized use of any content is strictly prohibited.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">8. Disclaimers and Limitations</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <h3 className="text-lg font-semibold text-foreground">8.1 Platform Availability</h3>
                      <p className="leading-relaxed">
                        We strive to maintain continuous availability but do not guarantee uninterrupted access. The platform may be unavailable due to maintenance, updates, or technical issues.
                      </p>
                      
                      <h3 className="text-lg font-semibold text-foreground">8.2 Third-Party Relationships</h3>
                      <p className="leading-relaxed">
                        UniHostel is not responsible for the conduct, quality, or services provided by hostel owners. We act as a platform connecting students with accommodation providers.
                      </p>

                      <h3 className="text-lg font-semibold text-foreground">8.3 Limitation of Liability</h3>
                      <p className="leading-relaxed">
                        To the maximum extent permitted by law, UniHostel shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">9. User Content</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      By posting reviews, photos, or other content on UniHostel, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and display that content. You represent that you own or have the right to post such content.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">10. Dispute Resolution</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      In the event of a dispute between users and hostel owners, UniHostel will attempt to facilitate a resolution but is not obligated to intervene. Any disputes that cannot be resolved amicably shall be subject to the jurisdiction of courts in Lucknow, Uttar Pradesh, India.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">11. Termination</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      We reserve the right to terminate or suspend your account and access to the platform immediately, without prior notice, for any violation of these Terms of Service or for any other reason at our sole discretion.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">12. Changes to Terms</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      UniHostel reserves the right to modify these Terms of Service at any time. We will notify users of any material changes by posting the new terms on this page and updating the "Last updated" date. Your continued use of the platform after changes constitutes acceptance of the new terms.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">13. Governing Law</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      These Terms of Service shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                    </p>
                  </div>

                  <div className="pt-6 border-t">
                    <h2 className="text-2xl font-bold mb-4 text-foreground">Contact Information</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      If you have any questions about these Terms of Service, please contact us:
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-5 h-5 text-primary" />
                        <a href="mailto:hello.unihostel@gmail.com" className="hover:text-primary transition-colors">
                          hello.unihostel@gmail.com
                        </a>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        UniHostel - Lucknow, Uttar Pradesh, India
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t bg-muted/30 -m-8 p-8 mt-8">
                    <p className="text-sm text-muted-foreground text-center">
                      By using UniHostel, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                    </p>
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
