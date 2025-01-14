import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';

describe('CatsService', () => {
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatsService],
    }).compile();

    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', async () => {
    const catObj = { name: 'test', age: 1, breed: 'test' };
    expect(service).toBeDefined();
    expect(service.findAll()).toEqual('This action returns all cats');
    expect(service.findOne(1)).toEqual('This action returns a #1 cat');
    expect(service.remove(1)).toEqual('This action removes a #1 cat');
    expect(service.create(catObj)).toEqual(
      'This action adds a new cat with the following details: {"name":"test","age":1,"breed":"test"}',
    );
    expect(service.update(1, catObj)).toEqual(
      'This action updates a #1 cat with the following details: {"name":"test","age":1,"breed":"test"}',
    );

    const data = await service.externalFetch();
    expect(data).toBeDefined();
    expect(data).toHaveProperty('broad');
    expect(data.broad.length).toBeGreaterThanOrEqual(80);
  });
});
