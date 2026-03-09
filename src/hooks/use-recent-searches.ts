"use client";

import { useState } from "react";
import { MAX_RECENT_SEARCHES, RECENT_SEARCHES_KEY } from "@/lib/constants";
import { Product } from "@/types/search";

export function useRecentSearches() {
  const [searches, setSearches] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  function addSearch(product: Product) {
    setSearches((prev) => {
      const deduped = [product, ...prev.filter((p) => p.id !== product.id)].slice(
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
