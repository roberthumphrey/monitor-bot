import { ApplicationCommandDataResolvable, Client, ClientEvents, Collection } from "discord.js";
import glob from "glob";
import mongoose from 'mongoose';
import { promisify } from "util";
import { RegisterCommandsOptions } from "../types/Client";
import { CommandType } from "../types/Command";
import { GuildConfig } from "../types/Guild";
import { Event } from "./Event";
import { GuildModel } from '../database/Schemas/Guild'
import { Rank } from "../types/Group";

const globPromise = promisify(glob);

export class ImperialClient extends Client {
     commands: Collection<string, CommandType> = new Collection();
     configs: Collection<string, GuildConfig> = new Collection();
     whitelistedGroups: number[] = [ 5286459, 5296237, 5438033, 5296326, 5296325, 5426149, 5296984, 5311576 ];

     constructor() {
          super({ intents: 32767 });
     }

     async start() {
          this.registerModules();
          this.databaseConnection(process.env.mongodbUsername, process.env.mongodbPassword);

          const guildConfigs = await GuildModel.find({});
          this.setConfigs(guildConfigs);

          this.login(process.env.token);
     }

     async importFile(filePath: string) {
          return await (await import(filePath))?.default;
     }

     async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
          if (guildId) {
               const guild = this.guilds.cache.get(guildId);
               guild?.commands.set(commands);
          } else {
               this.application?.commands.set(commands);
          }
     }

     async registerModules() {
          // Commands
          const slashCommands: ApplicationCommandDataResolvable[] = [];
          const commandFiles = await globPromise(`${__dirname}/../commands/*/*{.ts, .js}`);

          commandFiles.forEach(async filePath => {
               const command: CommandType = await this.importFile(filePath);

               if (!command.name) return;

               this.commands.set(command.name, command);
               slashCommands.push(command);
          });

          this.on('ready', () => {
               this.registerCommands({ commands: slashCommands, guildId: process.env.guildId });
          })

          // Events
          const eventsFiles = await globPromise(`${__dirname}/../events/*{.ts, .js}`);

          eventsFiles.forEach(async filePath => {
               const event: Event<keyof ClientEvents> = await this.importFile(filePath);
               
               this.on(event.event, event.run);
          });
     }

     async databaseConnection(username: string, password: string) {
          mongoose.connect(`mongodb+srv://${username}:${password}@goliath.ydtpu.mongodb.net/galactic-empire?retryWrites=true&w=majority`).then(() => {
               console.log(`Connected to database`);
          }).catch(error => console.log(`Failed to connect to database`));
     }

     setConfigs(guildConfigs: GuildConfig[]) {
          guildConfigs.forEach(config => {
               this.configs.set(config.id, config);
          });
     }

     updateConfig(config: GuildConfig) {
          this.configs.set(config.id, config);
     }
}