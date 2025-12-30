import { create } from 'zustand';

type ReservationState = {
  loading: boolean;
  success: boolean;
  error?: string;
  submit: (data: any) => Promise<void>;
  reset: () => void;
};

export const useReservationStore = create<ReservationState>((set) => ({
  loading: false,
  success: false,
  error: undefined,

  reset: () => set({ success: false, error: undefined, loading: false }),

  submit: async (data) => {
    set({ loading: true, success: false, error: undefined });
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.error || 'Une erreur est survenue lors de la réservation.'
        );
      }

      set({ success: true });
    } catch (err: any) {
      set({
        error: err.message || 'Échec de la réservation. Veuillez réessayer.',
      });
    } finally {
      set({ loading: false });
    }
  },
}));
