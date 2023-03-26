import { Configuration, OpenAIApi } from "openai";
import express, { Request, Response, NextFunction } from "express";

import { ChatRequest } from "@/types/chatgpt";
import { openAIApiKey } from "@/loadenv";

const router = express.Router();
const configuration = new Configuration({ apiKey: process.env.OPENAI_TOKEN });
const openai = new OpenAIApi(configuration);

router.use((req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization !== openAIApiKey) {
    return res.status(401).json({ status: false, message: "Not authorized" });
  }
  next();
});

router.post("/chat", async (req: Request, res: Response) => {
  const request = ChatRequest.safeParse(req.body);
  if (!request.success) return res.status(400).json({ status: false, message: "Bad request" });

  try {
    const result = await openai.createChatCompletion(request.data);
    if (result.status !== 200) return res.status(500).json({ status: false, message: "ChatGPT failed to response" });
    else return res.json({ status: true, data: result.data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: "ChatGPT failed to response" });
  }
});

export default router;
