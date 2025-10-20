import { UserDto } from "@auth/interfaces/userDto.interface";

export interface GuestUser {
  id: number;
  username: string;
  surname: string;
  telephone: string;
  user: UserDto;       // Referencia al usuario
}