import { Controller } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { ExternalUserDTO } from './dto/external-user.dto';
import { User } from './interfaces/user.interface';
import { Post, Delete, Put, Get, Body, Param } from '@nestjs/common';
import { UsersDataService } from './users-data.service';

@Controller('users')
export class UsersController {
  constructor(private userRepository: UsersDataService) {}

  @Post()
  addUser(@Body() _item_: CreateUserDTO): ExternalUserDTO {
    return this.userRepository.addUser(_item_);
  }

  mapUserToExternal(user: User): ExternalUserDTO {
    return {
      ...user,
    };
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): void {
    return this.userRepository.deleteUser(id);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() dto: UpdateUserDTO,
  ): ExternalUserDTO {
    return this.mapUserToExternal(this.userRepository.updateUser(id, dto));
  }

  @Get(':id')
  getUserById(@Param('id') id: string): ExternalUserDTO {
    return this.mapUserToExternal(this.userRepository.getUserById(id));
  }

  @Get() getAllUsers(): Array<ExternalUserDTO> {
    return this.userRepository.getAllUsers().map(this.mapUserToExternal);
  }
}
