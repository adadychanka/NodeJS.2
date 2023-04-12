import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  And,
  Equal,
  FindOptionsWhere,
  ILike,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersSearchQuery } from './types';
import { isUserHasValidType } from './utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = { ...createUserDto };

    const createdUser = this.userRepository.create(user);
    return this.userRepository.save(createdUser);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({ take: 100 });

    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.find({
      where: { id },
    });

    return user;
  }

  async search(query: UsersSearchQuery): Promise<User[]> {
    const { fullName, minAge, maxAge, type } = query;

    let findOption: FindOptionsWhere<User> = {};

    if (fullName) {
      findOption = {
        ...findOption,
        fullName: ILike(`${fullName}%`),
      };
    }

    if (minAge) {
      findOption = {
        ...findOption,
        age: MoreThanOrEqual(minAge),
      };
    }

    if (maxAge) {
      findOption = {
        ...findOption,
        age: LessThanOrEqual(maxAge),
      };
    }

    if (minAge && maxAge) {
      findOption = {
        ...findOption,
        age: And(MoreThanOrEqual(minAge), LessThanOrEqual(maxAge)),
      };
    }

    if (type) {
      if (!isUserHasValidType(type)) {
        return [];
      }

      findOption = {
        ...findOption,
        type: Equal(type),
      };
    }

    const users = await this.userRepository.find({
      where: findOption,
    });

    return users;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { id: userId, ...fieldsToUpdate } = updateUserDto;

    await this.userRepository.update(id, fieldsToUpdate);
    const updatedUser = await this.userRepository.findOne({ where: { id } });

    return updatedUser;
  }

  async remove(id: string) {
    const userToRemove = await this.userRepository.findOne({ where: { id } });

    await this.userRepository.delete(id);

    return userToRemove;
  }
}
