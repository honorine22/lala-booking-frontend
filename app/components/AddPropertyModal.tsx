"use client"
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { addProperty } from '@/api/properties/properties';
import { Property } from '@/types/property';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { User } from '@/types/user';

export default function AddPropertyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const queryClient = useQueryClient();
    const user = Cookies.get("loggedInUser") ? JSON.parse(Cookies.get("loggedInUser") as string) as User : null;
    const [formData, setFormData] = useState({
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

    const { mutate: createProperty, isPending: createPropertyIsLoading } = useMutation({
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['all-properties'],
            });
            // Close the modal
            onClose();
            toast.success('Property added successfully!');

            setFormData({ title: '', description: "", price: 0, location: '' });
        },
        onError(error: AxiosError) {
            const errorMessage = (error.response?.data && typeof error.response.data === 'object' && 'error' in error.response.data)
                ? (error.response.data as { error: string }).error
                : error.message || 'Failed to add property';
            toast.error(errorMessage);
        },
        mutationFn: (data: Property) => {
            return addProperty(data);
        },
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user?.id) {
            toast.error("Please login first to add this property.");
            return;
        }
        const propertyData: Property = {
            title: formData.title,
            description: formData.description,
            price: formData.price,
            location: formData.location,
            hostId: user.id
        }
        createProperty(propertyData);
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
                <h2 className="text-2xl font-bold mb-6">Add New Property</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                            {createPropertyIsLoading ? "Adding property..." : "Add Property"}
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}
