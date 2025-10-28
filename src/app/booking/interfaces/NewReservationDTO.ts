import { BookingFilter } from "./BookingFilter";
import { GuestUser } from "./QuestUser";

export interface NewReservationDTO extends BookingFilter {
    players?: GuestUser[];
}