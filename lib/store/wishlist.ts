import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type WishlistItem = {
  id: string;
  type: 'plate' | 'menu';
  item: any;
  addedAt: number;
};

interface WishlistState {
  items: WishlistItem[];
  addItem: (type: 'plate' | 'menu', item: any) => void;
  removeItem: (id: string, type: 'plate' | 'menu') => void;
  toggleItem: (type: 'plate' | 'menu', item: any) => void;
  hasItem: (id: string, type: 'plate' | 'menu') => boolean;
  clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (type, item) => {
        const { items } = get();
        // Prevent duplicates
        if (items.some((i) => i.id === item.id && i.type === type)) return;

        set({
          items: [...items, { id: item.id, type, item, addedAt: Date.now() }],
        });
      },
      removeItem: (id, type) => {
        const { items } = get();
        set({
          items: items.filter((i) => !(i.id === id && i.type === type)),
        });
      },
      toggleItem: (type, item) => {
        const { hasItem, addItem, removeItem } = get();
        if (hasItem(item.id, type)) {
          removeItem(item.id, type);
        } else {
          addItem(type, item);
        }
      },
      hasItem: (id, type) => {
        const { items } = get();
        return items.some((i) => i.id === id && i.type === type);
      },
      clear: () => set({ items: [] }),
    }),
    {
      name: 'darda-wishlist',
    },
  ),
);
