import { ShoppingBasket } from "lucide-react";
import { Product } from "@/types/search";
import { HighlightText } from "./highlight-text";

interface SuggestionItemProps {
  product: Product;
  query: string;
  isActive: boolean;
  index: number;
  onSelect: (product: Product) => void;
  onMouseEnter: (index: number) => void;
}

export function SuggestionItem({
  product,
  query,
  isActive,
  index,
  onSelect,
  onMouseEnter,
}: SuggestionItemProps) {
  return (
    <li
      id={`suggestion-${product.id}`}
      role="option"
      aria-selected={isActive}
      className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors border-b border-gray-200 last:border-b-0 ${
        isActive ? "bg-cream-100" : "hover:bg-cream-50"
      }`}
      onMouseDown={(e) => {
        e.preventDefault();
        onSelect(product);
      }}
      onMouseEnter={() => onMouseEnter(index)}
    >
      <ShoppingBasket className="w-4 h-4 text-cream-400 shrink-0" />
      <span className="text-sm">
        <HighlightText text={product.name} query={query} />
      </span>
    </li>
  );
}
