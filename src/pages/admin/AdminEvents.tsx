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
import { Plus, Pencil, Sparkles, ScrollText, Wand2 } from "lucide-react";
import type { Event, FormField } from "@/contexts/AdminContext";

const AdminEvents: React.FC = () => {
  const { events, addEvent, updateEvent } = useAdmin();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Event | null>(null);

  // Form States
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [maxAttendees, setMaxAttendees] = useState("");
  const [category, setCategory] = useState<Event["category"]>("financial");
  const [image, setImage] = useState("");
  const [formFields, setFormFields] = useState<FormField[]>([]);

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
    setFormFields([
      { id: "name", type: "text", label: "Full Name", required: true },
      { id: "email", type: "email", label: "Email", required: true },
    ]);
    setEditing(null);
  };

  const handleEdit = (event: Event) => {
    setEditing(event);
    setTitle(event.title);
    setShortDescription(event.shortDescription);
    setDescription(event.description);
    setDate(event.date);
    setTime(event.time);
    setLocation(event.location);
    setTicketPrice(event.ticketPrice.toString());
    setMaxAttendees(event.maxAttendees.toString());
    setCategory(event.category);
    setImage(event.image || "");
    setFormFields(event.formFields || []);
    setOpen(true);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
      createdAt: editing?.createdAt || new Date().toISOString(),
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
    <div className="space-y-8 bg-[#1a120b] p-6 min-h-screen text-[#f3e5ab] font-serif">
      <style>{`
        .hogwarts-input { background: #2d1e12 !important; border: 1px solid #d4af37 !important; color: #f3e5ab !important; }
        .hogwarts-dialog { background: #1a120b !important; border: 2px solid #d4af37 !important; color: #f3e5ab !important; }
      `}</style>

      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-[#d4af37]/30 pb-6">
        <div>
          <h1 className="text-4xl font-bold text-[#d4af37] flex items-center gap-3">
            <Wand2 className="h-8 w-8" /> Event Archives
          </h1>
          <p className="text-[#f3e5ab]/60 italic">Manage the magical gatherings of Sambhav</p>
        </div>

        <Dialog open={open} onOpenChange={(val) => { setOpen(val); if(!val) reset(); }}>
          <DialogTrigger asChild>
            <Button className="bg-[#741b1b] hover:bg-[#5a1515] text-[#f3e5ab] border-b-4 border-[#3c1010]">
              <Plus className="h-4 w-4 mr-2" /> New Scroll (Event)
            </Button>
          </DialogTrigger>

          <DialogContent className="hogwarts-dialog max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl text-[#d4af37] font-serif uppercase tracking-widest">
                {editing ? "Edit Scroll" : "Create New Scroll"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="space-y-4">
                <div>
                  <Label className="text-[#d4af37]">Event Title</Label>
                  <Input className="hogwarts-input" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                  <Label className="text-[#d4af37]">Short Description</Label>
                  <Input className="hogwarts-input" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} required />
                </div>
                <div>
                  <Label className="text-[#d4af37]">Full Description</Label>
                  <Textarea className="hogwarts-input" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-[#d4af37]">Date</Label>
                    <Input className="hogwarts-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                  </div>
                  <div>
                    <Label className="text-[#d4af37]">Time</Label>
                    <Input className="hogwarts-input" value={time} onChange={(e) => setTime(e.target.value)} required />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-[#d4af37]">Category</Label>
                  <Select value={category} onValueChange={(v) => setCategory(v as Event["category"])}>
                    <SelectTrigger className="hogwarts-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2d1e12] text-[#f3e5ab] border-[#d4af37]">
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="entrepreneurship">Entrepreneurship</SelectItem>
                      <SelectItem value="social">Social</SelectItem>
                      <SelectItem value="mental-health">Mental Health</SelectItem>
                      <SelectItem value="innovation">Innovation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-[#d4af37]">Image Filename</Label>
                  <Input className="hogwarts-input" value={image} onChange={(e) => setImage(e.target.value)} required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-[#d4af37]">Ticket Price (₹)</Label>
                    <Input className="hogwarts-input" type="number" value={ticketPrice} onChange={(e) => setTicketPrice(e.target.value)} />
                  </div>
                  <div>
                    <Label className="text-[#d4af37]">Max Wizards</Label>
                    <Input className="hogwarts-input" type="number" value={maxAttendees} onChange={(e) => setMaxAttendees(e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label className="text-[#d4af37] mb-2 block">Registration Form Attributes</Label>
                  <div className="bg-[#2d1e12] p-3 border border-[#d4af37]/30 rounded-lg">
                    <DynamicFormBuilder fields={formFields} onChange={setFormFields} />
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 pt-4">
                <Button type="submit" className="w-full bg-[#741b1b] hover:bg-[#5a1515] text-[#f3e5ab] py-6 text-xl rounded-none border-b-4 border-[#3c1010]">
                  {editing ? "Cast Update Charm" : "Seal the Scroll"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* EVENT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((e) => (
          <Card key={e.id} className="overflow-hidden bg-[#fdf5e6] border-2 border-[#d4af37] shadow-[5px_5px_0px_#3c2a1a] group relative">
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]"></div>
            {e.image && (
              <img src={`/assets/events/${e.image}`} alt={e.title} className="h-44 w-full object-cover border-b-2 border-[#d4af37] sepia-[0.2]" />
            )}
            <CardHeader className="relative">
              <div className="flex justify-between items-start">
                <CardTitle className="text-[#2d1e12] font-bold text-xl">{e.title}</CardTitle>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="text-[#741b1b] hover:bg-[#741b1b]/10"
                  onClick={() => handleEdit(e)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription className="text-[#5d4037] italic">{e.shortDescription}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-[#3c2a1a] relative font-serif">
              <div className="flex items-center gap-2 mb-1"><Sparkles className="h-3 w-3 text-[#741b1b]" /> {e.location}</div>
              <div className="flex items-center gap-2"><ScrollText className="h-3 w-3 text-[#741b1b]" /> {e.date} · {e.time}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminEvents;