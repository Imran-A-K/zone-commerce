import React from "react";

function Loader({ className }) {
  return (
    <div className="h-screen w-screen z-50 flex justify-center items-start pt-6">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
}

export default Loader;
