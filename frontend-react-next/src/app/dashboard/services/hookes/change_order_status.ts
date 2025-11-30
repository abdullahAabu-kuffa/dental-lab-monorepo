// services/hooks/change_order_status.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeOrderStatus } from "../apiServices";

export const useChangeOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      orderId,
      action,
    }: {
      orderId: number;
      action: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
    }) => changeOrderStatus(orderId, action),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
  });
};
