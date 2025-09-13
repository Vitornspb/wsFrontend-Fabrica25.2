import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-red-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold cursor-pointer hover:text-gray-200 transition-colors">
            Pokédex
          </h1>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:underline">
                Início
              </Link>
            </li>
            <li>
              <Link href="/favoritos" className="hover:underline">
                Favoritos
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}