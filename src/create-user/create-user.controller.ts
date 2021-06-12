import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from './create-user.dto';

@Controller('create-user')
export class CreateUserController {
  @Post('/')
  create(@Body() createUser: CreateUserDTO) {
    return createUser;
  }

  @Get('/')
  show() {
    return {
      message: 'Hello World Nest.js with TypeScript',
    };
  }
}
