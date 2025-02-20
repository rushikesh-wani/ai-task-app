import { X } from "lucide-react";
import React from "react";

const Modal = ({ isOpen, onClose, title, description, children }) => {
  if (isOpen === false) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 backdrop-filter backdrop-blur-sm text-white">
      <div className="max-w-6xl h-screen mx-auto">
        <div className="w-full h-full flex justify-center items-center">
          <div className="relative p-5 ring-2 ring-white/20 rounded-lg sm:w-[60%] max-w-[90%] bg-[#272727]/50 shadow-lg">
            <div className="absolute -inset-1 -z-10 rounded-lg blur-xl bg-gradient-to-br from-rose-500 via-purple-800 to-sky-800 opacity-50"></div>
            <div className="bg-white/20 p-1 absolute top-0 left-0 right-0 flex justify-between items-center rounded-tl-lg rounded-tr-lg">
              <div className="flex gap-1 items-center">
                <div className="size-3 rounded-full bg-green-500"></div>
                <div className="size-3 rounded-full bg-yellow-500"></div>
                <div className="size-3 rounded-full bg-rose-500"></div>
              </div>
              <button onClick={onClose} className="cursor-pointer">
                <X />
              </button>
            </div>

            <div className="mt-5">
              <h1 className="text-3xl font-medium">{title}</h1>
              <p className="mt-2 text-sm sm:text-base text-slate-400">
                {description}
              </p>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
