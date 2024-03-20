import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";
import Sidebar from "@/components/Sidebar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const DashboardLayout = ({ children }) => {
  return (
    <>
      <div className="w-full absolute top-0 left-0 z-50">
        <SessionWrapper>
          <Navbar />
        </SessionWrapper>
      </div>
      <div className="flex">
        <div className="pt-24 h-screen border-e dark:bg-gray-700 w-[250px]">
          <SessionWrapper>
            <Sidebar />
          </SessionWrapper>
        </div>
        <div className="pt-24 px-10 w-full h-screen overflow-y-auto">
          <main>{children}</main>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default DashboardLayout;
