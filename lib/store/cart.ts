import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  id: string;
  type: 'plate' | 'menu';
  item: any;
  quantity: number;
};

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (type: 'plate' | 'menu', item: any) => void;
  removeItem: (id: string, type: 'plate' | 'menu') => void;
  updateQuantity: (
    id: string,
    type: 'plate' | 'menu',
    quantity: number,
  ) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      setIsOpen: (open) => set({ isOpen: open }),
      addItem: (type, item) => {
        const { items } = get();
        const existing = items.find((i) => i.id === item.id && i.type === type);

        if (existing) {
          set({
            items: items.map((i) =>
              i.id === item.id && i.type === type
                ? { ...i, quantity: i.quantity + 1 }
                : i,
            ),
          });
        } else {
          set({
            items: [...items, { id: item.id, type, item, quantity: 1 }],
            isOpen: true,
          });
        }
      },
      removeItem: (id, type) => {
        const { items } = get();
        set({
          items: items.filter((i) => !(i.id === id && i.type === type)),
        });
      },
      updateQuantity: (id, type, quantity) => {
        const { items } = get();
        if (quantity <= 0) {
          set({
            items: items.filter((i) => !(i.id === id && i.type === type)),
          });
          return;
        }
        set({
          items: items.map((i) =>
            i.id === id && i.type === type ? { ...i, quantity } : i,
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      totalItems: () => {
        const { items } = get();
        return items.reduce((acc, item) => acc + item.quantity, 0);
      },
      totalPrice: () => {
        const { items } = get();
        return items.reduce((acc, cartItem) => {
          const price = cartItem.item.price || 0;
          return acc + price * cartItem.quantity;
        }, 0);
      },
    }),
    {
      name: 'darda-cart',
    },
  ),
);
