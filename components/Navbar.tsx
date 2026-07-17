"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const linkStyle = (href: string) =>
    `transition font-medium ${
      pathname === href ? "text-blue-600" : "text-gray-800 hover:text-blue-600"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-white/60 shadow-sm backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-8 px-6 py-4">
        <Link href="/" className={linkStyle("/")}>
          🏠 Inventory
        </Link>

        <Link href="/trappers" className={linkStyle("/trappers")}>
          📦 Trappers
        </Link>

        <Link href="/admin" className={linkStyle("/admin")}>
          🔧 Admin
        </Link>

        {pathname === "/" && (
          <a
            href="#inventory-search"
            className="font-medium text-gray-800 transition hover:text-blue-600"
          >
            🔍 Search
          </a>
        )}
      </div>
    </nav>
  );
}
