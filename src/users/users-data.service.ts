import { Injectable } from '@nestjs/common';
import { CreateUserDTO, CreateUserAddressDTO } from './dto/create-user.dto';
import { UpdateUserDTO, UpdateUserAddressDTO } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UserRequireUniqueEmailException } from './exception/user-require-unique-email-exception';
import { UserRepository } from './db/user.repository';
import { UserAddressRepository } from './db/userAddress.repository';
import { User } from './db/users.entity';
import { UserAddress } from './db/userAddress.entity';
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

    const userToSave = new User();
    userToSave.firstName = _item_.firstName;
    userToSave.lastName = _item_.lastName;
    userToSave.email = _item_.email;
    userToSave.dateOfBirth = _item_.dateOfBirth;
    userToSave.address = await this.prepareUserAddressesToSave(_item_.address);
    userToSave.role = _item_.role;
    return this.userRepository.save(userToSave);
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
    for (const add of address) {
      const addressToSave = new UserAddress();

      addressToSave.country = add.country;
      addressToSave.city = add.city;
      addressToSave.street = add.street;
      addressToSave.house = add.house;
      addressToSave.apartment = add.apartment;

      addresses.push(await this.userAddressRepository.save(addressToSave));
    }

    return addresses;
  }
}
