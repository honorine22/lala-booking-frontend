/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";

const properties = [
    {
        id: 1,
        title: "Cozy Apartment",
        price: "$100/night",
        description:
            "Enter a freshly updated and thoughtfully furnished peaceful home surrounded by ancient trees, stone walls, and open meadows.",
        location: "New York",
    },
    {
        id: 2,
        title: "Luxury Villa",
        price: "$250/night",
        description:
            "Enter a freshly updated and thoughtfully furnished peaceful home surrounded by ancient trees, stone walls, and open meadows.",
        location: "Los Angeles",
    },
    {
        id: 3,
        title: "Modern Loft",
        price: "$180/night",
        description:
            "Experience the city from a modern loft with breathtaking views, contemporary decor, and an unbeatable location.",
        location: "San Francisco",
    },
    {
        id: 4,
        title: "Seaside Cottage",
        price: "$220/night",
        description:
            "Relax by the ocean in a charming seaside cottage, perfect for a peaceful getaway with stunning sunset views.",
        location: "Miami",
    },
];

export default function PropertyList() {
    return (
        <div className="w-full px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 mx-2 gap-x-8 gap-y-4">
                {properties.map((property) => (
                    <motion.div
                        key={property.id}
                        className="cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="relative flex flex-col rounded-xl overflow-hidden shadow-lg group">
                            {/* Image */}
                            <div className="relative w-full h-72 md:h-80 lg:h-96">
                                <img
                                    src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80"
                                    alt={property.title}
                                    className="w-full h-full object-cover group-hover:brightness-50 transition duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent"></div>
                            </div>

                            {/* Heart Icon Moved to Left */}
                            <div className="absolute top-4 left-4">
                                <FaHeart className="text-2xl cursor-pointer text-red-500" />
                            </div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="flex items-center justify-between mb-3">
                                    <h5 className="text-lg font-semibold text-white">{property.title}</h5>
                                    <p className="text-base font-medium text-yellow-400 flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        5.0
                                    </p>
                                </div>
                                <p className="text-sm text-white">{property.description}</p>
                                <p className="mt-3 text-sm font-medium text-white">📍 {property.location}</p>
                            </div>

                            {/* Circular Reserve Button */}
                            <div className="absolute bottom-4 right-4">
                                <button className="w-12 h-12 flex items-center justify-center rounded-full bg-[#9CEE69] text-black font-bold shadow-md transition">
                                    <FaArrowRight className="text-xl" />
                                </button>
                            </div>
                        </div>
                    </motion.div>

                ))}
            </div>
        </div>
    );
}
