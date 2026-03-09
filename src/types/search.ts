export interface Product {
  id: number;
  name: string;
}

export type SearchResult = {
  products: Product[];
  query: string;
};
