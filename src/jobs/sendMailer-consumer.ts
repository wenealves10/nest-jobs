import { MailerService } from '@nestjs-modules/mailer';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueProgress,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { CreateUserDTO } from 'src/create-user/create-user.dto';

@Processor('sendMail-queue')
class SendMailConsumer {
  constructor(private mailService: MailerService) {}

  @Process('sendMail-job')
  async sendMailJob(job: Job<CreateUserDTO>) {
    const { data } = job;

    await this.mailService.sendMail({
      to: data.email,
      from: 'Guia Cássia <matheusvilelaabrao@gmail.com>',
      subject: 'Guia Cássia!',
      html: `<b>Olá ${data.name}</b>\n <p>Seja bem vindo a plataforma Guia Cássia!</p>\n<p>Em breve vamos te notificar quando estive no ar para todo Brasil!\n <a href="https://guiacassia.com.br/" target="_blank">Guia Cássia</a></p>`,
    });
  }

  @OnQueueCompleted()
  onQueueCompleted(job: Job) {
    console.log(`On Completed ${job.name}`);
  }

  @OnQueueProgress()
  onQueueProgress(job: Job) {
    console.log(`On Progress ${job.name}`);
  }

  @OnQueueActive()
  onQueueActive(job: Job) {
    console.log(`On Active ${job.name}`);
  }
}
export { SendMailConsumer };
