import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItemCount] = useState(3); // Replace with actual cart state from useCart hook

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Banner - Conversion Focused */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 px-4 text-center text-sm">
        <span className="font-semibold">🚀 Launch Special: 50% OFF All Digital Blueprints + Free Updates Forever</span>
        <Link 
          to="/products" 
          className="ml-3 inline-flex items-center gap-1 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full font-bold transition-all hover:scale-105"
        >
          Browse Blueprints
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Enhanced Branding */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Chronos
              </h1>
              <p className="text-xs font-medium text-gray-600 -mt-1 tracking-wide">BLUEPRINTS</p>
            </div>
          </Link>

          {/* Desktop Navigation - Clear & Conversion Focused */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <Link 
              to="/products" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group"
            >
              All Blueprints
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center gap-1.5">
                Categories
                <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Categories Dropdown - Conversion Optimized */}
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 -translate-y-2">
                <div className="p-3 space-y-1">
                  <Link to="/category/business" className="block px-4 py-2.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium">
                    📊 Business & Strategy
                  </Link>
                  <Link to="/category/technology" className="block px-4 py-2.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium">
                    💻 Technology & SaaS
                  </Link>
                  <Link to="/category/marketing" className="block px-4 py-2.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium">
                    📱 Marketing & Growth
                  </Link>
                  <Link to="/category/productivity" className="block px-4 py-2.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium">
                    ⚡ Productivity Systems
                  </Link>
                  <Link to="/category/creative" className="block px-4 py-2.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium">
                    🎨 Creative & Design
                  </Link>
                  <div className="border-t border-gray-100 my-2"></div>
                  <Link to="/products" className="block px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all text-sm font-semibold text-center">
                    View All Categories →
                  </Link>
                </div>
              </div>
            </div>

            <Link 
              to="/bestsellers" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group"
            >
              <span className="flex items-center gap-1">
                🔥 Bestsellers
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* Right Actions - Conversion Optimized */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <button 
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors group"
              aria-label="Search blueprints"
            >
              <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600">Search</span>
            </button>

            {/* Cart - Enhanced Visibility */}
            <Link 
              to="/checkout" 
              className="relative flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all hover:scale-105 shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="hidden sm:inline font-medium">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Enhanced UX */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-6 border-t border-gray-200 animate-fadeIn">
            <nav className="flex flex-col gap-2 mt-4">
              <Link 
                to="/" 
                className="px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🏠 Home
              </Link>
              <Link 
                to="/products" 
                className="px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                📋 All Blueprints
              </Link>
              <Link 
                to="/bestsellers" 
                className="px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🔥 Bestsellers
              </Link>
              
              {/* Mobile Categories */}
              <div className="px-4 py-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Categories</p>
                <div className="space-y-1 ml-2">
                  <Link to="/category/business" className="block py-2 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
                    📊 Business & Strategy
                  </Link>
                  <Link to="/category/technology" className="block py-2 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
                    💻 Technology & SaaS
                  </Link>
                  <Link to="/category/marketing" className="block py-2 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
                    📱 Marketing & Growth
                  </Link>
                  <Link to="/category/productivity" className="block py-2 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
                    ⚡ Productivity Systems
                  </Link>
                  <Link to="/category/creative" className="block py-2 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
                    🎨 Creative & Design
                  </Link>
                </div>
              </div>

              {/* Mobile Search */}
              <button className="mx-4 mt-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search Blueprints
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;