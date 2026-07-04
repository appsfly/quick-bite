import { create } from "zustand";
import type { CartLine } from "../types";

interface CartState {
  lines: CartLine[];
  addItem: (itemId: string, quantity?: number) => void;
  incrementItem: (itemId: string) => void;
  decrementItem: (itemId: string) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  lines: [],
  addItem: (itemId, quantity = 1) =>
    set((state) => {
      const existing = state.lines.find((l) => l.itemId === itemId);
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.itemId === itemId ? { ...l, quantity: l.quantity + quantity } : l
          ),
        };
      }
      return { lines: [...state.lines, { itemId, quantity }] };
    }),
  incrementItem: (itemId) =>
    set((state) => ({
      lines: state.lines.map((l) =>
        l.itemId === itemId ? { ...l, quantity: l.quantity + 1 } : l
      ),
    })),
  decrementItem: (itemId) =>
    set((state) => ({
      lines: state.lines
        .map((l) =>
          l.itemId === itemId ? { ...l, quantity: l.quantity - 1 } : l
        )
        .filter((l) => l.quantity > 0),
    })),
  removeItem: (itemId) =>
    set((state) => ({
      lines: state.lines.filter((l) => l.itemId !== itemId),
    })),
  clearCart: () => set({ lines: [] }),
}));

export function useCartCount(): number {
  return useCartStore((state) =>
    state.lines.reduce((sum, l) => sum + l.quantity, 0)
  );
}
