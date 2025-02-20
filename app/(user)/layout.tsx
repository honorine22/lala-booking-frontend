'use client';

import { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiUser } from 'react-icons/fi';
import Link from 'next/link';
import { cn } from '../lib/utils';
import { IoCloseCircle } from 'react-icons/io5';
import { FaCalendar, FaCog, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { FaBuildingCircleCheck, FaHouse } from 'react-icons/fa6';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen w-full bg-white">
            {/* Sidebar */}
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
                </ul>
            </motion.aside>

            {/* Main Content */}
            <div className="flex flex-col flex-1">
                {/* Top Navbar */}
                <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-xl text-gray-700">
                        <FiMenu />
                    </button>

                    <div className="relative group">
                        <button className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-full">
                            <FiUser />
                            <span>Profile</span>
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg opacity-0 group-hover:opacity-100 transition">
                            <Link href="/profile" className="flex items-center gap-2 px-4 py-2  hover:bg-gray-100 cursor-pointe">
                                <FaUserCircle /> Profile</Link>
                            <Link href="/settings" className="flex items-center gap-2 px-4 py-2  hover:bg-gray-100 cursor-pointe">
                                <FaCog /> Settings</Link>
                            <button className="flex items-center gap-2 px-4 py-2  hover:bg-gray-100 cursor-pointe">
                                <FaSignOutAlt className='text-red-500' />Logout</button>
                        </div>
                    </div>
                </nav>
                {/* Page Content */}
                <main className="p-6 flex-1">{children}</main>
            </div>
        </div>
    );
}
