import { Roles } from '../enums/roles.enum';
import { UserAddress } from '../interfaces/user.interface';

export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  address: Array<UserAddress>;
  role: Array<Roles>;
}
