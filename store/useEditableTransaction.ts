import { create } from "zustand";

interface EditableTransaction {
  id: string;
  name: string;
  description: string;
  type: string;
  amount: string;
  date: string;
}

interface EditableTransactionState {
  editableTransaction: EditableTransaction;
  setEditableTransaction: (newEditableTransaction: EditableTransaction) => void;
}

const useEditableTransaction = create<EditableTransactionState>((set) => ({
  editableTransaction: {
    id: "",
    name: "",
    description: "",
    type: "",
    amount: "10",
    date: new Date().toISOString(),
  },
  setEditableTransaction: (newEditableTransaction: EditableTransaction) =>
    set({ editableTransaction: newEditableTransaction }),
}));

export default useEditableTransaction;
