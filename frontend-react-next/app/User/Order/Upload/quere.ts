"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export async function uploadFile(file: File) {
  const Token = localStorage.getItem("accessToken");
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
export function useUploadFile() {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => uploadFile(file),
    onSuccess:()=> {
        queryClient.invalidateQueries({ queryKey: ["files"] });
    }
  });
}
