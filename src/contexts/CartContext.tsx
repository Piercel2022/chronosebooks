import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
  useMemo,
} from 'react';

/* ----------------------------- Types ----------------------------- */

export interface CartItem {
  id: string;
  title: string;
  author: string;
  price: number;
  quantity: number;
  originalPrice?: number;
}

interface CartStats {
  itemCount: number;
  uniqueItems: number;
  subtotal: number;
  total: number;
  savings: number;
  hasDiscount: boolean;
}

interface CartContextType {
  // state
  cart: CartItem[];
  cartStats: CartStats;

  // actions
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // queries
  isInCart: (productId: string) => boolean;
  getItemQuantity: (productId: string) => number;
  getCartTotal: () => number;

  // UI state
  isCartOpen: boolean;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  // feedback
  lastAddedItem: CartItem | null;
  showAddFeedback: boolean;
}

/* --------------------------- Analytics --------------------------- */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

/* --------------------------- Context ----------------------------- */

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

/* -------------------------- Provider ----------------------------- */

export function CartProvider({ children }: { children: ReactNode }) {
  /* ----------------------- State ----------------------- */

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('chronos_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);
  const [showAddFeedback, setShowAddFeedback] = useState(false);

  /* -------------------- Persistence -------------------- */

  useEffect(() => {
    localStorage.setItem('chronos_cart', JSON.stringify(cart));
  }, [cart]);

  /* ---------------------- Actions ---------------------- */

  const addToCart = useCallback(
    (product: Omit<CartItem, 'quantity'>) => {
      setCart((prev) => {
        const existing = prev.find((i) => i.id === product.id);

        if (existing) {
          return prev.map((i) =>
            i.id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        }

        return [...prev, { ...product, quantity: 1 }];
      });

      const fullItem: CartItem = { ...product, quantity: 1 };
      setLastAddedItem(fullItem);

      window.gtag?.('event', 'add_to_cart', {
        currency: 'EUR',
        value: product.price,
        items: [
          {
            item_id: product.id,
            item_name: product.title,
            price: product.price,
            quantity: 1,
          },
        ],
      });
    },
    []
  );

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== productId));

    window.gtag?.('event', 'remove_from_cart', {
      item_id: productId,
    });
  }, []);

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity < 1) {
        removeFromCart(productId);
        return;
      }

      setCart((prev) =>
        prev.map((i) =>
          i.id === productId
            ? { ...i, quantity: Math.min(quantity, 99) }
            : i
        )
      );
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => {
    setCart([]);
    setLastAddedItem(null);
  }, []);

  /* ---------------------- Queries ---------------------- */

  const isInCart = useCallback(
    (id: string) => cart.some((i) => i.id === id),
    [cart]
  );

  const getItemQuantity = useCallback(
    (id: string) => cart.find((i) => i.id === id)?.quantity ?? 0,
    [cart]
  );

  const getCartTotal = useCallback(
    () => cart.reduce((t, i) => t + i.price * i.quantity, 0),
    [cart]
  );

  /* ----------------------- Stats ----------------------- */

  const cartStats = useMemo<CartStats>(() => {
  const subtotal = cart.reduce((t, i) => t + i.price * i.quantity, 0);

  return {
    itemCount: cart.reduce((t, i) => t + i.quantity, 0),
    uniqueItems: cart.length,
    subtotal,
    total: subtotal,
    savings: cart.reduce((t, i) => {
      if (!i.originalPrice) return t;
      return t + (i.originalPrice - i.price) * i.quantity;
    }, 0),
    hasDiscount: cart.some(
      (i) => i.originalPrice && i.originalPrice > i.price
    ),
  };
}, [cart]);


  /* ------------------------ UI ------------------------- */

  const toggleCart = useCallback(() => {
    setIsCartOpen((p) => !p);

    window.gtag?.('event', 'view_cart', {
      currency: 'EUR',
      value: cartStats.total,
    });
  }, [cartStats.total]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  /* --------------------- Feedback ---------------------- */

  useEffect(() => {
    if (!lastAddedItem) return;

    setShowAddFeedback(true);
    const t = setTimeout(() => setShowAddFeedback(false), 2500);
    return () => clearTimeout(t);
  }, [lastAddedItem]);

  /* ---------------------- Value ------------------------ */

  const value = useMemo<CartContextType>(() => ({
  cart,
  cartStats,

  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,

  isInCart,
  getItemQuantity,
  getCartTotal,

  isCartOpen,
  toggleCart,
  openCart,
  closeCart,

  lastAddedItem,
  showAddFeedback,
}), [
  cart,
  cartStats,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  isInCart,
  getItemQuantity,
  getCartTotal,
  isCartOpen,
  toggleCart,
  openCart,
  closeCart,
  lastAddedItem,
  showAddFeedback,
]);
return (
  <CartContext.Provider value={value}>
    {children}
  </CartContext.Provider>
);

}

export default CartContext;
