"use client";

import { useState } from "react";
import { MAX_RECENT_SEARCHES, RECENT_SEARCHES_KEY } from "@/lib/constants";

export function useRecentSearches() {
  const [searches, setSearches] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

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
