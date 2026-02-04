import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FilterBar = ({ onFilterChange, products = [] }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [isExpanded, setIsExpanded] = useState(false);

  // Extract unique categories from products
  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];
  
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-10', label: 'Under $10' },
    { value: '10-20', label: '$10 - $20' },
    { value: '20-50', label: '$20 - $50' },
    { value: '50+', label: '$50+' }
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'title', label: 'Alphabetical' }
  ];

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    applyFilters(category, priceRange, sortBy);
  };

  const handlePriceChange = (range) => {
    setPriceRange(range);
    applyFilters(activeCategory, range, sortBy);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    applyFilters(activeCategory, priceRange, sort);
  };

  const applyFilters = (category, price, sort) => {
    onFilterChange?.({
      category,
      priceRange: price,
      sortBy: sort
    });
  };

  const resetFilters = () => {
    setActiveCategory('all');
    setPriceRange('all');
    setSortBy('featured');
    onFilterChange?.({
      category: 'all',
      priceRange: 'all',
      sortBy: 'featured'
    });
  };

  const hasActiveFilters = activeCategory !== 'all' || priceRange !== 'all' || sortBy !== 'featured';

  return (
    <div className="filter-bar-container">
      {/* Mobile Filter Toggle */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mobile-filter-toggle lg:hidden"
        whileTap={{ scale: 0.95 }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <span>Filters</span>
        {hasActiveFilters && <span className="filter-badge">{
          [activeCategory !== 'all', priceRange !== 'all', sortBy !== 'featured'].filter(Boolean).length
        }</span>}
      </motion.button>

      {/* Desktop & Expanded Mobile Filters */}
      <AnimatePresence>
        {(isExpanded || window.innerWidth >= 1024) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="filter-content"
          >
            <div className="filter-grid">
              {/* Categories */}
              <div className="filter-section">
                <label className="filter-label">Category</label>
                <div className="category-pills">
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`category-pill ${activeCategory === category ? 'active' : ''}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="filter-section">
                <label className="filter-label">Price Range</label>
                <select
                  value={priceRange}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  className="filter-select"
                >
                  {priceRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div className="filter-section">
                <label className="filter-label">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="filter-select"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reset Filters */}
              {hasActiveFilters && (
                <motion.div
                  className="filter-section"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <button
                    onClick={resetFilters}
                    className="reset-button"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Clear All
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .filter-bar-container {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          padding: 1.5rem;
          border-radius: 16px;
          margin-bottom: 2rem;
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(255, 255, 255, 0.05);
        }

        .mobile-filter-toggle {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #fff;
          font-family: 'Crimson Text', serif;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .mobile-filter-toggle:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .filter-badge {
          position: absolute;
          right: 1rem;
          background: #ff6b6b;
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .filter-content {
          overflow: hidden;
        }

        .filter-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          padding-top: 1.5rem;
        }

        @media (min-width: 768px) {
          .filter-grid {
            grid-template-columns: 2fr 1fr 1fr auto;
            align-items: end;
          }
        }

        .filter-section {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .filter-label {
          color: rgba(255, 255, 255, 0.7);
          font-family: 'Crimson Text', serif;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .category-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .category-pill {
          padding: 0.5rem 1.25rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          color: rgba(255, 255, 255, 0.8);
          font-family: 'Crimson Text', serif;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
        }

        .category-pill:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          transform: translateY(-1px);
        }

        .category-pill.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-color: transparent;
          color: #fff;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .filter-select {
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #fff;
          font-family: 'Crimson Text', serif;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(255,255,255,0.5)'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 1.25rem;
          padding-right: 2.5rem;
        }

        .filter-select:hover {
          background-color: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .filter-select:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
        }

        .filter-select option {
          background: #1a1a2e;
          color: #fff;
          padding: 0.5rem;
        }

        .reset-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: rgba(255, 107, 107, 0.1);
          border: 1px solid rgba(255, 107, 107, 0.3);
          border-radius: 8px;
          color: #ff6b6b;
          font-family: 'Crimson Text', serif;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .reset-button:hover {
          background: rgba(255, 107, 107, 0.2);
          border-color: rgba(255, 107, 107, 0.5);
        }

        @media (min-width: 1024px) {
          .mobile-filter-toggle {
            display: none;
          }
          
          .filter-content {
            display: block !important;
            opacity: 1 !important;
            height: auto !important;
          }
        }
      `}</style>
    </div>
  );
};

export default FilterBar;