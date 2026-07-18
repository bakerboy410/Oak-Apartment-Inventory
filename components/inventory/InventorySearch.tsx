"use client";

import { useState } from "react";
import ItemCard from "@/components/ItemCard";
import { InventoryItem } from "@/types/inventory";

type Props = {
  items: InventoryItem[];
};

export default function InventorySearch({ items }: Props) {
  const [search, setSearch] = useState("");

  const filteredItems = items.filter((item) => {
    const text = `${item.name} ${item.description} ${item.store}`.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  return (
    <section id="inventory-search" className="scroll-mt-24">
      {" "}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search inventory..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border px-5 py-4 text-lg text-gray-900 shadow"
        />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
