"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Borrower = {
  id: string;
  name: string;
  quantity: number;
  latestCheckoutDate: string | null;
};

export default function CheckInPage() {
  const router = useRouter();

  const [borrowers, setBorrowers] = useState<Borrower[]>([]);
  const [legacy, setLegacy] = useState(false);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState("");

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

  const selectedBorrower = borrowers.find((borrower) => borrower.name === name);

  function handleBorrowerChange(value: string) {
    setName(value);
    setQuantity(1);
    setDate("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("quantity", quantity.toString());

    if (!legacy) {
      formData.append("date", date);
    }

    if (legacy) {
      formData.append("legacy", "on");
    }

    const res = await fetch("/api/trappers/checkin", {
      method: "POST",
      body: formData,
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();

      alert(data.error || "Unable to check in trappers.");
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
                  onChange={(e) => handleBorrowerChange(e.target.value)}
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

            {selectedBorrower && !legacy && (
              <div className="rounded-xl bg-green-50 p-4">
                <p className="text-sm text-green-700">
                  <span className="font-semibold">{selectedBorrower.name}</span>{" "}
                  currently has{" "}
                  <span className="font-bold">{selectedBorrower.quantity}</span>{" "}
                  trappers.
                </p>

                {selectedBorrower.latestCheckoutDate && (
                  <p className="mt-1 text-sm text-green-700">
                    Latest checkout:{" "}
                    <span className="font-semibold">
                      {selectedBorrower.latestCheckoutDate}
                    </span>
                  </p>
                )}
              </div>
            )}

            <div>
              <label className="mb-2 block font-semibold">Quantity</label>

              <input
                required
                type="number"
                min={1}
                max={selectedBorrower?.quantity}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full rounded-xl border px-4 py-3"
              />

              {selectedBorrower && !legacy && (
                <p className="mt-2 text-sm text-gray-500">
                  Maximum return: {selectedBorrower.quantity}
                </p>
              )}
            </div>

            {!legacy && (
              <div>
                <label className="mb-2 block font-semibold">
                  Check-in Date
                </label>

                <input
                  required
                  type="date"
                  min={selectedBorrower?.latestCheckoutDate || undefined}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl border px-4 py-3"
                />

                {selectedBorrower?.latestCheckoutDate && (
                  <p className="mt-2 text-sm text-gray-500">
                    Check-in date cannot be earlier than{" "}
                    {selectedBorrower.latestCheckoutDate}.
                  </p>
                )}
              </div>
            )}

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
