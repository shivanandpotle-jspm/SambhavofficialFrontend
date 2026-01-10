import React, { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DynamicFormBuilder } from "@/components/DynamicFormBuilder";
import { Plus } from "lucide-react";
import type { Event, FormField } from "@/contexts/AdminContext";

const AdminEvents: React.FC = () => {
  const { events, addEvent, updateEvent } = useAdmin();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Event | null>(null);

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [maxAttendees, setMaxAttendees] = useState("");
  const [category, setCategory] =
    useState<Event["category"]>("financial");

  const [image, setImage] = useState("");

  const [formFields, setFormFields] = useState<FormField[]>([
    { id: "name", type: "text", label: "Full Name", required: true },
    { id: "email", type: "email", label: "Email", required: true },
  ]);

  const reset = () => {
    setTitle("");
    setShortDescription("");
    setDescription("");
    setDate("");
    setTime("");
    setLocation("");
    setTicketPrice("");
    setMaxAttendees("");
    setImage("");
    setCategory("financial");
    setEditing(null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation(); // ✅ CRITICAL FIX

    const data: Event = {
      id: editing?.id || Date.now().toString(),
      title,
      shortDescription,
      description,
      date,
      time,
      location,
      ticketPrice: Number(ticketPrice),
      maxAttendees: Number(maxAttendees),
      image,
      formFields,
      category,
      status: "upcoming",
      createdAt: new Date().toISOString(),
    };

    if (editing) {
      await updateEvent(editing.id, data);
    } else {
      await addEvent(data);
    }

    setOpen(false);
    reset();
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Events</h1>
          <p className="text-muted-foreground">
            Create and manage events
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button type="button">
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editing ? "Edit Event" : "Create Event"}
              </DialogTitle>
            </DialogHeader>

            <form
              onSubmit={submit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
            >
              {/* LEFT */}
              <div className="space-y-3">
                <div>
                  <Label>Event Title</Label>
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div>
                  <Label>Short Description</Label>
                  <Input value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} required />
                </div>

                <div>
                  <Label>Full Description</Label>
                  <Textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Date</Label>
                    <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                  </div>

                  <div>
                    <Label>Time</Label>
                    <Input value={time} onChange={(e) => setTime(e.target.value)} required />
                  </div>
                </div>

                <div>
                  <Label>Location</Label>
                  <Input value={location} onChange={(e) => setLocation(e.target.value)} required />
                </div>
              </div>

              {/* RIGHT */}
              <div className="space-y-3">
                <div>
                  <Label>Category</Label>
                  <Select value={category} onValueChange={(v) => setCategory(v as Event["category"])}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="entrepreneurship">Entrepreneurship</SelectItem>
                      <SelectItem value="social">Social</SelectItem>
                      <SelectItem value="mental-health">Mental Health</SelectItem>
                      <SelectItem value="innovation">Innovation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Image filename</Label>
                  <Input
                    placeholder="example.jpg"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Place image in <code>/public/assets/events</code>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Ticket Price</Label>
                    <Input type="number" value={ticketPrice} onChange={(e) => setTicketPrice(e.target.value)} />
                  </div>

                  <div>
                    <Label>Max Attendees</Label>
                    <Input type="number" value={maxAttendees} onChange={(e) => setMaxAttendees(e.target.value)} />
                  </div>
                </div>

                <div>
                  <Label>Registration Form</Label>
                  <DynamicFormBuilder fields={formFields} onChange={setFormFields} />
                </div>
              </div>

              {/* SUBMIT */}
              <div className="md:col-span-2 pt-4">
                <Button type="submit" className="w-full">
                  {editing ? "Update Event" : "Create Event"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* EVENT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((e) => (
          <Card key={e.id} className="overflow-hidden hover:shadow-lg transition">
            {e.image && (
              <img
                src={`/assets/events/${e.image}`}
                alt={e.title}
                className="h-44 w-full object-cover"
              />
            )}
            <CardHeader>
              <CardTitle>{e.title}</CardTitle>
              <CardDescription>{e.shortDescription}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              📍 {e.location} <br />
              📅 {e.date} · {e.time}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminEvents;
