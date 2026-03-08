import { forwardRef } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isOpen: boolean;
  activeIndex: number;
  listId: string;
  activeSuggestionId: string | undefined;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    {
      value,
      onChange,
      onFocus,
      onKeyDown,
      isOpen,
      listId,
      activeSuggestionId,
    },
    ref
  ) {
    return (
      <div className="relative flex items-center">
        <Search className="absolute left-3.5 w-4 h-4 text-cream-400 pointer-events-none" />
        <Input
          ref={ref}
          type="search"
          placeholder="Find Products"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={isOpen ? listId : undefined}
          aria-activedescendant={activeSuggestionId}
          aria-autocomplete="list"
          autoComplete="off"
          className="pl-10 pr-10 h-11 bg-white border-cream-300 rounded-xl focus-visible:ring-cream-400 text-cream-900 placeholder:text-cream-400"
        />
        <button
          type="button"
          aria-label="Filter"
          className="absolute right-3.5 text-cream-400 hover:text-cream-600 transition-colors"
          tabIndex={-1}
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>
    );
  }
);
