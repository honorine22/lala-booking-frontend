"use client";

import { FaCheck, FaSearch, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import { useCancelBookingMtn, useConfirmBookingMtn, useDeleteBookingMtn, useGetAllBookings } from "@/api/bookings/bookings";
import { Booking, BookingStatus } from "@/types/booking";
import TableSkeletonLoader from "./TableSkeleton";
import toast from "react-hot-toast";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Pagination from "./Pagination";
import { useDebouncedValue } from "../lib/useDebouncedSearch";
import AddBookingModal from "./AddBookingForm";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { User } from "@/types/user";
import { ERole } from "@/api/users/users";
import { MdCancel } from "react-icons/md";

export default function HostDashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const user = Cookies.get("loggedInUser") ? JSON.parse(Cookies.get("loggedInUser") as string) as User : null;
    const [page, setPage] = useState(1);
    const pageSize = 10; // Customize your page size
    const debouncedSearchQuery = useDebouncedValue(searchQuery, 300);
    const { data, isLoading: bookingsIsLoading } = useGetAllBookings(debouncedSearchQuery, page, pageSize);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
    const queryClient = useQueryClient();
    const bookingData = data?.data as Booking[] ?? [];
    const totalPages = data?.totalPages ?? 1;

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setPage(1); // Reset to first page when searching
    };
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const openCancelModal = (bookingId: string) => {
        setSelectedBookingId(bookingId);
        setShowCancelModal(true);
    };

    const closeCancelModal = () => {
        setSelectedBookingId(null);
        setShowCancelModal(false);
    };

    const openDeleteModal = (bookingId: string) => {
        setSelectedBookingId(bookingId);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setSelectedBookingId(null);
        setShowDeleteModal(false);
    };


    const openConfirmModal = (bookingId: string) => {
        setSelectedBookingId(bookingId);
        setShowConfirmModal(true);
    };

    const closeConfirmModal = () => {
        setSelectedBookingId(null);
        setShowConfirmModal(false);
    };

    const deleteMutation = useDeleteBookingMtn();
    const handleDelete = () => {
        if (!selectedBookingId) return;

        deleteMutation.mutate(selectedBookingId, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['all-bookings'] });
                toast.success('Booking deleted successfully!');
                closeDeleteModal();
            },
            onError: (error: unknown) => {
                const axiosError = error as AxiosError;
                const errorMessage =
                    axiosError.response?.data && typeof axiosError.response.data === 'object' && 'error' in axiosError.response.data
                        ? (axiosError.response.data as { error: string }).error
                        : axiosError.message || 'Failed to delete booking';
                toast.error(errorMessage);
            },
        });
    };


    const cancelMutation = useCancelBookingMtn();
    const handleCancel = () => {
        if (!selectedBookingId) return;

        cancelMutation.mutate(selectedBookingId, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['all-bookings'] });
                toast.success('Booking cancelled successfully!');
                closeCancelModal();
            },
            onError: (error: unknown) => {
                const axiosError = error as AxiosError;
                const errorMessage =
                    axiosError.response?.data && typeof axiosError.response.data === 'object' && 'error' in axiosError.response.data
                        ? (axiosError.response.data as { error: string }).error
                        : axiosError.message || 'Failed to cancel booking';
                toast.error(errorMessage);
            },
        });
    };


    const confirmMutation = useConfirmBookingMtn();
    const handleConfirm = () => {
        if (!selectedBookingId) return;

        confirmMutation.mutate(selectedBookingId, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['all-bookings'] });
                toast.success('Booking confirmed successfully!');
                closeConfirmModal();
            },
            onError: (error: unknown) => {
                const axiosError = error as AxiosError;
                const errorMessage =
                    axiosError.response?.data && typeof axiosError.response.data === 'object' && 'error' in axiosError.response.data
                        ? (axiosError.response.data as { error: string }).error
                        : axiosError.message || 'Failed to confirm booking';
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
                    <h1 className="text-2xl font-bold">Booking Management</h1>
                    <div className="relative my-4">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-80 h-11 pl-10 pr-5 py-2.5 text-base font-normal border border-gray-200 rounded-2xl placeholder-gray-500 focus:outline-none"
                            placeholder="Search for booking"
                        />
                    </div>
                </div>
                <button onClick={() => setIsModalOpen(true)}
                    className="px-6 py-3 bg-[#9CEE69] text-black font-semibold rounded-lg shadow-lg transition">
                    Add Booking
                </button>
                <AddBookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
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
                                    {["Property", "Location", "Check-In", "Check-Out", "Status", "Actions"].map((header) => (
                                        <th key={header} className="p-5 text-left text-sm font-semibold text-gray-900 capitalize">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                                {bookingData.map((booking) => (
                                    <motion.tr
                                        key={booking.id}
                                        variants={rowVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="bg-white hover:bg-gray-50"
                                    >
                                        <td className="p-5 text-sm font-medium text-gray-900">{booking.property?.title || "N/A"}</td>
                                        <td className="p-5 text-sm font-medium text-gray-900">{booking.property?.location || "N/A"}</td>
                                        <td className="p-5 text-sm font-medium text-gray-900">{booking.checkIn}</td>
                                        <td className="p-5 text-sm font-medium text-gray-900">{booking.checkOut}</td>
                                        <div className={`p-2 text-xs w-100 md:w-2/3 lg:w-2/3 items-center font-black rounded-full ${booking.status === BookingStatus.CONFIRMED ? "text-black bg-[#9CEE69]" : "text-white bg-yellow-600"}`}>
                                            <td>
                                                {booking.status}
                                            </td>
                                        </div>

                                        <td className="p-5 space-x-2">
                                            {/* <div className="flex flex-row space-x-2"> */}
                                                <button
                                                    onClick={() => booking.id && openDeleteModal(booking.id)}
                                                    className="p-2 rounded-full bg-red-700 text-white hover:bg-red-500 hover:text-black transition"
                                                >
                                                    <FaTrash />
                                                </button>
                                                <button
                                                    onClick={() => booking.id && openCancelModal(booking.id)}
                                                    className="p-2 text-xs flex space-x-4 items-center rounded-xl bg-yellow-500 text-black hover:bg-yellow-600 hover:text-white transition"
                                                >
                                                    Cancel <MdCancel />
                                                </button>

                                                {/* Confirm buttton if host */}
                                                {user?.role === ERole.HOST && booking.status === BookingStatus.PENDING && (
                                                    <button
                                                        onClick={() => booking.id && openConfirmModal(booking.id)}
                                                        className="p-3 flex space-x-2 items-center rounded-xl bg-[#9CEE69] text-black hover:text-black transition"
                                                    >
                                                        <p>  Confirm</p>  <FaCheck />
                                                    </button>
                                                )}
                                            {/* </div> */}
                                        </td>

                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

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
                        <p className="text-gray-600 mb-6">Are you sure you want to delete this booking? This action cannot be undone.</p>
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

            {/* Confirm Confirmation Modal */}
            {showConfirmModal && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Confirm Booking</h2>
                        <p className="text-gray-600 mb-6">Are you sure you want to confirm this booking? This action cannot be undone.</p>
                        <div className="flex justify-end gap-4">
                            <button onClick={closeConfirmModal} className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-black">
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirm}
                                disabled={confirmMutation.isPending}
                                className={`px-4 py-2 rounded-lg text-black ${confirmMutation.isPending ? "bg-gray-400" : "bg-[#9CEE69]"
                                    }`}
                            >
                                {confirmMutation.isPending ? "Canceling..." : "Cancel"}
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Cancel Confirmation Modal */}
            {showCancelModal && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Confirm Cancel</h2>
                        <p className="text-gray-600 mb-6">Are you sure you want to cancel this booking? This action cannot be undone.</p>
                        <div className="flex justify-end gap-4">
                            <button onClick={closeCancelModal} className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-black">
                                Cancel
                            </button>
                            <button
                                onClick={handleCancel}
                                disabled={cancelMutation.isPending}
                                className={`px-4 py-2 rounded-lg text-black ${cancelMutation.isPending ? "bg-gray-400" : "bg-[#9CEE69]"
                                    }`}
                            >
                                {cancelMutation.isPending ? "Canceling..." : "Cancel"}
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
