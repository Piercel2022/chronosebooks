import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from '../common/Badge';
import type { Product } from '../../types/Product';

type ProductCardProps = {
  product: Product;
  onAddToCart?: (product: Product) => void; // optional
  delay?: number;
};

const ProductCard = ({ product, onAddToCart, delay = 0 }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  e.stopPropagation();
  onAddToCart?.(product);
};

  // Format price
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(product.price);

  // Calculate discount percentage if applicable
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
      className="product-card-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="product-card">
        {/* Image Container */}
        <div className="image-container">
          {/* Badges */}
          <div className="badges-container">
            {product.isNew && <Badge variant="new">New</Badge>}
            {product.isBestseller && <Badge variant="bestseller">Bestseller</Badge>}
            {discountPercentage > 0 && (
           <Badge variant="discount">-{discountPercentage}%</Badge>
             )}
          </div>

          {/* Book Cover */}
          <div className="book-cover">
            <motion.img
              src={product.coverImage || '/covers/placeholder.jpg'}
              alt={product.title}
              className={`cover-image ${imageLoaded ? 'loaded' : ''}`}
              onLoad={() => setImageLoaded(true)}
              animate={{
                scale: isHovered ? 1.05 : 1,
                rotateY: isHovered ? 5 : 0,
              }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Shadow effect */}
            <motion.div
              className="book-shadow"
              animate={{
                opacity: isHovered ? 0.6 : 0.3,
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Quick Add Button - Appears on Hover */}
          <motion.button
            onClick={handleAddToCart}
            className="quick-add-btn"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10,
            }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add to Cart
          </motion.button>
        </div>

        {/* Product Info */}
        <div className="product-info">
          {/* Category */}
          {product.category && (
            <span className="category-tag">
              {product.category}
            </span>
          )}

          {/* Title */}
          <h3 className="product-title">
            {product.title}
          </h3>

          {/* Author */}
          {product.author && (
            <p className="product-author">
              by {product.author}
            </p>
          )}

          {/* Rating */}
          {product.rating && (
            <div className="rating-container">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                   <svg
                   key={i}
                     className={`star ${i < Math.floor(product.rating ?? 0) ? 'filled' : ''}`}
                     fill="currentColor"
                    viewBox="0 0 20 20"
                   >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              {product.reviewCount && (
                <span className="review-count">
                  ({product.reviewCount})
                </span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="price-container">
            <span className="current-price">{formattedPrice}</span>
            {product.originalPrice && (
              <span className="original-price">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Description Preview */}
          {product.description && (
            <p className="description-preview">
              {product.description.substring(0, 100)}
              {product.description.length > 100 && '...'}
            </p>
          )}
        </div>
      </Link>

      <style>{`
        .product-card-wrapper {
          height: 100%;
        }

        .product-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.08),
            0 0 0 1px rgba(0, 0, 0, 0.05);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          color: inherit;
        }

        .product-card:hover {
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.12),
            0 0 0 1px rgba(0, 0, 0, 0.08);
        }

        .image-container {
          position: relative;
          aspect-ratio: 3/4;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 2rem;
        }

        .badges-container {
          position: absolute;
          top: 1rem;
          left: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          z-index: 10;
        }

        .book-cover {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1000px;
        }

        .cover-image {
          max-width: 85%;
          max-height: 100%;
          object-fit: contain;
          border-radius: 4px;
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.3),
            0 10px 20px rgba(0, 0, 0, 0.2);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
        }

        .cover-image.loaded {
          opacity: 1;
        }

        .book-shadow {
          position: absolute;
          bottom: 10%;
          left: 50%;
          transform: translateX(-50%);
          width: 70%;
          height: 20px;
          background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.5) 0%, transparent 70%);
          filter: blur(10px);
          z-index: 0;
        }

        .quick-add-btn {
          position: absolute;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 24px;
          font-family: 'Crimson Text', serif;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
          z-index: 10;
        }

        .product-info {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          flex-grow: 1;
        }

        .category-tag {
          display: inline-block;
          align-self: flex-start;
          padding: 0.25rem 0.75rem;
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
          border-radius: 12px;
          font-family: 'Crimson Text', serif;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .product-title {
          font-family: 'Crimson Text', serif;
          font-size: 1.25rem;
          font-weight: 700;
          line-height: 1.3;
          color: #1a1a2e;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-author {
          font-family: 'Crimson Text', serif;
          font-size: 0.95rem;
          color: #666;
          font-style: italic;
          margin: 0;
        }

        .rating-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .stars {
          display: flex;
          gap: 0.125rem;
        }

        .star {
          width: 1rem;
          height: 1rem;
          color: #e0e0e0;
          transition: color 0.2s ease;
        }

        .star.filled {
          color: #ffc107;
        }

        .review-count {
          font-family: 'Crimson Text', serif;
          font-size: 0.875rem;
          color: #999;
        }

        .price-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: auto;
        }

        .current-price {
          font-family: 'Crimson Text', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a1a2e;
        }

        .original-price {
          font-family: 'Crimson Text', serif;
          font-size: 1.125rem;
          color: #999;
          text-decoration: line-through;
        }

        .description-preview {
          font-family: 'Crimson Text', serif;
          font-size: 0.9rem;
          color: #666;
          line-height: 1.6;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .product-title {
            font-size: 1.125rem;
          }

          .current-price {
            font-size: 1.375rem;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default ProductCard;