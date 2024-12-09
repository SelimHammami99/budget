import { create } from "zustand";

interface TransactionModeState {
  mode: string;
  setMode: (newMode: string) => void;
}

const useTransactionMode = create<TransactionModeState>((set) => ({
  mode: "create",
  setMode: (newMode: string) => set({ mode: newMode }),
}));

export default useTransactionMode;
