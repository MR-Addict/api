import "./loadEnv";
import "module-alias/register";

import path from "path";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

import screenshot from "@/api/screenshot";

const app = express();

app.use(express.json());
app.use(cors({ origin: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/screenshot", screenshot);

app.listen(3001, () => console.log("Listening on http://localhost:3001"));

console.log(path.join(__dirname, "public"));
