import { create } from "zustand";
import { PaginatedOrdersResponse } from "@/app/[locale]/dashboard/interfaces/orders";
import { getAllOrders } from "@/app/[locale]/dashboard/services/apiServices";
interface OrderStore {
  data: PaginatedOrdersResponse | null;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  getOrders: (page: number) => Promise<void>;
  setData: (data: PaginatedOrdersResponse) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  data: null,
  isLoading: false,
  isError: false,
  error: null,

  getOrders: async (page: number) => {
    console.log("getAllOrders CALLED with page:", page);
    set({ isLoading: true, isError: false, error: null });

    try {
      const data = await getAllOrders({ page });
      set({ data, isLoading: false });
    } catch (error) {
      console.error("Error fetching orders:", error);
      set({ isError: true, error, isLoading: false });
    }
  },
  setData: (data: PaginatedOrdersResponse) => set({ data }),
}));

export default useOrderStore;
