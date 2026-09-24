"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Borrower = {
  id: string;
  name: string;
  quantity: number;
};

export default function CheckoutPage() {
  const router = useRouter();

  const [borrowers, setBorrowers] = useState<Borrower[]>([]);
  const [borrowerId, setBorrowerId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
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

  const selectedBorrower = borrowers.find(
    (borrower) => borrower.id === borrowerId,
  );

  function handleBorrowerChange(value: string) {
    setBorrowerId(value);

    if (value === "new") {
      setName("");
      setPhone("");
      return;
    }

    const borrower = borrowers.find((borrower) => borrower.id === value);

    if (borrower) {
      setName(borrower.name);
      setPhone("");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("quantity", quantity.toString());
    formData.append("date", date);

    if (borrowerId && borrowerId !== "new") {
      formData.append("borrowerId", borrowerId);
    }

    const res = await fetch("/api/trappers/checkout", {
      method: "POST",
      body: formData,
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();

      alert(data.error || "Unable to check out trappers.");
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
          <h1 className="text-4xl font-bold">📤 Check Out Trappers</h1>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label className="mb-2 block font-semibold">Borrower</label>

              <select
                required
                value={borrowerId}
                onChange={(e) => handleBorrowerChange(e.target.value)}
                className="w-full rounded-xl border px-4 py-3"
              >
                <option value="">Select borrower</option>

                {borrowers.map((borrower) => (
                  <option key={borrower.id} value={borrower.id}>
                    {borrower.name} ({borrower.quantity} currently borrowed)
                  </option>
                ))}

                <option value="new">+ New borrower</option>
              </select>
            </div>

            {borrowerId === "new" && (
              <>
                <div>
                  <label className="mb-2 block font-semibold">
                    Borrowers Name
                  </label>

                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border px-4 py-3"
                    placeholder="Enter name"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold">
                    Phone Number
                  </label>

                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border px-4 py-3"
                    placeholder="Optional"
                  />
                </div>
              </>
            )}

            {selectedBorrower && (
              <div className="rounded-xl bg-blue-50 p-4">
                <p className="text-sm text-blue-700">
                  <span className="font-semibold">{selectedBorrower.name}</span>{" "}
                  currently has{" "}
                  <span className="font-bold">{selectedBorrower.quantity}</span>{" "}
                  trappers.
                </p>
              </div>
            )}

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

            <div>
              <label className="mb-2 block font-semibold">
                Transaction Date
              </label>

              <input
                required
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
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
