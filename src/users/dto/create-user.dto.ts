import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ example: 'John' })
  firstName: string;

  @IsString()
  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @IsString({ each: true })
  @ApiProperty({ example: ['https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg'] })
  profileUrls?: string[];
}
