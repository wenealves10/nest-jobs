import { Body, Controller, Get, Post } from '@nestjs/common';
import { SendMailerProducerService } from 'src/jobs/sendMailer-producer-service';
import { CreateUserDTO } from './create-user.dto';

@Controller('create-user')
export class CreateUserController {
  constructor(private sendMailService: SendMailerProducerService) {}

  @Post('/')
  async create(@Body() createUser: CreateUserDTO) {
    this.sendMailService.sendMail(createUser);

    return createUser;
  }

  @Get('/')
  show() {
    return {
      message: 'Hello World Nest.js with TypeScript',
    };
  }
}
