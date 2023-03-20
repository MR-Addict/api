import express, { Request, Response } from "express";

import { mqttPassword } from "@/loadenv";

const router = express.Router();
import { lamp } from "@/lib/lamp";

router.post("/", async (req: Request, res: Response) => {
  const cmd = req.body.cmd;
  const token = req.body.token;
  if (token !== mqttPassword) return res.status(401).send("Not authorized");
  if (cmd !== "on" && cmd !== "off") return res.status(400).send("Bad request");

  lamp(cmd === "on");
  return res.end();
});

export default router;
