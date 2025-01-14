import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  create(createCatDto: CreateCatDto) {
    return `This action adds a new cat with the following details: ${JSON.stringify(createCatDto)}`;
  }

  findAll() {
    return `This action returns all cats`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cat`;
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat with the following details: ${JSON.stringify(updateCatDto)}`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }

  async externalFetch() {
    const timestamp = Date.now();
    const url = `https://static.file.sooplive.co.kr/pc/ko_KR/main_broad_list_with_adult_json.js?${timestamp}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
}
