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

type SuccessCallback = (result: any) => void | Promise<void>;

export const useRazorpay = (key: string) => {
  useEffect(() => {
    if (document.getElementById("razorpay-script")) return;

    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const payForEvent = (
    title: string,
    amount: number,
    user: UserDetails,
    onSuccess: SuccessCallback
  ) => {
    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load");
      return;
    }

    const options = {
      key,
      amount: amount * 100,
      currency: "INR",
      name: "Sambhav",
      description: title,
      prefill: {
        name: user.name,
        email: user.email,
      },
      handler: async (response: any) => {
        await onSuccess(response);
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
