import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import DeleteItemButton from "@/components/admin/DeleteItemButton";
import DeleteVariantButton from "@/components/admin/DeleteVariantButton";

export default async function InventoryAdminPage() {
  const items = await prisma.item.findMany({
    include: {
      images: true,
      variants: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10 text-gray-800">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-6">
          <div>
            <Link
              href="/admin"
              className="rounded-lg bg-white px-4 py-2 shadow"
            >
              ← Back
            </Link>

            <h1 className="mt-6 text-5xl font-bold">📦 Inventory</h1>

            <p className="mt-2 text-gray-600">
              Manage inventory items and variants.
            </p>
          </div>
          <Link
            href="/admin/inventory/new"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Add Item
          </Link>{" "}
        </div>

        <div className="mt-10 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="rounded-3xl bg-white p-6 shadow">
              <div className="flex items-center justify-between">
                <div className="flex gap-6">
                  {item.images[0] && (
                    <Image
                      src={item.images[0].url}
                      alt={item.name}
                      width={140}
                      height={140}
                      className="h-32 w-32 rounded-2xl border object-cover"
                    />
                  )}

                  <div>
                    <h2 className="text-2xl font-bold">{item.name}</h2>

                    <p className="text-gray-600">{item.description}</p>

                    <p className="mt-2 text-sm text-gray-500">{item.store}</p>

                    {item.hasQuantity && (
                      <p className="mt-1 font-semibold">
                        Quantity: {item.quantity} {item.unit}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link
                    href={`/admin/inventory/${item.id}/variant/new`}
                    className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                  >
                    Add Variant
                  </Link>{" "}
                  <DeleteItemButton id={item.id} />{" "}
                </div>
              </div>

              {item.variants.length > 0 && (
                <div className="mt-6 border-t pt-4">
                  <h3 className="font-semibold text-gray-700">Variants</h3>

                  <div className="mt-3 space-y-2">
                    {item.variants.map((variant) => (
                      <div
                        key={variant.id}
                        className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3"
                      >
                        <div>
                          <p className="font-medium">{variant.name}</p>

                          {variant.hasQuantity && (
                            <p className="text-sm text-gray-500">
                              Quantity: {variant.quantity} {variant.unit}
                            </p>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <DeleteVariantButton id={variant.id} />{" "}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
