import { VercelRequest, VercelResponse } from "@vercel/node";

import { takeScreenshot, validateForm, getOptions } from "../lib";

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const start = Date.now();
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");

  if (req.method !== "POST") return res.setHeader("Allow", ["POST"]).end(`Method ${req.method} is not allowed!`);
  if (!req.body) return res.json({ status: false, message: "Request body is empty!" });

  const error = validateForm(req.body);
  if (error) return res.json({ status: false, message: "Invalid request body!" });

  const options = getOptions(req.body);
  const base64 = await takeScreenshot(req.body.url, options);
  if (!base64) return res.json({ status: false, message: "Failed to capture your page!" });

  const runtime = (Date.now() - start) / 1000 + "s";
  return res.json({ status: true, data: { url: req.body.url, type: req.body.type, runtime, base64 } });
};
