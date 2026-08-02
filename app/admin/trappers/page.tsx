export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminTrappersPage() {
  const settings = await prisma.appSettings.findFirst();

  const borrowers = await prisma.borrower.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const history = await prisma.trapperTransaction.findMany({
    orderBy: {
      date: "desc",
    },
    take: 20,
  });

  const borrowed = borrowers.reduce<number>(
    (sum, borrower) => sum + borrower.quantity,
    0,
  );

  const available = (settings?.totalTrappers ?? 0) - borrowed;
  console.log("Admin Trappers page rendered at:", new Date().toISOString());
  return (
    <main className="min-h-screen bg-gray-100 p-8 text-gray-800">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/admin"
          className="font-semibold text-blue-600 hover:underline"
        >
          ← Back
        </Link>

        <h1 className="mt-6 text-5xl font-bold">🪤 Trappers</h1>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Link
            href="/admin/trappers/checkout"
            className="rounded-2xl bg-white p-8 shadow transition hover:shadow-xl"
          >
            <h2 className="text-3xl font-bold">📤 Check Out</h2>

            <p className="mt-3 text-gray-600">Issue trappers to a borrower.</p>
          </Link>

          <Link
            href="/admin/trappers/checkin"
            className="rounded-2xl bg-white p-8 shadow transition hover:shadow-xl"
          >
            <h2 className="text-3xl font-bold">📥 Check In</h2>

            <p className="mt-3 text-gray-600">Receive returned trappers.</p>
          </Link>
        </div>

        <div className="mt-10 rounded-2xl bg-white p-8 shadow">
          <h2 className="text-2xl font-bold">Available</h2>

          <p className="mt-3 text-5xl font-bold text-green-600">{available}</p>
        </div>

        <div className="mt-10 rounded-2xl bg-white p-8 shadow">
          <h2 className="text-2xl font-bold">Current Borrowers</h2>

          <div className="mt-6 space-y-4">
            {borrowers.length === 0 ? (
              <p className="text-gray-500">No active borrowers.</p>
            ) : (
              borrowers.map((borrower) => (
                <div
                  key={borrower.id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <span className="font-semibold">{borrower.name}</span>

                  <span className="rounded-full bg-blue-100 px-3 py-1 font-bold">
                    {borrower.quantity}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-10 rounded-2xl bg-white p-8 shadow">
          <h2 className="text-2xl font-bold">History</h2>

          <div className="mt-6 space-y-4">
            {history.length === 0 ? (
              <p className="text-gray-500">No transactions yet.</p>
            ) : (
              history.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div>
                    <p className="font-semibold">{entry.name}</p>
                    <p className="text-sm text-gray-500">
                      {entry.type} •{" "}
                      {entry.legacy
                        ? "Historical record"
                        : entry.date.toLocaleDateString()}
                    </p>{" "}
                  </div>

                  <span className="font-bold">
                    {entry.type === "checkout" ? "-" : "+"}
                    {entry.quantity}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
