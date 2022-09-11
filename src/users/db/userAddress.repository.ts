import { EntityRepository, Repository, In } from 'typeorm';
import { UserAddress } from './userAddress.entity';

@EntityRepository(UserAddress)
export class UserAddressRepository extends Repository<UserAddress> {
  findUserAddressesByStreet(streets: string[]): Promise<UserAddress[]> {
    return this.find({
      where: {
        street: In(streets),
      },
    });
  }
}
