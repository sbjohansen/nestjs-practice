import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  JoinTable,
} from 'typeorm';

import { User } from './users.entity';
@Entity({ name: 'user_addresses' })
export class UserAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 0, type: 'float' })
  house: number;

  @Column({ length: 100 })
  city: string;

  @Column({ length: 100 })
  country: string;

  @Column({ default: 0 })
  apartment: number;

  @Column({ length: 100 })
  street: string;

  @ManyToOne((type) => User, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  user: User;
  @JoinTable({
    name: 'user_addresses',
    joinColumn: {
      name: 'addressId',
    },
    inverseJoinColumn: {
      name: 'userId',
    },
  })
  @JoinColumn({ name: 'userId' })
  userId: string;
}
