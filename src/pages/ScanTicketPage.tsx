import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const SCAN_DELAY = 4000; // same as old platform

const ScanTicketPage: React.FC = () => {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isPausedRef = useRef(false);

  const [isScanning, setIsScanning] = useState(false);
  const [day, setDay] = useState<"1" | "2">("1");

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  const startScanner = async () => {
    if (isScanning) return;

    const scanner = new Html5Qrcode("qr-reader");
    scannerRef.current = scanner;

    try {
      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        async (decodedText) => {
          if (isPausedRef.current) return;

          isPausedRef.current = true;
          await scanner.pause(true);

          await verifyTicket(decodedText);

          setTimeout(async () => {
            try {
              await scanner.resume();
              isPausedRef.current = false;
            } catch {}
          }, SCAN_DELAY);
        },
        () => {}
      );

      setIsScanning(true);
    } catch (err) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera",
        variant: "destructive",
      });
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      await scannerRef.current.stop().catch(() => {});
      await scannerRef.current.clear();
    }
    setIsScanning(false);
  };

  const verifyTicket = async (ticketId: string) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/validate-ticket/${ticketId}?day=${day}`,
        { method: "POST" }
      );

      const result = await res.json();

      if (result.success) {
        toast({
          title: "✅ Check-in Successful",
          description: result.message,
        });
      } else {
        toast({
          title: "❌ Scan Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Server Error",
        description: "Unable to validate ticket",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>🎟️ Ticket Scanner</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Day Selector (from old project) */}
          <div className="flex gap-4 justify-center">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={day === "1"}
                onChange={() => setDay("1")}
              />
              Day 1
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={day === "2"}
                onChange={() => setDay("2")}
              />
              Day 2
            </label>
          </div>

          <div
            id="qr-reader"
            className="w-full aspect-square rounded-lg border"
          />

          {!isScanning ? (
            <Button className="w-full" onClick={startScanner}>
              Start Scanning
            </Button>
          ) : (
            <Button
              variant="destructive"
              className="w-full"
              onClick={stopScanner}
            >
              Stop Scanning
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ScanTicketPage;
