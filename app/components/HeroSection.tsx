"use client"
import Image from 'next/image';
import React, { useState } from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaCalendarPlus } from 'react-icons/fa';

export default function HeroSection() {
    const [checkInFocused, setCheckInFocused] = useState(false);
    const [checkOutFocused, setCheckOutFocused] = useState(false);

    return (
        <div className="relative w-full h-[80vh]">
            <Image
                src="https://plus.unsplash.com/premium_photo-1684508638760-72ad80c0055f?w=1920&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvbWV8ZW58MHx8MHx8fDA%3D"
                alt="Hero Image"
                layout="fill"
                objectFit="cover"
                quality={100}
                className="rounded-lg"
                priority
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-center p-6">
                <h1 className="text-5xl font-black text-white uppercase">Find Your Perfect Stay</h1>
                <div className="flex flex-col md:flex-row gap-4 mt-4">
                    {/* Check-in Date */}
                    <div className="relative flex items-center w-full md:w-64 bg-[#F7F6F1] rounded-xl shadow-lg">
                        <button
                            className="absolute left-3 w-5 h-5 text-gray-500"
                            onClick={() => setCheckInFocused(true)}
                        >
                            <FaCalendarPlus />
                        </button>
                        <input
                            type="date"
                            className={`bg-transparent p-4 pl-10 rounded-md text-black font-bold w-full ${checkInFocused ? "opacity-100" : "opacity-0"
                                }`}
                            onFocus={() => setCheckInFocused(true)}
                            onBlur={() => setCheckInFocused(false)}
                        />
                    </div>

                    {/* Check-out Date */}
                    <div className="relative flex items-center w-full md:w-64 bg-[#F7F6F1] rounded-xl shadow-lg">
                        <button
                            className="absolute left-3 w-5 h-5 text-gray-500"
                            onClick={() => setCheckOutFocused(true)}
                        >
                            <FaCalendarPlus />
                        </button>
                        <input
                            type="date"
                            className={`bg-transparent p-4 pl-10 rounded-md text-black font-bold w-full ${checkOutFocused ? "opacity-100" : "opacity-0"
                                }`}
                            onFocus={() => setCheckOutFocused(true)}
                            onBlur={() => setCheckOutFocused(false)}
                        />
                    </div>
                </div>
                <div className="absolute right-16 top-1/2 transform -translate-y-1/2 flex flex-col space-y-1 items-center">
                    {/* vertical border */}
                    <div className="w-[1px] h-24 bg-white"></div>
                    <FaFacebook className="text-white text-2xl cursor-pointer hover:text-[#9CEE69]" />
                    <div className="w-[1px] h-24 bg-white"></div>
                    <FaTwitter className="text-white text-2xl cursor-pointer hover:text-[#9CEE69]" />
                    <div className="w-[1px] h-24 bg-white"></div>
                    <FaInstagram className="text-white text-2xl cursor-pointer hover:text-[#9CEE69]" />
                    <div className="w-[1px] h-24 bg-white"></div>
                </div>
            </div>
        </div>
    );
}
