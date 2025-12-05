import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../apiServices";


export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (userId: number) => deleteUser(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: (error) => {
            console.error("Error deleting user:", error);
        }
    });
}