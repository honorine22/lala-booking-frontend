import { User } from "./user";

// Property Details & Booking
export interface Property {
    id?: string;
    title: string;
    description: string;
    location: string;
    price: number;
    image?: string;
    hostId?: string;
    host?: User
}