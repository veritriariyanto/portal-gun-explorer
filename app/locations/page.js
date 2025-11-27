// app/locations/page.js
import { getAllLocations } from '../../services/locationService';
import Link from 'next/link';

export default async function LocationsPage({ searchParams }) {
  // PERBAIKAN: await searchParams
  const params = await searchParams;
  const page = parseInt(params.page || '1');

  let data = null;
  let error = null;

  try {
    data = await getAllLocations(page);
  } catch (err) {
    error = err.message;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Locations</h1>
        <p className="text-gray-600 text-lg">
          Explore {data.info.count} locations across the multiverse
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.results.map((location) => (
          <div key={location.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {location.name}
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-semibold">Type:</span> {location.type}
              </p>
              <p>
                <span className="font-semibold">Dimension:</span> {location.dimension}
              </p>
              <p className="text-gray-500">
                {location.residents.length} residents
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <Link
          href={`/locations?page=${page - 1}`}
          className={`px-4 py-2 rounded-lg ${
            !data.info.prev
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          Previous
        </Link>
        <span className="px-4 py-2 text-gray-700 font-semibold">
          Page {page} of {data.info.pages}
        </span>
        <Link
          href={`/locations?page=${page + 1}`}
          className={`px-4 py-2 rounded-lg ${
            !data.info.next
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          Next
        </Link>
      </div>
    </div>
  );
}