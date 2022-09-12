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

@Injectable()
export class UsersDataService {
  constructor(
    private userRepository: UserRepository,
    private userAddressRepository: UserAddressRepository,
  ) {}

  private users: Array<User> = [];

  async addUser(_item_: CreateUserDTO): Promise<User> {
    const checkEmail = this.getUserByEmail(_item_.email);
    /*if (checkEmail) {
      throw new UserRequireUniqueEmailException();
    } */

    console.log(_item_.address);

    const user = new User();
    user.firstName = _item_.firstName;
    user.lastName = _item_.lastName;
    user.email = _item_.email;
    user.dateOfBirth = _item_.dateOfBirth;
    user.role = _item_.role;
    user.address = _item_.address;
    return this.userRepository.save(user);
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async deleteUser(id: string): Promise<void> {
    this.userRepository.delete(id);
  }

  async updateUser(id: string, _item_: UpdateUserDTO): Promise<User> {
    const userToUpdate = await this.getUserById(id);

    userToUpdate.firstName = _item_.firstName;
    userToUpdate.lastName = _item_.lastName;
    userToUpdate.email = _item_.email;
    userToUpdate.dateOfBirth = _item_.dateOfBirth;
    userToUpdate.address = await this.prepareUserAddressesToSave(
      _item_.address,
    );
    userToUpdate.role = _item_.role;

    await this.userRepository.save(userToUpdate);

    return this.getUserById(id);
  }

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async prepareUserAddressesToSave(
    address: CreateUserAddressDTO[] | UpdateUserAddressDTO[],
  ): Promise<UserAddress[]> {
    const addresses: UserAddress[] = [];
    console.log(address);
    for (const addressItem of address) {
      const addressToSave = new UserAddress();
      addressToSave.street = addressItem.street;
      addressToSave.city = addressItem.city;
      addressToSave.house = addressItem.house;
      addressToSave.country = addressItem.country;
      addressToSave.apartment = addressItem.apartment;
      addresses.push(addressToSave);
    }

    return addresses;
  }
}
