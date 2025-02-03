import { Injectable, SetMetadata } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from './users.service';

export const Users = (...args: string[]) => SetMetadata('users', args);

@ValidatorConstraint({ async: true })
@Injectable()
export class UserExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {}

  async validate(userId: number) {
    const user = await this.usersService.findOne(userId);
    return !!user;
  }

  defaultMessage(args: ValidationArguments) {
    return `User with id ${args.value} does not exist`;
  }
}
