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

  /* ================= LOADING GUARD ================= */
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

  /* ================= INVALID EVENT ================= */
  if (!event) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-[#1a120b]">
        <div className="text-center p-8 border-2 border-[#d4af37] bg-[#2d1e12] rounded-lg shadow-[0_0_20px_rgba(212,175,55,0.3)]">
          <h1 className="text-3xl font-serif font-bold mb-4 text-[#d4af37]">
            Vanished into the Forbidden Forest
          </h1>
          <Button
            onClick={() => navigate("/events")}
            variant="outline"
            className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#1a120b]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Return to the Great Hall
          </Button>
        </div>
      </div>
    );
  }

  /* ================= SUBMIT & PAYMENT ================= */
  const handleFormSubmit = async (data: Record<string, unknown>) => {
    if (!userAcceptedTerms) {
      toast({
        title: "Decree Not Accepted",
        description:
          "You must accept the terms and conditions before proceeding.",
        variant: "destructive",
      });
      return;
    }

    const userEmail = data.email as string;
    const userName = (data.name || "Wizard") as string;

    if (!userEmail) {
      toast({
        title: "Email Required",
        description: "Email is missing from form data.",
        variant: "destructive",
      });
      return;
    }

    const finalAmount = Math.ceil(event.ticketPrice / 0.9764);

    try {
      const orderRes = await fetch(
        `${import.meta.env.VITE_API_URL}/api/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: finalAmount }),
        }
      );

      const orderJson = await orderRes.json();

      if (!orderJson.success) {
        toast({
          title: "Payment Error",
          description: "Unable to create order.",
          variant: "destructive",
        });
        return;
      }

      payForEvent(
        event.title,
        finalAmount,
        { name: userName, email: userEmail },
        (response: any) => {
          verifyAndSave(response, data, userName, userEmail);
        },
        orderJson.order.id
      );
    } catch {
      toast({
        title: "Server Error",
        description: "Unable to initiate payment.",
        variant: "destructive",
      });
    }
  };

  /* ================= VERIFY & SAVE ================= */
  const verifyAndSave = async (
    response: any,
    allFormData: any,
    name: string,
    email: string
  ) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/verify-payment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            eventTitle: event.title,
            name,
            email,
            formData: allFormData,
          }),
        }
      );

      const json = await res.json();

      if (json.success) {
        toast({
          title: "Mischief Managed! 🎉",
          description: "Your owl is on its way.",
        });
        setIsRegistering(false);
        setUserAcceptedTerms(false);
      }
    } catch {
      toast({
        title: "Payment Successful",
        description:
          "If ticket email is delayed, please contact support.",
      });
      setIsRegistering(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="pt-24 pb-16 min-h-screen bg-[#1a120b] selection:bg-[#741b1b] selection:text-white">
      
      {/* ✅ ONLY FIX: INPUT TEXT VISIBILITY (NO UI CHANGE) */}
      <style>{`
        input,
        textarea,
        select {
          color: #111111 !important;
          background-color: #ffffff !important;
          caret-color: #111111 !important;
        }

        input::placeholder,
        textarea::placeholder {
          color: #444444 !important;
          opacity: 1 !important;
        }
      `}</style>

      <div className="container mx-auto px-4">
        <Button
          onClick={() => navigate("/events")}
          variant="ghost"
          className="mb-6 text-[#d4af37] hover:bg-[#2d1e12] hover:text-[#f3e5ab] font-serif"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to the Common Room
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="aspect-video rounded-2xl overflow-hidden border-4 border-[#3c2a1a] shadow-[0_10px_30px_rgba(0,0,0,0.5)] bg-[#000]">
              {event.image ? (
                <img
                  src={`/assets/events/${event.image}`}
                  alt={event.title}
                  className="w-full h-full object-cover opacity-90 sepia-[0.2]"
                />
              ) : (
                <div className="h-full flex items-center justify-center bg-[#2d1e12]">
                  <ScrollText className="h-24 w-24 text-[#d4af37]/30" />
                </div>
              )}
            </div>

            <div className="p-8 bg-[#fdf5e6] border-l-8 border-[#741b1b] rounded-r-lg shadow-inner relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]"></div>

              <h1 className="text-4xl font-serif font-bold mb-4 text-[#2d1e12] flex items-center gap-3">
                <Sparkles className="text-[#d4af37]" />
                {event.title}
              </h1>

<p className="whitespace-pre-line text-[#3c2a1a] leading-relaxed text-lg font-serif mb-6">
  {event.description}
</p>


              <Button
                asChild
                className="bg-[#741b1b] hover:bg-[#5a1515] text-[#f3e5ab] font-serif rounded-none border-b-2 border-[#3c1010]"
              >
                <a
                  href="https://drive.google.com/drive/folders/1ouQZ2addLpdqgkKYBDkF7FnqAVt26uy7?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Read the Rule Book
                </a>
              </Button>
            </div>
          </div>

          <div>
            <Card className="sticky top-28 bg-[#f3e5ab] border-2 border-[#d4af37] shadow-[5px_5px_0px_#741b1b] overflow-hidden">
              <CardHeader className="bg-[#741b1b] text-[#f3e5ab] border-b-2 border-[#d4af37]">
                <CardTitle className="font-serif tracking-widest uppercase text-center text-sm">
                  Official Decree
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {!isRegistering ? (
                  <Button
                    size="lg"
                    className="w-full bg-[#741b1b] hover:bg-[#5a1515] text-[#f3e5ab] font-serif text-lg py-6 rounded-none"
                    onClick={() => setIsRegistering(true)}
                  >
                    Enlist Now
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <DynamicFormRenderer
                      fields={event.formFields}
                      onSubmit={handleFormSubmit}
                      submitLabel={
                        !userAcceptedTerms
                          ? "Accept Terms to Enlist"
                          : "Pay Galleons & Enlist"
                      }
                    />

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
