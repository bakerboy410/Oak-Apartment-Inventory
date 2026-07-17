import Link from "next/link";

export default function AdminTrappersPage() {
  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/admin"
          className="inline-flex rounded-xl bg-white px-5 py-3 shadow transition hover:shadow-lg font-semibold text-gray-800 "
        >
          ← Back to Dashboard
        </Link>

        <h1 className="mt-8 text-5xl font-bold text-gray-700">
          🪤 Trappers Management
        </h1>

        <p className="mt-3 text-lg font-semibold text-gray-800">
          Check out, return and manage apartment trappers.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <Link href="/admin/trappers/checkout">
            <div className="rounded-3xl bg-white p-10 shadow transition hover:-translate-y-2 hover:shadow-2xl">
              <div className="text-6xl">📤</div>

              <h2 className="mt-6 text-3xl font-bold text-gray-700">
                Check Out Trappers
              </h2>

              <p className="mt-4 text-gray-700">
                Issue trappers to a tenant or worker.
              </p>
            </div>
          </Link>

          <Link href="/admin/trappers/checkin">
            <div className="rounded-3xl bg-white p-10 shadow transition hover:-translate-y-2 hover:shadow-2xl">
              <div className="text-6xl">📥</div>

              <h2 className="mt-6 text-3xl font-bold text-gray-700">
                Check In Trappers
              </h2>

              <p className="mt-4 text-gray-700">
                Return previously borrowed trappers.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
