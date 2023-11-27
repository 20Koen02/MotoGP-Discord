import { ActivityType, Client, Events } from "discord.js";
import { BotEvent } from "../types";
import { color } from "../util";

const event: BotEvent = {
  name: Events.ClientReady,
  once: true,
  execute: (client: Client) => {
    client.user!.setActivity("Koen", { type: ActivityType.Watching });

    console.log(
      color("text", `💪 Logged in as ${color("variable", client.user?.tag)}`)
    );
  },
};

export default event;
