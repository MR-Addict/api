import express, { Request, Response } from "express";

import { takeScreenshot, validateForm, getOptions } from "@/lib/screenshot";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const start = Date.now();

  const error = validateForm(req.body);
  if (error) return res.status(400).json({ status: false, message: "Invalid request body!" });

  const options = getOptions(req.body);
  const base64 = await takeScreenshot(req.body.url, options);
  if (!base64) return res.status(500).json({ status: false, message: "Failed to capture your page!" });

  const runtime = (Date.now() - start) / 1000 + "s";
  return res.status(200).json({ status: true, data: { type: req.body.type, runtime, url: req.body.url, base64 } });
});

export default router;
