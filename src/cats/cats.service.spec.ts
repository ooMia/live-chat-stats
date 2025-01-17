import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

describe('CatsService', () => {
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatsService],
    }).compile();

    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', async () => {
    const catCreateDto = new CreateCatDto(
      'test',
      new Date().getFullYear() - 1 + '-01-01',
      'test',
    );
    expect(service.create(catCreateDto)).toEqual(
      'This action adds a new cat with the following details: {"name":"test","age":1,"breed":"test"}',
    );

    const catObj = { name: 'test', age: 1, breed: 'test' };
    expect(service).toBeDefined();
    expect(service.findAll()).toBeInstanceOf(Array);
    expect(service.findAll().length).toBeGreaterThanOrEqual(0);

    expect(service.findOne(1)).toEqual('This action returns a #1 cat');
    expect(service.remove(1)).toEqual('This action removes a #1 cat');

    expect(service.update(1, catObj)).toEqual(
      'This action updates a #1 cat with the following details: {"name":"test","age":1,"breed":"test"}',
    );

    const data = await service.externalFetch();
    expect(data).toBeDefined();
    expect(data).toHaveProperty('broad');
    expect(data.broad.length).toBeGreaterThanOrEqual(80);
  });
});
