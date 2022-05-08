import { client } from '../..';
import { Command } from "../../structures/Command";
import { MessageEmbed } from 'discord.js';

export default new Command({
     name: 'show-config',
     description: `Shows the current server config`,
     // defaultPermission: false,
     // userPermissions: ['MANAGE_GUILD'],
     commandType: "admin",
     run: async ({ interaction }) => {
          const config = client.configs.get(interaction.guildId);

          const configEmbed = new MessageEmbed()
               .setColor('BLUE')
               .setTitle(`Server Config | ${interaction.guild.name} (${interaction.guildId})`)
               .addFields([
                    { name: 'Welcome Channel ID', value: `${config.welcomeChannel}`, inline: true },
                    { name: 'Roblox Group ID', value: `${config.robloxGroup}`, inline: true },
                    { name: 'Rank Count', value: `${config.ranks.length}`, inline: true },
                    { name: 'Ranks', value: `${config.ranks.map(rank => `${rank.name} | ${rank.points} | ${rank.discordId}`).join('\n')}` },
               ])
               .setTimestamp()
               .setFooter({ text: 'Imperial Monitor | Developed by Robert (ForceAegis)' });

          return interaction.reply({ embeds: [ configEmbed ] });
     }
});