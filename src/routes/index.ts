import express from "express";
import { SubmitFeedbackService } from "../services/submit-feedback-service";
import { PrismaFeedbacksRepository } from "../repositories/prisma/prisma-feedbacks-repository";
import { NodeMailerMailProvider } from "../provider/nodemailer/nodemailer-mail-provider";

export const routes = express.Router();

routes.post("/feedbacks", async (req, res) => {
  console.log(req.body);
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodeMailer = new NodeMailerMailProvider();

  const submitFeedbackService = new SubmitFeedbackService(
    prismaFeedbacksRepository,
    nodeMailer
  );

  await submitFeedbackService.execute({
    type,
    comment,
    screenshot,
  });

  return res.status(201).send();
});
