import { EmbedBuilder, SlashCommandBuilder, time } from "discord.js";
import { Command } from "../../types";
import Api from "../../api/api";
import {
  getClockEmoji,
  getNextEvent,
  getSessionEmoji,
  getThemeColor,
} from "../../util";

const command: Command = {
  command: new SlashCommandBuilder()
    .setName("schedule")
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("The category of the schedule")
        .addChoices(
          { name: "MotoGP", value: "MGP" },
          { name: "Moto2", value: "MT2" },
          { name: "Moto3", value: "MT3" }
        )
    )
    .setDescription("MotoGP schedule"),
  execute: async (interaction) => {
    await interaction.deferReply();

    const category = interaction.options.getString("category") ?? "MGP";

    const api = Api.instance;

    let allEvents;
    let year = new Date().getFullYear() + 1;
    allEvents = await api.getEvents(year);
    if (!allEvents  || "error_type" in allEvents) {
      year = new Date().getFullYear();
      allEvents = await api.getEvents(year);

      if (!allEvents  || "error_type" in allEvents) {
        await interaction.editReply({
          content: `Something went wrong while fetching the ${year} and ${
            year + 1
          } schedule`,
        });
        return;
      }
    }

    const events = allEvents.filter((e) => e.kind === "GP");

    const event = getNextEvent(events) ?? events[events.length - 1];
    const sessions = await api.getSessions(event.id);

    if (!sessions) {
      await interaction.editReply({
        content: `Something went wrong while fetching the ${year} schedule`,
      });
      return;
    }

    let sessionStrings = sessions.broadcasts
      .filter((b) => b.type === "SESSION" && b.category.acronym === category)
      .map((s) => {
        const date = new Date(s.date_start);
        return `${getSessionEmoji(s.shortname)} ${s.name}: ${time(
          date,
          "f"
        )}, ${time(date, "R")}`;
      });

    if (sessionStrings.length === 0) {
      sessionStrings = ["The schedule is not available yet"];
    }

    const embed = new EmbedBuilder()
      .setColor(getThemeColor("primary"))
      .setTitle(
        `:calendar_spiral: The ${sessions.circuit?.country} ${
          event.categories.find((c) => c.acronym === category)?.name
        } Grand Prix full schedule`
      )
      .setDescription(
        `${sessionStrings.join("\n")}\n\n${getClockEmoji(
          new Date()
        )} All times are in your local time zone`
      )
      .setThumbnail(
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Moto_Gp_logo.svg/320px-Moto_Gp_logo.svg.png"
      );

    await interaction.editReply({ embeds: [embed] });
  },
};

export default command;
