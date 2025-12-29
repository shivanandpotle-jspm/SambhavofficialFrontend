import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Heart, Gift, Users, TrendingUp, CheckCircle } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { useRazorpay } from '@/hooks/useRazorpay';
import { toast } from '@/hooks/use-toast';

const predefinedAmounts = [500, 1000, 2500, 5000, 10000];

const impactItems = [
  { amount: 500, impact: 'Provides learning materials for 5 students' },
  { amount: 1000, impact: 'Sponsors one student for a financial literacy workshop' },
  { amount: 2500, impact: 'Funds mental health counseling for 3 individuals' },
  { amount: 5000, impact: 'Supports an entrepreneur with startup resources' },
  { amount: 10000, impact: 'Enables a full community outreach program' },
];

export const DonatePage: React.FC = () => {
  const { addDonor, settings } = useAdmin();
  const { makeDonation } = useRazorpay(settings.razorpayKeyId);
  
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    anonymous: false,
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const finalAmount = selectedAmount || parseInt(customAmount) || 0;

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (finalAmount < 100) {
      toast({
        title: 'Invalid Amount',
        description: 'Minimum donation amount is ₹100',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.email) {
      toast({
        title: 'Email Required',
        description: 'Please provide your email address',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);

    makeDonation(
      finalAmount,
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      },
      () => {
        addDonor({
          id: Date.now().toString(),
          name: formData.anonymous ? 'Anonymous' : formData.name,
          email: formData.email,
          amount: finalAmount,
          donatedAt: new Date().toISOString(),
          message: formData.message,
          anonymous: formData.anonymous,
        });

        toast({
          title: 'Thank You! 🎉',
          description: 'Your generous donation will help transform lives.',
        });

        setFormData({ name: '', email: '', phone: '', message: '', anonymous: false });
        setSelectedAmount(1000);
        setCustomAmount('');
        setIsProcessing(false);
      }
    );

    setIsProcessing(false);
  };

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-hero text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gradient opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-6">
              <Heart className="h-10 w-10 text-secondary-foreground" />
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6">
              Make a Difference Today
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Your contribution helps us empower communities through education, mental wellness, 
              and social initiatives. Every rupee counts.
            </p>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="font-heading text-2xl">Donate Now</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Amount Selection */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Select Amount</Label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                      {predefinedAmounts.map((amount) => (
                        <Button
                          key={amount}
                          type="button"
                          variant={selectedAmount === amount ? 'hero' : 'outline'}
                          onClick={() => handleAmountSelect(amount)}
                          className="h-12"
                        >
                          ₹{amount.toLocaleString()}
                        </Button>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 mt-4">
                      <span className="text-muted-foreground">Or enter custom amount:</span>
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                        <Input
                          type="number"
                          value={customAmount}
                          onChange={(e) => handleCustomAmountChange(e.target.value)}
                          placeholder="Enter amount"
                          className="pl-8"
                          min={100}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Personal Info */}
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message (Optional)</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Leave a message of support..."
                        rows={3}
                      />
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-muted">
                      <Switch
                        checked={formData.anonymous}
                        onCheckedChange={(checked) => setFormData({ ...formData, anonymous: checked })}
                      />
                      <Label className="text-sm text-muted-foreground">
                        Make my donation anonymous
                      </Label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="xl"
                    className="w-full"
                    disabled={finalAmount < 100 || isProcessing}
                  >
                    <Heart className="h-5 w-5" />
                    {isProcessing ? 'Processing...' : `Donate ₹${finalAmount.toLocaleString()}`}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Your donation is secure and encrypted. Tax receipts available for donations above ₹500.
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Impact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                  Your Impact
                </h2>
                <p className="text-muted-foreground mb-6">
                  See how your contribution directly transforms lives and communities.
                </p>

                <div className="space-y-4">
                  {impactItems.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300 ${
                        finalAmount >= item.amount
                          ? 'bg-primary/10 border-l-4 border-primary'
                          : 'bg-muted'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        finalAmount >= item.amount ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/20'
                      }`}>
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">₹{item.amount.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">{item.impact}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <Card className="border-0 shadow-card bg-gradient-section">
                <CardContent className="p-6">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
                    Our Impact So Far
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <Gift className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="text-2xl font-bold text-foreground">₹2.5L+</p>
                      <p className="text-xs text-muted-foreground">Raised</p>
                    </div>
                    <div className="text-center">
                      <Users className="h-8 w-8 text-secondary mx-auto mb-2" />
                      <p className="text-2xl font-bold text-foreground">500+</p>
                      <p className="text-xs text-muted-foreground">Donors</p>
                    </div>
                    <div className="text-center">
                      <TrendingUp className="h-8 w-8 text-accent mx-auto mb-2" />
                      <p className="text-2xl font-bold text-foreground">10K+</p>
                      <p className="text-xs text-muted-foreground">Lives</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
