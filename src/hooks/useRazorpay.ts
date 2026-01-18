import { useEffect } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface UserDetails {
  name: string;
  email: string;
}

type SuccessCallback = (response: any) => void | Promise<void>;

export const useRazorpay = (key: string) => {
  useEffect(() => {
    if (document.getElementById("razorpay-script")) return;

    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onerror = () => {
      console.error("Razorpay SDK failed to load");
    };

    document.body.appendChild(script);
  }, []);

  const payForEvent = (
    title: string,
    amount: number,
    user: UserDetails,
    onSuccess: SuccessCallback,
    orderId: string
  ) => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not available. Please refresh and try again.");
      return;
    }

    const options = {
      key,
      amount: amount * 100, // Razorpay expects paise
      currency: "INR",
      name: "Sambhav",
      description: title,
      order_id: orderId,

      prefill: {
        name: user.name,
        email: user.email,
      },

      handler: async (response: any) => {
        try {
          await onSuccess(response);
        } catch (err) {
          console.error("Post-payment handler error:", err);
        }
      },

      redirect: false, // 🔥 CRITICAL FIX: ensures handler() ALWAYS runs

      modal: {
        ondismiss: () => {
          console.warn("Razorpay checkout closed by user");
        },
      },

      theme: {
        color: "#7c3aed",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return { payForEvent };
};
