import {
  AttachmentBuilder,
  EmbedBuilder,
  InteractionEditReplyOptions,
  SlashCommandBuilder,
} from "discord.js";
import { Command } from "../../types";
import Api from "../../api/api";
import { downloadAndConvertSvgToPng, getFlag, getThemeColor } from "../../util";
import { stripIndents } from "common-tags";

const command: Command = {
  command: new SlashCommandBuilder()
    .setName("circuit")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("The name of the circuit")
        .setAutocomplete(true)
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("year")
        .setDescription("The year the circuit was used")
        .setMinValue(1949)
        .setMaxValue(new Date().getFullYear() + 1)
        .setRequired(false)
    )
    .setDescription("MotoGP circuit"),

  autocomplete: async (interaction) => {
    const api = Api.instance;

    const year =
      interaction.options.getNumber("year") || new Date().getFullYear();
    const events = await api.getEvents(year);
    if (!events) return;

    const focusedValue = interaction.options.getFocused();
    const choices = events
      .filter((event) => event.kind === "GP" && event.circuit)
      .map((event) => event.circuit!.name);

    const filtered = [...new Set(choices)].filter((choice) =>
      choice.toLowerCase().includes(focusedValue.toLowerCase())
    );

    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice })).slice(0, 25)
    );
  },

  execute: async (interaction) => {
    await interaction.deferReply();

    const api = Api.instance;

    const year =
      interaction.options.getNumber("year") || new Date().getFullYear();
    const events = await api.getEvents(year);
    if (!events) {
      await interaction.editReply({
        content: `The ${year} circuits are not available`,
      });
      return;
    }

    const circuitName = interaction.options.getString("name")!.toLowerCase();

    const choices = events.filter(
      (event) => event.kind === "GP" && event.circuit
    );

    const circuit = [...new Set(choices)].find((choice) =>
      choice.circuit!.name.toLowerCase().includes(circuitName)
    )?.circuit;
    if (!circuit) {
      await interaction.editReply({
        content: `Could not find a circuit with the name ${circuitName}`,
      });
      return;
    }

    const flag = getFlag(circuit.iso_code ?? "UNKNOWN");

    const trackImage = await downloadAndConvertSvgToPng(
      circuit.track.assets?.info?.path ?? ""
    );
    let attachment;
    if (trackImage) {
      attachment = new AttachmentBuilder(trackImage, { name: "track.png" });
    }

    const embed = new EmbedBuilder()
      .setColor(getThemeColor("primary"))
      .setTitle(`:stadium: Circuit information for ${circuit.name}`)
      .setDescription(
        stripIndents`
        :race_car: Name: ${circuit.name}
        ${flag} Location: ${circuit.country}, ${circuit.city}
        :date: Constructed: ${circuit.constructed} ${
          circuit.modified ? `(Modified: ${circuit.modified})` : ""
        }

        :arrow_up_down: Length: ${circuit.track.lenght_units.kiloMeters} km (${
          circuit.track.lenght_units.miles
        } miles)
        :left_right_arrow: Width: ${circuit.track.width_units.meters} m (${
          circuit.track.width_units.feet
        } ft)
        :straight_ruler: Longest straight: ${
          circuit.track.longest_straight_units.meters
        } m (${circuit.track.longest_straight_units.feet} ft)
        :arrow_heading_up: Corners: ${circuit.track.left_corners} left, ${
          circuit.track.right_corners
        } right

        :link: [Google Maps](https://www.google.com/maps/search/?api=1&query=${
          circuit.lat
        },${circuit.lng})
        `
      )
      .setThumbnail(
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Moto_Gp_logo.svg/320px-Moto_Gp_logo.svg.png"
      );

    if (attachment) {
      embed.setImage("attachment://track.png");
    }

    const replyContent: InteractionEditReplyOptions = { embeds: [embed] };
    if (attachment) {
      replyContent.files = [attachment];
    }

    await interaction.editReply(replyContent);
  },
};

export default command;
