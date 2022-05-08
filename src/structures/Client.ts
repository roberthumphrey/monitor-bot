import { ApplicationCommandDataResolvable, Client, ClientEvents, Collection } from "discord.js";
import glob from "glob";
import mongoose from 'mongoose';
import { promisify } from "util";
import { RegisterCommandsOptions } from "../types/Client";
import { CommandType } from "../types/Command";
import { GuildConfig } from "../types/Guild";
import { Event } from "./Event";
import { GuildModel } from '../database/Schemas/Guild'
import { io, Socket } from "socket.io-client";
import { ClientToServer, ServerToClient } from "../types/Socket";
import chalk from "chalk";
import { pongReceived, verificationComplete } from "./Functions";

const globPromise = promisify(glob);

export class ImperialClient extends Client {
     commands: Collection<string, CommandType> = new Collection();
     configs: Collection<string, GuildConfig> = new Collection();
     socket: Socket<ServerToClient, ClientToServer> = io('wss://imperialmonitor-api.herokuapp.com/');
     whitelistedGroups: number[] = [ 5286459, 5296237, 5438033, 5296326, 5296325, 5426149, 5296984, 5311576 ];
     log: Function = console.log;

     constructor() {
          super({ intents: 32767 });
     }

     async start() {          
          this.registerModules();
          this.databaseConnection(process.env.mongodbUsername, process.env.mongodbPassword);

          const guildConfigs = await GuildModel.find({});
          this.setConfigs(guildConfigs);

          this.socket.on('VERIFICATION_COMPLETE', data => verificationComplete(data));

          let time = new Date().getTime();

          this.socket.emit('ping', { time });
          this.socket.on('pong', pong => pongReceived(pong));

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
          const eventFiles = await globPromise(`${__dirname}/../events/*{.ts, .js}`);

          eventFiles.forEach(async filePath => {
               const event: Event<keyof ClientEvents> = await this.importFile(filePath);

               this.on(event.event, event.run);
          });
     }

     async databaseConnection(username: string, password: string) {
          let uri = `mongodb+srv://${username}:${password}@goliath.ydtpu.mongodb.net/galactic-empire?retryWrites=true&w=majority`
          mongoose.connect(uri);

          let connection = mongoose.connection;
          connection.on('open', this.log.bind(console, `${chalk.yellow('[DATABASE]')} Connected to Astral Database`));
          connection.on('error', this.log.bind(console, 'MongoDB connection error:'));
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