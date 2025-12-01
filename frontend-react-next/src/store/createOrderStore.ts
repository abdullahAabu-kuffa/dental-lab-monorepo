import { create } from "zustand";

interface OrderState {
  formData: Record<string, string|boolean>;
  errors: Record<string, string>;
  setFormData: (data: Record<string, string|boolean>) => void;
  setErrors: (errors: Record<string, string>) => void;
  clearForm: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  formData: {},
  errors: {},
  setFormData: (data) => set({ formData: data }),
  setErrors: (errors) => set({ errors }),
  clearForm: () => set({ formData: {}, errors: {} }),
}));
