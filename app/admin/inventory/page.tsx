export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AdminInventoryClient from "@/components/admin/AdminInventoryClient";

export default async function InventoryAdminPage() {
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
    <main className="min-h-screen bg-gray-100 px-6 py-10 text-gray-800">
      <div className="mx-auto max-w-6xl">
        <Link href="/admin" className="rounded-lg bg-white px-4 py-2 shadow">
          ← Back
        </Link>

        <h1 className="mt-6 text-5xl font-bold text-gray-900">📦 Inventory</h1>

        <Link
          href="/admin/inventory/new"
          className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 text-white"
        >
          Add Item
        </Link>

        <div className="mt-10">
          <AdminInventoryClient items={items} />
        </div>
      </div>
    </main>
  );
}
