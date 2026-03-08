"use client";

import { useState, useEffect } from "react";
import { MAX_RECENT_SEARCHES, RECENT_SEARCHES_KEY } from "@/lib/constants";

export function useRecentSearches() {
  const [searches, setSearches] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) setSearches(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  function addSearch(term: string) {
    const trimmed = term.trim();
    if (!trimmed) return;

    setSearches((prev) => {
      const deduped = [trimmed, ...prev.filter((s) => s !== trimmed)].slice(
        0,
        MAX_RECENT_SEARCHES
      );
      try {
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(deduped));
      } catch {
        // ignore
      }
      return deduped;
    });
  }

  return { searches, addSearch };
}
