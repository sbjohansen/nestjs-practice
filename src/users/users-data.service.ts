import { Injectable } from '@nestjs/common';
import { CreateUserDTO, CreateUserAddressDTO } from './dto/create-user.dto';
import { UpdateUserDTO, UpdateUserAddressDTO } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UserRequireUniqueEmailException } from './exception/user-require-unique-email-exception';
import { UserRepository } from './db/user.repository';
import { UserAddressRepository } from './db/userAddress.repository';
import { User } from './db/users.entity';
import { UserAddress } from './db/userAddress.entity';
import { Logger } from '@nestjs/common';
import { Connection } from 'typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class UsersDataService {
  constructor(
    private userRepository: UserRepository,
    private userAddressRepository: UserAddressRepository,
    private connection: Connection,
  ) {}

  private users: Array<User> = [];

  async addUser(user: CreateUserDTO): Promise<User> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const userToSave = new User();

      userToSave.firstName = user.firstName;
      userToSave.lastName = user.lastName;
      userToSave.email = user.email;
      userToSave.role = user.role;
      userToSave.dateOfBirth = user.dateOfBirth;

      userToSave.address = await this.prepareUserAddressesToSave(
        user.address,
        manager.getCustomRepository(UserAddressRepository),
      );

      return await manager.getCustomRepository(UserRepository).save(userToSave);
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async deleteUser(id: string): Promise<void> {
    this.userRepository.delete(id);
  }

  async updateUser(id: string, user: UpdateUserDTO): Promise<User> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const userToUpdate = await manager
        .getCustomRepository(UserRepository)
        .findOne(id);

      userToUpdate.firstName = user.firstName;
      userToUpdate.lastName = user.lastName;
      userToUpdate.email = user.email;
      userToUpdate.role = user.role;
      userToUpdate.dateOfBirth = user.dateOfBirth;

      userToUpdate.address = await this.prepareUserAddressesToSave(
        user.address,
        manager.getCustomRepository(UserAddressRepository),
      );

      return await manager
        .getCustomRepository(UserRepository)
        .save(userToUpdate);
    });
  }

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async prepareUserAddressesToSave(
    address: CreateUserAddressDTO[] | UpdateUserAddressDTO[],
    userAddressRepository: UserAddressRepository,
  ): Promise<UserAddress[]> {
    const userAddressesToSave: UserAddress[] = [];

    for (const addressItem of address) {
      const userAddressToSave = new UserAddress();

      userAddressToSave.house = addressItem.house;
      userAddressToSave.city = addressItem.city;
      userAddressToSave.country = addressItem.country;
      userAddressToSave.apartment = addressItem.apartment;
      userAddressToSave.street = addressItem.street;

      userAddressesToSave.push(userAddressToSave);
    }

    return userAddressesToSave;
  }
}
