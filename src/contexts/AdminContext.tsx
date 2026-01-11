import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

/* ================= TYPES ================= */

export interface Event {
  id: string;
  _id?: string; // MongoDB often uses _id
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  shortDescription: string;
  ticketPrice: number;
  maxAttendees: number;
  image?: string;
  formFields: any[];
  category: string;
  status: string;
  createdAt: string;
}

export interface EventAttendee {
  id: string;
  eventId: string;
  name: string;
  email: string;
  formData: Record<string, unknown>;
  registeredAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image?: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: "events" | "workshops" | "community" | "team";
}

export interface Settings {
  membershipFee: number;
  defaultEventTicketPrice: number;
  razorpayKeyId: string;
}

/* ================= CONTEXT TYPE ================= */

interface AdminContextType {
  events: Event[];
  attendees: EventAttendee[];
  teamMembers: TeamMember[];
  galleryImages: GalleryImage[];
  settings: Settings;

  addEvent: (event: Event) => Promise<void>;
  updateEvent: (id: string, event: Partial<Event>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  updateSettings: (settings: Partial<Settings>) => void;
}

/* ================= DEFAULT DATA ================= */

const defaultSettings: Settings = {
  membershipFee: 1000,
  defaultEventTicketPrice: 0,
  razorpayKeyId: "",
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

/* ================= PROVIDER ================= */

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [attendees] = useState<EventAttendee[]>([]);
  const [teamMembers] = useState<TeamMember[]>([]);
  const [galleryImages] = useState<GalleryImage[]>([]);
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  /* ✅ FETCH EVENTS ON LOAD */
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Unauthorized or server error");
        const data = await res.json();
        
        // Ensure this matches the key returned by your backend (e.g., res.json({ success: true, events: ... }))
        setEvents(data?.events || []); 
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setEvents([]);
      }
    };

    loadEvents();
  }, []);

  /* ================= CRUD ================= */

  const addEvent = async (event: Event) => {
    try {
      const res = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      });
      const data = await res.json();
      
      if (data.success) {
        // Add the new event returned from the server to local state to update UI immediately
        setEvents((prev) => [...prev, data.event]);
      }
    } catch (err) {
      console.error("Error adding event:", err);
    }
  };

  const updateEvent = async (id: string, update: Partial<Event>) => {
    try {
      const res = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(update),
      });
      const data = await res.json();
      
      if (data.success) {
        // Update the local state for the specific event
        setEvents((prev) =>
          prev.map((e) => (e.id === id ? { ...e, ...update } : e))
        );
      }
    } catch (err) {
      console.error("Error updating event:", err);
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      
      if (data.success) {
        // Remove the event from local state to update UI
        setEvents((prev) => prev.filter((e) => e.id !== id));
      }
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <AdminContext.Provider
      value={{
        events,
        attendees,
        teamMembers,
        galleryImages,
        settings,
        addEvent,
        updateEvent,
        deleteEvent,
        updateSettings,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

/* ================= HOOK ================= */

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) {
    throw new Error("useAdmin must be used inside AdminProvider");
  }
  return ctx;
};