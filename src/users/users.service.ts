import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  private users: UpdateUserDto[] = [];

  create(createUserDto: CreateUserDto) {
    const user: UpdateUserDto = { ...createUserDto, id: uuid() };

    this.users.push(user);

    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find((user) => user.id === id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const indexOfUserToUpdate = this.users.findIndex((user) => user.id === id);

    if (indexOfUserToUpdate === -1) {
      return null;
    }

    const userToUpdate = this.users[indexOfUserToUpdate];
    const updatedUser: UpdateUserDto = { ...userToUpdate, ...updateUserDto };

    this.users.splice(indexOfUserToUpdate, 1, updatedUser);

    return updatedUser;
  }

  remove(id: string) {
    const userToRemove = this.users.find((user) => user.id === id);

    if (!userToRemove) {
      return null;
    }

    this.users = this.users.filter((user) => user.id !== id);

    return userToRemove;
  }
}
