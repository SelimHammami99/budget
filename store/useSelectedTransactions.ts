import { create } from "zustand";

interface SelectedTransaction {
  [key: string]: boolean;
}

interface SelectedTransactionsState {
  selectedTransactions: SelectedTransaction;
  setSelectedTransactions: (
    newSelectedTransactions: SelectedTransaction
  ) => void;
}

const useSelectedTransactions = create<SelectedTransactionsState>((set) => ({
  selectedTransactions: {},
  setSelectedTransactions: (newSelectedTransactions: SelectedTransaction) =>
    set({ selectedTransactions: newSelectedTransactions }),
}));

export default useSelectedTransactions;
