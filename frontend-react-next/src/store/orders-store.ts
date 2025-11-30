// store/useOrderStore.ts
import { create } from "zustand";
import { PaginatedOrdersResponse } from "@/app/dashboard/interfaces/orders";

interface OrderStore {
  data: PaginatedOrdersResponse | null;
  setData: (data: PaginatedOrdersResponse) => void;
  clearData: () => void;
}

export const useOrderStore2 = create<OrderStore>((set) => ({
  data: null,
  setData: (data) => set({ data }),
  clearData: () => set({ data: null }),
}));

export default useOrderStore2;
