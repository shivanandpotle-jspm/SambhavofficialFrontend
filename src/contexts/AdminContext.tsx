import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'dropdown' | 'textarea' | 'date' | 'phone';
  required: boolean;
  options?: string[];
  placeholder?: string;
}

export interface EventImage {
  id: string;
  url: string;
  file?: File;
  caption?: string;
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
  images: EventImage[];
  formFields: FormField[];
  category: 'financial' | 'entrepreneurship' | 'social' | 'mental-health' | 'innovation';
  status: 'upcoming' | 'ongoing' | 'completed';
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
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
  eventId?: string;
  category: string;
  uploadedAt: string;
}

export interface Donor {
  id: string;
  name: string;
  email: string;
  amount: number;
  donatedAt: string;
  message?: string;
  anonymous: boolean;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedAt: string;
  membershipStatus: 'active' | 'pending' | 'expired';
  feePaid: boolean;
}

export interface EventAttendee {
  id: string;
  eventId: string;
  name: string;
  email: string;
  formData: Record<string, unknown>;
  registeredAt: string;
  ticketPaid: boolean;
}

export interface AdminSettings {
  membershipFee: number;
  defaultEventTicketPrice: number;
  razorpayKeyId: string;
}

interface AdminContextType {
  events: Event[];
  teamMembers: TeamMember[];
  galleryImages: GalleryImage[];
  donors: Donor[];
  members: Member[];
  attendees: EventAttendee[];
  settings: AdminSettings;
  addEvent: (event: Event) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  addTeamMember: (member: TeamMember) => void;
  updateTeamMember: (id: string, member: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;
  addGalleryImage: (image: GalleryImage) => void;
  deleteGalleryImage: (id: string) => void;
  updateSettings: (settings: Partial<AdminSettings>) => void;
  addDonor: (donor: Donor) => void;
  addMember: (member: Member) => void;
  addAttendee: (attendee: EventAttendee) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const defaultSettings: AdminSettings = {
  membershipFee: 500,
  defaultEventTicketPrice: 200,
  razorpayKeyId: '',
};

const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Financial Literacy Workshop',
    date: '2025-01-15',
    time: '10:00 AM',
    location: 'Community Center Hall A',
    description: 'Learn essential financial skills including budgeting, saving, and investing basics.',
    shortDescription: 'Master your finances with expert guidance',
    ticketPrice: 200,
    maxAttendees: 50,
    images: [],
    formFields: [
      { id: '1', label: 'Full Name', type: 'text', required: true },
      { id: '2', label: 'Email', type: 'email', required: true },
      { id: '3', label: 'Experience Level', type: 'dropdown', required: true, options: ['Beginner', 'Intermediate', 'Advanced'] },
    ],
    category: 'financial',
    status: 'upcoming',
    createdAt: '2024-12-01',
  },
  {
    id: '2',
    title: 'Startup Pitch Night',
    date: '2025-01-25',
    time: '6:00 PM',
    location: 'Innovation Hub',
    description: 'Present your startup ideas to a panel of investors and mentors.',
    shortDescription: 'Showcase your startup to investors',
    ticketPrice: 150,
    maxAttendees: 100,
    images: [],
    formFields: [
      { id: '1', label: 'Full Name', type: 'text', required: true },
      { id: '2', label: 'Startup Name', type: 'text', required: true },
      { id: '3', label: 'Pitch Category', type: 'dropdown', required: true, options: ['Tech', 'Social Impact', 'FinTech', 'HealthTech'] },
    ],
    category: 'entrepreneurship',
    status: 'upcoming',
    createdAt: '2024-12-05',
  },
];

const sampleTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    role: 'Founder & CEO',
    image: '',
    bio: 'Passionate about empowering communities through financial education.',
    socialLinks: { linkedin: '#', twitter: '#' },
  },
  {
    id: '2',
    name: 'Rahul Verma',
    role: 'Head of Programs',
    image: '',
    bio: 'Leading innovative programs that transform lives.',
    socialLinks: { linkedin: '#', instagram: '#' },
  },
  {
    id: '3',
    name: 'Ananya Patel',
    role: 'Community Manager',
    image: '',
    bio: 'Building bridges between communities and opportunities.',
    socialLinks: { linkedin: '#', twitter: '#', instagram: '#' },
  },
];

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(sampleEvents);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(sampleTeamMembers);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [attendees, setAttendees] = useState<EventAttendee[]>([]);
  const [settings, setSettings] = useState<AdminSettings>(defaultSettings);

  const addEvent = (event: Event) => setEvents([...events, event]);
  const updateEvent = (id: string, update: Partial<Event>) => {
    setEvents(events.map(e => e.id === id ? { ...e, ...update } : e));
  };
  const deleteEvent = (id: string) => setEvents(events.filter(e => e.id !== id));

  const addTeamMember = (member: TeamMember) => setTeamMembers([...teamMembers, member]);
  const updateTeamMember = (id: string, update: Partial<TeamMember>) => {
    setTeamMembers(teamMembers.map(m => m.id === id ? { ...m, ...update } : m));
  };
  const deleteTeamMember = (id: string) => setTeamMembers(teamMembers.filter(m => m.id !== id));

  const addGalleryImage = (image: GalleryImage) => setGalleryImages([...galleryImages, image]);
  const deleteGalleryImage = (id: string) => setGalleryImages(galleryImages.filter(i => i.id !== id));

  const updateSettings = (update: Partial<AdminSettings>) => {
    setSettings({ ...settings, ...update });
  };

  const addDonor = (donor: Donor) => setDonors([...donors, donor]);
  const addMember = (member: Member) => setMembers([...members, member]);
  const addAttendee = (attendee: EventAttendee) => setAttendees([...attendees, attendee]);

  return (
    <AdminContext.Provider value={{
      events,
      teamMembers,
      galleryImages,
      donors,
      members,
      attendees,
      settings,
      addEvent,
      updateEvent,
      deleteEvent,
      addTeamMember,
      updateTeamMember,
      deleteTeamMember,
      addGalleryImage,
      deleteGalleryImage,
      updateSettings,
      addDonor,
      addMember,
      addAttendee,
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
