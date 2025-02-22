// AddBookingModal.tsx
"use client"
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '@/api/properties/properties';
import { Property } from '@/types/property';
import { AxiosError } from 'axios';
import { Booking } from '@/types/booking';
import Cookies from 'js-cookie';
import { addBookProperty } from '@/api/bookings/bookings';
import { User } from '@/types/user';

export default function AddBookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const queryClient = useQueryClient();
    const user = Cookies.get("loggedInUser") ? JSON.parse(Cookies.get("loggedInUser") as string) as User : null;
    const [formData, setFormData] = useState({
        propertyId: '',
        checkIn: '',
        checkOut: '',
    });

    const { data: properties, isLoading } = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const res = await axios.get(`${API_BASE_URL}/properties`);
            return res.data;
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const { mutate: createBooking, isPending: createBookingIsLoading } = useMutation({
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['all-bookings'],
            });
            setFormData({ propertyId: '', checkIn: '', checkOut: '' });
            // Close the modal
            onClose();
            toast.success('Booking added successfully!');
        },
        onError(error: AxiosError) {
            const errorMessage = (error.response?.data && typeof error.response.data === 'object' && 'error' in error.response.data)
                ? (error.response.data as { error: string }).error
                : error.message || 'Failed to book property';
            toast.error(errorMessage);
        },
        mutationFn: (data: Booking) => {
            return addBookProperty(data);
        },
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user?.id) {
            toast.error("Please login first to book this property.");
            return;
        }
        const bookingData: Booking = {
            propertyId: formData.propertyId,
            checkIn: formData.checkIn,
            checkOut: formData.checkOut,
            renterId: user.id
        }
        createBooking(bookingData);
    };



    if (!isOpen) return null;

    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6">Add New Booking</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="propertyId" className="block text-sm font-medium text-gray-700">
                            Select Property
                        </label>
                        <select
                            id="propertyId"
                            name="propertyId"
                            value={formData.propertyId}
                            onChange={handleChange}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#9CEE69] focus:border-[#9CEE69]"
                        >
                            <option value="">Choose a property</option>
                            {isLoading ? (
                                <option disabled>Loading properties...</option>
                            ) : (
                                properties?.data?.map((property: Property) => (
                                    <option key={property.id} value={property.id}>
                                        {property.title}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">
                            Check-In Date
                        </label>
                        <input
                            type="date"
                            id="checkIn"
                            name="checkIn"
                            value={formData.checkIn}
                            onChange={handleChange}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#9CEE69] focus:border-[#9CEE69]"
                        />
                    </div>

                    <div>
                        <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">
                            Check-Out Date
                        </label>
                        <input
                            type="date"
                            id="checkOut"
                            name="checkOut"
                            value={formData.checkOut}
                            onChange={handleChange}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#9CEE69] focus:border-[#9CEE69]"
                        />
                    </div>

                    <div className="flex justify-end gap-4 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#9CEE69] text-black font-semibold rounded-lg hover:bg-[#7BCF4C] transition"
                        >
                            {createBookingIsLoading ? "Adding booking..." : "Add Booking"}
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}
