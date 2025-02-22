"use client";

import { FaEdit, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useDebouncedValue } from "@/app/lib/useDebouncedSearch";
import TableSkeletonLoader from "@/app/components/TableSkeleton";
import { ERole, useGetAllUsers, useUpdateUserMtn } from "@/api/users/users";
import { User } from "@/types/user";
import SimpleNavbar from "@/app/components/SimpleNavbar";
import Cookies from "js-cookie";

export default function UsersDashboard() {
    const [searchQuery, setSearchQuery] = useState("");
    const loggedInUser = Cookies.get("loggedInUser") ? JSON.parse(Cookies.get("loggedInUser") as string) as User : null;
    const [role, setRole] = useState('');
    const debouncedSearchQuery = useDebouncedValue(searchQuery, 300);
    const { data, isLoading: usersIsLoading } = useGetAllUsers(debouncedSearchQuery);

    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const queryClient = useQueryClient();
    const userData = data as User[] ?? [];

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };
    const openModal = (bookingId: string) => {
        setSelectedUserId(bookingId);
        setShowModal(true);
    };

    const handleUserRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRole(e.target.value);
    };

    const closeModal = () => {
        setSelectedUserId(null);
        setShowModal(false);
    };

    const mutation = useUpdateUserMtn();
    const handleEditUser = () => {
        if (!selectedUserId) return;

        mutation.mutate({ bookingId: selectedUserId, data: { role: role } }, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['all-users'] });
                toast.success('User updated successfully!');
                closeModal();
            },
            onError: (error: unknown) => {
                const axiosError = error as AxiosError;
                const errorMessage =
                    axiosError.response?.data && typeof axiosError.response.data === 'object' && 'error' in axiosError.response.data
                        ? (axiosError.response.data as { error: string }).error
                        : axiosError.message || 'Failed to update user';
                toast.error(errorMessage);
            },
        });
    };

    const rowVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };

    return (
        <>
            <SimpleNavbar />
            <div className="flex flex-col mx-auto max-w-screen-xl mt-8">
                {/* Header */}
                <div className="flex justify-between items-center my-2">
                    <div>
                        <h1 className="text-2xl font-bold">User Management</h1>
                        <div className="relative my-4">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="w-80 h-11 pl-10 pr-5 py-2.5 text-base font-normal border border-gray-200 rounded-2xl placeholder-gray-500 focus:outline-none"
                                placeholder="Search users..."
                            />
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="shadow-md rounded-xl p-6 bg-white">
                    <div className="overflow-x-auto">
                        {usersIsLoading ? (
                            <TableSkeletonLoader />
                        ) : (
                            <table className="min-w-full rounded-xl">
                                <thead>
                                    <tr className="bg-zinc-100">
                                        {["Name", "Email", "Role", "Actions"].map((header) => (
                                            <th key={header} className="p-5 text-left text-sm font-semibold text-gray-900 capitalize">
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-100">
                                    {userData.map((user) => (
                                        <motion.tr
                                            key={user.id}
                                            variants={rowVariants}
                                            initial="hidden"
                                            animate="visible"
                                            className="bg-white hover:bg-gray-50"
                                        >
                                            <td className="p-5 text-sm font-medium text-gray-900">{user.name || "N/A"}</td>
                                            <td className="p-5 text-sm font-medium text-gray-900">{user.email || "N/A"}</td>
                                            <div className={`p-2 w-100 md:w-1/2 lg:w-1/2 items-center text-sm font-black rounded-full ${user.role === ERole.HOST ? "text-black bg-[#9CEE69]" : "text-white bg-yellow-600"}`}>
                                                <td>
                                                    {user.role}
                                                </td>
                                            </div>

                                            {loggedInUser?.role === ERole.HOST && (
                                                <td className="p-5">
                                                    <button
                                                        onClick={() => user.id && openModal(user.id)}
                                                        className="p-2 rounded-full bg-[#9CEE69] text-black hover:bg-white hover:text-black transition"
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                </td>
                                            )}
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
                {/* Delete Confirmation Modal */}
                {showModal && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            {/* Role select input */}
                            <div className="mb-4">
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                    Role
                                </label>
                                <select
                                    id="role"
                                    onChange={handleUserRoleChange}
                                    value={role}
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#9CEE69] focus:border-[#9CEE69]"
                                >
                                    <option value={ERole.HOST}>Host</option>
                                    <option value={ERole.RENTER}>Renter</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-4">
                                <button onClick={closeModal} className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-black">
                                    Cancel
                                </button>
                                <button
                                    onClick={handleEditUser}
                                    disabled={mutation.isPending}
                                    className={`px-4 py-2 rounded-lg text-black ${mutation.isPending ? "bg-gray-400" : "bg-[#9CEE69]"
                                        }`}
                                >
                                    {mutation.isPending ? "Updating..." : "Update"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </>
    );
}
