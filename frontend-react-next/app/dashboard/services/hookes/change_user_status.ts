import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeUserStatus } from "../apiServices";

export const useChangeUserStatus  = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ userId, action }: { userId: number; action: "approve" | "reject" }) =>
            changeUserStatus(userId, action),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};