import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/products/ProductGrid';
import FilterBar from '../components/products/FilterBar';
import { products } from '../data/products';
import type { Product } from '../types/Product';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Get category from URL params
  const categoryFromUrl = searchParams.get('category');

  // Filter and sort products
  const filteredProducts = useMemo<Product[]>(() => {
    let filtered: Product[] = [...products];

    // Apply category filter from URL or selected filters
    const activeCategories = categoryFromUrl 
      ? [categoryFromUrl] 
      : selectedCategories.length > 0 
        ? selectedCategories 
        : [];

    if (activeCategories.length > 0) {
      filtered = filtered.filter(p => 
        activeCategories.includes(p.category)
      );
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.author.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    // Apply price range filter
    filtered = filtered.filter(p => 
      p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => {
          if (!b.releaseDate || !a.releaseDate) return 0;
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        });
        break;
      default:
        // Featured - keep original order
        break;
    }

    return filtered;
  }, [categoryFromUrl, selectedCategories, searchQuery, priceRange, sortBy]);

  // Get unique categories from products
  const categories = useMemo(() => {
    return [...new Set(products.map(p => p.category))];
  }, []);

  const handleAddToCart = (product: Product) => {
    // Implement cart functionality here
    console.log('Adding to cart:', product);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-amber-900 via-orange-800 to-red-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-serif font-bold mb-6 leading-tight animate-fadeIn">
              Discover Your Next
              <span className="block text-amber-200 mt-2">Great Read</span>
            </h1>
            <p className="text-xl text-amber-100 leading-relaxed font-light animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              Curated collection of {products.length}+ premium e-books across {categories.length} categories. 
              Instant delivery. Forever yours.
            </p>
          </div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" 
                  fill="rgb(254 243 199)" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        {/* Breadcrumb & Stats */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          <div>
            <nav className="text-sm text-gray-600 mb-2">
              <span className="hover:text-orange-600 transition-colors cursor-pointer">Home</span>
              <span className="mx-2">/</span>
              <span className="font-medium text-gray-900">
                {categoryFromUrl || 'All Books'}
              </span>
            </nav>
            <h2 className="text-3xl font-serif font-bold text-gray-900">
              {categoryFromUrl ? `${categoryFromUrl} Books` : 'All Books'}
            </h2>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-500">Showing</p>
            <p className="text-2xl font-bold text-orange-600">
              {filteredProducts.length}
            </p>
            <p className="text-sm text-gray-500">
              {filteredProducts.length === 1 ? 'book' : 'books'}
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <div className="relative max-w-2xl">
            <input
              type="text"
              placeholder="Search by title, author, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pr-12 rounded-full border-2 border-gray-200 focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all text-gray-900 placeholder-gray-400 shadow-sm hover:shadow-md"
            />
            <svg 
              className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="animate-fadeIn" style={{ animationDelay: '0.5s' }}>
          <FilterBar
            onFilterChange={(filters: {
              categories?: string[];
              priceRange?: number[];
              sortBy?: string;
            }) => {
              if (filters.categories) setSelectedCategories(filters.categories);
              if (filters.priceRange) setPriceRange(filters.priceRange);
              if (filters.sortBy) setSortBy(filters.sortBy);
            }}
            products={filteredProducts as never[]}
          />
        </div>

        {/* Results Summary */}
        {searchQuery && (
          <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg animate-fadeIn">
            <p className="text-orange-900">
              <span className="font-semibold">{filteredProducts.length}</span> results for 
              <span className="font-semibold"> "{searchQuery}"</span>
            </p>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="animate-fadeIn" style={{ animationDelay: '0.6s' }}>
            <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
          </div>
        ) : (
          <div className="text-center py-20 animate-fadeIn">
            <div className="inline-block p-6 bg-gray-100 rounded-full mb-6">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
              No books found
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Try adjusting your filters or search query to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategories([]);
                setPriceRange([0, 100]);
                setSearchParams({});
              }}
              className="px-6 py-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-all shadow-md hover:shadow-lg font-medium"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mt-20 pt-12 border-t border-gray-200 animate-fadeIn">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="inline-block p-4 bg-orange-100 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-1">150K+ Readers</h4>
              <p className="text-sm text-gray-600">Trust our collection</p>
            </div>

            <div className="group">
              <div className="inline-block p-4 bg-orange-100 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Instant Access</h4>
              <p className="text-sm text-gray-600">Download immediately</p>
            </div>

            <div className="group">
              <div className="inline-block p-4 bg-orange-100 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Quality Assured</h4>
              <p className="text-sm text-gray-600">Carefully curated</p>
            </div>

            <div className="group">
              <div className="inline-block p-4 bg-orange-100 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Lifetime Updates</h4>
              <p className="text-sm text-gray-600">Free revisions</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .font-serif {
          font-family: 'Crimson Pro', serif;
        }
      `}</style>
    </div>
  );
};

export default ProductsPage;