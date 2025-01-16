import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { LoggerMiddleware } from './logger/logger.middleware';
import { UserHttpModule } from './users/users-http.module';
import { CatsModule } from './cats/cats.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // https://docs.nestjs.com/techniques/configuration#getting-started
    // key exists in the runtime environment takes precedence
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production.local'
          : '.env',
      isGlobal: true,
      cache: true,
    }),
    UserHttpModule,
    // https://docs.nestjs.com/techniques/database
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.MYSQL_USER || 'test',
      password: process.env.MYSQL_PASSWORD || 'test',
      database: process.env.MYSQL_DATABASE || 'test',
      entities: [User],
      synchronize: true, // shouldn't be used in production - otherwise you can lose production data.
      autoLoadEntities: true,
      // etc... https://typeorm.io/data-source-options/
    }),
    CatsModule, // module which use library-specific approach should be imported last
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly dataSource: DataSource) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
