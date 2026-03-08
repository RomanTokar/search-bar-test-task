"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { DEBOUNCE_MS, MIN_QUERY_LENGTH } from "@/lib/constants";
import { SearchResult } from "@/types/search";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useSearch(query: string) {
  const [debounced, setDebounced] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(query), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [query]);

  const shouldFetch = debounced.trim().length >= MIN_QUERY_LENGTH;

  const { data, isLoading, error } = useSWR<SearchResult>(
    shouldFetch ? `/api/search?q=${encodeURIComponent(debounced)}` : null,
    fetcher,
    { keepPreviousData: true, revalidateOnFocus: false }
  );

  return {
    suggestions: data?.products ?? [],
    isLoading: shouldFetch && isLoading,
    error,
  };
}
