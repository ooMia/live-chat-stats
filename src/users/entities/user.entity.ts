import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// https://typeorm.io/entities/
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}
