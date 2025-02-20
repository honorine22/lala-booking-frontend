'use client';
import { FaSearch, FaTrash, FaUserEdit } from "react-icons/fa";
import { motion } from 'framer-motion';

export default function HostDashboard() {
    const properties = [
        { id: 1, title: "Cozy Apartment", location: "New York", status: "Confirmed", price: 120 },
        { id: 2, title: "Beachfront Villa", location: "Miami", status: "Pending", price: 250 },
        { id: 3, title: "Mountain Cabin", location: "Denver", status: "Confirmed", price: 180 }
    ];

    const handleEdit = (id: number) => {
        alert(`Edit property with ID: ${id}`);
    };

    const handleDelete = (id: number) => {
        alert(`Delete property with ID: ${id}`);
    };

    const rowVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };

    return (
        <div className="flex flex-col mx-auto max-w-screen-xl mt-8">
            {/* Add property button */}
            <div className="flex justify-between flex-row items-center my-2">
                <div>
                    <div>
                        <h1 className="text-2xl font-bold">Property Management</h1>
                    </div>
                    {/* Search bar with animation */}
                    <div className="relative text-gray-500 focus-within:text-gray-900 my-4">
                        <div className="absolute inset-y-0 left-1 flex items-center pl-3 pointer-events-none ">
                            <FaSearch />
                        </div>
                        <input type="text" id="default-search" className="block w-80 h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-200 rounded-2xl placeholder-gray-500 focus:outline-none" placeholder="Search for property" />
                    </div>
                </div>
                <div className="flex justify-self-end">
                    <button className="px-6 py-3 bg-[#9CEE69] text-black font-semibold rounded-lg shadow-lg transition">
                        Add Property
                    </button>
                </div>
            </div>
            <div className="flex flex-col shadow-md rounded-xl p-6 bg-white">
                <div className="overflow-x-auto">
                    <div className="min-w-full inline-block align-middle">

                        <div className="overflow-hidden">
                            <table className="min-w-full rounded-xl">
                                <thead>
                                    <tr className="bg-zinc-100">
                                        <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl">Property</th>
                                        <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize">Location</th>
                                        <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize">Price</th>
                                        <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl">Status</th>
                                        <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-100">
                                    {/* Properties rows with animations */}
                                    {properties.map(property => (
                                        <motion.tr
                                            key={property.id}
                                            variants={rowVariants}
                                            initial="hidden"
                                            animate="visible"
                                            className="bg-white transition-all duration-500 hover:bg-gray-50"
                                        >
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{property.title}</td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{property.location}</td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">${property.price}</td>
                                            <td className={`p-5 whitespace-nowrap text-sm leading-6 font-medium ${property.status === "Confirmed" ? "text-green-600" : "text-yellow-600"}`}>
                                                {property.status}
                                            </td>
                                            <td className="p-5">
                                                <div className="flex items-center gap-4">
                                                    <button onClick={() => handleDelete} className="p-2 rounded-full group transition-all duration-500 flex item-center hover:text-black bg-[#9CEE69] hover:bg-white text-black">
                                                        <FaUserEdit />
                                                    </button>
                                                    <button onClick={() => handleEdit} className="p-2 rounded-full group transition-all duration-500 flex item-center text-white bg-red-700 hover:bg-white hover:text-black">
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
