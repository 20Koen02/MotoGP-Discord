import { SlashCommandBuilder } from "discord.js";
import { Command } from "../../types";

const command: Command = {
  command: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Ping the bot"),
  execute: async (interaction) => {
    const sent = await interaction.reply({
      content: "Ping?",
      fetchReply: true,
      ephemeral: true,
    });
    interaction.editReply(
      `🏓 Pong! Roundtrip latency: ${
        sent.createdTimestamp - interaction.createdTimestamp
      }ms`
    );
  },
};

export default command;
