"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

function SimpleNavbar() {
    const [isNavOpen, setIsNavOpen] = useState(false)

    return (
        <nav className="bg-white border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mx-0 md:mx-6 lg:mx-6">
                <div>
                    <Link href="/" className='flex items-center rtl:space-x-reverse'>
                        <Image src="/images/logo.png" alt="Real Estate Logo" priority quality={100} width={100} height={100} />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap">LalaRent</span>
                    </Link>
                </div>

                {/* Navbar Links */}
                <div className="hidden md:flex md:items-center md:space-x-8">
                    <ul className="flex flex-col md:flex-row md:space-x-8">
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
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default SimpleNavbar
