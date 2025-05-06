import React from "react";

export const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white/50 backdrop-blur-sm">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
        <div className="absolute inset-2 rounded-full bg-white"></div>
      </div>
    </div>
  );
};
