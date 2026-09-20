import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  kind: "product" | "service";
  name: string;
  price: number;
  billing: "one-off" | "monthly";
  qty: number;
};

type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item, qty = 1) => {
        const existing = get().items.find((i) => i.id === item.id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === item.id ? { ...i, qty: i.qty + qty } : i,
            ),
          });
          return;
        }
        set({ items: [...get().items, { ...item, qty }] });
      },
      remove: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      setQty: (id, qty) => {
        if (qty < 1) {
          set({ items: get().items.filter((i) => i.id !== id) });
          return;
        }
        set({
          items: get().items.map((i) => (i.id === id ? { ...i, qty } : i)),
        });
      },
      clear: () => set({ items: [] }),
    }),
    { name: "nk-cart" },
  ),
);

export function cartCount(items: CartItem[]) {
  return items.reduce((n, i) => n + i.qty, 0);
}

export function cartTotal(items: CartItem[]) {
  return items.reduce((n, i) => n + i.price * i.qty, 0);
}
