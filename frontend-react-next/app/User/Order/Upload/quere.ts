"use client";
import { getAccessToken } from "@/app/src/auth/tokenStore";
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
export async function uploadFile(file: File) {
  const Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoibW9oYW1lZGVtYWRyb3NoZHkxQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2MzkyNjcxNywiZXhwIjoxNzY0MDEzMTE3fQ.H41pjpDBVTGBPivYf9H_XQakAxmbAu6V-fydlzVggqg";
  if (!Token) throw new Error("No access token found");
  const formData= new FormData();
   formData.append("file", file);
  const res = await fetch("http://localhost:3001/api/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Token}`,
    },
    body: formData,
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    console.log(errorData?.error || "Failed to fetch orders", errorData.message);
    throw new Error(errorData?.error || "Failed to fetch orders", errorData.message);
  }

  const data = await res.json();
  return data;
}
export function useUploadFile(
  options?: UseMutationOptions<any, unknown, File>
) {
  const queryClient = useQueryClient();

  return useMutation<File, unknown, File>({
    mutationFn: (file: File) => uploadFile(file),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
      if (options?.onSuccess) options.onSuccess(data, variables, context);
    },
    onError: options?.onError,
    onSettled: options?.onSettled,
  });
}