export default function Footer() {
  return (
    <footer className="bg-secondary text-white mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Chronos eBooks</h3>
            <p className="text-gray-300">
              Votre bibliothèque numérique de confiance
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Liens rapides</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/about" className="hover:text-white">À propos</a></li>
              <li><a href="/products" className="hover:text-white">Catalogue</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <p className="text-gray-300">chronosebooks@outlook.fr</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2026 Chronos eBooks. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}