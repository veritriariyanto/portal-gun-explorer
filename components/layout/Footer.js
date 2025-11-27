// components/layout/Footer.js
export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            Data from{' '}
            <a 
              href="https://rickandmortyapi.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-400 hover:underline"
            >
              Rick and Morty API
            </a>
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Built with Next.js 14 & Tailwind CSS
          </p>
        </div>
      </footer>
    );
  }