import chalk from "chalk";
import { MessageEmbed } from "discord.js";
import { client } from "..";
import { Data, Pong } from "../types/Socket";

export const success_embed = (message: string) => {
     return new MessageEmbed().setColor('GREEN').setTitle('Success').setDescription(message).setTimestamp().setFooter({ text: 'Imperial Monitor | Developed by Robert (ForceAegis)' });
}

export const error_embed = (message: string) => {
     return new MessageEmbed().setColor('RED').setTitle('Error').setDescription(message).setTimestamp().setFooter({ text: 'Imperial Monitor | Developed by Robert (ForceAegis)' });
}

export const warning_embed = (message: string) => {
     return new MessageEmbed().setColor('ORANGE').setTitle('Warning').setDescription(message).setTimestamp().setFooter({ text: 'Imperial Monitor | Developed by Robert (ForceAegis)' });
}

export const verificationComplete = (data: Data) => {
          let config = client.configs.get(data.server);
          let userRank = data.user.groups.filter(group => group.id === config.robloxGroup)[0];
          let rankDiscordId = config.ranks.filter(rank => rank.name === userRank.rank)[0];

          let role = client.guilds.cache.get(config.id).roles.cache.find(role => role.id === rankDiscordId.discordId);
          let member = client.guilds.cache.get(config.id).members.cache.get(data.user.discordId);

          member.roles.add(role);

          // @ts-ignore
          config.guilds.cache.get(config.id).channels.cache.get(data.channelId).send("User Verified");
}

export const pongReceived = (pong: Pong) => client.log(`${chalk.yellow('[ASTRAL_GATEWAY]')} Gateway Latency: ${pong.time}ms`);