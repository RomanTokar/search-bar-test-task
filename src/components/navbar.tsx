import { SearchBar } from "@/components/search-bar/search-bar";

export function Navbar() {
  return (
    <header className="bg-cream-100 border-b border-cream-300 px-6 py-3">
      <div className="max-w-6xl mx-auto flex justify-center">
        <SearchBar />
      </div>
    </header>
  );
}
