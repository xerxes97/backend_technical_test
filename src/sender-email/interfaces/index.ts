import { mailTemplates } from '../templates';

type IMailTemplate = keyof typeof mailTemplates;

export interface IEmail {
  to: string;
  subject: string;
  template: IMailTemplate;
}
