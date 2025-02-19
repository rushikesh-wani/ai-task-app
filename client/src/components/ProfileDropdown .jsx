import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  LogOut,
  Settings,
  UserCircle,
  User as UserIcon,
} from "lucide-react";

const ProfileDropdown = ({ userData, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="relative hidden md:inline-flex items-center gap-2 w-full justify-end"
      ref={dropdownRef}
    >
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 focus:outline-none"
      >
        <div className="size-8 flex items-center justify-center bg-white rounded-full">
          <UserIcon />
        </div>

        <div className="text-white leading-1.5">
          <p className="text-lg inline-flex gap-1 items-center">
            Hello,{" "}
            <span className="text-violet-600 font-bold">{userData?.name}</span>
            <ChevronDown className="size-5 text-white" />
          </p>
          <p className="text-sm text-start text-gray-500">{userData?.email}</p>
        </div>
      </button>

      {isOpen && (
        <div className="z-[100] absolute right-0 top-10 mt-2 w-48 bg-black/50 backdrop-blur-2xl border border-gray-800 rounded-lg shadow-lg">
          <ul className="text-gray-300 divide-y">
            <li className="px-4 py-2 hover:bg-[#272727]/60 cursor-pointer">
              <UserCircle className="inline-block mr-2" /> Profile
            </li>
            <li className="px-4 py-2 hover:bg-[#272727]/60 cursor-pointer">
              <Settings className="inline-block mr-2" /> Settings
            </li>
            <li
              className="px-4 py-2 text-rose-500 hover:bg-[#272727]/60 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="inline-block mr-2" />
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
