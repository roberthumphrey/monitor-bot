import { client } from '../..';
import { GuildModel } from '../../database/Schemas/Guild';
import { Command } from "../../structures/Command";
import axios from 'axios';

export default new Command({
     name: 'show-config',
     description: `Shows the current server config`,
     defaultPermission: false,
     userPermissions: ['MANAGE_GUILD'],
     commandType: "admin",
     run: async ({ interaction }) => {
          const config = client.configs.get(interaction.guildId);

          return interaction.followUp(
               `Guild Config for ${interaction.guild.name} (${interaction.guildId})\nWelcome Channel: ${config.welcomeChannel}\nRoblox Group ID: ${config.robloxGroup}\nRank Count: ${config.ranks.length}`
          );
     }
});