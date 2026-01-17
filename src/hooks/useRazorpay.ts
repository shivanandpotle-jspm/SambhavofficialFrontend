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

type SuccessCallback = (result: {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}) => void | Promise<void>;

export const useRazorpay = (key: string) => {
  useEffect(() => {
    if (document.getElementById("razorpay-script")) return;

    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const payForEvent = async (
    title: string,
    amount: number,
    user: UserDetails,
    onSuccess: SuccessCallback
  ) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/create-order`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          name: user.name,
          email: user.email,
          eventTitle: title,
        }),
      }
    );

    const data = await res.json();
    if (!data.success) {
      alert("Failed to create order");
      return;
    }

    const options = {
      key,
      order_id: data.order.id,
      amount: data.order.amount,
      currency: "INR",
      name: "Sambhav",
      description: title,
      prefill: user,
      handler: onSuccess,
    };

    new window.Razorpay(options).open();
  };

  return { payForEvent };
};