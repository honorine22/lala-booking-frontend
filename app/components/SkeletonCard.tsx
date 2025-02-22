"use client";
import React from "react";

const SkeletonCard = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
                <div
                    key={index}
                    className="relative flex flex-col rounded-xl overflow-hidden shadow-lg animate-pulse bg-gray-200 h-72 md:h-80 lg:h-96"
                >
                    {/* Simulated Image Placeholder */}
                    <div className="absolute inset-0 bg-gray-50"></div>

                    {/* Text Placeholder */}
                    <div className="absolute bottom-0 left-0 w-full p-4 space-y-4">

                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="h-3 bg-gray-100 rounded-full"></div>

                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SkeletonCard;
