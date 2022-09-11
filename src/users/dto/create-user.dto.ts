import { Roles } from '../enums/roles.enum';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';

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
  address?: CreateUserAddressDTO[];
  @IsEnum(Roles)
  role: Array<Roles>;
}

export class CreateUserAddressDTO {
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
