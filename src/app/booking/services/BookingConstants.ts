import { environment } from "src/environments/environment";

export class BookingConstants {

    static API_URL = environment.baseUrl;
    static BOOKING_ENDPOINT = `${BookingConstants.API_URL}${environment.booking}`;

    static GET_ALL_BOOKINGS = `${BookingConstants.BOOKING_ENDPOINT}/reservations`;
    static GET_BOOKINGS_BY_DATE = `${BookingConstants.BOOKING_ENDPOINT}/reservationsByDate`;

    static CREATE_RESERVATION = `${BookingConstants.BOOKING_ENDPOINT}/createReservation`;

}