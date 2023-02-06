import { VercelRequest, VercelResponse } from "@vercel/node";

import { takeScreenshot, validateCaptureForm } from "../lib";

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const start = Date.now();
  if (req.method !== "POST") return res.setHeader("Allow", ["POST"]).end(`Method ${req.method} is not allowed!`);
  if (!req.body || !req.body.url) return res.json({ status: false, message: "Needed request body is empty!" });

  const options = validateCaptureForm(req.body);
  if (!options) return res.json({ status: false, message: "Invalid request body!" });

  try {
    const base64 = await takeScreenshot(req.body.url, { ...options });
    if (base64 === undefined) return res.json({ status: false, message: `Website ${req.body.url} unaccessible!` });

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Request-Method", "*");
    const end = Date.now();

    return res.json({
      status: true,
      data: { url: req.body.url, type: req.body.type, runtime: (end - start) / 1000, base64 },
    });
  } catch (error) {
    console.error(error);
    return res.json({ status: false, message: `Website ${req.body.url} unaccessible!` });
  }
};
