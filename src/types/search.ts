export interface Product {
  id: number;
  name: string;
  category: string;
}

export type SearchResult = {
  products: Product[];
  query: string;
};
