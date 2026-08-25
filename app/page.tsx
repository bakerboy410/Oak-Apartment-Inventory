export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import InventorySearch from "@/components/inventory/InventorySearch";

export default async function Home() {
  const items = await prisma.item.findMany({
    include: {
      images: true,
      variants: {
        include: {
          images: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <section className="mb-12 text-center">
        <h1 className="text-5xl font-bold text-gray-900">Oak Apartments</h1>

        <p className="mt-3 text-xl font-medium text-gray-700">Inventory</p>
      </section>
      <InventorySearch items={items} />
    </main>
  );
}
