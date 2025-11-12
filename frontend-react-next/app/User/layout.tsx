import Footer from "../src/components/organisms/Footer";
import Navbar from "../src/components/organisms/Navbar/Navbar";


const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="flex h-screen overflow-hidden">
        <div className="flex flex-col flex-1 overflow-auto">
          <div className=" w-full">
                      <main>
                          <Navbar />
                          {children}
                          <Footer/>
                      </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;
