import { UserType } from '../types';

export class CreateUserDto {
  age: number;
  fullName: string;
  type: UserType;
}
