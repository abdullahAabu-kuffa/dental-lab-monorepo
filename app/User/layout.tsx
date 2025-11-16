import Navbar from '../src/components/organisms/Navbar/Navbar';
import Footer from '../src/components/organisms/Footer/Footer';
import { SidebarIcons } from './Order/components/SidebarIcons';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {/* Persistent Sidebar Navigation */}
      <SidebarIcons />
      <main className="min-h-screen ml-32">
        {children}
      </main>
      <Footer />
    </>
  );
}
