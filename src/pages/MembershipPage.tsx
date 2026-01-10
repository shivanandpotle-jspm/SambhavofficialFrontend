import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Users,
  CheckCircle,
  Heart,
  Calendar,
  Award,
  Sparkles,
} from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { useRazorpay } from '@/hooks/useRazorpay';
import { toast } from '@/hooks/use-toast';

/* ================= CONFIG ================= */
const RAZORPAY_FEE_PERCENT = 2; // 2% convenience fee charged to user

const benefits = [
  'Access to all workshops and events at discounted rates',
  'Exclusive member-only networking sessions',
  'Certificate of membership',
  'Monthly newsletter with insights and updates',
  'Priority registration for limited-seat events',
  'One-on-one mentorship opportunities',
  'Access to our resource library',
  'Voting rights in annual general meetings',
];

export const MembershipPage: React.FC = () => {
  const { addMember, settings } = useAdmin();

  const { payMembershipFee } = useRazorpay(
    settings?.razorpayKeyId || ''
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    occupation: '',
    motivation: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);

  /* ================= SAFETY GUARD ================= */
  if (!settings) {
    return (
      <div className="pt-24 text-center text-muted-foreground">
        Loading membership details...
      </div>
    );
  }

  /* ================= AMOUNT CALCULATION ================= */
  const baseFee = settings.membershipFee || 0;
  const razorpayFee = Math.ceil((baseFee * RAZORPAY_FEE_PERCENT) / 100);
  const totalPayableAmount = baseFee + razorpayFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: 'Required Fields Missing',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);

    if (baseFee > 0 && settings.razorpayKeyId) {
      payMembershipFee(
        totalPayableAmount, // ✅ USER PAYS INCLUDING RAZORPAY FEE
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        () => {
          completeMembership();
        }
      );
    } else {
      completeMembership();
    }
  };

  const completeMembership = () => {
    addMember({
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      joinedAt: new Date().toISOString(),
      membershipStatus: 'active',
      feePaid: baseFee > 0,
    });

    toast({
      title: 'Welcome to Sambhav 🎉',
      description:
        'Your membership application has been submitted successfully.',
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      occupation: '',
      motivation: '',
    });

    setIsProcessing(false);
  };

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-6">
            <Users className="h-10 w-10 text-secondary-foreground" />
          </div>
          <h1 className="font-heading text-4xl font-bold mb-4">
            Join Our Team
          </h1>
          <p className="text-primary-foreground/80">
            Become a member and contribute to meaningful change.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl grid lg:grid-cols-2 gap-12">
          {/* Benefits */}
          <div>
            <h2 className="font-heading text-2xl font-bold mb-6">
              Member Benefits
            </h2>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            <Card className="shadow-card">
              <CardContent className="p-6 space-y-2">
                <div className="flex justify-between">
                  <span>Membership Fee</span>
                  <span>₹{baseFee}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Payment Gateway Fee</span>
                  <span>₹{razorpayFee}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-3">
                  <span>Total Payable</span>
                  <span className="text-primary">₹{totalPayableAmount}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Apply for Membership</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
                <Input
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                />

                <Button
                  type="submit"
                  className="w-full"
                  variant="hero"
                  disabled={isProcessing}
                >
                  <Heart className="h-5 w-5 mr-2" />
                  {isProcessing
                    ? 'Processing...'
                    : `Pay ₹${totalPayableAmount}`}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};
