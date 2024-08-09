import { EmbedBuilder, HexColorString, SlashCommandBuilder } from "discord.js";
import { Command } from "../../types";
import Api from "../../api/api";
import { Team } from "../../api/types/Team";

const command: Command = {
  command: new SlashCommandBuilder()
    .setName("rider")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("The name of the rider")
        .setAutocomplete(true)
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("year")
        .setDescription("The year of the calendar")
        .setMinValue(1949)
        .setMaxValue(new Date().getFullYear() + 1)
        .setRequired(false)
    )
    .setDescription("MotoGP rider"),

  autocomplete: async (interaction) => {
    const api = Api.instance;

    const year =
      interaction.options.getNumber("year") || new Date().getFullYear();
    const teams = await api.getTeams(year);
    if (!teams) return;

    const focusedValue = interaction.options.getFocused();
    const choices = teams.flatMap((team) =>
      team.riders.map((rider) => `${rider.name} ${rider.surname}`)
    ) as string[];
    const filtered = choices.filter((choice) =>
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
    const teams = await api.getTeams(year);
    if (!teams) {
      await interaction.editReply({
        content: `The ${year} teams are not available`,
      });
      return;
    }

    const findRider = (team: Team) => {
      return team.riders.find((rider) =>
        `${rider.name} ${rider.surname}`.toLowerCase().includes(riderName)
      );
    };

    const riderName = interaction.options.getString("name")!.toLowerCase();
    const riderTeam = teams.find(findRider);

    if (!riderTeam) {
      await interaction.editReply({
        content: `Rider ${riderName} not found`,
      });
      return;
    }

    const rider = findRider(riderTeam)!;

    const stats = await api.getRiderStats(rider.legacy_id);
    const statistics = await api.getRiderStatistics(rider.legacy_id);

    if (!stats || !statistics) {
      await interaction.editReply({
        content: `Stats for ${rider.name} ${rider.surname} are not available`,
      });
      return;
    }

    const motoGPUUID = "e8c110ad-64aa-4e8e-8a86-f2f152f6a942";

    const world_championship_wins =
      stats.world_championship_wins.categories.find(
        (c) => c.category.id == motoGPUUID
      )?.count || "-";

    const victories =
      stats.grand_prix_victories.categories.find(
        (c) => c.category.id == motoGPUUID
      )?.count || "-";

    const podiums =
      stats.podiums.categories.find((c) => c.category.id == motoGPUUID)
        ?.count || "-";

    const poles =
      stats.poles.categories.find((c) => c.category.id == motoGPUUID)?.count ||
      "-";

    const races =
      stats.all_races.categories.find((c) => c.category.id == motoGPUUID)
        ?.count || "-";

    const embed = new EmbedBuilder()
      .setColor(riderTeam.color as HexColorString)
      .setTitle(`Rider information for ${rider.name} ${rider.surname}`)
      .setDescription(
        `
        :card_index: Name: ${rider.name} ${rider.surname} (${
          rider.current_career_step.short_nickname
        })
        :flag_${rider.country.iso.toLowerCase()}: Country: ${rider.country.name}
        :calendar_spiral: Date of birth: ${rider.birth_date} (${
          rider.years_old
        })
        :map: Place of birth: ${rider.birth_city}
        :hash: Number: ${rider.current_career_step.number}
        :motorcycle: Team: ${rider.current_career_step.team.name}

        Total MotoGP Stats:
        :trophy: World Championship Wins: ${world_championship_wins}
        :medal: Victories: ${victories}
        :medal: Podiums: ${podiums}
        :medal: Poles: ${poles}
        :checkered_flag: Races: ${races}

        Current Season (${statistics[0].season}):
        :medal: Position: ${statistics[0].position}
        :medal: Points: ${statistics[0].points}
        :medal: Victories: ${statistics[0].first_position}
        `
      );

    if (rider.current_career_step.pictures.bike.main) {
      embed.setImage(rider.current_career_step.pictures.bike.main);
    }

    if (rider.current_career_step.pictures.profile.main) {
      embed.setThumbnail(rider.current_career_step.pictures.profile.main);
    }

    await interaction.editReply({ embeds: [embed] });
  },
};

export default command;
