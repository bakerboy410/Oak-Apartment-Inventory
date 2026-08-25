"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Borrower = {
  id: string;
  name: string;
  quantity: number;
};

export default function CheckInPage() {
  const router = useRouter();

  const [borrowers, setBorrowers] = useState<Borrower[]>([]);
  const [legacy, setLegacy] = useState(false);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadBorrowers() {
      const res = await fetch("/api/trappers/borrowers");

      if (res.ok) {
        const data = await res.json();
        setBorrowers(data);
      }
    }

    loadBorrowers();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("quantity", quantity.toString());

    if (legacy) {
      formData.append("legacy", "on");
    }

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
    <main className="min-h-screen bg-gray-100 px-6 py-10 text-gray-700">
      <div className="mx-auto max-w-xl">
        <Link
          href="/admin/trappers"
          className="inline-flex rounded-xl bg-white px-5 py-3 shadow"
        >
          ← Back
        </Link>

        <div className="mt-8 rounded-3xl bg-white p-8 shadow">
          <h1 className="text-4xl font-bold">📥 Check In Trappers</h1>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <label className="flex items-center gap-3 font-semibold">
              <input
                type="checkbox"
                checked={legacy}
                onChange={(e) => setLegacy(e.target.checked)}
              />
              Legacy record (return date unknown)
            </label>

            <div>
              <label className="mb-2 block font-semibold">Borrower Name</label>

              {legacy ? (
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border px-4 py-3"
                  placeholder="Enter name"
                />
              ) : (
                <select
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border px-4 py-3"
                >
                  <option value="">Select borrower</option>

                  {borrowers.map((borrower) => (
                    <option key={borrower.id} value={borrower.name}>
                      {borrower.name} ({borrower.quantity})
                    </option>
                  ))}
                </select>
              )}
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
              className="w-full rounded-xl bg-green-600 py-4 font-bold text-white hover:bg-green-700"
            >
              {loading ? "Checking In..." : "Check In"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
