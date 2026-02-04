import React from 'react';
import { Trash2, BookOpen, Star } from 'lucide-react';

// Type Definitions
export interface CartItemData {
  id: string | number;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  quantity?: number;
  coverImage?: string;
  rating?: number;
  format?: string;
}

interface CartItemProps {
  item: CartItemData;
  onUpdateQuantity: (id: string | number, quantity: number) => void;
  onRemove: (id: string | number) => void;
  showDivider?: boolean;
}

/**
 * CartItem Component
 * Premium editorial design for ebook cart items
 * Conversion-focused with clear pricing, instant gratification messaging
 */
const CartItem: React.FC<CartItemProps> = ({ 
  item, 
  onUpdateQuantity, 
  onRemove,
  showDivider = true 
}) => {
  const { 
    id, 
    title, 
    author, 
    price, 
    originalPrice,
    quantity = 1, 
    coverImage,
    rating = 4.5,
    format = 'PDF, EPUB, MOBI'
  } = item;

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  const subtotal = price * quantity;

  return (
    <div className="cart-item">
      <div className="cart-item-content">
        {/* Cover Image */}
        <div className="cart-item-cover">
          <img 
            src={coverImage || '/covers/default.jpg'} 
            alt={title}
            loading="lazy"
          />
          {discount > 0 && (
            <div className="cart-item-badge">-{discount}%</div>
          )}
        </div>

        {/* Item Details */}
        <div className="cart-item-details">
          <div className="cart-item-header">
            <div>
              <h3 className="cart-item-title">{title}</h3>
              <p className="cart-item-author">by {author}</p>
              
              {/* Rating */}
              <div className="cart-item-meta">
                <div className="cart-item-rating">
                  <Star size={14} fill="currentColor" />
                  <span>{rating}</span>
                </div>
                <span className="cart-item-format">{format}</span>
              </div>

              {/* Instant Access Badge */}
              <div className="cart-item-instant">
                <BookOpen size={14} />
                <span>Instant download after purchase</span>
              </div>
            </div>

            {/* Remove Button - Desktop */}
            <button
              onClick={() => onRemove(id)}
              className="cart-item-remove"
              aria-label="Remove item"
            >
              <Trash2 size={18} />
            </button>
          </div>

          {/* Pricing & Quantity */}
          <div className="cart-item-footer">
            <div className="cart-item-quantity">
              <button
                onClick={() => onUpdateQuantity(id, quantity - 1)}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => onUpdateQuantity(id, quantity + 1)}
                disabled={quantity >= 10}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <div className="cart-item-pricing">
              {originalPrice && (
                <span className="cart-item-original-price">${originalPrice.toFixed(2)}</span>
              )}
              <span className="cart-item-price">${subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {showDivider && <div className="cart-item-divider" />}

      <style>{`
        .cart-item {
          position: relative;
          animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .cart-item-content {
          display: flex;
          gap: 1.5rem;
          padding: 1.5rem 0;
        }

        .cart-item-cover {
          position: relative;
          flex-shrink: 0;
          width: 100px;
          height: 140px;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1),
                      0 1px 3px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cart-item-cover:hover {
          transform: translateY(-2px);
        }

        .cart-item-cover img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cart-item-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          background: #ff3b30;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          box-shadow: 0 2px 8px rgba(255, 59, 48, 0.3);
        }

        .cart-item-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-width: 0;
        }

        .cart-item-header {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
        }

        .cart-item-title {
          font-family: 'Merriweather', Georgia, serif;
          font-size: 18px;
          font-weight: 700;
          line-height: 1.3;
          color: #1a1a1a;
          margin: 0 0 6px 0;
        }

        .cart-item-author {
          font-family: 'Lato', sans-serif;
          font-size: 14px;
          color: #666;
          margin: 0 0 8px 0;
          font-style: italic;
        }

        .cart-item-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .cart-item-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #f59e0b;
          font-size: 13px;
          font-weight: 600;
        }

        .cart-item-format {
          font-size: 12px;
          color: #999;
          font-weight: 500;
        }

        .cart-item-instant {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          width: fit-content;
        }

        .cart-item-remove {
          flex-shrink: 0;
          background: transparent;
          border: none;
          color: #999;
          cursor: pointer;
          padding: 8px;
          border-radius: 6px;
          transition: all 0.2s ease;
          height: fit-content;
        }

        .cart-item-remove:hover {
          background: #fee;
          color: #dc2626;
        }

        .cart-item-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .cart-item-quantity {
          display: flex;
          align-items: center;
          gap: 0;
          border: 2px solid #e5e5e5;
          border-radius: 8px;
          overflow: hidden;
        }

        .cart-item-quantity button {
          background: white;
          border: none;
          color: #1a1a1a;
          font-size: 18px;
          font-weight: 600;
          width: 36px;
          height: 36px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cart-item-quantity button:hover:not(:disabled) {
          background: #f5f5f5;
        }

        .cart-item-quantity button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .cart-item-quantity span {
          font-weight: 600;
          font-size: 15px;
          min-width: 36px;
          text-align: center;
          border-left: 2px solid #e5e5e5;
          border-right: 2px solid #e5e5e5;
        }

        .cart-item-pricing {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
        }

        .cart-item-original-price {
          font-size: 14px;
          color: #999;
          text-decoration: line-through;
          font-weight: 500;
        }

        .cart-item-price {
          font-family: 'Merriweather', Georgia, serif;
          font-size: 24px;
          font-weight: 700;
          color: #1a1a1a;
          letter-spacing: -0.02em;
        }

        .cart-item-divider {
          height: 1px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            #e5e5e5 20%, 
            #e5e5e5 80%, 
            transparent 100%
          );
          margin: 0.5rem 0;
        }

        /* Mobile Responsive */
        @media (max-width: 640px) {
          .cart-item-content {
            gap: 1rem;
            padding: 1rem 0;
          }

          .cart-item-cover {
            width: 80px;
            height: 112px;
          }

          .cart-item-title {
            font-size: 16px;
          }

          .cart-item-author {
            font-size: 13px;
          }

          .cart-item-instant {
            font-size: 11px;
            padding: 5px 8px;
          }

          .cart-item-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }

          .cart-item-pricing {
            align-items: flex-start;
          }

          .cart-item-price {
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default CartItem;