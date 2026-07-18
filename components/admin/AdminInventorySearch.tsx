"use client";

import { useState } from "react";
import { InventoryItem } from "@/types/inventory";

type Props = {
  items: InventoryItem[];
  children: (items: InventoryItem[]) => React.ReactNode;
};

export default function AdminInventorySearch({ items, children }: Props) {
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

      {children(filteredItems)}
    </>
  );
}
