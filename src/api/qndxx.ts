import express, { Request, Response } from "express";

const router = express.Router();
import { qndxx } from "@/lib/qndxx";

router.get("/current", async (req: Request, res: Response) => {
  const result = await qndxx.current();
  return res.status(result.status ? 200 : 500).json(result);
});

router.get("/list", async (req: Request, res: Response) => {
  const result = await qndxx.list();
  return res.status(result.status ? 200 : 500).json(result);
});

export default router;
