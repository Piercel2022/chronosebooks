import React, { useState, useEffect } from 'react';
import { ShoppingBag, Lock, CreditCard, Zap, Gift, ArrowRight, Shield } from 'lucide-react';

// Type definitions
interface CartItem {
  id: string | number;
  title: string;
  price: number;
  originalPrice?: number;
  quantity?: number;
}

interface PromoCode {
  code: string;
  discount: number;
}

interface PromoResult {
  success: boolean;
  error?: string;
}

interface CartSummaryProps {
  items?: CartItem[];
  onCheckout: () => void;
  isProcessing?: boolean;
  promoCode?: PromoCode | null;
  onApplyPromo?: (code: string) => PromoResult;
}

/**
 * CartSummary Component
 * Conversion-optimized checkout summary with trust signals and urgency
 */
const CartSummary: React.FC<CartSummaryProps> = ({ 
  items = [],
  onCheckout,
  isProcessing = false,
  promoCode = null,
  onApplyPromo
}) => {
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponError, setCouponError] = useState<string>('');
  const [showCouponInput, setShowCouponInput] = useState<boolean>(false);
  const [urgencyTimer, setUrgencyTimer] = useState<string | null>(null);

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const discount = promoCode ? subtotal * (promoCode.discount / 100) : 0;
  const total = subtotal - discount;
  const savingsTotal = items.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + ((item.originalPrice - item.price) * (item.quantity || 1));
    }
    return sum;
  }, 0);

  // Urgency timer for limited-time offers
  useEffect(() => {
    const endTime = new Date().getTime() + 15 * 60 * 1000; // 15 minutes
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;
      
      if (distance < 0) {
        clearInterval(interval);
        setUrgencyTimer('00:00');
      } else {
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setUrgencyTimer(
          `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    if (onApplyPromo) {
      const result = onApplyPromo(couponCode);
      if (result.success) {
        setCouponError('');
        setShowCouponInput(false);
      } else {
        setCouponError(result.error || 'Invalid coupon code');
      }
    }
  };

  const isEmpty = items.length === 0;

  return (
    <div className="cart-summary">
      {/* Urgency Banner */}
      {urgencyTimer && !isEmpty && (
        <div className="cart-summary-urgency">
          <Zap size={16} />
          <span>Special pricing expires in <strong>{urgencyTimer}</strong></span>
        </div>
      )}

      {/* Summary Header */}
      <div className="cart-summary-header">
        <h2>Order Summary</h2>
        <div className="cart-summary-items-count">
          <ShoppingBag size={18} />
          <span>{items.length} {items.length === 1 ? 'item' : 'items'}</span>
        </div>
      </div>

      {/* Order Details */}
      <div className="cart-summary-details">
        <div className="cart-summary-row">
          <span>Subtotal</span>
          <span className="cart-summary-amount">${subtotal.toFixed(2)}</span>
        </div>

        {savingsTotal > 0 && (
          <div className="cart-summary-row cart-summary-savings">
            <span>You're saving</span>
            <span className="cart-summary-amount-savings">-${savingsTotal.toFixed(2)}</span>
          </div>
        )}

        {promoCode && (
          <div className="cart-summary-row cart-summary-promo">
            <span>
              Promo code: <strong>{promoCode.code}</strong>
            </span>
            <span className="cart-summary-amount-savings">-${discount.toFixed(2)}</span>
          </div>
        )}

        {/* Coupon Input */}
        {!promoCode && (
          <div className="cart-summary-coupon">
            {!showCouponInput ? (
              <button
                onClick={() => setShowCouponInput(true)}
                className="cart-summary-coupon-toggle"
              >
                <Gift size={16} />
                <span>Have a coupon code?</span>
              </button>
            ) : (
              <div className="cart-summary-coupon-input">
                <input
                  type="text"
                  placeholder="Enter code"
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value.toUpperCase());
                    setCouponError('');
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                />
                <button onClick={handleApplyCoupon}>Apply</button>
                {couponError && (
                  <span className="cart-summary-coupon-error">{couponError}</span>
                )}
              </div>
            )}
          </div>
        )}

        <div className="cart-summary-divider" />

        {/* Total */}
        <div className="cart-summary-row cart-summary-total">
          <span>Total</span>
          <span className="cart-summary-amount-total">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        disabled={isEmpty || isProcessing}
        className="cart-summary-checkout"
      >
        {isProcessing ? (
          <>
            <div className="cart-summary-spinner" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Lock size={18} />
            <span>Secure Checkout</span>
            <ArrowRight size={18} />
          </>
        )}
      </button>

      {/* Trust Signals */}
      <div className="cart-summary-trust">
        <div className="cart-summary-trust-item">
          <Shield size={16} />
          <span>256-bit SSL Encryption</span>
        </div>
        <div className="cart-summary-trust-item">
          <CreditCard size={16} />
          <span>Secure Payment Processing</span>
        </div>
        <div className="cart-summary-trust-item">
          <Zap size={16} />
          <span>Instant Access After Purchase</span>
        </div>
      </div>

      {/* Money-Back Guarantee */}
      <div className="cart-summary-guarantee">
        <div className="cart-summary-guarantee-badge">
          <Shield size={24} />
        </div>
        <div className="cart-summary-guarantee-text">
          <strong>30-Day Money-Back Guarantee</strong>
          <p>Not satisfied? Get a full refund, no questions asked.</p>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="cart-summary-payment-methods">
        <span>We accept</span>
        <div className="cart-summary-payment-icons">
          <img src="/icons/visa.svg" alt="Visa" onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
          <img src="/icons/mastercard.svg" alt="Mastercard" onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
          <img src="/icons/amex.svg" alt="American Express" onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
          <img src="/icons/paypal.svg" alt="PayPal" onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
        </div>
      </div>

      <style>{`
        .cart-summary {
          background: white;
          border-radius: 12px;
          padding: 0;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08),
                      0 2px 8px rgba(0, 0, 0, 0.04);
          position: sticky;
          top: 120px;
          animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .cart-summary-urgency {
          background: linear-gradient(135deg, #ff3b30 0%, #dc2626 100%);
          color: white;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 600;
          border-radius: 12px 12px 0 0;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.9; }
        }

        .cart-summary-urgency strong {
          font-weight: 700;
          font-variant-numeric: tabular-nums;
        }

        .cart-summary-header {
          padding: 24px 24px 16px;
          border-bottom: 2px solid #f5f5f5;
        }

        .cart-summary-header h2 {
          font-family: 'Merriweather', Georgia, serif;
          font-size: 24px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 12px 0;
        }

        .cart-summary-items-count {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #666;
          font-size: 14px;
          font-weight: 500;
        }

        .cart-summary-details {
          padding: 24px;
        }

        .cart-summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          font-size: 15px;
          color: #4a4a4a;
        }

        .cart-summary-row span:first-child {
          font-weight: 500;
        }

        .cart-summary-amount {
          font-weight: 600;
          color: #1a1a1a;
        }

        .cart-summary-savings {
          color: #10b981;
        }

        .cart-summary-amount-savings {
          font-weight: 700;
          color: #10b981;
        }

        .cart-summary-promo {
          background: #f0fdf4;
          padding: 12px;
          border-radius: 8px;
          margin: 12px 0;
        }

        .cart-summary-promo strong {
          color: #10b981;
          text-transform: uppercase;
          font-size: 13px;
        }

        .cart-summary-coupon {
          margin: 16px 0;
        }

        .cart-summary-coupon-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: 2px dashed #d1d5db;
          color: #666;
          padding: 12px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          width: 100%;
          transition: all 0.2s ease;
        }

        .cart-summary-coupon-toggle:hover {
          border-color: #10b981;
          color: #10b981;
          background: #f0fdf4;
        }

        .cart-summary-coupon-input {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .cart-summary-coupon-input > div {
          display: flex;
          gap: 8px;
        }

        .cart-summary-coupon-input input {
          flex: 1;
          padding: 12px;
          border: 2px solid #e5e5e5;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          transition: border-color 0.2s ease;
        }

        .cart-summary-coupon-input input:focus {
          outline: none;
          border-color: #10b981;
        }

        .cart-summary-coupon-input button {
          padding: 12px 20px;
          background: #10b981;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .cart-summary-coupon-input button:hover {
          background: #059669;
        }

        .cart-summary-coupon-error {
          font-size: 13px;
          color: #dc2626;
          font-weight: 500;
        }

        .cart-summary-divider {
          height: 2px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            #e5e5e5 20%, 
            #e5e5e5 80%, 
            transparent 100%
          );
          margin: 20px 0;
        }

        .cart-summary-total {
          margin-bottom: 0;
        }

        .cart-summary-total span:first-child {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
        }

        .cart-summary-amount-total {
          font-family: 'Merriweather', Georgia, serif;
          font-size: 32px;
          font-weight: 700;
          color: #1a1a1a;
          letter-spacing: -0.02em;
        }

        .cart-summary-checkout {
          margin: 24px;
          width: calc(100% - 48px);
          padding: 18px 24px;
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        }

        .cart-summary-checkout:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%);
        }

        .cart-summary-checkout:active:not(:disabled) {
          transform: translateY(0);
        }

        .cart-summary-checkout:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .cart-summary-spinner {
          width: 18px;
          height: 18px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .cart-summary-trust {
          padding: 0 24px 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .cart-summary-trust-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: #666;
        }

        .cart-summary-trust-item svg {
          color: #10b981;
          flex-shrink: 0;
        }

        .cart-summary-guarantee {
          margin: 0 24px 20px;
          padding: 20px;
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          border-radius: 12px;
          display: flex;
          gap: 16px;
          align-items: flex-start;
          border: 2px solid #10b981;
        }

        .cart-summary-guarantee-badge {
          width: 48px;
          height: 48px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #10b981;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2);
        }

        .cart-summary-guarantee-text strong {
          font-size: 14px;
          color: #065f46;
          display: block;
          margin-bottom: 4px;
        }

        .cart-summary-guarantee-text p {
          font-size: 13px;
          color: #047857;
          margin: 0;
          line-height: 1.4;
        }

        .cart-summary-payment-methods {
          padding: 0 24px 24px;
          text-align: center;
        }

        .cart-summary-payment-methods > span {
          display: block;
          font-size: 12px;
          color: #999;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }

        .cart-summary-payment-icons {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .cart-summary-payment-icons img {
          height: 24px;
          width: auto;
          opacity: 0.6;
          transition: opacity 0.2s ease;
        }

        .cart-summary-payment-icons img:hover {
          opacity: 1;
        }

        /* Mobile Responsive */
        @media (max-width: 1024px) {
          .cart-summary {
            position: static;
            margin-top: 2rem;
          }
        }

        @media (max-width: 640px) {
          .cart-summary-header h2 {
            font-size: 20px;
          }

          .cart-summary-amount-total {
            font-size: 28px;
          }

          .cart-summary-checkout {
            padding: 16px 20px;
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default CartSummary;