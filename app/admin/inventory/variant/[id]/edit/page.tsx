"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Variant = {
  id: string;
  name: string;
  hasQuantity: boolean;
  quantity: number | null;
  unit: string | null;
};

export default function EditVariantPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [variant, setVariant] = useState<Variant | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [hasQuantity, setHasQuantity] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("");

  useEffect(() => {
    async function loadVariant() {
      try {
        const res = await fetch(`/api/variants/${id}`);

        if (!res.ok) {
          alert("Unable to load variant.");
          return;
        }

        const data = await res.json();

        setVariant(data);
        setName(data.name);
        setHasQuantity(data.hasQuantity);
        setQuantity(data.quantity ?? 0);
        setUnit(data.unit ?? "");
      } catch (error) {
        console.error("LOAD VARIANT ERROR:", error);
        alert("Unable to load variant.");
      } finally {
        setLoading(false);
      }
    }

    loadVariant();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setSaving(true);

    try {
      const res = await fetch(`/api/variants/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          hasQuantity,
          quantity,
          unit,
        }),
      });

      if (!res.ok) {
        alert("Unable to update variant.");
        return;
      }

      router.push("/admin/inventory");
      router.refresh();
    } catch (error) {
      console.error("UPDATE VARIANT ERROR:", error);
      alert("Unable to update variant.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 px-6 py-10 text-gray-800">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl bg-white p-8 shadow">
            <p className="text-gray-600">Loading variant...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!variant) {
    return (
      <main className="min-h-screen bg-gray-100 px-6 py-10 text-gray-800">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl bg-white p-8 shadow">
            <p className="text-red-600">Variant could not be found.</p>

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
          <h1 className="text-4xl font-bold">Edit Variant</h1>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label className="mb-2 block font-semibold">Variant Name</label>

              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
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
