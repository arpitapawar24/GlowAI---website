import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('glowai_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  useEffect(() => {
    localStorage.setItem('glowai_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item._id === product._id);
      if (existing) {
        return prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const addMultipleToCart = (products) => {
    setItems(prev => {
      let updated = [...prev];
      products.forEach(prod => {
        const existingIndex = updated.findIndex(i => i._id === prod._id);
        if (existingIndex > -1) {
          updated[existingIndex].quantity += 1;
        } else {
          updated.push({ ...prod, quantity: 1 });
        }
      });
      return updated;
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setItems(prev => prev.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code) => {
    if (code.trim().toUpperCase() === 'GLOW20') {
      setAppliedCoupon({ code: 'GLOW20', discountPercent: 20 });
      return { success: true, message: '20% Skincare discount applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try "GLOW20"' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? +(subtotal * (appliedCoupon.discountPercent / 100)).toFixed(2) : 0;
  const discountedSubtotal = subtotal - discountAmount;
  const shipping = discountedSubtotal > 50 || items.length === 0 ? 0 : 5.99;
  const tax = +(discountedSubtotal * 0.08).toFixed(2);
  const total = +(discountedSubtotal + shipping + tax).toFixed(2);
  const itemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        addMultipleToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        discountAmount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        shipping,
        tax,
        total,
        itemsCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
