"use client";
import React from "react";

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-20">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-[#9CEE69] rounded-full animate-spin"></div>
        </div>
    );
};

export default Loader;
