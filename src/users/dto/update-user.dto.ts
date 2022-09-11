import { Roles } from '../enums/roles.enum';
import { UserAddress } from '../interfaces/user.interface';
import { IsNotEmpty, IsNumber } from 'class-validator';

export interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
  email?: string;
  dateOfBirth?: Date;
  address?: Array<UserAddress>;
  role?: Array<Roles>;
}

export class UpdateUserAddressDTO {
  @IsNotEmpty()
  country: string;
  @IsNotEmpty()
  city: string;
  @IsNotEmpty()
  street: string;
  @IsNotEmpty()
  @IsNumber()
  house: number;
  @IsNotEmpty()
  @IsNumber()
  apartment: number;
}
