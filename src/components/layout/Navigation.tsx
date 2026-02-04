import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navigation() {
  const [cartCount] = useState(0);

  return (
    <nav className="flex items-center gap-6">
      <Link to="/" className="hover:text-primary transition">
        Accueil
      </Link>
      <Link to="/products" className="hover:text-primary transition">
        Produits
      </Link>
      <Link to="/about" className="hover:text-primary transition">
        À propos
      </Link>
     {/* Prominent Contact CTA */}
        <Link 
          to="/contact"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105"
        >
          Get In Touch
        </Link>
      <Link to="/checkout" className="relative hover:text-primary transition">
        Panier
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {cartCount}
          </span>
        )}
      </Link>
    </nav>
  );
}