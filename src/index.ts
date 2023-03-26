import "./loadenv";
import "module-alias/register";

import path from "path";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

import views from "@/www/views";
import { isLocalhost } from "./loadenv";
import { quote, qndxx, screenshot, lamp, openai } from "@/api";

const port = 3001;
const app = express();

app.use(express.json());
app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(process.cwd(), "public"), { maxAge: isLocalhost ? 0 : 1000 * 60 * 60 * 4 }));

app.set("view engine", "pug");
app.set("views", path.join(process.cwd(), "src/www/views"));

app.use("/", views);
app.use("/lamp", lamp);
app.use("/quote", quote);
app.use("/qndxx", qndxx);
app.use("/openai", openai);
app.use("/screenshot", screenshot);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
