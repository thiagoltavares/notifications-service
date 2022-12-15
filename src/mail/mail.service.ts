import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class MailService {
  abstract getMail(): string;
}
