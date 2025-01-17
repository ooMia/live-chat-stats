import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePhotoDto } from './dto/create-photo.dto';
import { Photo } from './entities/photo.entity';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private readonly photosRepository: Repository<Photo>,
  ) {}

  create(createPhotoDto: CreatePhotoDto): Promise<Photo> {
    const photo = Photo.fromDto(createPhotoDto);
    return this.photosRepository.save(photo);
  }

  async findAll(): Promise<Photo[]> {
    return this.photosRepository.find();
  }

  findOne(id: number): Promise<Photo | null> {
    Logger.log('Fetching one photo: controller');
    return this.photosRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.photosRepository.delete(id);
  }
}
