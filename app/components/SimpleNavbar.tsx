"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaSignOutAlt, FaCog, FaCalendarCheck, FaCalendar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { User } from '@/types/user';
import Cookies from "js-cookie";
import { BsArrowRight } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';
import { FaBuildingCircleCheck, FaHouse } from 'react-icons/fa6';
import { IoCloseCircle } from 'react-icons/io5';
import { cn } from '../lib/utils';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
function SimpleNavbar() {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    // Check if user is logged in (from cookies)
    useEffect(() => {
        const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
            const [key, value] = cookie.split('=');
            acc[key] = decodeURIComponent(value);
            return acc;
        }, {} as Record<string, string>);

        const userData = cookies.loggedInUser;

        if (userData) {
            setUser(JSON.parse(userData));
        }

    }, []);

    const handleLogout = () => {
        Cookies.remove("authToken");
        Cookies.remove("loggedInUser");
        setUser(null);
        router.push("/");
    };

    const handleGoogleLogin = () => {
        const redirectUrl = window.location.href; // Get current page URL
        window.location.href = `${API_BASE_URL}/auth/google?redirect=${encodeURIComponent(redirectUrl)}`;
    };

    return (
        <>
            <motion.aside
                initial={{ x: -250 }}
                animate={{ x: isSidebarOpen ? 0 : -250 }}
                className={cn(
                    'fixed left-0 top-0 h-full bg-gray-900 text-white w-64 p-5 transition-all z-50',
                    isSidebarOpen ? 'shadow-lg' : ''
                )}
            >
                <div className='flex flex-row items-center ml-2'>
                    <h2 className="text-2xl font-bold text-center">Dashboard</h2>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="absolute top-5 right-4 text-white"
                    >
                        <IoCloseCircle className='text-3xl' />
                    </button>
                </div>
                <ul className="mt-6 space-y-4">
                    <li>
                        <Link href="/" className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700">
                            <FaHouse />
                            <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/bookings" className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700">
                            <FaCalendar />
                            <span>Bookings</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/properties" className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700">
                            <FaBuildingCircleCheck />
                            <span>Properties</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/users" className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700">
                            <FaBuildingCircleCheck />
                            <span>Users</span>
                        </Link>
                    </li>
                </ul>
            </motion.aside>
            <nav className="bg-white border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mx-0 md:mx-6 lg:mx-6">
                    <div className='flex items-center space-x-4'>
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-xl text-gray-700">
                            <FiMenu />
                        </button>
                        <Link href="/" className='flex items-center rtl:space-x-reverse'>
                            <Image src="/images/logo.png" alt="Real Estate Logo" priority quality={100} width={100} height={100} />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap">LalaRent</span>
                        </Link>
                    </div>

                    {/* Navbar Links */}
                    <div className="hidden md:flex md:items-center md:space-x-8">
                        <ul className="flex flex-col md:flex-row md:space-x-8 items-center">
                            <li>
                                <Link href="#" className="py-2 px-3 text-gray-900 hover:text-blue-700">Home</Link>
                            </li>
                            <li>
                                <Link href="#" className="py-2 px-3 text-gray-900 hover:text-blue-700">About</Link>
                            </li>
                            <li>
                                <Link href="#" className="py-2 px-3 text-gray-900 hover:text-blue-700">Services</Link>
                            </li>
                            <li>
                                <Link href="#" className="py-2 px-3 text-gray-900 hover:text-blue-700">Pricing</Link>
                            </li>
                            <li>
                                <Link href="#" className="py-2 px-3 text-gray-900 hover:text-blue-700">Contact</Link>
                            </li>
                            <li>
                                {/* User Profile */}
                                {user !== null ? (
                                    // **User Profile**
                                    <div className="relative">
                                        <motion.div
                                            className="flex items-center gap-2 cursor-pointer"
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setDropdownOpen(!dropdownOpen)}
                                        >
                                            <Image
                                                src={"https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXN8ZW58MHx8MHx8fDA%3D"} // Default avatar
                                                alt="User Avatar"
                                                width={50}
                                                height={50}
                                                quality={100}
                                                className="rounded-full aspect-square"
                                            />
                                            <span className="text-gray-800 font-medium">{user?.name}</span>
                                        </motion.div>

                                        {/* Dropdown Menu */}
                                        {dropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden"
                                            >
                                                <ul>
                                                    <li
                                                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                                        onClick={() => router.push("/profile")}
                                                    >
                                                        <FaUserCircle /> Profile
                                                    </li>
                                                    <li
                                                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                                        onClick={() => router.push("/bookings")}
                                                    >
                                                        <FaCalendarCheck /> My Bookings
                                                    </li>
                                                    <li
                                                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                                        onClick={() => router.push("/settings")}
                                                    >
                                                        <FaCog /> Settings
                                                    </li>
                                                    <li
                                                        className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
                                                        onClick={handleLogout}
                                                    >
                                                        <FaSignOutAlt /> Logout
                                                    </li>
                                                </ul>
                                            </motion.div>
                                        )}
                                    </div>
                                ) : (
                                    // **Login Button**
                                    <button
                                        onClick={handleGoogleLogin}
                                        className="bg-[#9CEE69] text-black font-bold px-6 py-3 rounded-2xl flex items-center transition hover:text-black hover:bg-[#95e763]"
                                    >
                                        Login <BsArrowRight className="ml-2" />
                                    </button>
                                )}
                            </li>
                        </ul>
                    </div>

                    {/* Hamburger Icon for Mobile */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsNavOpen(!isNavOpen)}
                            className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Sidebar for Mobile */}
                <div
                    className={`fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden ${isNavOpen ? "block" : "hidden"}`}
                    onClick={() => setIsNavOpen(false)} // Close on click outside
                >
                    <div
                        className="fixed left-0 top-0 w-64 h-full bg-gray-900 text-white p-6 space-y-4"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside sidebar
                    >
                        <button
                            onClick={() => setIsNavOpen(false)}
                            className="absolute top-4 right-4 text-gray-600"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <ul className="space-y-4">
                            <li>
                                <Link href="#" className="text-white hover:text-blue-700">Home</Link>
                            </li>
                            <li>
                                <Link href="#" className="text-white hover:text-blue-700">About</Link>
                            </li>
                            <li>
                                <Link href="#" className="text-white hover:text-blue-700">Services</Link>
                            </li>
                            <li>
                                <Link href="#" className="text-white hover:text-blue-700">Pricing</Link>
                            </li>
                            <li>
                                <Link href="#" className="text-white hover:text-blue-700">Contact</Link>
                            </li>

                            {/* First check if there is logged in user ibn cookie to show below profile or show login button */}
                            <li>
                                {/* User Profile */}
                                {user !== null ? (
                                    // **User Profile**
                                    <div className="relative">
                                        <motion.div
                                            className="flex items-center gap-2 cursor-pointer"
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setDropdownOpen(!dropdownOpen)}
                                        >
                                            <Image
                                                src={"https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXN8ZW58MHx8MHx8fDA%3D"} // Default avatar
                                                alt="User Avatar"
                                                width={50}
                                                height={50}
                                                quality={100}
                                                className="rounded-full aspect-square"
                                            />
                                            <span className="text-gray-800 font-medium">{user?.name}</span>
                                        </motion.div>

                                        {/* Dropdown Menu */}
                                        {dropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden"
                                            >
                                                <ul>
                                                    <li
                                                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                                        onClick={() => router.push("/profile")}
                                                    >
                                                        <FaUserCircle /> Profile
                                                    </li>
                                                    <li
                                                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                                        onClick={() => router.push("/bookings")}
                                                    >
                                                        <FaCalendarCheck /> My Bookings
                                                    </li>
                                                    <li
                                                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                                        onClick={() => router.push("/settings")}
                                                    >
                                                        <FaCog /> Settings
                                                    </li>
                                                    <li
                                                        className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
                                                        onClick={handleLogout}
                                                    >
                                                        <FaSignOutAlt /> Logout
                                                    </li>
                                                </ul>
                                            </motion.div>
                                        )}
                                    </div>
                                ) : (
                                    // **Login Button**
                                    <button
                                        onClick={handleGoogleLogin}
                                        className="bg-[#9CEE69] text-black font-bold px-6 py-3 rounded-2xl flex items-center transition hover:text-black hover:bg-[#95e763]"
                                    >
                                        Login <BsArrowRight className="ml-2" />
                                    </button>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default SimpleNavbar
