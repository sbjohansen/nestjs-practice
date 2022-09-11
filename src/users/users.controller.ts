import {
  Post,
  Delete,
  Put,
  Get,
  Body,
  Param,
  ParseUUIDPipe,
  Controller,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { ExternalUserDTO } from './dto/external-user.dto';
import { User } from './db/users.entity';
import { UsersDataService } from './users-data.service';
import { CreateUserAddressDTO } from './dto/create-user.dto';
import { UpdateUserAddressDTO } from './dto/update-user.dto';
import { UserAddressRepository } from './db/userAddress.repository';
import { UserAddress } from './db/userAddress.entity';
@Controller('users')
export class UsersController {
  constructor(
    private userRepository: UsersDataService,
    private userAddressRepository: UserAddressRepository,
  ) {}

  @Post()
  async addUser(@Body() _item_: CreateUserDTO): Promise<ExternalUserDTO> {
    const user = await this.userRepository.addUser(_item_);
    return this.mapUserToExternal(user);
  }

  mapUserToExternal(user: User): ExternalUserDTO {
    return {
      ...user,
      role: user.role?.map((i) => i),
      address: this.prepareUserAddressesToSave(user.address),
    };
  }

  @Delete(':id')
  async deleteUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return this.userRepository.deleteUser(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() _item_: UpdateUserDTO,
  ): Promise<ExternalUserDTO> {
    return this.mapUserToExternal(
      await this.userRepository.updateUser(id, _item_),
    );
  }

  @Get(':id')
  async getUserById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ExternalUserDTO> {
    return this.mapUserToExternal(await this.userRepository.getUserById(id));
  }

  @Get() async getAllUsers(): Promise<ExternalUserDTO[]> {
    return (await this.userRepository.getAllUsers()).map((i) =>
      this.mapUserToExternal(i),
    );
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
