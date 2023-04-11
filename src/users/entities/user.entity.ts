import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserType } from '../types';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'int',
  })
  age: number;

  @Column({
    length: 100,
  })
  fullName: string;

  @Column()
  type: UserType;
}
