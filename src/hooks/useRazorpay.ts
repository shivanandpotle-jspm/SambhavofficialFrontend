import { useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

interface PaymentResult {
  razorpay_payment_id: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const useRazorpay = (keyId?: string) => {
  const loadScript = () =>
    new Promise<boolean>((resolve) => {
      if (window.Razorpay) return resolve(true);

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const payForEvent = useCallback(
    async (
      eventTitle: string,
      amount: number,
      user: { name: string; email: string },
      onSuccess: () => void
    ) => {
      if (!keyId) {
        toast({
          title: 'Razorpay Error',
          description: 'Missing Razorpay key',
          variant: 'destructive',
        });
        return;
      }

      const loaded = await loadScript();
      if (!loaded) {
        toast({
          title: 'Error',
          description: 'Failed to load Razorpay',
          variant: 'destructive',
        });
        return;
      }

      const rzp = new window.Razorpay({
        key: keyId,
        amount: amount * 100,
        currency: 'INR',
        name: 'Sambhav',
        description: eventTitle,
        handler: async (response: PaymentResult) => {
          try {
            const res = await fetch(
              'http://localhost:5000/api/verify-payment',
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_payment_id: response.razorpay_payment_id,
                  eventTitle,
                  name: user.name,
                  email: user.email,
                }),
              }
            );

            const data = await res.json();

            if (!data.success) {
              throw new Error(data.message);
            }

            toast({
              title: 'Payment Successful',
              description: 'Ticket email sent successfully',
            });

            onSuccess();
          } catch (err) {
            toast({
              title: 'Email Error',
              description: 'Payment done, but email failed',
              variant: 'destructive',
            });
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: '#17a8db',
        },
      });

      rzp.open();
    },
    [keyId]
  );

  return { payForEvent };
};
