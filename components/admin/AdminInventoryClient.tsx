"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DeleteItemButton from "@/components/admin/DeleteItemButton";
import DeleteVariantButton from "@/components/admin/DeleteVariantButton";
import { InventoryItem } from "@/types/inventory";

type Props = {
  items: InventoryItem[];
};

export default function AdminInventoryClient({ items }: Props) {
  const [search, setSearch] = useState("");

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <div className="mb-8">
        <label className="mb-2 block text-lg font-semibold text-gray-800">
          Search Inventory
        </label>

        <input
          type="text"
          placeholder="Search by item name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border px-5 py-4 text-lg text-gray-900 shadow"
        />
      </div>

      <div className="space-y-6">
        {filteredItems.map((item) => (
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
                  <h2 className="text-2xl font-bold text-gray-900">
                    {item.name}
                  </h2>

                  <p className="text-gray-700">{item.description}</p>

                  <p className="mt-2 text-sm text-gray-600">{item.store}</p>

                  {item.hasQuantity && (
                    <p className="mt-1 font-semibold text-gray-900">
                      Quantity: {item.quantity} {item.unit}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <Link
                  href={`/admin/inventory/${item.id}/variant/new`}
                  className="rounded-lg bg-green-600 px-4 py-2 text-white"
                >
                  Add Variant
                </Link>

                <DeleteItemButton id={item.id} />
              </div>
            </div>

            {item.variants.length > 0 && (
              <div className="mt-6 border-t pt-4">
                <h3 className="font-semibold text-gray-800">Variants</h3>

                {item.variants.map((variant) => (
                  <div
                    key={variant.id}
                    className="mt-3 flex justify-between rounded-lg bg-gray-50 px-4 py-3"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {variant.name}
                      </p>

                      {variant.hasQuantity && (
                        <p className="text-sm text-gray-700">
                          Quantity: {variant.quantity} {variant.unit}
                        </p>
                      )}
                    </div>

                    <DeleteVariantButton id={variant.id} />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
