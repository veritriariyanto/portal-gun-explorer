// app/episodes/page.js
import { getAllEpisodes } from '../../services/episodeService';
import Link from 'next/link';

export default async function EpisodesPage({ searchParams }) {
  // PERBAIKAN: await searchParams
  const params = await searchParams;
  const page = parseInt(params.page || '1');

  let data = null;
  let error = null;

  try {
    data = await getAllEpisodes(page);
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
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Episodes</h1>
        <p className="text-gray-600 text-lg">
          All {data.info.count} episodes from Rick and Morty
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.results.map((episode) => (
          <div key={episode.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                {episode.episode}
              </span>
              <span className="text-sm text-gray-500">{episode.air_date}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {episode.name}
            </h3>
            <p className="text-sm text-gray-600">
              {episode.characters.length} characters
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <Link
          href={`/episodes?page=${page - 1}`}
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
          href={`/episodes?page=${page + 1}`}
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