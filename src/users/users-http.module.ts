import { Module } from '@nestjs/common';
import { UsersModule } from './users.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [UsersModule],
  // inject the UsersRepository into the UsersService using the @InjectRepository() decorator
  providers: [UsersService],
  controllers: [UsersController],
})
export class UserHttpModule {}
