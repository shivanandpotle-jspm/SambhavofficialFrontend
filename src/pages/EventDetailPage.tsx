import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  ArrowLeft,
  Sparkles,
  ScrollText,
  BookOpen,
} from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { DynamicFormRenderer } from "@/components/DynamicFormRenderer";
import { useRazorpay } from "@/hooks/useRazorpay";
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

const EventDetailPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { events } = useAdmin();

  const { payForEvent } = useRazorpay(
    import.meta.env.VITE_RAZORPAY_KEY_ID
  );

  const [isRegistering, setIsRegistering] = useState(false);
  const [userAcceptedTerms, setUserAcceptedTerms] = useState(false);

  if (events.length === 0) {
    return (
      <div className="pt-24 min-h-screen flex flex-col items-center justify-center bg-[#1a120b] text-[#d4af37]">
        <Sparkles className="animate-pulse mb-4 h-12 w-12" />
        <p className="font-serif italic text-xl">
          Consulting the Marauder's Map...
        </p>
      </div>
    );
  }

  const event = events.find((e) => e.id === eventId);

  if (!event) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-[#1a120b]">
        <div className="text-center p-8 border-2 border-[#d4af37] bg-[#2d1e12] rounded-lg">
          <h1 className="text-3xl font-serif font-bold mb-4 text-[#d4af37]">
            Vanished into the Forbidden Forest
          </h1>
          <Button onClick={() => navigate("/events")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Return to the Great Hall
          </Button>
        </div>
      </div>
    );
  }

  const handleFormSubmit = async (data: Record<string, unknown>) => {
    if (!userAcceptedTerms) {
      toast({
        title: "Decree Not Accepted",
        description: "You must accept the terms and conditions.",
        variant: "destructive",
      });
      return;
    }

    const userEmail = data.email as string;
    const userName = (data.name || "Wizard") as string;

    const finalAmount = Math.ceil(event.ticketPrice / 0.9764);

    const orderRes = await fetch(
      `${import.meta.env.VITE_API_URL}/api/create-order`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalAmount }),
      }
    );

    const orderJson = await orderRes.json();

    payForEvent(
      event.title,
      finalAmount,
      { name: userName, email: userEmail },
      (response: any) => {
        fetch(`${import.meta.env.VITE_API_URL}/api/verify-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            eventTitle: event.title,
            name: userName,
            email: userEmail,
            formData: data,
          }),
        });
      },
      orderJson.order.id
    );
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-[#1a120b]">
      {/* ✅ FIXED STYLE (SINGLE, VALID BLOCK) */}
      <style>{`
  input,
  textarea,
  select {
    color: #000000 !important;          /* PURE BLACK TEXT */
    background-color: #ffffff !important;
    caret-color: #000000 !important;
  }

  input::placeholder,
  textarea::placeholder {
    color: #555555 !important;
    opacity: 1 !important;
  }

  input:focus,
  textarea:focus,
  select:focus {
    color: #000000 !important;
  }
`}</style>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2" />

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Official Decree</CardTitle>
              </CardHeader>
              <CardContent>
                {!isRegistering ? (
                  <Button onClick={() => setIsRegistering(true)}>
                    Enlist Now
                  </Button>
                ) : (
                  <div className="space-y-4">
                    {/* ✅ REQUIRED WRAPPER */}
                    <div className="hogwarts-form">
                      <DynamicFormRenderer
                        fields={event.formFields}
                        onSubmit={handleFormSubmit}
                        submitLabel={
                          userAcceptedTerms
                            ? "Pay Galleons & Enlist"
                            : "Accept Terms to Enlist"
                        }
                      />
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={userAcceptedTerms}
                        onCheckedChange={(v) =>
                          setUserAcceptedTerms(v as boolean)
                        }
                      />
                      <span className="text-xs">
                        I accept all terms and conditions
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;