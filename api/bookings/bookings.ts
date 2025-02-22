import { useQuery, useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "../properties/properties";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Booking, BookingStatus } from "@/types/booking";

const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
    const [key, value] = cookie.split('=');
    acc[key] = decodeURIComponent(value);
    return acc;
}, {} as Record<string, string>);

const token = cookies.authToken;

export const useGetAllBookings = (searchQuery: string, page: number, pageSize: number) => {
    return useQuery({
        queryKey: ["all-bookings", searchQuery, page, pageSize],
        queryFn: async () => {
            if (!token) {
                toast.error("You need to login first to access this resource.");
                return;
            }

            const response = await axios.get(`${API_BASE_URL}/bookings`, {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    search: searchQuery,
                    page,
                    pageSize
                }
            });

            return response.data;
        },
    });
};

export const useGetBookingId = (bookingId: string) => {
    return useQuery({
        queryKey: ["booking-id"],
        queryFn: async () =>
            (await axios.get(`${API_BASE_URL}/bookings/${bookingId}`)).data,
    });
};

// Delete Booking
export const useDeleteBookingMtn = () => {
    return useMutation({
        mutationKey: ["delete-booking"],
        mutationFn: async (bookingId: string) => {
            if (!token) {
                toast.error("You need to login first to do this resource.");
                return;
            }

            const response = await axios.delete(`${API_BASE_URL}/bookings/${bookingId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        },
    });
};

export const addBookProperty = async (bookingData: Booking) => {

    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
        const [key, value] = cookie.split('=');
        acc[key] = decodeURIComponent(value);
        return acc;
    }, {} as Record<string, string>);
    const token = cookies.authToken;

    if (!token) {
        throw new Error("Unauthorized: No token provided");
    }

    try {
        const response = await axios.post(`${API_BASE_URL}/bookings`, bookingData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error: unknown) {
        if ((error as AxiosError).response?.status === 401) {
            throw new Error("Session expired. Please log in again.");
        }
        throw error;
    }
};

// Update Booking with cancel status
export const useCancelBookingMtn = () => {
    return useMutation({
        mutationKey: ["cancel-booking"],
        mutationFn: async (bookingId: string) => {
            if (!token) {
                toast.error("You need to login first to do this resource.");
                return;
            }
            // send cancel status
            const data = { status: BookingStatus.CANCELED };
            const response = await axios.put(`${API_BASE_URL}/bookings/${bookingId}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        },
    });
};

// Confirm 
export const useConfirmBookingMtn = () => {
    return useMutation({
        mutationKey: ["confirm-booking"],
        mutationFn: async (bookingId: string) => {
            if (!token) {
                toast.error("You need to login first to do this resource.");
                return;
            }
            // send cancel status
            const data = { status: BookingStatus.CONFIRMED };
            const response = await axios.put(`${API_BASE_URL}/bookings/${bookingId}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        },
    });
};


