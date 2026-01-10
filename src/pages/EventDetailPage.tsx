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
} from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { DynamicFormRenderer } from "@/components/DynamicFormRenderer";
import { useRazorpay } from "@/hooks/useRazorpay";
import { toast } from "@/hooks/use-toast";

const EventDetailPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { events } = useAdmin();

  const { payForEvent } = useRazorpay(
    import.meta.env.VITE_RAZORPAY_KEY_ID
  );

  const [isRegistering, setIsRegistering] = useState(false);

  /* ================= LOADING GUARD ================= */
  if (events.length === 0) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center text-muted-foreground">
        Loading event details...
      </div>
    );
  }

  const event = events.find((e) => e.id === eventId);

  /* ================= INVALID EVENT ================= */
  if (!event) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
          <Button onClick={() => navigate("/events")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Button>
        </div>
      </div>
    );
  }

  /* ================= SUBMIT HANDLER ================= */
  const handleFormSubmit = (data: Record<string, unknown>) => {
    if (event.ticketPrice > 0) {
      payForEvent(
        event.title,
        event.ticketPrice,
        {
          name: data.name as string,
          email: data.email as string,
          phone: data.phone as string,
        },
        async (result) => {
          const res = await fetch(
            "http://localhost:5000/api/verify-payment",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: result.razorpay_payment_id,
                eventTitle: event.title,
                name: data.name,
                email: data.email,
              }),
            }
          );

          const json = await res.json();

          if (!json.success) {
            toast({
              title: "Registration failed",
              description: json.message || "Something went wrong",
              variant: "destructive",
            });
            return;
          }

          toast({
            title: "Registration Successful 🎉",
            description: "Ticket sent to your email.",
          });

          setIsRegistering(false);
        }
      );
    }
  };

  /* ================= UI ================= */
  return (
    <div className="pt-24 pb-16 min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <Button
          onClick={() => navigate("/events")}
          variant="ghost"
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Events
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">
            <div className="aspect-video rounded-2xl overflow-hidden bg-muted">
              {event.image ? (
                <img
                  src={`/assets/events/${event.image}`}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <Calendar className="h-24 w-24 text-muted-foreground" />
                </div>
              )}
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-4">
                {event.title}
              </h1>

              <div className="flex flex-wrap gap-4 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  {event.time}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {event.location}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Max {event.maxAttendees}
                </div>
              </div>

              <p className="text-muted-foreground whitespace-pre-wrap">
                {event.description}
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <Card className="sticky top-28 shadow-card">
              <CardHeader>
                <CardTitle>Register for Event</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-4 text-primary">
                  {event.ticketPrice > 0
                    ? `₹${event.ticketPrice}`
                    : "Free"}
                </div>

                {!isRegistering ? (
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={() => setIsRegistering(true)}
                  >
                    Register Now
                  </Button>
                ) : (
                  <>
                    <DynamicFormRenderer
                      fields={event.formFields}
                      onSubmit={handleFormSubmit}
                      submitLabel={
                        event.ticketPrice > 0
                          ? `Pay ₹${event.ticketPrice} & Register`
                          : "Register"
                      }
                    />

                    <Button
                      variant="ghost"
                      className="w-full mt-3"
                      onClick={() => setIsRegistering(false)}
                    >
                      Cancel
                    </Button>
                  </>
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
