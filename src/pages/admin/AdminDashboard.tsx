import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";

const AdminDashboard: React.FC = () => {
   const navigate = useNavigate();
  const { events } = useAdmin();

  return (
   <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={() => navigate("/admin/registrations")}>
          View Participants
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Calendar className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold">{events.length}</p>
              <p className="text-sm text-muted-foreground">Total Events</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Events</CardTitle>
        </CardHeader>
        <CardContent>
          {events.length === 0 && (
            <p className="text-muted-foreground">No events found</p>
          )}

          {events.slice(0, 5).map((event) => (
            <div
              key={event.id}
              className="flex justify-between py-3 border-b last:border-0"
            >
              <div>
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(event.date).toLocaleDateString()}
                </p>
              </div>
              <span className="text-sm capitalize">{event.status}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};


export default AdminDashboard;
