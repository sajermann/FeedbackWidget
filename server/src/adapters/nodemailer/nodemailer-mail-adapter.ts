import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "fbf8962bc9c576",
    pass: "334fea9d6fc696",
  },
});

export class NodemailAdapter implements MailAdapter {
  async sendEmail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: "Equipe FeedbackWidget <oi@feedback.com>",
      to: "Bruno Sajermann <alemaodesenvolvedor@gmail.com>",
      subject,
      html: body,
    });
  }
}
