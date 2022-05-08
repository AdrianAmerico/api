import { SubmitFeedbackService } from "./submit-feedback-service";

describe("SubmitFeedbackService", () => {
  const createFeedbackSpy = jest.fn();
  const sendMailSpy = jest.fn();

  const submitFeedback = new SubmitFeedbackService(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
  );

  it("should be able to submit feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "O app não funciona",
        screenshot: "data:image/png;base64,fdsyeytrewghtr",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "O app não funciona",
        screenshot: "",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit feedback without comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit feedback with incorrect screenshot format", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "App não funciona",
        screenshot: "aaaaaaaaaa",
      })
    ).rejects.toThrow();
  });
});
