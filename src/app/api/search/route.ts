import { NextRequest, NextResponse } from "next/server";
import { PRODUCTS } from "@/data/products";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";

  await new Promise((resolve) => setTimeout(resolve, 100));

  if (!q.trim()) {
    return NextResponse.json({ products: [], query: q });
  }

  const lower = q.toLowerCase();
  const products = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(lower)
  );

  return NextResponse.json({ products, query: q });
}
