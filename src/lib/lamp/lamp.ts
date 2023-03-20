import { connect } from "mqtt";

import { mqttBroker, mqttPassword, mqttUsername } from "@/loadenv";

const statucTopic = "home/device/desktop_lamp/status";
const publishTopic = "home/device/desktop_lamp/control";

const client = connect(String(mqttBroker), { username: mqttUsername, password: mqttPassword });

client.on("connect", () => {
  console.log("MQTT client connected");
  client.subscribe(statucTopic, (error) => {
    if (error) console.error(error);
  });
});

client.on("message", (topic, message) => {
  console.log("Received message:", message.toString());
});

client.on("error", (error) => {
  console.error(error);
});

function lamp(status: "on" | "off", mode: "Bright" | "Night" | "Warm") {
  client.publish(publishTopic, JSON.stringify({ status, mode }));
}

export default lamp;
