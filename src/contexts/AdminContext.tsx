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

  /* ✅ FETCH EVENTS (AUTH SAFE) */
  useEffect(() => {
    fetch("http://localhost:5000/api/events", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setEvents(data?.events ?? []))
      .catch(() => setEvents([]));
  }, []);

  /* ================= CRUD ================= */

  const addEvent = async (event: Event) => {
    await fetch("http://localhost:5000/api/events", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });
  };

  const updateEvent = async (id: string, update: Partial<Event>) => {
    await fetch(`http://localhost:5000/api/events/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update),
    });
  };

  const deleteEvent = async (id: string) => {
    await fetch(`http://localhost:5000/api/events/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
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
