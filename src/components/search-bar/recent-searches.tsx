import { Badge } from "@/components/ui/badge";

interface RecentSearchesProps {
  searches: string[];
  onSelect: (term: string) => void;
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
      <p className="text-xs font-medium text-cream-500 mb-2 uppercase tracking-wide">
        Recent Searches
      </p>
      <div className="flex flex-wrap gap-2">
        {searches.map((term) => (
          <Badge
            key={term}
            variant="secondary"
            className="bg-cream-200 text-cream-700 hover:bg-cream-300 rounded-full cursor-pointer border-0 font-normal"
            onMouseDown={(e) => {
              e.preventDefault();
              onSelect(term);
            }}
          >
            {term}
          </Badge>
        ))}
      </div>
    </div>
  );
}
