"use client";
import React from "react";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white">


      <main className="w-full m-0 p-0">
        {children}
      </main>
    </div>
  );
}
