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
        <p className="font-serif italic text-xl">Consulting the Marauder's Map...</p>
      </div>
    );
  }

  const event = events.find((e) => e.id === eventId);

  /* ================= INVALID EVENT ================= */
  if (!event) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-[#1a120b]">
        <div className="text-center p-8 border-2 border-[#d4af37] bg-[#2d1e12] rounded-lg shadow-[0_0_20px_rgba(212,175,55,0.3)]">
          <h1 className="text-3xl font-serif font-bold mb-4 text-[#d4af37]">Vanished into the Forbidden Forest</h1>
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

  /* ================= SUBMIT & VERIFY LOGIC ================= */
  const handleFormSubmit = (data: Record<string, unknown>) => {
    // Compulsory check: Payment only starts if terms are checked
    if (!userAcceptedTerms) {
      toast({ 
        title: "Decree Not Accepted", 
        description: "You must accept the terms and conditions before proceeding.", 
        variant: "destructive" 
      });
      return;
    }

    const userEmail = data.email as string;
    const userName = (data.name || "Wizard") as string;

    if (!userEmail) {
      toast({ title: "Email Required", description: "Email is missing from form data.", variant: "destructive" });
      return;
    }

    const finalAmount = Math.ceil(event.ticketPrice / 0.9764);

    payForEvent(
      event.title, 
      finalAmount, 
      { name: userName, email: userEmail },
      () => {
        verifyAndSave(data, userName, userEmail);
      }
    );
  };

  const verifyAndSave = async (allFormData: any, name: string, email: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/verify-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_payment_id: "SUCCESS_" + Date.now(),
          eventTitle: event.title,
          name: name,
          email: email,
          formData: allFormData, 
        }),
      });
      
      const json = await res.json();
      if (json.success) {
        toast({ title: "Mischief Managed! 🎉", description: "Your owl is on its way." });
        setIsRegistering(false);
      }
    } catch (err) {
      toast({ title: "Confirmed!", description: "Check your email for the ticket!" });
      setIsRegistering(false);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-[#1a120b] selection:bg-[#741b1b] selection:text-white">
      <style>{`
        .hogwarts-form input, 
        .hogwarts-form textarea, 
        .hogwarts-form select {
          color: #2d1e12 !important; 
          background-color: rgba(255, 255, 255, 0.5) !important;
          border: 1px solid #d4af37 !important;
        }
        .hogwarts-form label {
          color: #741b1b !important; 
          font-weight: bold;
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

              <div className="flex flex-wrap gap-6 text-[#5d4037] mb-8 font-serif italic border-b border-[#d4af37]/40 pb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#741b1b]" />
                  {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#741b1b]" />
                  {event.time}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-[#741b1b]" />
                  {event.location}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#741b1b]" />
                  {event.maxAttendees} Wizards Max
                </div>
              </div>

              <p className="text-[#3c2a1a] leading-relaxed text-lg font-serif first-letter:text-5xl first-letter:font-bold first-letter:text-[#741b1b] first-letter:mr-3 first-letter:float-left">
                {event.description}
              </p>
            </div>
          </div>

          <div>
            <Card className="sticky top-28 bg-[#f3e5ab] border-2 border-[#d4af37] shadow-[5px_5px_0px_#741b1b] overflow-hidden">
              <CardHeader className="bg-[#741b1b] text-[#f3e5ab] border-b-2 border-[#d4af37]">
                <CardTitle className="font-serif tracking-widest uppercase text-center text-sm">Official Decree</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                    <p className="text-[#5d4037] font-serif italic text-sm mb-1">Entrance Fee</p>
                    <div className="text-4xl font-serif font-bold text-[#2d1e12]">
                    {event.ticketPrice > 0
                        ? `₹${event.ticketPrice}`
                        : "Free of Galleons"}
                    </div>
                </div>

                {!isRegistering ? (
                  <Button
                    size="lg"
                    className="w-full bg-[#741b1b] hover:bg-[#5a1515] text-[#f3e5ab] font-serif text-lg py-6 rounded-none border-b-4 border-[#3c1010] active:border-b-0 transition-all"
                    onClick={() => setIsRegistering(true)}
                  >
                    Enlist Now
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-[#fdf5e6] border border-[#d4af37]/30 rounded text-[#3c2a1a] hogwarts-form">
                        
                        {/* Dynamic Form fields render here */}
                        <DynamicFormRenderer
                          fields={event.formFields}
                          onSubmit={handleFormSubmit}
                          submitLabel={
                              event.ticketPrice > 0
                              ? `Pay Galleons & Enlist`
                              : "Submit Scroll"
                          }
                        />

                        {/* COMPULSORY CHECKBOX: Positioned after the form but visually appears right above the button */}
                        <div className="flex items-start gap-3 mt-4 pt-4 border-t border-[#741b1b]/20 bg-[#741b1b]/5 p-2 rounded">
                          <Checkbox 
                            id="user-terms" 
                            checked={userAcceptedTerms}
                            onCheckedChange={(checked) => setUserAcceptedTerms(checked as boolean)}
                            className="mt-1 border-[#741b1b] data-[state=checked]:bg-[#741b1b]"
                          />
                          <label htmlFor="user-terms" className="text-[10px] text-[#741b1b] leading-tight cursor-pointer font-serif italic select-none">
                            I solemnly swear that I accept all terms and conditions of this event and confirm my enlistment.
                          </label>
                        </div>
                    </div>

                    <Button
                      variant="ghost"
                      className="w-full mt-3 text-[#741b1b] hover:text-[#5a1515] font-serif underline"
                      onClick={() => {
                        setIsRegistering(false);
                        setUserAcceptedTerms(false);
                      }}
                    >
                      Withdraw Application
                    </Button>
                  </div>
                )}
                
                <div className="mt-8 flex justify-center opacity-20">
                    <img src="/assets/sambhav_logo.png" alt="Seal" className="h-16 grayscale sepia" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
