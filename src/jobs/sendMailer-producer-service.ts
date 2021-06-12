import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { CreateUserDTO } from 'src/create-user/create-user.dto';

@Injectable()
class SendMailerProducerService {
  constructor(@InjectQueue('sendMail-queue') private queue: Queue) {}

  async sendMail(createUser: CreateUserDTO) {
    await this.queue.add('sendMail-job', createUser, {
      delay: 5000,
      attempts: 5,
    });
  }
}

export { SendMailerProducerService };
