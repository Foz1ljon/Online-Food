import { MailerService } from "@nestjs-modules/mailer";
import { BadGatewayException, Injectable, Logger } from "@nestjs/common";
import { User } from "../users/schemas/user.schema";

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private readonly logger: Logger,
  ) {}

  async sendUserConfirmation(user: User): Promise<void> {
    const url = `${process.env.API_HOST}/api/profile/activate/${user.activation_link}`;

    console.log(url, " (Activation link)");
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: "Welcome to Online Food App Please confirm your email",
        template: "confirmation",
        context: {
          name: user.fname,
          news: url,
        },
      });
    } catch (error) {
      this.logger.error("Sending error:", error.stack, MailerService.name);

      throw new BadGatewayException("Error sending email");
    }
  }
}
