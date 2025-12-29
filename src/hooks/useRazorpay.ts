import { useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

interface RazorpayOptions {
  amount: number;
  currency?: string;
  name: string;
  description: string;
  orderId?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
}

interface PaymentResult {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

type PaymentType = 'event' | 'donation' | 'membership';

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, callback: () => void) => void;
    };
  }
}

export const useRazorpay = (keyId: string = 'rzp_test_xxxxx') => {
  const loadRazorpayScript = useCallback((): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }, []);

  const initiatePayment = useCallback(async (
    paymentType: PaymentType,
    options: RazorpayOptions,
    onSuccess: (result: PaymentResult) => void,
    onFailure?: (error: unknown) => void
  ) => {
    const isLoaded = await loadRazorpayScript();
    
    if (!isLoaded) {
      toast({
        title: 'Error',
        description: 'Failed to load payment gateway. Please try again.',
        variant: 'destructive',
      });
      return;
    }

    const paymentTypeLabels: Record<PaymentType, string> = {
      event: 'Event Ticket',
      donation: 'Donation',
      membership: 'Membership Fee',
    };

    const razorpayOptions = {
      key: keyId,
      amount: options.amount * 100, // Convert to paise
      currency: options.currency || 'INR',
      name: options.name,
      description: `${paymentTypeLabels[paymentType]}: ${options.description}`,
      order_id: options.orderId,
      handler: (response: PaymentResult) => {
        toast({
          title: 'Payment Successful!',
          description: `Your ${paymentTypeLabels[paymentType].toLowerCase()} payment was completed successfully.`,
        });
        onSuccess(response);
      },
      prefill: options.prefill || {},
      theme: {
        color: options.theme?.color || '#1a5f5a', // Primary teal color
      },
      modal: {
        ondismiss: () => {
          toast({
            title: 'Payment Cancelled',
            description: 'You cancelled the payment. Please try again when ready.',
          });
        },
      },
    };

    try {
      const rzp = new window.Razorpay(razorpayOptions);
      rzp.on('payment.failed', () => {
        toast({
          title: 'Payment Failed',
          description: 'Your payment could not be processed. Please try again.',
          variant: 'destructive',
        });
        if (onFailure) {
          onFailure(new Error('Payment failed'));
        }
      });
      rzp.open();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
      if (onFailure) {
        onFailure(error);
      }
    }
  }, [keyId, loadRazorpayScript]);

  const payForEvent = useCallback((
    eventTitle: string,
    amount: number,
    userInfo: { name?: string; email?: string; phone?: string },
    onSuccess: (result: PaymentResult) => void
  ) => {
    initiatePayment('event', {
      amount,
      name: 'Empower Foundation',
      description: eventTitle,
      prefill: {
        name: userInfo.name,
        email: userInfo.email,
        contact: userInfo.phone,
      },
    }, onSuccess);
  }, [initiatePayment]);

  const makeDonation = useCallback((
    amount: number,
    donorInfo: { name?: string; email?: string; phone?: string },
    onSuccess: (result: PaymentResult) => void
  ) => {
    initiatePayment('donation', {
      amount,
      name: 'Empower Foundation',
      description: 'Charitable Donation',
      prefill: {
        name: donorInfo.name,
        email: donorInfo.email,
        contact: donorInfo.phone,
      },
    }, onSuccess);
  }, [initiatePayment]);

  const payMembershipFee = useCallback((
    amount: number,
    memberInfo: { name?: string; email?: string; phone?: string },
    onSuccess: (result: PaymentResult) => void
  ) => {
    initiatePayment('membership', {
      amount,
      name: 'Empower Foundation',
      description: 'Annual Membership',
      prefill: {
        name: memberInfo.name,
        email: memberInfo.email,
        contact: memberInfo.phone,
      },
    }, onSuccess);
  }, [initiatePayment]);

  return {
    initiatePayment,
    payForEvent,
    makeDonation,
    payMembershipFee,
  };
};
