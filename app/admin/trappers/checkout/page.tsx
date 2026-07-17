"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("/api/trappers/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        quantity,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Unable to check out trappers.");
      return;
    }

    router.push("/admin/trappers");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10  text-gray-700">
      <div className="mx-auto max-w-xl">
        <Link
          href="/admin/trappers"
          className="inline-flex rounded-xl bg-white px-5 py-3 shadow"
        >
          ← Back
        </Link>

        <div className="mt-8 rounded-3xl bg-white p-8 shadow">
          <h1 className="text-4xl font-bold">📤 Check Out Trappers</h1>

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
              <label className="mb-2 block font-semibold">
                Phone Number (Optional)
              </label>

              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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

            <button
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-4 font-bold text-white transition hover:bg-blue-700"
            >
              {loading ? "Checking Out..." : "Check Out"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
