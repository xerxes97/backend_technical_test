import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IEmail } from './interfaces';
import * as nodemailer from 'nodemailer';

@Injectable()
export class SenderEmailService {
  async sendEmail(props: IEmail) {
    const { html, to, subject } = props;
    const from = process.env.EMAIL_FROM;
    if (!from)
      throw new InternalServerErrorException('EMAIL_FROM is not defined');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: from,
        pass: process.env.PASSWORD_EMAIL,
      },
      from,
    });
    return await transporter.sendMail({ from, to, subject, html });
  }
}
