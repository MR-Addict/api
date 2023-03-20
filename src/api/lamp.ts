import express, { Request, Response } from "express";

import { mqttPassword } from "@/loadenv";

const router = express.Router();
import { lamp } from "@/lib/lamp";

router.post("/", async (req: Request, res: Response) => {
  const token = req.body.token;
  const status = req.body.status;
  const mode = req.body.mode;
  if (token !== mqttPassword) return res.status(401).send("Not authorized");
  if (status !== "on" && status !== "off") return res.status(400).send("Bad request");
  if (status === "on" && mode !== "Bright" && mode !== "Night" && mode !== "Warm")
    return res.status(400).send("Bad request");

  lamp(status, mode);
  return res.end();
});

export default router;
