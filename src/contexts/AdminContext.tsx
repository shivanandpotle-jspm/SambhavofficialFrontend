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

/* ================= TEAM ================= */

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

/* ================= GALLERY ================= */

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: "events" | "workshops" | "community" | "team";
}

/* ================= SETTINGS ================= */

export interface Settings {
  membershipFee: number;
  defaultEventTicketPrice: number;
  razorpayKeyId: string;
}

/* ================= CONTEXT ================= */

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

// ✅ ADD THESE (fixes TypeScript + Render build)
const defaultTeamMembers: TeamMember[] = [];
const defaultGalleryImages: GalleryImage[] = [];

/* ================= CONTEXT ================= */

const AdminContext = createContext<AdminContextType | undefined>(undefined);

/* ================= PROVIDER ================= */

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [attendees] = useState<EventAttendee[]>([]);
  const [teamMembers] = useState<TeamMember[]>(defaultTeamMembers);
  const [galleryImages] = useState<GalleryImage[]>(defaultGalleryImages);
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/events`)
      .then((res) => res.json())
      .then((data) => setEvents(data?.events ?? []))
      .catch(() => setEvents([]));
  }, [API_URL]);

  const addEvent = async (event: Event) => {
    await fetch(`${API_URL}/api/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
      credentials: "include",
    });
  };

  const updateEvent = async (id: string, update: Partial<Event>) => {
    await fetch(`${API_URL}/api/events/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update),
      credentials: "include",
    });
  };

  const deleteEvent = async (id: string) => {
    await fetch(`${API_URL}/api/events/${id}`, {
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
