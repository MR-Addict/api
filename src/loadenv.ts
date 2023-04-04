import z from "zod";
import { config } from "dotenv";

config();

const Env = z.object({
  MQTT_BROKER: z.string(),
  MQTT_USERNAME: z.string(),
  MQTT_PASSWORD: z.string(),
  ISLOCALHOST: z.enum(["TRUE", "FALSE"]).optional(),
  CHROME_PATH: z.string(),
});

type EnvType = z.TypeOf<typeof Env>;

const env = Env.parse(process.env);

export { env };
export type { EnvType };
