import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider } from "@/contexts/AdminContext";

/* ===== Layouts ===== */
import { PublicLayout } from "@/components/layout/PublicLayout";
import { AdminLayout } from "@/components/layout/AdminLayout";

/* ===== Public Pages ===== */
import { HomePage } from "@/pages/HomePage";
import { AboutPage } from "@/pages/AboutPage";
import EventsPage from "@/pages/EventsPage";
import EventDetailPage from "@/pages/EventDetailPage";
import { GalleryPage } from "@/pages/GalleryPage";
import { TeamPage } from "@/pages/TeamPage";
import { DonatePage } from "@/pages/DonatePage";
import { MembershipPage } from "@/pages/MembershipPage";
import { VolunteerPage } from "@/pages/VolunteerPage";
import TermsAndConditions from "@/pages/TermsAndConditions";
import PrivacyPolicy from "@/pages/PrivacyPolicy";

/* ===== Admin Pages ===== */
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminEvents from "@/pages/admin/AdminEvents";
import AdminSettings from "@/pages/admin/AdminSettings";
import AdminRegistrations from "@/pages/admin/AdminRegistrations";

/* ===== Scanner Page ===== */
import ScanTicketPage from "@/pages/ScanTicketPage";

/* ===== Misc ===== */
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          <BrowserRouter>
            <Routes>
              {/* ================= PUBLIC ROUTES ================= */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/events/:eventId" element={<EventDetailPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/donate" element={<DonatePage />} />
                <Route path="/membership" element={<MembershipPage />} />
                <Route path="/volunteer" element={<VolunteerPage />} />
                <Route
                  path="/terms-and-conditions"
                  element={<TermsAndConditions />}
                />
                <Route
                  path="/privacy-policy"
                  element={<PrivacyPolicy />}
                />
              </Route>

              {/* ================= AUTH ================= */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* ================= ADMIN ================= */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="events" element={<AdminEvents />} />
                <Route path="registrations" element={<AdminRegistrations />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>

              {/* ================= SCANNER ================= */}
              <Route path="/scan" element={<ScanTicketPage />} />

              {/* ================= 404 ================= */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AdminProvider>
    </QueryClientProvider>
  );
};

export default App;
