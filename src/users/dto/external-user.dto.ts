import { Roles } from '../enums/roles.enum';

export interface ExternalUserDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  address?: Array<ExternalUserAddress>;
  role: Roles[];
}

export interface ExternalUserAddress {
  house: number;
  city: string;
  country: string;
  apartment: number;
  street: string;
}
