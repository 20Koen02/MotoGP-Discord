import {
  AutocompleteInteraction,
  Awaitable,
  ChatInputCommandInteraction,
  ClientEvents,
  Collection,
  SlashCommandBuilder,
} from "discord.js";

export interface Command {
  command: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Awaitable<void>;
  autocomplete?: (interaction: AutocompleteInteraction) => Awaitable<void>;
}

export interface BotEvent {
  name: keyof ClientEvents;
  once?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute: (...args: any[]) => Awaitable<void>;
}

declare module "discord.js" {
  export interface Client {
    commands: Collection<string, Command>;
  }
}
