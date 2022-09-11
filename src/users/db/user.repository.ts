import { EntityRepository, Repository, In, DeleteResult } from 'typeorm';
import { User } from './users.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findUsersByName(names: string[]): Promise<User[]> {
    return this.find({
      where: {
        firstName: In(names),
      },
    });
  }

  deleteById(id: string): Promise<DeleteResult> {
    return this.delete({ id });
  }

  getUserById(id: string[]): Promise<User[]> {
    return this.find({
      where: {
        id: In(id),
      },
    });
  }
}
