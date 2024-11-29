import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CurrencyState {
  currency: string;
  setCurrency: (newCurrency: string) => void;
}

// Create the store with persistence middleware
const useCurrencyStore = create(
  persist<CurrencyState>(
    (set) => ({
      currency: "USD", // Initial state
      setCurrency: (newCurrency: string) => set({ currency: newCurrency }), // Update function
    }),
    {
      name: "currency-storage", // Local storage key to persist the state
    }
  )
);

export default useCurrencyStore;
