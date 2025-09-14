"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-red-600 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold cursor-pointer hover:text-gray-200 transition-colors">
            Pokédex
          </h1>
        </Link>
        <nav aria-label="Menu principal">
          <ul className="flex space-x-4">
            <li>
              <Link
                href="/"
                aria-current={pathname === "/" ? "page" : undefined}
                className="hover:underline"
              >
                Início
              </Link>
            </li>
            <li>
              <Link
                href="/favoritos"
                aria-current={pathname === "/favoritos" ? "page" : undefined}
                className="hover:underline"
              >
                Favoritos
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
