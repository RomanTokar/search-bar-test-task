# Product Search Bar

A Next.js application implementing a product search bar with debounced autocomplete, keyboard navigation, query highlighting, and recent search history.

## Features

- **Debounced autocomplete** — searches trigger after 300ms with a minimum of 1 character
- **Keyboard navigation** — ArrowUp/Down to move through results, Enter to select, Escape to close
- **Query highlighting** — matched text is highlighted in search results
- **Recent searches** — last 3 searches persisted in localStorage, shown when input is focused with empty query
- **Accessible** — ARIA combobox attributes on the input and listbox
- **Product detail pages** — each result links to a dedicated product page

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) (base-nova style)
- [SWR](https://swr.vercel.app/) for data fetching

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── app/
│   ├── api/search/route.ts   # Search API — filters 20 in-memory products
│   ├── product/[id]/         # Product detail pages
│   └── page.tsx              # Home page with SearchBar
├── components/
│   ├── search-bar/
│   │   ├── search-bar.tsx    # Main orchestrator (state, keyboard nav, dropdown)
│   │   ├── search-input.tsx  # Combobox input with ARIA attributes
│   │   ├── suggestions-list.tsx
│   │   ├── suggestion-item.tsx
│   │   ├── highlight-text.tsx
│   │   └── recent-searches.tsx
│   └── ui/                   # shadcn/ui primitives (Button, Badge, Input, Popover)
├── hooks/
│   ├── use-search.ts          # Debounced SWR-based product search
│   └── use-recent-searches.ts # localStorage recent search history
├── lib/
│   └── constants.ts           # DEBOUNCE_MS, MIN_QUERY_LENGTH, MAX_RECENT_SEARCHES
└── types/
    └── search.ts              # Product and SearchResult interfaces
```
