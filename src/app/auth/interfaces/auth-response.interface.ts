import { UserDto } from './userDto.interface';

export interface AuthResponse {
  user: UserDto;
  token: string;
}
