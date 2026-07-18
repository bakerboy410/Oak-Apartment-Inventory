"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckInPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("quantity", quantity.toString());
    formData.append("date", new Date().toISOString());

    const res = await fetch("/api/trappers/checkin", {
      method: "POST",
      body: formData,
    });
    setLoading(false);

    if (!res.ok) {
      alert("Unable to check in trappers.");
      return;
    }

    router.push("/admin/trappers");
    router.refresh();
  }

  return (
    <main
      className="min-h-screen bg-gray-100 px-6 py-10"
      font-semibold
      text-gray-800
    >
      <div className="mx-auto max-w-xl">
        <Link
          href="/admin/trappers"
          className="inline-flex rounded-xl bg-white px-5 py-3 shadow text-gray-800"
        >
          ← Back
        </Link>

        <div className="mt-8 rounded-3xl bg-white p-8 shadow text-gray-800">
          <h1 className="text-4xl font-bold">📥 Check In Trappers</h1>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label className="mb-2 block font-semibold">Borrowers Name</label>

              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">Quantity</label>

              <input
                required
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>

            <label className="flex items-center gap-2">
              <input type="checkbox" name="legacy" />
              Legacy record (return date unknown)
            </label>

            <button
              disabled={loading}
              className="w-full rounded-xl bg-green-600 py-4 font-bold text-white transition hover:bg-green-700"
            >
              {loading ? "Checking In..." : "Check In"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
