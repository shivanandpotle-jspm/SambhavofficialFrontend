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

/* ✅ FULL TEAM DATA (Leadership + Core + Volunteers) */
const defaultTeamMembers: TeamMember[] = [
  // Leadership
  {
    id: "1",
    name: "Aarav Kulkarni",
    role: "Founder & Director",
    bio: "Leads Sambhav with vision and strategy.",
    image: "https://i.pravatar.cc/400?img=12",
    socialLinks: { linkedin: "https://linkedin.com" },
  },

  // Core Team
  {
    id: "2",
    name: "Sneha Patil",
    role: "Operations Head",
    image: "https://i.pravatar.cc/400?img=32",
    socialLinks: { instagram: "https://instagram.com" },
  },
  {
    id: "3",
    name: "Rohit Sharma",
    role: "Community Lead",
    image: "https://i.pravatar.cc/400?img=5",
    socialLinks: { twitter: "https://twitter.com" },
  },

  // Volunteers
  {
    id: "4",
    name: "Ananya Deshmukh",
    role: "Volunteer Coordinator",
    image: "https://i.pravatar.cc/400?img=45",
    socialLinks: {},
  },
  {
    id: "5",
    name: "Kunal Joshi",
    role: "Volunteer",
    image: "https://i.pravatar.cc/400?img=15",
    socialLinks: {},
  },
];

/* ✅ GALLERY DATA */
const defaultGalleryImages: GalleryImage[] = [
  {
    id: "g1",
    url: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=800",
    caption: "Financial Literacy Workshop",
    category: "workshops",
  },
  {
    id: "g2",
    url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800",
    caption: "Entrepreneur Networking Event",
    category: "events",
  },
  {
    id: "g3",
    url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800",
    caption: "Team Building Activity",
    category: "team",
  },
];

/* ================= CONTEXT ================= */

const AdminContext = createContext<AdminContextType | undefined>(undefined);

/* ================= PROVIDER ================= */

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [attendees] = useState<EventAttendee[]>([]);
  const [teamMembers] = useState<TeamMember[]>(defaultTeamMembers);
  const [galleryImages] = useState<GalleryImage[]>(defaultGalleryImages);
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data?.events ?? []))
      .catch(() => setEvents([]));
  }, []);

  const addEvent = async (event: Event) => {
    await fetch("http://localhost:5000/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });
  };

  const updateEvent = async (id: string, update: Partial<Event>) => {
    await fetch(`http://localhost:5000/api/events/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update),
    });
  };

  const deleteEvent = async (id: string) => {
    await fetch(`http://localhost:5000/api/events/${id}`, {
      method: "DELETE",
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
