// components/ui/Pagination.js
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from './button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ info }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1');

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!info.prev}
        variant="outline"
        size="sm"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </Button>
      
      <span className="text-sm font-medium">
        Page {currentPage} of {info.pages}
      </span>
      
      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!info.next}
        variant="outline"
        size="sm"
      >
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
}