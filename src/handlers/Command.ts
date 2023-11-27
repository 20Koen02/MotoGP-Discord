import { Client, Routes } from "discord.js";
import { REST } from "@discordjs/rest";
import { readdir } from "fs/promises";
import { join } from "path";
import { Command } from "../types";
import { color } from "../util";
import env from "../env";

const command = async (client: Client) => {
  const commandsDir = join(__dirname, "../commands");
  const commandFolders = await readdir(commandsDir);

  await Promise.all(
    commandFolders.map(async (folder) => {
      const files = await readdir(`${commandsDir}/${folder}`);
      await Promise.all(
        files.map(async (file) => {
          const c: Command = (await import(`${commandsDir}/${folder}/${file}`))
            .default;

          client.commands.set(c.command.name, c);
          console.log(
            color(
              "text",
              `📜 Loaded command ${color("variable", c.command.name)}`
            )
          );
        })
      );
    })
  );

  const rest = new REST({ version: "10" }).setToken(env.TOKEN);

  rest
    .put(Routes.applicationCommands(env.CLIENT_ID), {
      body: client.commands.map((c) => c.command.toJSON()),
    })
    .then((data) => {
      console.log(
        color(
          "text",
          `🔥 Registered ${color(
            "variable",
            (data as object[]).length
          )} slash command(s)`
        )
      );
    })
    .catch((e) => {
      console.log(e);
    });
};

export default command;
