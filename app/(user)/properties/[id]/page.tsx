'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const property = {
    id: 4,
    title: "Seaside Cottage",
    price: "220",
    image: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80",
    description:
        "Relax by the ocean in a charming seaside cottage, perfect for a peaceful getaway with stunning sunset views.",
    location: "Miami",
};

const ViewProductBooking = () => {
    const router = useRouter();
    const [checkIn, setCheckIn] = useState<Date | null>(null);
    const [checkOut, setCheckOut] = useState<Date | null>(null);

    const handleBooking = () => {
        if (!checkIn || !checkOut) {
            alert('Please select check-in and check-out dates');
            return;
        }
        // Navigate to booking confirmation (to be implemented with backend later)
        router.push(`/confirm-booking?propertyId=${property.id}&checkIn=${checkIn.toISOString()}&checkOut=${checkOut.toISOString()}`);
    };

    return (
        <div className="container mx-auto p-6 mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Property Image */}
                <div className="relative w-full h-96">
                    <Image
                        src={property.image}
                        alt={property.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                </div>

                {/* Property Details & Booking */}
                <div className="space-y-4">
                    <h1 className="text-3xl uppercase font-bold">{property.title}</h1>
                    <p className="text-gray-700">{property.description}</p>
                    <p className="text-lg font-semibold">📍 {property.location}</p>
                    <p className="text-xl font-black text-black">${property.price} / night</p>

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
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewProductBooking;
