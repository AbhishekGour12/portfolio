"use client";

import { useEffect, useState } from "react";
import PageLoader from "./PageLoader";

export default function InitialLoader({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const done = () => setLoading(false);
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const id = requestIdleCallback(done, { timeout: 800 });
      return () => cancelIdleCallback(id);
    } else {
      const t = setTimeout(done, 600);
      return () => clearTimeout(t);
    }
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return children;
}