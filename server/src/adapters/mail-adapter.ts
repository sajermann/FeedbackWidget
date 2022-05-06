export interface SendMailData{
  subject: string;
  body:string;
}

export interface MailAdapter{
  sendEmail: (email: SendMailData)=> Promise<void>;
}