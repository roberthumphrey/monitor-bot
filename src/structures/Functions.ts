import { MessageEmbed } from "discord.js";

export const success_embed = (message: string) => {
     return new MessageEmbed().setColor('GREEN').setTitle('Success').setDescription(message).setTimestamp().setFooter({ text: 'Imperial Monitor | Developed by Robert (ForceAegis)' });
}

export const error_embed = (message: string) => {
     return new MessageEmbed().setColor('RED').setTitle('Error').setDescription(message).setTimestamp().setFooter({ text: 'Imperial Monitor | Developed by Robert (ForceAegis)' });
}

export const warning_embed = (message: string) => {
     return new MessageEmbed().setColor('ORANGE').setTitle('Warning').setDescription(message).setTimestamp().setFooter({ text: 'Imperial Monitor | Developed by Robert (ForceAegis)' });
}