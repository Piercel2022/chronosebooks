import { Link } from 'react-router-dom';
import Navigation from './Navigation';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            Chronos eBooks
          </Link>
          <Navigation />
        </div>
      </div>
    </header>
  );
}