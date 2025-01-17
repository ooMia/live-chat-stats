import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { BroadResponse } from './entities/broad.entity';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  // https://docs.nestjs.com/fundamentals/custom-providers#di-fundamentals
  constructor(private readonly catsService: CatsService) {}

  // https://docs.nestjs.com/controllers#status-code
  // status code 200 by default, except for POST which is 201
  @Post()
  @HttpCode(201)
  async create(
    @Body() createCatDto: CreateCatDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    this.catsService.create(createCatDto);
    // https://docs.nestjs.com/controllers#routing
    // https://docs.nestjs.com/controllers#request-object
    // https://docs.nestjs.com/controllers#library-specific-approach
    // res.status overrides the decorator's status code
    // should respond when using res as a param
    return res.status(HttpStatus.CREATED).json({
      message: 'CREATED',
      host: req.host,
      data: createCatDto,
    });
  }

  // https://docs.nestjs.com/controllers#redirection
  // https://docs.nestjs.com/controllers#route-parameters
  // cannot be routed when it comes after findAll
  // Routes with parameters should be declared after any static paths. This prevents the parameterized paths from intercepting traffic destined for the static paths.
  @Get('redirect')
  @Redirect('https://nestjs.com', 301)
  redirect() {
    return;
  }

  @Get('fetch')
  async externalFetch(
    @Res({
      passthrough: true,
    })
    res: Response,
  ): Promise<BroadResponse> {
    // https://docs.nestjs.com/controllers#library-specific-approach
    res.status(HttpStatus.OK);
    return await this.catsService.externalFetch();
  }

  // https://docs.nestjs.com/controllers#route-wildcards
  // empty or non-numeric string
  @Get('^$|[^0-9]')
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  // https://docs.nestjs.com/controllers#headers
  @Get(':id')
  @Header('Cache-Control', 'proxy-revalidate')
  findOne(@Param('id') id: string) {
    return this.catsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(+id);
  }
}
