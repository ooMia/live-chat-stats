import { Test, TestingModule } from '@nestjs/testing';
import { AppController, CatsController } from './app.controller';
import { AppService, CatsService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});

describe('CatsController', () => {
  let catsController: CatsController;

  beforeEach(async () => {
    const cats: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    catsController = cats.get<CatsController>(CatsController);
  });

  describe('cats', () => {
    it('should return "Hello World!"', () => {
      expect(catsController.findAll()).toBe('This action returns all cats');
    });
  });
});
