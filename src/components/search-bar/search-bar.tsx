"use client";

import { useRef, useState, useEffect, useId, useCallback } from "react";
import { useSearch } from "@/hooks/use-search";
import { useRecentSearches } from "@/hooks/use-recent-searches";
import { SearchInput } from "./search-input";
import { SuggestionsList } from "./suggestions-list";
import { RecentSearches } from "./recent-searches";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const { suggestions } = useSearch(query);
  const { searches, addSearch } = useRecentSearches();

  const showSuggestions = isOpen && query.trim().length > 0;
  const showRecent = isOpen && query.trim().length === 0;
  const dropdownVisible = showSuggestions || showRecent;

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside, { passive: true });
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectItem = useCallback(
    (term: string) => {
      setQuery(term);
      addSearch(term);
      setIsOpen(false);
      setActiveIndex(-1);
    },
    [addSearch]
  );

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!dropdownVisible) return;

    const items = showSuggestions ? suggestions : [];

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) =>
          items.length === 0 ? -1 : (prev + 1) % items.length
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) =>
          items.length === 0 ? -1 : prev <= 0 ? items.length - 1 : prev - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (showSuggestions && activeIndex >= 0 && suggestions[activeIndex]) {
          selectItem(suggestions[activeIndex].name);
        } else if (query.trim()) {
          addSearch(query.trim());
          setIsOpen(false);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setActiveIndex(-1);
        break;
    }
  }

  const activeSuggestionId =
    showSuggestions && activeIndex >= 0 && suggestions[activeIndex]
      ? `suggestion-${suggestions[activeIndex].id}`
      : undefined;

  const suggestionCount = showSuggestions ? suggestions.length : 0;

  return (
    <div ref={containerRef} className="w-full max-w-md relative">
      <SearchInput
        value={query}
        onChange={(v) => {
          setQuery(v);
          setIsOpen(true);
          setActiveIndex(-1);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        isOpen={dropdownVisible}
        listId={listId}
        activeSuggestionId={activeSuggestionId}
      />

      {dropdownVisible ? (
        <div className="absolute top-full left-0 right-0 mt-1.5 z-50 overflow-hidden bg-white border border-cream-200 shadow-lg rounded-xl">
          {showSuggestions ? (
            <SuggestionsList
              products={suggestions}
              query={query}
              activeIndex={activeIndex}
              listId={listId}
              onSelect={selectItem}
              onMouseEnter={setActiveIndex}
            />
          ) : null}
          {showRecent ? (
            <RecentSearches
              searches={searches}
              onSelect={(term) => {
                setQuery(term);
                addSearch(term);
                setIsOpen(true);
              }}
            />
          ) : null}
        </div>
      ) : null}

      {/* Accessible live region */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {showSuggestions
          ? `${suggestionCount} suggestion${suggestionCount !== 1 ? "s" : ""} available`
          : ""}
      </div>
    </div>
  );
}
