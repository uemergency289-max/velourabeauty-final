import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/lib/types";

export interface CartItem {
  productId: string;
  variantId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, variantId: string, quantity?: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  subtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, variantId, quantity = 1) => {
        const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
        set((state) => {
          const existing = state.items.find((i) => i.productId === product.id && i.variantId === variant.id);
          if (existing) {
            return { items: state.items.map((i) => i.productId === product.id && i.variantId === variant.id ? { ...i, quantity: i.quantity + quantity } : i) };
          }
          return { items: [...state.items, { productId: product.id, variantId: variant.id, name: product.name, image: product.images[0], price: product.price + variant.priceModifier, quantity }] };
        });
      },
      removeItem: (productId, variantId) =>
        set((state) => ({ items: state.items.filter((i) => !(i.productId === productId && i.variantId === variantId)) })),
      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: "veloura-cart" }
  )
);
