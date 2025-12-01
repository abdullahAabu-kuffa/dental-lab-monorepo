import { create } from "zustand";

interface OrderState {
  formData: Record<string, string|boolean>;
  setFormData: (data: Record<string, string|boolean>) => void;
  clearForm: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  formData: {},
  setFormData: (data) => set({ formData: data }),
  clearForm: () => set({ formData: {} }),
}));
