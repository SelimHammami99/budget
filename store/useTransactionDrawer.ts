import { create } from "zustand";

interface TransactionDrawerState {
  openState: boolean;
  setOpenState: (newCurrency: boolean) => void;
}

const useTransactionsDrawer = create<TransactionDrawerState>((set) => ({
  openState: false,
  setOpenState: (newOpenState: boolean) => set({ openState: newOpenState }),
}));

export default useTransactionsDrawer;
