import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/hooks/use-toast';
import { Save, IndianRupee, Ticket, Key } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings } = useAdmin();
  const { toast } = useToast();

  // ✅ SAFE INITIAL STATE
  const [membershipFee, setMembershipFee] = useState<number>(0);
  const [defaultTicketPrice, setDefaultTicketPrice] = useState<number>(0);
  const [razorpayKeyId, setRazorpayKeyId] = useState<string>('');

  // ✅ SYNC STATE WHEN SETTINGS LOAD
  useEffect(() => {
    if (settings) {
      setMembershipFee(settings.membershipFee ?? 0);
      setDefaultTicketPrice(settings.defaultEventTicketPrice ?? 0);
      setRazorpayKeyId(settings.razorpayKeyId ?? '');
    }
  }, [settings]);

  // ✅ LOADING GUARD
  if (!settings) {
    return (
      <div className="text-muted-foreground">
        Loading settings...
      </div>
    );
  }

  const handleSave = () => {
    updateSettings({
      membershipFee,
      defaultEventTicketPrice: defaultTicketPrice,
      razorpayKeyId,
    });

    toast({
      title: 'Settings Saved',
      description: 'Your settings have been updated successfully.',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your organization’s global settings
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="font-heading flex items-center gap-2">
              <IndianRupee className="h-5 w-5" />
              Membership Fee
            </CardTitle>
            <CardDescription>Annual membership fee</CardDescription>
          </CardHeader>
          <CardContent>
            <Label>Amount (₹)</Label>
            <Input
              type="number"
              min={0}
              value={membershipFee}
              onChange={(e) => setMembershipFee(Number(e.target.value))}
            />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="font-heading flex items-center gap-2">
              <Ticket className="h-5 w-5" />
              Default Ticket Price
            </CardTitle>
            <CardDescription>For new events</CardDescription>
          </CardHeader>
          <CardContent>
            <Label>Amount (₹)</Label>
            <Input
              type="number"
              min={0}
              value={defaultTicketPrice}
              onChange={(e) => setDefaultTicketPrice(Number(e.target.value))}
            />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card md:col-span-2">
          <CardHeader>
            <CardTitle className="font-heading flex items-center gap-2">
              <Key className="h-5 w-5" />
              Razorpay Integration
            </CardTitle>
            <CardDescription>Payment gateway configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <Label>Razorpay Key ID</Label>
            <Input
              value={razorpayKeyId}
              onChange={(e) => setRazorpayKeyId(e.target.value)}
              placeholder="rzp_live_xxxxxxxxx"
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;
