import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { Photo } from './photo.entity';

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

  @OneToMany(() => Photo, (photo) => photo.owner, {
    cascade: ['insert'],
  })
  photos: Photo[];

  static fromDto(dto: CreateUserDto): User {
    const user = new User();
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;

    user.photos = dto.profileUrls?.map((url) => {
      return Photo.fromDto({ url, userId: user.id });
    });
    return user;
  }
}
