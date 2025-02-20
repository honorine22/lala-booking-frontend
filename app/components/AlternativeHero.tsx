'use client';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function AlternativeHero() {
    const router = useRouter();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');

    // Handle input changes for check-in and check-out dates
    const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCheckInDate(e.target.value);
    };

    const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCheckOutDate(e.target.value);
    };

    return (
        <div className="flex flex-col md:flex-row w-full h-screen">
            {/* Left Section */}
            <div className="relative flex flex-col justify-center items-center md:items-start w-full md:w-1/2  p-6 md:p-12 lg:p-24 text-black">
                {/* Real Estate Logo */}
                <nav className="absolute top-4 left-0 right-0 border-gray-200 px-8 md:px-20 ">
                    <div className="flex justify-between items-center -mx-0 md:-mx-4 lg:-mx-4">
                        <div>
                            <Link href="/" className='flex items-center rtl:space-x-reverse'>
                                <Image src="/images/logo.png" className="" alt="Real Estate Logo" priority quality={100} width={100} height={100} />
                                <span className="self-center text-xl font-semibold ">LalaRent</span>
                            </Link>
                        </div>
                        <div className={`md:flex md:items-center md:space-x-8 ${isNavOpen ? "block" : "hidden"}`}>
                            <ul className="flex flex-col md:flex-row md:space-x-8">
                                <li><Link href="#" className="py-2 px-3 text-gray-900 hover:text-blue-700">Home</Link></li>
                                <li><Link href="#" className="py-2 px-3 text-gray-900 hover:text-blue-700">About</Link></li>
                                <li><Link href="#" className="py-2 px-3 text-gray-900 hover:text-blue-700">Services</Link></li>
                                <li><Link href="#" className="py-2 px-3 text-gray-900 hover:text-blue-700">Pricing</Link></li>
                                <li><Link href="#" className="py-2 px-3 text-gray-900 hover:text-blue-700">Contact</Link></li>
                            </ul>
                        </div>
                        <div className="md:hidden">
                            <button onClick={() => setIsNavOpen(!isNavOpen)} className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </nav>

                <h3 className="uppercase text-lg text-gray-600">Building Your Dreams</h3>
                <h1 className="text-4xl md:text-5xl font-black leading-tight mt-4">
                    Real Estate in Rwanda: <br /> Ideal for Living and Investing
                </h1>

                {/* Buttons */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-12 w-full absolute bottom-8">
                    <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:space-x-6 w-full items-center">
                        {/* Date Input Section */}
                        <div className="md:flex md:flex-row gap-4 items-end">
                            <div className="flex flex-col w-full md:w-auto">
                                <label htmlFor="checkIn" className="text-sm font-medium text-gray-600">Check-In Date</label>
                                <input
                                    type="date"
                                    id="checkIn"
                                    value={checkInDate}
                                    onChange={handleCheckInChange}
                                    className="py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9CEE69]" />
                            </div>
                            <div className="flex flex-col w-full md:w-auto">
                                <label htmlFor="checkOut" className="text-sm font-medium text-gray-600">Check-Out Date</label>
                                <input
                                    type="date"
                                    id="checkOut"
                                    value={checkOutDate}
                                    onChange={handleCheckOutChange}
                                    className="py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9CEE69]" />
                            </div>
                            <div>
                                <button onClick={() => router.push("/search")} className="bg-[#9CEE69] text-black font-bold px-6 py-3 rounded-2xl flex items-center transition hover:text-black hover:bg-[#95e763]">
                                    Search Now
                                </button>
                            </div>
                            <div className="ml-8 md:ml-20 lg:ml-20 ">
                                <button className="flex items-center space-x-2 text-gray-700">
                                    <span className="text-xs">Explore All Our Properties</span>
                                    <span className="text-xl">➝</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="relative w-full md:w-1/2 h-screen">
                <Image
                    src="https://plus.unsplash.com/premium_photo-1684508638760-72ad80c0055f?w=1920&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvbWV8ZW58MHx8MHx8fDA%3D"
                    alt="Dubai Real Estate"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-l-xl"
                    priority
                />
                {/* Floating Info */}
                <div className="absolute top-6 left-6 bg-white px-4 py-2 rounded-lg shadow-md">
                    <p className="text-gray-800 text-sm">More than 1500 real estate properties</p>
                </div>
                <div className="absolute top-6 right-6 bg-white px-4 py-2 rounded-lg shadow-md">
                    <p className="text-gray-800 text-sm">From $145,000 with Link yield of 10% per annum</p>
                </div>
                <div className="absolute right-4 top-1/3 flex flex-col space-y-2 items-center">
                    <div className="w-[2px] h-16 bg-[#9CEE69]"></div>
                    <FaFacebook className="text-white text-3xl cursor-pointer hover:text-[#9CEE69]" />
                    <div className="w-[2px] h-16 bg-[#9CEE69]"></div>
                    <FaTwitter className="text-white text-3xl cursor-pointer hover:text-[#9CEE69]" />
                    <div className="w-[2px] h-16 bg-[#9CEE69]"></div>
                    <FaInstagram className="text-white text-3xl font-black cursor-pointer hover:text-[#9CEE69]" />
                    <div className="w-[2px] h-16 bg-[#9CEE69]"></div>
                </div>
                {/* Floating Catalog Button */}
                <div className="absolute bottom-6 right-6 bg-white px-4 py-2 rounded-lg shadow-md cursor-pointer">
                    <p className="text-gray-800 text-sm">Catalog Download</p>
                </div>
            </div>
        </div>
    );
}
