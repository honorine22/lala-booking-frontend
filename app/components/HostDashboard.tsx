"use client";

import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import TableSkeletonLoader from "./TableSkeleton";
import toast from "react-hot-toast";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Pagination from "./Pagination";
import { useDebouncedValue } from "../lib/useDebouncedSearch";
import { AxiosError } from "axios";
import { useDeletePropertyMtn, useGetAllProperties, useUpdatePropertyMtn } from "@/api/properties/properties";
import { Property } from "@/types/property";
import AddPropertyModal from "./AddPropertyModal";

export default function RenterDashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 10; // Customize your page size
    const debouncedSearchQuery = useDebouncedValue(searchQuery, 300);
    const { data, isLoading: bookingsIsLoading } = useGetAllProperties(debouncedSearchQuery, page, pageSize);
    const [formData, setFormData] = useState<Property>({
        title: '',
        description: '',
        price: 0,
        location: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Convert 'price' to a number or set to 0 if invalid
        const parsedValue = name === 'price' ? Number(value) || 0 : value;

        setFormData({
            ...formData,
            [name]: parsedValue,
        });
    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
    const queryClient = useQueryClient();
    const propertiesData = data?.data as Property[] ?? [];
    const totalPages = data?.totalPages ?? 1;

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setPage(1); // Reset to first page when searching
    };
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const openDeleteModal = (bookingId: string) => {
        setSelectedBookingId(bookingId);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setSelectedBookingId(null);
        setShowDeleteModal(false);
    };

    const deleteMutation = useDeletePropertyMtn();
    const handleDelete = () => {
        if (!selectedBookingId) return;

        deleteMutation.mutate(selectedBookingId, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['all-properties'] });
                toast.success('Property deleted successfully!');
                closeDeleteModal();
            },
            onError: (error: unknown) => {
                const axiosError = error as AxiosError;
                const errorMessage =
                    axiosError.response?.data && typeof axiosError.response.data === 'object' && 'error' in axiosError.response.data
                        ? (axiosError.response.data as { error: string }).error
                        : axiosError.message || 'Failed to delete property';
                toast.error(errorMessage);
            },
        });
    };

    const openUpdateModal = (bookingId: string) => {
        setSelectedBookingId(bookingId);
        setShowUpdateModal(true);
    };

    const closeUpdateModal = () => {
        setSelectedBookingId(null);
        setShowUpdateModal(false);
    };

    const updateMutation = useUpdatePropertyMtn();
    const handleUpdate = () => {
        if (!selectedBookingId) return;

        updateMutation.mutate({ bookingId: selectedBookingId, data: formData }, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['all-properties'] });
                toast.success('Property update successfully!');
                closeUpdateModal();
            },
            onError: (error: unknown) => {
                const axiosError = error as AxiosError;
                const errorMessage =
                    axiosError.response?.data && typeof axiosError.response.data === 'object' && 'error' in axiosError.response.data
                        ? (axiosError.response.data as { error: string }).error
                        : axiosError.message || 'Failed to update property';
                toast.error(errorMessage);
            },
        });
    };

    const rowVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };

    return (
        <div className="flex flex-col mx-auto max-w-screen-xl mt-8">
            {/* Header */}
            <div className="flex justify-between items-center my-2">
                <div>
                    <h1 className="text-2xl font-bold">Properties Management</h1>
                    <div className="relative my-4">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-80 h-11 pl-10 pr-5 py-2.5 text-base font-normal border border-gray-200 rounded-2xl placeholder-gray-500 focus:outline-none"
                            placeholder="Search for properties"
                        />
                    </div>
                </div>
                <button onClick={() => setIsModalOpen(true)}
                    className="px-6 py-3 bg-[#9CEE69] text-black font-semibold rounded-lg shadow-lg transition">
                    Add Property
                </button>
                <AddPropertyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>

            {/* Table */}
            <div className="shadow-md rounded-xl p-6 bg-white">
                <div className="overflow-x-auto">
                    {bookingsIsLoading ? (
                        <TableSkeletonLoader />
                    ) : (
                        <table className="min-w-full rounded-xl">
                            <thead>
                                <tr className="bg-zinc-100">
                                    {["Title", "Description", "Price", "Location", "Host", "Actions"].map((header) => (
                                        <th key={header} className="p-5 text-left text-sm font-semibold text-gray-900 capitalize">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                                {propertiesData.map((property) => (
                                    <motion.tr
                                        key={property.id}
                                        variants={rowVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="bg-white hover:bg-gray-50"
                                    >
                                        <td className="p-5 text-sm font-medium text-gray-900">{property.title || "N/A"}</td>
                                        <td className="p-5 text-sm font-medium text-gray-900">{property.description || "N/A"}</td>
                                        <td className="p-5 text-sm font-medium text-gray-900">{property.price}</td>
                                        <td className="p-5 text-sm font-medium text-gray-900">{property.location}</td>
                                        <td className="p-5 text-sm font-medium text-gray-900">{property.host?.name}</td>
                                        <td className="p-5 space-x-4">
                                            <button
                                                onClick={() => property.id && openDeleteModal(property.id)}
                                                className="p-2 rounded-full bg-red-700 text-white hover:bg-white hover:text-black transition"
                                            >
                                                <FaTrash />
                                            </button>
                                            <button
                                                onClick={() => property.id && openUpdateModal(property.id)}
                                                className="p-2 rounded-full bg-[#9CEE69] text-black hover:text-black transition"
                                            >
                                                <FaEdit />
                                            </button>
                                        </td>

                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Update Confirmation Modal */}
            {showUpdateModal && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">

                        <h2 className="text-lg font-bold mb-4">Update Property</h2>
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#9CEE69] focus:border-[#9CEE69]"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#9CEE69] focus:border-[#9CEE69]"
                            />
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                Price per night
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price as number}
                                onChange={handleChange}
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#9CEE69] focus:border-[#9CEE69]"
                            />
                        </div>
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                Location
                            </label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#9CEE69] focus:border-[#9CEE69]"
                            />
                        </div>
                        <div className="flex justify-end gap-4 mt-6">
                            <button onClick={closeUpdateModal} className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-black">
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                disabled={updateMutation.isPending}
                                className={`px-4 py-2 rounded-lg text-black font-black ${updateMutation.isPending ? "bg-gray-400" : "bg-[#9CEE69]"
                                    }`}
                            >
                                {updateMutation.isPending ? "Updating..." : "Update"}
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
                        <p className="text-gray-600 mb-6">Are you sure you want to delete this property? This action cannot be undone.</p>
                        <div className="flex justify-end gap-4">
                            <button onClick={closeDeleteModal} className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-black">
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleteMutation.isPending}
                                className={`px-4 py-2 rounded-lg text-white ${deleteMutation.isPending ? "bg-gray-400" : "bg-red-700 hover:bg-red-800"
                                    }`}
                            >
                                {deleteMutation.isPending ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
            {/* Pagination */}
            <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
}
