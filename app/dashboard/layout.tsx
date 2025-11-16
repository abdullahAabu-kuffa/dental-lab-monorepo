import Sidebar from "./_components/@sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-auto">
          <div className=" w-full">
            <main>{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;
