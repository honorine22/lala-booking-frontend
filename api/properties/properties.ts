import axios, { AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Property } from "@/types/property";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
    const [key, value] = cookie.split('=');
    acc[key] = decodeURIComponent(value);
    return acc;
}, {} as Record<string, string>);

const token = cookies.authToken;

interface FetchParams {
    checkIn: string | null;
    checkOut: string | null;
}

// Update Property mutation
export const useUpdatePropertyMtn = () => {
    return useMutation({
        mutationKey: ["update-property"],
        mutationFn: async ({ bookingId, data }: { bookingId: string, data: Property }) => {
            if (!token) {
                toast.error("You need to login first to do this resource.");
                return;
            }

            const response = await axios.put(`${API_BASE_URL}/properties/${bookingId}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        },
    });
};

export const useGetAllProperties = (searchQuery: string, page: number, pageSize: number) => {
    return useQuery({
        queryKey: ["all-properties", searchQuery, page, pageSize],
        queryFn: async () => {
            const response = await axios.get(`${API_BASE_URL}/properties`, {
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

// use get property by id
export const useGetPropertyId = (propertyId: string) => {
    return useQuery({
        queryKey: ["property-id"],
        queryFn: async () =>
            (await axios.get(`${API_BASE_URL}/properties/${propertyId}`)).data,
    })
}

export const useAvailableProperties = ({ checkIn, checkOut }: FetchParams) => {
    return useQuery({
        queryKey: ["availableProperties", checkIn, checkOut],
        queryFn: async () =>
            (await axios.get(`${API_BASE_URL}/properties/available`, { params: { checkIn, checkOut } })).data,
        enabled: !!checkIn && !!checkOut, // Only fetch when both params are present
    });
};


// Delete Booking
export const useDeletePropertyMtn = () => {
    return useMutation({
        mutationKey: ["delete-property"],
        mutationFn: async (propertyId: string) => {
            if (!token) {
                toast.error("You need to login first to do this resource.");
                return;
            }

            const response = await axios.delete(`${API_BASE_URL}/properties/${propertyId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        },
    });
};

export const addProperty = async (propertyData: Property) => {

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
        const response = await axios.post(`${API_BASE_URL}/properties`, propertyData, {
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