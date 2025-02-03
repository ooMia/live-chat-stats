import { IsDateString, IsString } from 'class-validator';
import { Cat } from '../interfaces/cat.interface';

export class CreateCatDto {
  @IsString()
  public name: string;

  @IsDateString()
  public birthday: string;

  @IsString()
  public breed: string;

  toCat(): Cat {
    return {
      name: this.name,
      age: new Date().getFullYear() - new Date(this.birthday).getFullYear(),
      breed: this.breed,
    };
  }
}
