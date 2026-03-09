import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { PRODUCTS } from "@/data/products";
import { BackButton } from "./back-button";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === Number(id));

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      <main className="max-w-md mx-auto px-4 py-10">
        <div className="mb-6">
          <BackButton />
        </div>
        <div className="bg-white border border-cream-200 rounded-xl p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-900">
            {product.name}
          </h1>
        </div>
      </main>
    </div>
  );
}
