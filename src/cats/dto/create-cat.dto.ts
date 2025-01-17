import { Cat } from '../interfaces/cat.interface';

export class CreateCatDto {
  name: string;
  birthday: Date; // 2024-01-01
  breed: string;

  constructor(name: string, birthday: string, breed: string) {
    this.name = name;
    this.birthday = new Date(birthday);
    this.breed = breed;
  }

  toCat(): Cat {
    return {
      name: this.name,
      age: new Date().getFullYear() - this.birthday.getFullYear(),
      breed: this.breed,
    };
  }
}
