import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersModule } from './users.module';
import { UsersService } from './users.service';

import { PhotosModule } from './photos.module';
import { PhotosService } from './photos.service';
import { UserExistsValidator } from './users.decorator';

@Module({
  imports: [UsersModule, PhotosModule],
  // inject Repository into Service using the @InjectRepository() decorator
  providers: [UsersService, PhotosService, UserExistsValidator],
  controllers: [UsersController],
})
export class UserHttpModule {}
