"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import SimpleNavbar from '@/app/components/SimpleNavbar'
import { Property } from "@/types/property";
import { useAvailableProperties } from "@/api/properties/properties";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import SkeletonCard from "@/app/components/SkeletonCard";

function Properties() {
    const searchParams = useSearchParams();
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");
    const router = useRouter();
    // Fetch properties with custom hook
    const { data: properties, isLoading, error } = useAvailableProperties({ checkIn, checkOut });

    return (
        <>
            <SimpleNavbar />
            <div className="w-full px-4 md:px-6 lg:px-8 mt-8">
                {error && <p className="text-red-500">Failed to load properties. Please try again.</p>}
                {properties?.length === 0 && <p className="text-gray-500">No properties available for these dates.</p>}
                {isLoading && <SkeletonCard />}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 mx-2 gap-x-8 gap-y-4">
                    {!isLoading && properties?.map((property: Property) => (
                        <motion.div key={property.id} className="cursor-pointer" whileHover={{ scale: 1.02 }}>
                            <div className="relative flex flex-col rounded-xl overflow-hidden shadow-lg group">
                                {/* Image */}
                                <div className="relative w-full h-72 md:h-80 lg:h-96">
                                    <Image
                                        src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                                        alt={property.title}
                                        unoptimized
                                        layout="fill"
                                        fill
                                        sizes="100vw"
                                        objectFit="cover" // Ensures the image covers the container
                                    />
                                </div>
                                {/* Heart icon (Top Left) */}
                                <div className="absolute top-3 left-3 bg-white/80 rounded-full p-2 cursor-pointer transition hover:bg-white">
                                    <FaHeartCircleCheck className="text-red-500 text-2xl" />
                                </div>

                                {/* Black overlay */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                {/* Content */}
                                <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 opacity-0 group-hover:opacity-100">
                                    <h5 className="text-lg font-semibold text-white">{property.title}</h5>
                                    <p className="text-sm text-white">{property.description}</p>
                                    <p className="mt-3 text-sm font-medium text-white">📍 {property.location}</p>
                                </div>
                                {/* More options icon (Bottom Right) */}
                                <div onClick={() => router.push(`/properties/${property.id}`)} className="absolute bottom-3 right-3 bg-[#9CEE69] rounded-full p-2 cursor-pointer transition hover:bg-[#99f063]">
                                    <FaArrowRight className="text-black w-5 h-5" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </>
    )
}

export default Properties