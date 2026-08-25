export const dynamic = "force-dynamic";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export default async function TrappersPage() {
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

  const available = settings?.totalTrappers ?? 0;

  const checkedOut = borrowers.reduce(
    (sum, borrower) => sum + borrower.quantity,
    0,
  );

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10 text-gray-800">
      <section className="mx-auto max-w-5xl">
        <Image
          src="/images/items/Trappers.jpeg"
          alt="Trappers"
          width={900}
          height={500}
          className="w-full rounded-3xl bg-white p-4 object-contain shadow-lg"
        />

        <h1 className="mt-8 text-center text-5xl font-bold">🪤 Trappers</h1>

        <p className="mt-3 text-center text-gray-600">
          Lending & Return Management
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow">
            <p className="text-gray-500">Available</p>

            <p className="mt-2 text-5xl font-bold text-green-600">
              {available}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow">
            <p className="text-gray-500">Currently Borrowed</p>

            <p className="mt-2 text-5xl font-bold text-blue-600">
              {checkedOut}
            </p>
          </div>
        </div>

        <section className="mt-10 rounded-3xl bg-white p-8 shadow">
          <h2 className="text-3xl font-semibold">Current Borrowers</h2>

          {borrowers.length === 0 ? (
            <p className="mt-6 text-gray-500">No active borrowers.</p>
          ) : (
            <div className="mt-6 space-y-4">
              {borrowers.map((borrower) => (
                <div
                  key={borrower.id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <span className="font-semibold">{borrower.name}</span>

                  <span className="rounded-full bg-blue-100 px-4 py-1 font-bold">
                    {borrower.quantity}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mt-10 rounded-3xl bg-white p-8 shadow">
          <h2 className="text-3xl font-semibold">History</h2>

          {history.length === 0 ? (
            <p className="mt-6 text-gray-500">No transactions yet.</p>
          ) : (
            <div className="mt-6 space-y-4">
              {history.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div>
                    <p className="font-semibold">{entry.name}</p>

                    <p className="text-sm text-gray-500">
                      {entry.type === "checkout" ? "Checked Out" : "Checked In"}{" "}
                      •{" "}
                      {entry.legacy
                        ? "Historical record"
                        : entry.date.toLocaleDateString()}
                    </p>
                  </div>

                  <span
                    className={`font-bold ${
                      entry.type === "checkout"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {entry.type === "checkout" ? "-" : "+"}
                    {entry.quantity}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
