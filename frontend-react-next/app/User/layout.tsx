"use client";

import Navbar from '../src/components/organisms/Navbar/Navbar';
import Footer from '../src/components/organisms/Footer/Footer';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 relative">
       {/* Main Content */}
        <main className="flex-1 w-full pt-20">
          <div className="min-h-[calc(100vh-4rem)] w-full">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
