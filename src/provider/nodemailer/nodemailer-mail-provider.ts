import { MailProvider, SendMailData } from "../mail-provider";
import nodemailer from "nodemailer";

export class NodeMailerMailProvider implements MailProvider {
  constructor(
    private transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    })
  ) {}

  async sendMail({ body, subject }: SendMailData) {
    await this.transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Adrian Américo <adrian@feedget.com",
      subject: subject,
      html: body,
    });
  }
}
