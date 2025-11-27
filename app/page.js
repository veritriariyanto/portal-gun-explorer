// app/page.js
import { getAllCharacters, searchCharacters } from '../services/characterService';
import CharacterCard from '../components/ui/CharacterCard';
import SearchBar from '../components/ui/SearchBar';
import Pagination from '../components/ui/Pagination';

export default async function Home({ searchParams }) {
  // PERBAIKAN: await searchParams (Next.js 15+)
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const search = params.search || '';

  let data = null;
  let error = null;

  try {
    if (search) {
      data = await searchCharacters(search, page);
    } else {
      data = await getAllCharacters(page);
    }
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
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Rick and Morty Characters
        </h1>
        <p className="text-gray-600 text-lg">
          Explore all {data.info.count} characters from the multiverse
        </p>
      </div>

      <SearchBar />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.results.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      <Pagination info={data.info} />
    </div>
  );
}