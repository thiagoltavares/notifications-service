import { MailService } from './mail.service';

export class PostmarkMailService extends MailService {
  getMail(): string {
    return 'Hello Postmark';
  }
}
