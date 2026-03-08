import { Product } from "@/types/search";
import { SuggestionItem } from "./suggestion-item";

interface SuggestionsListProps {
  products: Product[];
  query: string;
  activeIndex: number;
  listId: string;
  onSelect: (name: string) => void;
  onMouseEnter: (index: number) => void;
}

export function SuggestionsList({
  products,
  query,
  activeIndex,
  listId,
  onSelect,
  onMouseEnter,
}: SuggestionsListProps) {
  if (products.length === 0) {
    return (
      <div className="px-4 py-6 text-center text-sm text-cream-400">
        No products found for &ldquo;{query}&rdquo;
      </div>
    );
  }

  return (
    <ul id={listId} role="listbox" aria-label="Product suggestions">
      {products.map((product, index) => (
        <SuggestionItem
          key={product.id}
          product={product}
          query={query}
          isActive={index === activeIndex}
          index={index}
          onSelect={onSelect}
          onMouseEnter={onMouseEnter}
        />
      ))}
    </ul>
  );
}
