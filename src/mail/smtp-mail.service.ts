import { MailService } from './mail.service';

export class SmtpMailService extends MailService {
  getMail(): string {
    return 'Hello SMTP';
  }
}
