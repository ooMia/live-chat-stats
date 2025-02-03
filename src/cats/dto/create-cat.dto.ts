import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';
import { Cat } from '../interfaces/cat.interface';

export class CreateCatDto {
  @IsString()
  @ApiProperty({ example: 'Kitty' })
  public name: string;

  @IsDateString()
  @ApiProperty({ example: '2015-04-04' })
  public birthday: string;

  @IsString()
  @ApiProperty({ example: 'Persian' })
  public breed: string;

  toCat(): Cat {
    return {
      name: this.name,
      age: new Date().getFullYear() - new Date(this.birthday).getFullYear(),
      breed: this.breed,
    };
  }
}
