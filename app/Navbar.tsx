'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaUserCircle, FaSignOutAlt, FaCog, FaCalendarCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();

    const handleLogout = () => {
        // Handle logout logic
        console.log('User logged out');
    };

    return (
        <nav className="bg-white shadow-md fixed top-0 w-full ">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                {/* Logo */}
                <h1
                    className="text-2xl font-bold text-gray-800 cursor-pointer"
                    onClick={() => router.push('/')}
                >
                    MyRental
                </h1>

                {/* User Profile */}
                <div className="relative">
                    <motion.div
                        className="flex items-center gap-2 cursor-pointer"
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <Image
                            src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
                            alt="User Avatar"
                            width={50}
                            height={50}
                            quality={100}
                            className="rounded-full aspect-square"
                        />
                        <span className="text-gray-800 font-medium">John Doe</span>
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
                                    onClick={() => router.push('/profile')}
                                >
                                    <FaUserCircle /> Profile
                                </li>
                                <li
                                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => router.push('/bookings')}
                                >
                                    <FaCalendarCheck /> My Bookings
                                </li>
                                <li
                                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => router.push('/settings')}
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
            </div>
        </nav>
    );
};

export default Navbar;
