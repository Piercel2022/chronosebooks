import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import type { Product } from '../../types/Product';

// Define proper types
interface Filters {
  category?: string;
  priceRange?: string;
  sortBy?: string;
}

interface ProductGridProps {
  products?: Product[];
  filters?: Filters;
  onAddToCart: (product: Product) => void;
  isLoading?: boolean;
}

const ProductGrid = ({ products = [], filters = {}, onAddToCart, isLoading = false }: ProductGridProps) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [displayCount, setDisplayCount] = useState(12);

  useEffect(() => {
    let filtered = [...products];

    // Apply category filter
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(p => p.category && p.category === filters.category);
    }

    // Apply price range filter
    if (filters.priceRange && filters.priceRange !== 'all') {
      if (filters.priceRange === '50+') {
        filtered = filtered.filter(p => p.price >= 50);
      } else {
        const [minPrice, maxPrice] = filters.priceRange.split('-').map(parseFloat);
        filtered = filtered.filter(p => p.price >= minPrice && p.price <= maxPrice);
      }
    }

    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          filtered.sort((a, b) => {
            const dateA = new Date(b.releaseDate || 0).getTime();
            const dateB = new Date(a.releaseDate || 0).getTime();
            return dateA - dateB;
          });
          break;
        case 'title':
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'featured':
        default:
          // Keep original order or sort by featured flag
          filtered.sort((a, b) => {
            const aFeatured = (a as any).isFeatured ? 1 : 0;
            const bFeatured = (b as any).isFeatured ? 1 : 0;
            return bFeatured - aFeatured;
          });
          break;
      }
    }

    setFilteredProducts(filtered);
    // Reset display count when filters change
    setDisplayCount(12);
  }, [products, filters]); // Fixed: proper dependency array

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 12);
  };

  const displayedProducts = filteredProducts.slice(0, displayCount);
  const hasMore = displayCount < filteredProducts.length;

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="skeleton-grid">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-image" />
          <div className="skeleton-content">
            <div className="skeleton-line short" />
            <div className="skeleton-line" />
            <div className="skeleton-line medium" />
            <div className="skeleton-line short" />
          </div>
        </div>
      ))}
    </div>
  );

  // Empty state
  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="empty-state"
    >
      <svg className="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="empty-title">No books found</h3>
      <p className="empty-description">
        Try adjusting your filters or browse all books
      </p>
    </motion.div>
  );

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (filteredProducts.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="product-grid-container">
      {/* Results count */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="results-header"
      >
        <h2 className="results-count">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'Book' : 'Books'} Found
        </h2>
        {filters.category && filters.category !== 'all' && (
          <span className="filter-indicator">
            in {filters.category.charAt(0).toUpperCase() + filters.category.slice(1)}
          </span>
        )}
      </motion.div>

      {/* Product Grid */}
      <div className="product-grid">
        <AnimatePresence mode="popLayout">
          {displayedProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              delay={index * 0.05}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Load More Button */}
      {hasMore && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="load-more-container"
        >
          <motion.button
            onClick={handleLoadMore}
            className="load-more-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Load More Books</span>
            <span className="remaining-count">
              ({filteredProducts.length - displayCount} remaining)
            </span>
          </motion.button>
        </motion.div>
      )}

      {/* Scroll to top button (appears after scrolling) */}
      {displayedProducts.length > 12 && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="scroll-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}

      <style>{`
        .product-grid-container {
          position: relative;
        }

        .results-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid rgba(0, 0, 0, 0.1);
        }

        .results-count {
          font-family: 'Crimson Text', serif;
          font-size: 1.75rem;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0;
        }

        .filter-indicator {
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 20px;
          font-family: 'Crimson Text', serif;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        @media (max-width: 640px) {
          .product-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        @media (min-width: 641px) and (max-width: 1024px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1025px) and (max-width: 1280px) {
          .product-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 1281px) {
          .product-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* Loading Skeleton */
        .skeleton-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
        }

        .skeleton-card {
          background: #f8f9fa;
          border-radius: 16px;
          overflow: hidden;
          animation: pulse 1.5s ease-in-out infinite;
        }

        .skeleton-image {
          aspect-ratio: 3/4;
          background: linear-gradient(
            90deg,
            #e0e0e0 25%,
            #f0f0f0 50%,
            #e0e0e0 75%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }

        .skeleton-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .skeleton-line {
          height: 1rem;
          background: linear-gradient(
            90deg,
            #e0e0e0 25%,
            #f0f0f0 50%,
            #e0e0e0 75%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 4px;
        }

        .skeleton-line.short {
          width: 40%;
        }

        .skeleton-line.medium {
          width: 70%;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        /* Empty State */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          text-align: center;
        }

        .empty-icon {
          width: 4rem;
          height: 4rem;
          color: #ccc;
          margin-bottom: 1rem;
        }

        .empty-title {
          font-family: 'Crimson Text', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 0.5rem 0;
        }

        .empty-description {
          font-family: 'Crimson Text', serif;
          font-size: 1rem;
          color: #666;
          margin: 0;
        }

        /* Load More Button */
        .load-more-container {
          display: flex;
          justify-content: center;
          margin-top: 2rem;
          margin-bottom: 3rem;
        }

        .load-more-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          padding: 1rem 3rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 12px;
          color: white;
          font-family: 'Crimson Text', serif;
          font-size: 1.125rem;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
          transition: all 0.3s ease;
        }

        .load-more-btn:hover {
          box-shadow: 0 6px 30px rgba(102, 126, 234, 0.4);
        }

        .remaining-count {
          font-size: 0.875rem;
          opacity: 0.9;
        }

        /* Scroll to Top Button */
        .scroll-top-btn {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 3.5rem;
          height: 3.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          transition: all 0.3s ease;
        }

        .scroll-top-btn:hover {
          box-shadow: 0 6px 30px rgba(102, 126, 234, 0.5);
        }

        @media (max-width: 768px) {
          .results-count {
            font-size: 1.5rem;
          }

          .scroll-top-btn {
            bottom: 1rem;
            right: 1rem;
            width: 3rem;
            height: 3rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductGrid;