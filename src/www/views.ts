import express, { Request, Response } from "express";

const router = express.Router();
const apis = [
  {
    name: "Screenshot API",
    intro: "Take any website screenshot from url! Make screenshot easier!",
    url: "https://mraddict.one/tools/capture-website",
  },
  {
    name: "Daily quote API",
    intro: "Find beautiful quotes and improve english daily!",
    url: "https://quotes.mraddict.vercel.app",
  },
];

router.get("/", async (req: Request, res: Response) => {
  return res.render("index", { apis });
});

export default router;
