import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Mail } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
              <Shield className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Privacy Policy
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
                    <h2 className="text-2xl font-bold mb-4 text-foreground">Introduction</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Welcome to UniHostel. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">Information We Collect</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Personal Information</h3>
                        <p className="leading-relaxed">
                          When you register on UniHostel, we collect information such as your name, email address, phone number, and university details. This information helps us provide personalized services and communicate with you effectively.
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Usage Data</h3>
                        <p className="leading-relaxed">
                          We automatically collect information about how you interact with our platform, including your IP address, browser type, pages visited, time spent on pages, and other diagnostic data. This helps us improve our services and user experience.
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Cookies and Tracking Technologies</h3>
                        <p className="leading-relaxed">
                          We use cookies and similar tracking technologies to track activity on our platform and store certain information. Cookies help us remember your preferences and improve your browsing experience.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">How We Use Your Information</h2>
                    <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                      <li>To provide and maintain our services</li>
                      <li>To process your bookings and transactions</li>
                      <li>To send you notifications about your account and bookings</li>
                      <li>To respond to your inquiries and provide customer support</li>
                      <li>To improve and personalize your experience on our platform</li>
                      <li>To detect, prevent, and address technical issues or fraudulent activities</li>
                      <li>To send you marketing communications (with your consent)</li>
                      <li>To comply with legal obligations</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">Information Sharing and Disclosure</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p className="leading-relaxed">
                        We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
                      </p>
                      <ul className="space-y-2 list-disc list-inside">
                        <li><strong>With Hostel Owners:</strong> When you make a booking, we share necessary information with the hostel owner to facilitate your reservation.</li>
                        <li><strong>Service Providers:</strong> We may share information with third-party service providers who assist us in operating our platform, such as payment processors and analytics services.</li>
                        <li><strong>Legal Requirements:</strong> We may disclose your information if required by law or in response to valid legal requests.</li>
                        <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new entity.</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">Data Security</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">Your Data Rights</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      You have the following rights regarding your personal information:
                    </p>
                    <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                      <li><strong>Access:</strong> You can request access to the personal information we hold about you.</li>
                      <li><strong>Correction:</strong> You can update or correct your personal information through your account settings.</li>
                      <li><strong>Deletion:</strong> You can request deletion of your personal information, subject to legal obligations.</li>
                      <li><strong>Opt-out:</strong> You can opt-out of marketing communications at any time.</li>
                      <li><strong>Data Portability:</strong> You can request a copy of your data in a structured format.</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">Data Retention</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. When information is no longer needed, we securely delete or anonymize it.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">Third-Party Links</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Our platform may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read the privacy policies of any third-party sites you visit.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">Children's Privacy</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Our services are intended for users aged 18 and above. We do not knowingly collect personal information from children under 18. If we become aware that we have collected information from a child under 18, we will take steps to delete that information.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">Changes to This Privacy Policy</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically for any changes.
                    </p>
                  </div>

                  <div className="pt-6 border-t">
                    <h2 className="text-2xl font-bold mb-4 text-foreground">Contact Us</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
                    </p>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-5 h-5 text-primary" />
                      <a href="mailto:hello.unihostel@gmail.com" className="hover:text-primary transition-colors">
                        hello.unihostel@gmail.com
                      </a>
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
