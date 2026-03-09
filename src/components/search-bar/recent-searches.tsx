import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/search";

interface RecentSearchesProps {
  searches: Product[];
  onSelect: (product: Product) => void;
}

export function RecentSearches({ searches, onSelect }: RecentSearchesProps) {
  if (searches.length === 0) {
    return (
      <div className="px-4 py-6 text-center text-sm text-cream-400">
        No recent searches
      </div>
    );
  }

  return (
    <div className="px-4 py-3">
      <p className="text-sm font-medium text-cream-500 mb-2">
        Recent Searches
      </p>
      <div className="flex flex-wrap gap-2">
        {searches.map((product) => (
          <Badge
            key={product.id}
            variant="secondary"
            className="bg-cream-200 text-cream-700 hover:bg-cream-300 rounded-full cursor-pointer border-0 font-normal"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSelect(product);
            }}
          >
            {product.name}
          </Badge>
        ))}
      </div>
    </div>
  );
}
