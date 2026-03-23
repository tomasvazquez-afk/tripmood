"use client";

import { useEffect } from "react";
import { bootstrapAnalytics } from "@/lib/analytics";

export function TrackingProvider() {
  useEffect(() => {
    bootstrapAnalytics();
  }, []);

  return null;
}
