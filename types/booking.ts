import { Property } from "./property";

export enum BookingStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    CANCELED = "CANCELED",
}

export interface Booking {
    id?: string;
    checkIn: string;
    checkOut: string;
    propertyId: string;
    renterId: string;
    property?: Property
    status?: BookingStatus
}