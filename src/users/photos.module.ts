import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';

// https://docs.nestjs.com/techniques/database#repository-pattern
@Module({
  // uses the forFeature() method to define which repositories are registered in the current scope
  imports: [TypeOrmModule.forFeature([Photo])],
  // re-export the providers to use the repository outside of the module which imports TypeOrmModule.forFeature
  exports: [TypeOrmModule],
})
export class PhotosModule {}
