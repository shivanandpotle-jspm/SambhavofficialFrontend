import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Registration {
  _id: string;
  event: string;
  primary_name: string;
  email: string;
  status_day_1?: string;
  status_day_2?: string;
  formData?: Record<string, any>;
  createdAt?: string;
}

const API_URL = import.meta.env.VITE_API_URL;

const AdminRegistrations: React.FC = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedEvent, setSelectedEvent] = useState<string>("ALL");

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const res = await fetch(`${API_URL}/api/registrations`, {
        credentials: "include",
      });

      const json = await res.json();

      if (!json.success) {
        throw new Error("Failed to fetch registrations");
      }

      setRegistrations(json.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load registrations");
    } finally {
      setLoading(false);
    }
  };

  /* 🔹 UNIQUE EVENTS */
  const events = useMemo(() => {
    const set = new Set<string>();
    registrations.forEach((r) => set.add(r.event));
    return Array.from(set);
  }, [registrations]);

  /* 🔹 FILTERED REGISTRATIONS */
  const filteredRegistrations = useMemo(() => {
    if (selectedEvent === "ALL") return registrations;
    return registrations.filter((r) => r.event === selectedEvent);
  }, [registrations, selectedEvent]);

  /* 🔹 EXPORT CSV */
  const exportCSV = () => {
    if (!filteredRegistrations.length) return;

    const dynamicKeys = new Set<string>();
    filteredRegistrations.forEach((r) => {
      if (r.formData) {
        Object.keys(r.formData).forEach((k) => dynamicKeys.add(k));
      }
    });

    const headers = [
      "Ticket ID",
      "Event",
      "Name",
      "Email",
      ...Array.from(dynamicKeys),
      "Day 1 Status",
      "Day 2 Status",
      "Created At",
    ];

    const rows = filteredRegistrations.map((r) => {
      const row: string[] = [];
      row.push(r._id);
      row.push(r.event);
      row.push(r.primary_name);
      row.push(r.email);

      dynamicKeys.forEach((key) => {
        row.push(r.formData?.[key] ?? "");
      });

      row.push(r.status_day_1 ?? "");
      row.push(r.status_day_2 ?? "");
      row.push(r.createdAt ? new Date(r.createdAt).toLocaleString() : "");

      return row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",");
    });

    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download =
      selectedEvent === "ALL"
        ? "all-event-registrations.csv"
        : `${selectedEvent}-registrations.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Event Registrations</h1>
        <Button onClick={exportCSV}>Export CSV</Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={selectedEvent === "ALL" ? "default" : "outline"}
          onClick={() => setSelectedEvent("ALL")}
        >
          All Events
        </Button>

        {events.map((event) => (
          <Button
            key={event}
            size="sm"
            variant={selectedEvent === event ? "default" : "outline"}
            onClick={() => setSelectedEvent(event)}
          >
            {event}
          </Button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {selectedEvent === "ALL"
              ? "All Registrations"
              : `Registrations – ${selectedEvent}`}
          </CardTitle>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          {loading && <p>Loading registrations…</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && filteredRegistrations.length === 0 && (
            <p>No registrations found.</p>
          )}

          {!loading && filteredRegistrations.length > 0 && (
            <table className="w-full border text-sm">
              <thead>
                <tr className="border-b bg-muted">
                  <th className="p-2 text-left">Ticket ID</th>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Form Data</th>
                  <th className="p-2 text-left">Day 1</th>
                  <th className="p-2 text-left">Day 2</th>
                </tr>
              </thead>

              <tbody>
                {filteredRegistrations.map((r) => (
                  <tr key={r._id} className="border-b">
                    <td className="p-2">{r._id}</td>
                    <td className="p-2">{r.primary_name}</td>
                    <td className="p-2">{r.email}</td>
                    <td className="p-2">
                      {r.formData ? (
                        <ul className="space-y-1">
                          {Object.entries(r.formData).map(([k, v]) => (
                            <li key={k}>
                              <strong>{k}:</strong> {String(v)}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="p-2">
                      <Badge variant="outline">
                        {r.status_day_1 || "-"}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <Badge variant="outline">
                        {r.status_day_2 || "-"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminRegistrations;
