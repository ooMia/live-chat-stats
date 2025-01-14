import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  HttpCode,
  Header,
  Redirect,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Request, Response } from 'express';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // https://docs.nestjs.com/controllers#status-code
  // status code 200 by default, except for POST which is 201
  @Post()
  @HttpCode(201)
  create(
    @Body() createCatDto: CreateCatDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    this.catsService.create(createCatDto);
    // https://docs.nestjs.com/controllers#routing
    // https://docs.nestjs.com/controllers#request-object
    // res.status overrides the decorator's status code
    return res.status(200).json({
      message: 'success',
      host: req.host,
      data: createCatDto,
    });
  }

  // https://docs.nestjs.com/controllers#redirection
  // cannot be routed if this method comes after findAll
  @Get('redirect')
  @Redirect('https://nestjs.com', 301)
  redirect() {
    return;
  }

  // https://docs.nestjs.com/controllers#route-wildcards
  // empty or non-numeric string
  @Get('^$|[^0-9]')
  findAll() {
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
