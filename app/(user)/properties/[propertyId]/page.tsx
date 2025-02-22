'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useGetPropertyId } from '@/api/properties/properties';
import Loader from '@/app/components/Loader';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Booking } from '@/types/booking';
import Cookies from 'js-cookie';
import { User } from '@/types/user';
import SimpleNavbar from '@/app/components/SimpleNavbar';
import { AxiosError } from 'axios';
import { addBookProperty } from '@/api/bookings/bookings';

const ViewProductBooking = () => {
    const params = useParams();
    const router = useRouter();
    const queryClient = useQueryClient();
    const propertyId = params.propertyId as string;
    const [checkIn, setCheckIn] = useState<Date | null>(null);
    const user = Cookies.get("loggedInUser") ? JSON.parse(Cookies.get("loggedInUser") as string) as User : null;
    const [checkOut, setCheckOut] = useState<Date | null>(null);

    const { data: propertyData, isLoading } = useGetPropertyId(propertyId);

    const { mutate: createBooking, isPending: createBookingIsLoading } = useMutation({
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['all-bookings'],
            });
            toast.success('Booking added successfully!');
            router.push('/bookings');
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

    const handleBooking = () => {
        if (!checkIn || !checkOut) {
            toast.error("Please select check-in and check-out dates");
            return;
        }

        if (!user?.id) {
            toast.error("Please login first to book this property.");
            return;
        }

        // Prepare booking data
        const bookingData: Booking = {
            propertyId: propertyData.id,
            checkIn: checkIn.toISOString(),
            checkOut: checkOut.toISOString(),
            renterId: user.id,
        };

        // Call the mutation
        createBooking(bookingData);
    };

    return (
        <>
            <SimpleNavbar />
            <div className="container mx-auto p-6 mt-20">
                {isLoading && <Loader />}
                {!isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        {/* Property Image */}
                        <div className="relative w-full h-96">
                            <Image
                                src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                                alt={propertyData.title}
                                unoptimized
                                layout="fill"
                                fill
                                sizes="100vw"
                                objectFit="cover" // Ensures the image covers the container
                            />
                        </div>

                        {/* Property Details & Booking */}
                        <div className="space-y-4">
                            <h1 className="text-3xl uppercase font-bold">{propertyData.title}</h1>
                            <p className="text-gray-700">{propertyData.description}</p>
                            <p className="text-lg font-semibold">📍 {propertyData.location}</p>
                            <p className="text-xl font-black text-black">${propertyData.price} / night</p>

                            {/* Check-in & Check-out Date Pickers */}
                            <div className="flex flex-col gap-3">
                                <label className="font-medium">Check-in Date:</label>
                                <DatePicker
                                    selected={checkIn}
                                    onChange={(date) => setCheckIn(date)}
                                    className="border p-2 rounded w-full"
                                    minDate={new Date()}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="font-medium">Check-out Date:</label>
                                <DatePicker
                                    selected={checkOut}
                                    onChange={(date) => setCheckOut(date)}
                                    className="border p-2 rounded w-full"
                                    minDate={checkIn || new Date()}
                                />
                            </div>

                            {/* Book Now Button */}
                            <button
                                onClick={handleBooking}
                                className="mt-4 bg-[#9CEE69] text-black px-6 py-3 rounded-lg font-bold"
                            >
                                {createBookingIsLoading ? "Booking..." : "Book Now"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ViewProductBooking;
