import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

// https://docs.nestjs.com/techniques/database#repository-pattern
@Module({
  // uses the forFeature() method to define which repositories are registered in the current scope
  imports: [TypeOrmModule.forFeature([User])],
  // re-export the providers to use the repository outside of the module which imports TypeOrmModule.forFeature
  exports: [TypeOrmModule],
})
export class UsersModule {}
