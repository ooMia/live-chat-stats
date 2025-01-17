import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CreatePhotoDto } from '../dto/create-photo.dto';
import { User } from './user.entity';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    transformer: {
      to: (value: string) => encodeURIComponent(value),
      from: (value: string) => decodeURIComponent(value),
    },
  })
  url: string;

  // @ManyToOne(() => User, (user) => user.photos)
  // owner: User | null;
  @ManyToOne(() => User, (user) => user.photos, { lazy: true })
  owner: Promise<User>;

  static fromDto(dto: CreatePhotoDto): Photo {
    const photo = new Photo();
    photo.url = dto.url;

    return photo;
  }
}
