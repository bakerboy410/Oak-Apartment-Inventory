"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Item = {
  id: string;
  name: string;
  description: string;
  store: string;
  hasQuantity: boolean;
  quantity: number | null;
  unit: string | null;
};

export default function EditItemPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [store, setStore] = useState("");
  const [hasQuantity, setHasQuantity] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("");

  useEffect(() => {
    async function loadItem() {
      try {
        const res = await fetch(`/api/items/${id}`);

        if (!res.ok) {
          alert("Unable to load item.");
          return;
        }

        const data = await res.json();

        setItem(data);
        setName(data.name);
        setDescription(data.description);
        setStore(data.store);
        setHasQuantity(data.hasQuantity);
        setQuantity(data.quantity ?? 0);
        setUnit(data.unit ?? "");
      } catch (error) {
        console.error("LOAD ITEM ERROR:", error);
        alert("Unable to load item.");
      } finally {
        setLoading(false);
      }
    }

    loadItem();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setSaving(true);

    try {
      const res = await fetch(`/api/items/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          store,
          hasQuantity,
          quantity,
          unit,
        }),
      });

      if (!res.ok) {
        alert("Unable to update item.");
        return;
      }

      router.push("/admin/inventory");
      router.refresh();
    } catch (error) {
      console.error("UPDATE ITEM ERROR:", error);
      alert("Unable to update item.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 px-6 py-10 text-gray-800">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl bg-white p-8 shadow">
            <p className="text-gray-600">Loading item...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!item) {
    return (
      <main className="min-h-screen bg-gray-100 px-6 py-10 text-gray-800">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl bg-white p-8 shadow">
            <p className="text-red-600">Item could not be found.</p>

            <Link
              href="/admin/inventory"
              className="mt-6 inline-block rounded-lg bg-gray-200 px-4 py-2"
            >
              ← Back to Inventory
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10 text-gray-800">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/admin/inventory"
          className="rounded-lg bg-white px-4 py-2 shadow"
        >
          ← Back
        </Link>

        <div className="mt-8 rounded-3xl bg-white p-8 shadow">
          <h1 className="text-4xl font-bold">Edit Item</h1>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label className="mb-2 block font-semibold">Name</label>

              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">Description</label>

              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">Store</label>

              <input
                required
                value={store}
                onChange={(e) => setStore(e.target.value)}
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={hasQuantity}
                onChange={(e) => setHasQuantity(e.target.checked)}
              />
              Track Quantity
            </label>

            {hasQuantity && (
              <>
                <div>
                  <label className="mb-2 block font-semibold">Quantity</label>

                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full rounded-xl border px-4 py-3"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold">Unit</label>

                  <input
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full rounded-xl border px-4 py-3"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-blue-600 py-4 font-bold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
