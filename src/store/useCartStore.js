"use client";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      localCart: [],

      addItem: (product, quantity) => {
        set((state) => {
          const existingItemIndex = state.localCart.findIndex((item) => item.id === product.id);
          
          if (existingItemIndex !== -1) {
             const updatedCart = [...state.localCart];
             updatedCart[existingItemIndex].quantity += quantity;
             return { localCart: updatedCart };
          } else {
             return { localCart: [...state.localCart, { ...product, quantity }] };
          }
        });
      },

      updateQuantity: (id, quantity) => {
        set((state) => ({
          localCart: state.localCart.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        }));
      },

      removeItem: (id) => {
        set((state) => ({
          localCart: state.localCart.filter((item) => item.id !== id),
        }));
      },

      clearCart: () => set({ localCart: [] }),
      
      getCartTotal: () => {
        return get().localCart.reduce((total, item) => total + (parseFloat(item.products_price) * item.quantity), 0);
      },

      getCartCount: () => {
        return get().localCart.reduce((count, item) => count + 1, 0);
      }
    }),
    {
      name: 'bates-local-cart', 
    }
  )
);
