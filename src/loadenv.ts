import { config } from "dotenv";

config();

const mqttBroker = process.env.MQTT_BROKER?.toString();
const mqttUsername = process.env.MQTT_USERNAME?.toString();
const mqttPassword = process.env.MQTT_PASSWORD?.toString();
const isLocalhost = process.env.ISLOCALHOST === "TRUE";
const chromeExecPath = process.env.CHROME_PATH?.toString();
const openAIApiKey = process.env.OPENAI_TOKEN?.toString();

if (!mqttBroker) throw new Error("Please add MQTT_BROKER to env");
if (!mqttUsername) throw new Error("Please add MQTT_USERNAME to env");
if (!mqttPassword) throw new Error("Please add MQTT_PASSWORD to env");
if (!chromeExecPath) throw new Error("Please add CHROME_PATH to env");
if (!openAIApiKey) throw new Error("Please add OPENAI_TOKEN to env");

export { isLocalhost, chromeExecPath, mqttBroker, mqttUsername, mqttPassword, openAIApiKey };
