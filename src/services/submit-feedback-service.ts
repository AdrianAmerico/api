import { MailProvider } from "../provider/mail-provider";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackServiceRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackService {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailProvider: MailProvider
  ) {}

  async execute(data: SubmitFeedbackServiceRequest) {
    const { comment, type, screenshot } = data;

    if (!type) {
      throw new Error("Type is required");
    }
    if (!comment) {
      throw new Error("Comment is required");
    }

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Screenshot must be a base64 encoded image");
    }
    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailProvider.sendMail({
      subject: "Feedback do usuário",
      body: [
        `<p>O usuário deixou o seguinte feedback:</p>`,
        `<p>${comment}</p>`,
        `<p>Tipo: ${type}</p>`,
        screenshot,
      ].join(""),
    });
  }
}
