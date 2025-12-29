import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { addHostel } from '@/lib/firestore';
// import { addLocalHostel } from '@/lib/localStorage';
import { 
  Building2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  IndianRupee,
  Upload,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const facilities = [
  { id: 'wifi', label: 'WiFi' },
  { id: 'food', label: 'Meals Included' },
  { id: 'ac', label: 'Air Conditioning' },
  { id: 'laundry', label: 'Laundry' },
  { id: 'parking', label: 'Parking' },
  { id: 'gym', label: 'Gym' },
  { id: 'security', label: '24/7 Security' },
  { id: 'library', label: 'Study Room/Library' },
];

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: '',
    email: '',
    phone: '',
    hostelName: '',
    address: '',
    location: '',
    price: '',
    hostelType: '',
    facilities: [] as string[],
    description: ''
  });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Starting form submission...');
      
      // Prepare hostel data
      const hostelData = {
        name: formData.hostelName,
        location: formData.location,
        address: formData.address,
        price: Number(formData.price),
        rating: 0,
        reviews: 0,
        type: formData.hostelType as 'boys' | 'girls' | 'coed',
        images: [], // Will be added later with image upload
        facilities: formData.facilities,
        description: formData.description,
        available: true,
        distance: '0 km',
        ownerName: formData.ownerName,
        ownerEmail: formData.email,
        ownerPhone: formData.phone,
      };

      console.log('Hostel data:', hostelData);

      const result = await addHostel(hostelData);
      console.log('Submission result:', result);

      if (result.success) {
        // Send email notification to admin
        try {
          const emailData = {
            to: 'hello.unihostel@gmail.com',
            subject: `New Hostel Submission - ${formData.hostelName}`,
            body: `
New hostel submitted for approval!

Hostel Name: ${formData.hostelName}
Location: ${formData.location}
Price: ₹${formData.price}/month
Type: ${formData.hostelType}

Owner Details:
Name: ${formData.ownerName}
Email: ${formData.email}
Phone: ${formData.phone}

Description: ${formData.description}

Please login to admin panel to review: https://unihostel.in/admin
            `
          };
          console.log('Email notification queued:', emailData);
          // Note: Email will be sent via Firebase Functions in production
        } catch (emailError) {
          console.error('Email notification failed:', emailError);
        }

        toast({
          title: "Hostel Submitted Successfully! 🎉",
          description: "Your hostel has been submitted for review. Our team will verify and approve it within 24-48 hours. You'll receive an email confirmation.",
        });

        // Reset form
        setFormData({
          ownerName: '',
          email: '',
          phone: '',
          hostelName: '',
          address: '',
          location: '',
          price: '',
          hostelType: '',
          facilities: [],
          description: ''
        });
        setSelectedImages([]);
      } else {
        console.error('Submission failed:', result.error);
        toast({
          title: "Error",
          description: "Failed to submit hostel. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error submitting hostel:', error);
      toast({
        title: "Error",
        description: `An unexpected error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFacility = (facilityId: string) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.includes(facilityId)
        ? prev.facilities.filter(f => f !== facilityId)
        : [...prev.facilities, facilityId]
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      // Limit to 10 images
      if (fileArray.length + selectedImages.length > 10) {
        toast({
          title: "Too many images",
          description: "You can upload maximum 10 photos",
          variant: "destructive"
        });
        return;
      }
      setSelectedImages(prev => [...prev, ...fileArray]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Partner With Us
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-6">
              List Your Hostel on{' '}
              <span className="text-primary">UniHostel</span>
            </h1>
            <p className="text-muted-foreground mt-4">
              Reach thousands of students searching for accommodation near their universities. It's free to list!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl p-6 md:p-10 border border-border shadow-xl"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Owner Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Owner Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ownerName">Full Name *</Label>
                      <Input
                        id="ownerName"
                        placeholder="John Doe"
                        value={formData.ownerName}
                        onChange={(e) => setFormData(prev => ({ ...prev, ownerName: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                {/* Hostel Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    Hostel Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="hostelName">Hostel Name *</Label>
                      <Input
                        id="hostelName"
                        placeholder="Sunrise Student Living"
                        value={formData.hostelName}
                        onChange={(e) => setFormData(prev => ({ ...prev, hostelName: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Nearby University *</Label>
                      <Input
                        id="location"
                        placeholder="IIT Delhi, DU North Campus, etc."
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Full Address *</Label>
                    <Input
                      id="address"
                      placeholder="123 Main Street, Hauz Khas, New Delhi - 110016"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Monthly Rent (₹) *</Label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="price"
                          type="number"
                          placeholder="8500"
                          className="pl-9"
                          value={formData.price}
                          onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hostelType">Hostel Type *</Label>
                      <Select
                        value={formData.hostelType}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, hostelType: value }))}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="boys">Boys Only</SelectItem>
                          <SelectItem value="girls">Girls Only</SelectItem>
                          <SelectItem value="coed">Co-ed / Co-living</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Facilities */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Facilities Available</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {facilities.map((facility) => (
                      <div
                        key={facility.id}
                        className={`flex items-center gap-2 p-3 rounded-lg border transition-colors ${
                          formData.facilities.includes(facility.id)
                            ? 'bg-primary/10 border-primary'
                            : 'bg-muted/50 border-border hover:border-primary/50'
                        }`}
                      >
                        <Checkbox
                          id={facility.id}
                          checked={formData.facilities.includes(facility.id)}
                          onCheckedChange={() => toggleFacility(facility.id)}
                        />
                        <Label htmlFor={facility.id} className="text-sm cursor-pointer">
                          {facility.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Photos */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Hostel Photos</h3>
                  
                  {/* Upload Area */}
                  <label 
                    htmlFor="photo-upload" 
                    className="block border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      multiple
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">
                      <span className="text-primary font-medium">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG up to 5MB (max 10 photos)
                    </p>
                  </label>

                  {/* Preview Selected Images */}
                  {selectedImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {selectedImages.map((file, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell students about your hostel - environment, rules, special features, nearby amenities..."
                    className="min-h-[120px]"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                {/* Submit */}
                <div className="flex flex-col items-center gap-4 pt-4">
                  <Button 
                    type="submit" 
                    size="xl" 
                    className="w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit for Review
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    By submitting, you agree to our Terms of Service and Privacy Policy.
                    <br />
                    Your listing will be reviewed and approved within 24-48 hours.
                  </p>
                </div>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-12 grid md:grid-cols-3 gap-6"
            >
              {[
                { icon: Mail, label: 'Email Us', value: 'hello.unihostel@gmail.com' },
                { icon: Phone, label: 'Call Us', value: '+91 63069 40373' },
                { icon: MapPin, label: 'Visit Us', value: 'Lucknow, UP, India' }
              ].map((item) => (
                <div key={item.label} className="bg-card rounded-xl p-6 border border-border text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-medium text-foreground">{item.label}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{item.value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
