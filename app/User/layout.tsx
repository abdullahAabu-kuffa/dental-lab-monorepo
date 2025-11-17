"use client";

import Navbar from '../src/components/organisms/Navbar/Navbar';
import Footer from '../src/components/organisms/Footer/Footer';
import { DropList } from '../User/Order/components/DropList';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <div className="flex flex-1 relative">
    
        <DropList />

        {/* Main Content */}
        <main className="flex-1 pl-24 pt-20">
          <div className="min-h-[calc(100vh-4rem)]">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
