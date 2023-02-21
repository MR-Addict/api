import { formatDate } from "@/lib/util";
import express, { Request, Response } from "express";

const router = express.Router();

async function fetchQuote(date?: string) {
  try {
    const url = "http://open.iciba.com/dsapi/" + (date ? `?${new URLSearchParams({ date })}` : "");
    const res = await fetch(url);
    if (!res.ok) return { status: false };

    const result = await res.json();
    return {
      status: true,
      data: {
        date: result.dateline,
        zh: result.note,
        en: result.content,
        img: result.picture2,
        preview: result.picture,
      },
    };
  } catch (error) {
    return { status: false };
  }
}

router.get("/", async (req: Request, res: Response) => {
  let rawDate = String(req.query.date);
  if (isNaN(Date.parse(rawDate)) || new Date(rawDate) > new Date()) rawDate = new Date().toString();

  const date = formatDate(rawDate).split(" ")[0];
  const result = await fetchQuote(date);
  return res.status(result.status ? 200 : 500).json(result);
});

export default router;
