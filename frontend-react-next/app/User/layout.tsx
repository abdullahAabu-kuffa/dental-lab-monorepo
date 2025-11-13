import Navbar from '../src/components/organisms/Navbar/Navbar';
import Footer from '../src/components/organisms/Footer/Footer';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}