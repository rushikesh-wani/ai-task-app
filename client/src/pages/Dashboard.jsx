import React, { useEffect, useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { UserIcon } from "lucide-react";
import ProfileDropdown from "../components/ProfileDropdown ";
import { toast } from "sonner";

const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logout successfully! Visit again.");
    navigate("/login");
  };

  useEffect(() => {
    const user = localStorage.getItem("userDetails");
    setUserData(JSON.parse(user));
  }, []);
  return (
    <>
      <div className="min-h-screen bg-[#121212] sm:overflow-hidden">
        <div className="relative p-2 sm:p-4 max-w-6xl mx-auto">
          <ProfileDropdown userData={userData} handleLogout={handleLogout} />
          <div className="my-4">
            <div className="z-50 sticky top-0 left-0 right-0 w-full py-2 sm:py-0 bg-[#121212]/30 backdrop-filter backdrop-blur-sm flex justify-between items-center">
              <Link
                to={"/"}
                className="text-transparent bg-clip-text bg-gradient-to-br from-rose-600 via-50% to-indigo-700 text-3xl sm:text-5xl font-bold"
              >
                AI TaskX
              </Link>
              <div className="inline-flex items-center gap-2">
                <Link
                  to={"/add-task"}
                  className="px-2 py-1 sm:px-4 sm:py-2 text-center bg-violet-700 rounded-lg text-white sm:text-lg font-semibold"
                >
                  Add Task
                </Link>
                <Link
                  to={"/login"}
                  className="sm:hidden size-8 p-1 bg-white rounded-full"
                >
                  <UserIcon />
                </Link>
              </div>
            </div>
            <p className="my-2 text-xs sm:text-base text-gray-400">
              AI-powered task generation made easy! Task Maker leverages
              Generative AI to instantly create task ideas. Simplify planning,
              boost productivity, and streamline your workflow with intelligent
              task suggestions. Get smart, relevant, and actionable tasks
              effortlessly—saving you time and effort!
            </p>
          </div>
          <div className="sm:grid grid-flow-col grid-cols-10 gap-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
