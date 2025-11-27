// components/layout/Header.js
import Link from 'next/link';
import { Button } from '../ui/button';

export default function Header() {
  return (
    <header className="border-b">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold hover:opacity-80 transition">
            🛸 Rick & Morty
          </Link>
          <ul className="flex gap-2">
            <li>
              <Button asChild variant="ghost">
                <Link href="/">Characters</Link>
              </Button>
            </li>
            <li>
              <Button asChild variant="ghost">
                <Link href="/episodes">Episodes</Link>
              </Button>
            </li>
            <li>
              <Button asChild variant="ghost">
                <Link href="/locations">Locations</Link>
              </Button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}