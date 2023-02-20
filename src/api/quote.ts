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
        en: result.content,
        zh: result.note,
        img: result.picture2,
        preview: result.picture,
      },
    };
  } catch (error) {
    console.error(error);
  }
}

router.get("/", async (req: Request, res: Response) => {
  const rawDate = String(req.query.date || new Date().toString());
  if (isNaN(Date.parse(rawDate)) || new Date(rawDate) > new Date()) {
    return res.json({ status: false, message: "Invalid date!" });
  }

  const date = formatDate(rawDate).split(" ")[0];

  const result = await fetchQuote(date);
  return res.json(result);
});

export default router;
