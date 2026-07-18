"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function NewVariantPage() {
  const router = useRouter();
  const params = useParams();

  const itemId = params.id as string;

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");

  const [hasQuantity, setHasQuantity] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("");

  const [image, setImage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("/api/variants/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemId,
        name,
        hasQuantity,
        quantity,
        unit,
        image,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Unable to create variant.");
      return;
    }

    router.push("/admin/inventory");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10 text-gray-800">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/admin/inventory"
          className="rounded-lg bg-white px-4 py-2 shadow text-gray-800"
        >
          ← Back
        </Link>

        <div className="mt-8 rounded-3xl bg-white p-8 shadow">
          <h1 className="text-4xl font-bold text-gray-800">Add Variant</h1>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label className="mb-2 block font-semibold text-gray-800">
                Variant Name
              </label>

              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border px-4 py-3 text-gray-800"
              />
            </div>

            <label className="flex items-center gap-3 text-gray-800">
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
                  <label className="mb-2 block font-semibold text-gray-800">
                    Quantity
                  </label>

                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full rounded-xl border px-4 py-3 text-gray-800"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-gray-800">
                    Unit
                  </label>

                  <input
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full rounded-xl border px-4 py-3 text-gray-800"
                  />
                </div>
              </>
            )}

            <div>
              <label className="mb-2 block font-semibold text-gray-800">
                Image Path
              </label>

              <input
                placeholder="/images/variants/example.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full rounded-xl border px-4 py-3 text-gray-800"
              />
            </div>

            <button
              disabled={loading}
              className="w-full rounded-xl bg-green-600 py-4 font-bold text-white hover:bg-green-700"
            >
              {loading ? "Saving..." : "Save Variant"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
