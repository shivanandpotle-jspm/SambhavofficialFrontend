import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

/* ================= TYPES ================= */
export interface FormField {
  id: string;
  label: string;
  type:
    | "text"
    | "number"
    | "email"
    | "dropdown"
    | "textarea"
    | "date"
    | "phone";
  required: boolean;
  options?: string[];
  placeholder?: string;
}

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

  image?: string; // ✅ SINGLE IMAGE FILENAME

  formFields: FormField[];
  category:
    | "financial"
    | "entrepreneurship"
    | "social"
    | "mental-health"
    | "innovation";
  status: "upcoming" | "ongoing" | "completed";
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

/* ================= CONTEXT ================= */
interface AdminContextType {
  events: Event[];
  attendees: EventAttendee[];
  addEvent: (event: Event) => Promise<void>;
  updateEvent: (id: string, event: Partial<Event>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

/* ================= PROVIDER ================= */
export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [attendees] = useState<EventAttendee[]>([]);

  /* 🔄 FETCH EVENTS FROM DB */
  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/events");
      const data = await res.json();

      if (data.success) {
        setEvents(data.events ?? []);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error("❌ Failed to fetch events", error);
      setEvents([]);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  /* ➕ ADD EVENT */
  const addEvent = async (event: Event) => {
    await fetch("http://localhost:5000/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });

    fetchEvents();
  };

  /* ✏️ UPDATE EVENT */
  const updateEvent = async (id: string, update: Partial<Event>) => {
    await fetch(`http://localhost:5000/api/events/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update),
    });

    fetchEvents();
  };

  /* 🗑️ DELETE EVENT */
  const deleteEvent = async (id: string) => {
    await fetch(`http://localhost:5000/api/events/${id}`, {
      method: "DELETE",
    });

    fetchEvents();
  };

  return (
    <AdminContext.Provider
      value={{ events, attendees, addEvent, updateEvent, deleteEvent }}
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
