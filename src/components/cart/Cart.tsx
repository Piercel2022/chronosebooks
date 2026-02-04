import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, Clock, Shield } from 'lucide-react';

interface CartItem {
  id: string;
  title: string;
  author: string;
  price: number;
  cover: string;
  quantity: number;
  originalPrice?: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const savings = items.reduce(
    (sum, item) => sum + ((item.originalPrice || item.price) - item.price) * item.quantity,
    0
  );
  const total = subtotal;

  const handleRemove = (id: string) => {
    setRemovingItemId(id);
    setTimeout(() => {
      onRemoveItem(id);
      setRemovingItemId(null);
    }, 300);
  };

  const handleCheckout = () => {
    onCheckout();
    onClose();
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        onTransitionEnd={() => !isOpen && setIsAnimating(false)}
      />

      {/* Cart Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-[480px] bg-gradient-to-br from-slate-50 to-slate-100 shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-5 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Your Cart</h2>
                  <p className="text-indigo-100 text-sm">
                    {items.length} {items.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200 hover:rotate-90"
                aria-label="Close cart"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-8 rounded-full mb-6">
                  <ShoppingBag className="w-16 h-16 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h3>
                <p className="text-gray-600 mb-6 max-w-xs">
                  Discover our collection of eBooks and start building your digital library
                </p>
                <button
                  onClick={onClose}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 ${
                      removingItemId === item.id
                        ? 'opacity-0 scale-95 h-0 mb-0'
                        : 'opacity-100 scale-100 hover:shadow-md'
                    }`}
                    style={{
                      animation: isOpen
                        ? `slideInRight 0.3s ease-out ${index * 0.05}s backwards`
                        : 'none',
                    }}
                  >
                    <div className="flex gap-4 p-4">
                      {/* Book Cover */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.cover}
                          alt={item.title}
                          className="w-20 h-28 object-cover rounded-lg shadow-md"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-600 mb-2">{item.author}</p>

                        {/* Price */}
                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="text-lg font-bold text-indigo-600">
                            ${item.price.toFixed(2)}
                          </span>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className="text-xs text-gray-400 line-through">
                              ${item.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                            <button
                              onClick={() =>
                                onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                              }
                              className="p-1.5 hover:bg-white rounded-md transition-colors disabled:opacity-50"
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4 text-gray-700" />
                            </button>
                            <span className="w-8 text-center font-semibold text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 hover:bg-white rounded-md transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4 text-gray-700" />
                            </button>
                          </div>

                          <button
                            onClick={() => handleRemove(item.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer with Summary and Checkout */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 bg-white px-6 py-5 shadow-2xl">
              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-green-100 p-2 rounded-lg mb-1">
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-xs text-gray-600 font-medium">Secure</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-2 rounded-lg mb-1">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-xs text-gray-600 font-medium">Instant</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-purple-100 p-2 rounded-lg mb-1">
                    <Tag className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-xs text-gray-600 font-medium">Best Price</span>
                </div>
              </div>

              {/* Price Summary */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600 font-medium">You save</span>
                    <span className="font-semibold text-green-600">
                      -${savings.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                  <span className="text-gray-900">Total</span>
                  <span className="text-indigo-600">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                🔒 Secure checkout powered by Stripe
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Cart;