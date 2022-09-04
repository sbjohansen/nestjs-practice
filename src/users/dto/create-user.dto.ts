import { Roles } from '../enums/roles.enum';
import { UserAddress } from '../interfaces/user.interface';
import { Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  ValidateNested,
  IsNumber,
  IsEnum,
} from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
  dateOfBirth: Date;
  @Type(() => CreateUserAddressDTO)
  address: Array<UserAddress>;
  @IsEnum(Roles)
  role: Array<Roles>;
}

export class CreateUserAddressDTO {
  @IsNotEmpty()
  street: string;
  @IsNotEmpty()
  city: string;
  @IsNotEmpty()
  @IsNumber()
  house: string;
  @IsNotEmpty()
  @IsNumber()
  apartment: string;
  @IsNotEmpty()
  country: string;
}
