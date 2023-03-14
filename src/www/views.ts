import express, { Request, Response } from "express";

import { apis } from "./config";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  return res.render("index", { apis });
});

export default router;
