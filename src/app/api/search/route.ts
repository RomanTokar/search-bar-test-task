import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/types/search";

const PRODUCTS: Product[] = [
  { id: 1, name: "Banana", category: "Fruit" },
  { id: 2, name: "Banana Chips", category: "Snack" },
  { id: 3, name: "Apple", category: "Fruit" },
  { id: 4, name: "Apple Juice", category: "Beverage" },
  { id: 5, name: "Blueberry Muffin", category: "Bakery" },
  { id: 6, name: "Blueberry Yogurt", category: "Dairy" },
  { id: 7, name: "Bread", category: "Bakery" },
  { id: 8, name: "Butter", category: "Dairy" },
  { id: 9, name: "Carrot", category: "Vegetable" },
  { id: 10, name: "Cherry Tomato", category: "Vegetable" },
  { id: 11, name: "Coffee Beans", category: "Beverage" },
  { id: 12, name: "Dark Chocolate", category: "Snack" },
  { id: 13, name: "Eggs", category: "Dairy" },
  { id: 14, name: "Granola Bar", category: "Snack" },
  { id: 15, name: "Greek Yogurt", category: "Dairy" },
  { id: 16, name: "Green Tea", category: "Beverage" },
  { id: 17, name: "Honey", category: "Condiment" },
  { id: 18, name: "Mango", category: "Fruit" },
  { id: 19, name: "Olive Oil", category: "Condiment" },
  { id: 20, name: "Orange Juice", category: "Beverage" },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";

  await new Promise((resolve) => setTimeout(resolve, 100));

  if (!q.trim()) {
    return NextResponse.json({ products: [], query: q });
  }

  const lower = q.toLowerCase();
  const products = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(lower) ||
      p.category.toLowerCase().includes(lower)
  );

  return NextResponse.json({ products, query: q });
}
