import env from "./env";
import "reflect-metadata";

import { Client, Collection, GatewayIntentBits } from "discord.js";
const { Guilds } = GatewayIntentBits;
import { Command } from "./types";
import { join } from "path";
import { readdir } from "fs/promises";

const client = new Client({ intents: [Guilds], shards: "auto" });
client.commands = new Collection<string, Command>();

(async () => {
  const handlersDir = join(__dirname, "handlers");
  const handlerFiles = await readdir(handlersDir);

  await Promise.all(
    handlerFiles.map(async (handler) => {
      (await import(`${handlersDir}/${handler}`)).default(client);
    })
  );

  client.login(env.TOKEN);
})();
