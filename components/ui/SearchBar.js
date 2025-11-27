// components/ui/SearchBar.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from './input';
import { Button } from './button';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/?search=${search}`);
    } else {
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-2 max-w-2xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search characters by name..."
            className="pl-10"
          />
        </div>
        <Button type="submit" size="lg">
          Search
        </Button>
      </div>
    </form>
  );
}