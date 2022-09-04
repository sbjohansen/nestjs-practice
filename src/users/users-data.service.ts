import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { ExternalUserDTO } from './dto/external-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersDataService {
  private users: Array<User> = [];

  addUser(_item_: CreateUserDTO): ExternalUserDTO {
    const user: User = {
      ..._item_,
      id: uuidv4(),
    };
    this.users.push(user);
    return {
      ...user,
    };
  }

  deleteUser(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }

  updateUser(id: string, dto: UpdateUserDTO): User {
    const user = this.getUserById(id);
    const index = this.users.findIndex((item) => item.id === id);
    this.users[index] = { ...user, ...dto };
    return this.users[index];
  }

  getUserById(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  getAllUsers(): Array<User> {
    return this.users;
  }
}
