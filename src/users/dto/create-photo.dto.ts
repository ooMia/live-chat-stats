import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Validate } from 'class-validator';
import { UserExistsValidator } from '../users.decorator';

export class CreatePhotoDto {
  @IsString()
  @ApiProperty({ example: 'https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg' })
  url: string;

  @IsNumber()
  @Validate(UserExistsValidator)
  @ApiProperty({ example: 1 })
  userId: number;
}
