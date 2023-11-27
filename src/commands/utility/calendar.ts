import { EmbedBuilder, SlashCommandBuilder, time } from "discord.js";
import { Command } from "../../types";
import Api from "../../api/api";
import { getFlag, getThemeColor } from "../../util";

const command: Command = {
  command: new SlashCommandBuilder()
    .setName("calendar")
    .addNumberOption((option) =>
      option
        .setName("year")
        .setDescription("The year of the calendar")
        .setMinValue(1949)
        .setMaxValue(new Date().getFullYear() + 1)
    )
    .setDescription("MotoGP calendar"),

  execute: async (interaction) => {
    let year = interaction.options.getNumber("year");

    const api = Api.instance;

    let events;
    if (year) {
      events = await api.getEvents(year);

      if (!events) {
        await interaction.reply({
          content: `The ${year} calendar is not available`,
          ephemeral: true,
        });
        return;
      }
    } else {
      year = new Date().getFullYear() + 1;
      events = await api.getEvents(year);
      if (!events) {
        year = new Date().getFullYear();
        events = await api.getEvents(year);

        if (!events) {
          await interaction.reply({
            content: `Something went wrong while fetching the ${year} and ${
              year + 1
            } schedule`,
            ephemeral: true,
          });
          return;
        }
      }
    }

    const calendar = events
      .filter((e) => e.kind === "GP")
      .map((event, i) => {
        const date = new Date(event.date_start);
        const flag = getFlag(event.circuit?.iso_code ?? "UNKNOWN");
        return `${i + 1}. ${flag} ${event.circuit?.country} GP, ${time(
          date,
          "D"
        )}, ${time(date, "R")}`;
      });

    const embed = new EmbedBuilder()
      .setColor(getThemeColor("primary"))
      .setTitle(`:calendar_spiral: The ${year} MotoGP Grand Prix Calendar`)
      .setDescription(calendar.join("\n"))
      .setThumbnail(
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Moto_Gp_logo.svg/320px-Moto_Gp_logo.svg.png"
      );

    await interaction.reply({ embeds: [embed] });
  },
};

export default command;
