import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersModule } from './users.module';
import { UsersService } from './users.service';

import { PhotosModule } from './photos.module';
import { PhotosService } from './photos.service';

@Module({
  imports: [UsersModule, PhotosModule],
  // inject Repository into Service using the @InjectRepository() decorator
  providers: [UsersService, PhotosService],
  controllers: [UsersController],
})
export class UserHttpModule {}
