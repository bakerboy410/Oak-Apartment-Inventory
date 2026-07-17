"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  const cards = [
    {
      title: "Inventory",
      description: "Add, edit and manage inventory items.",
      icon: "📦",
      href: "/admin/inventory",
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Trappers",
      description: "Check out, check in and manage trappers.",
      icon: "🪤",
      href: "/admin/trappers",
      color: "from-green-500 to-green-700",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h1 className="text-5xl text-center font-bold text-gray-800">
              🔧 Admin Dashboard
            </h1>

            <p className="mt-3 text-gray-600">
              Oak Apartments Inventory Administration
            </p>
          </div>

          <button
            onClick={async () => {
              await fetch("/api/logout", {
                method: "POST",
              });

              router.push("/login");
              router.refresh();
            }}
            className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {cards.map((card) => (
            <Link key={card.title} href={card.href} className="group">
              <div className="overflow-hidden rounded-3xl bg-white shadow transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <div
                  className={`bg-gradient-to-r ${card.color} p-8 text-white`}
                >
                  <div className="text-6xl">{card.icon}</div>

                  <h2 className="mt-5 text-3xl font-bold">{card.title}</h2>
                </div>

                <div className="p-8">
                  <p className="text-gray-600">{card.description}</p>

                  <p className="mt-6 font-semibold text-blue-600 transition group-hover:translate-x-2">
                    Open →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
