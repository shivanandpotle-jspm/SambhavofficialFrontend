import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface FormField {
  id: string; label: string; required: boolean; placeholder?: string; options?: string[];
  type: 'text' | 'email' | 'number' | 'phone' | 'date' | 'textarea' | 'dropdown';
}

export interface Event {
  id: string; _id?: string; title: string; date: string; time: string; location: string;
  description: string; shortDescription: string; ticketPrice: number; maxAttendees: number;
  image?: string; formFields: FormField[]; status: string; createdAt: string;
  category: "financial" | "entrepreneurship" | "social" | "mental-health" | "innovation";
}

interface AdminContextType {
  events: Event[];
  addEvent: (event: Event) => Promise<void>;
  updateEvent: (id: string, event: Partial<Event>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/events", { credentials: "include" })
      .then(res => res.json()).then(data => setEvents(data?.events || []))
      .catch(err => console.error(err));
  }, []);

  const addEvent = async (event: Event) => {
    const res = await fetch("http://localhost:5000/api/events", {
      method: "POST", credentials: "include", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });
    const data = await res.json();
    if (data.success) setEvents(prev => [...prev, data.event]);
  };

  const updateEvent = async (id: string, update: Partial<Event>) => {
    const res = await fetch(`http://localhost:5000/api/events/${id}`, {
      method: "PUT", credentials: "include", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update),
    });
    const data = await res.json();
    if (data.success) setEvents(prev => prev.map(e => e.id === id ? { ...e, ...update } : e));
  };

  const deleteEvent = async (id: string) => {
    const res = await fetch(`http://localhost:5000/api/events/${id}`, { method: "DELETE", credentials: "include" });
    const data = await res.json();
    if (data.success) setEvents(prev => prev.filter(e => e.id !== id));
  };

  return <AdminContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside AdminProvider");
  return ctx;
};
