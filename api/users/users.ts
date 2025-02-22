import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../properties/properties";
import axios from "axios";

const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
    const [key, value] = cookie.split('=');
    acc[key] = decodeURIComponent(value);
    return acc;
}, {} as Record<string, string>);

const token = cookies.authToken;

export enum ERole {
    HOST = 'HOST',
    RENTER = 'RENTER',
}
// get users
export const useGetAllUsers = (searchQuery: string) => {
    return useQuery({
        queryKey: ["all-users", searchQuery],
        queryFn: async () => {
            if (!token) {
                toast.error("You need to login first to access this resource.");
                return;
            }

            const response = await axios.get(`${API_BASE_URL}/users`, {
                headers: { Authorization: `Bearer ${token}` }, params: {
                    search: searchQuery
                }
            });

            return response.data;
        },
    });
};


interface UserRole {
    role: string;
}

// Edit user
export const useUpdateUserMtn = () => {
    return useMutation({
        mutationKey: ["update-user"],
        mutationFn: async ({ bookingId, data }: { bookingId: string, data: UserRole }) => {
            if (!token) {
                toast.error("You need to login first to do this resource.");
                return;
            }

            const response = await axios.put(`${API_BASE_URL}/users/${bookingId}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        },
    });
};

// Edit user

