import SessionWrapper from "@/components/SessionWrapper";
import Sidebar from "@/components/Sidebar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const DashboardLayout = ({ children }) => {
  return (
    <>
      <div className="flex">
        <div id="sidebar" className="hidden sm:block pt-10 h-screen border-e dark:bg-gray-700">
          <SessionWrapper>
            <Sidebar />
          </SessionWrapper>
        </div>
        <div className="pt-10 px-10 w-full h-screen overflow-y-auto dark:bg-gray-600">
          <main>{children}</main>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default DashboardLayout;
