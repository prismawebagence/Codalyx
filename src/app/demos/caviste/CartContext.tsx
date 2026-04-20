"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Product, CartItem } from "./data";

type CartCtx = {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  addToCart: (p: Product) => void;
  updateQty: (id: number, delta: number) => void;
  removeItem: (id: number) => void;
};

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.product.id === product.id);
      if (ex) return prev.map((i) => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, qty: 1 }];
    });
  }, []);

  const updateQty = useCallback((id: number, delta: number) => {
    setCart((prev) =>
      prev.map((i) => i.product.id === id ? { ...i, qty: i.qty + delta } : i).filter((i) => i.qty > 0)
    );
  }, []);

  const removeItem = useCallback((id: number) => {
    setCart((prev) => prev.filter((i) => i.product.id !== id));
  }, []);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.product.prix * i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, cartCount, cartTotal, cartOpen, setCartOpen, addToCart, updateQty, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
