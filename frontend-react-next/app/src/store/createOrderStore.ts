import { create } from "zustand";

interface OrderState {
  formData: Record<string, any>;
  setFormData: (data: Record<string, any>) => void;
  clearForm: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  formData: {},
  setFormData: (data) => set({ formData: data }),
  clearForm: () => set({ formData: {} }),
}));
